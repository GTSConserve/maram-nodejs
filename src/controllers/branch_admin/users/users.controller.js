import moment from "moment";
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import {sendNotification} from "../../../notifications/message.sender"

export const createUserBill = async (req, res) => {
  const { add_on, sub, user_id, sub_total, discount } = req.body;

  const sub_product = JSON.parse(sub);
  const add_on_product = JSON.parse(add_on);

  const bill_no = "MA" + Date.now();

  const bill = await knex("bill_history").insert({
    bill_no,
    user_id,
    sub_total,
    discount : discount ? discount : null,
    grand_total: Number(sub_total) - (discount ?  Number(discount) : Number(0)),
    date: moment().format("YYYY-MM-DD"),
  });

  if (sub_product.length !== 0) {
    sub_product.map(async (data) => {
      await knex("bill_history_details").insert({
        bill_history_id: bill[0],
        subscription_id: data.id,
        subscription_price: data.subscription_monthly_price,
        additional_price: data.additional_monthly_price,
        total_price: data.total_monthly_price,
        subscription_qty: data.subscription_delivered_quantity,
        additional_qty: data.additional_delivered_quantity,
        total_qty: data.total_delivered_quantity,
      });

      await knex("subscribed_user_details")
        .update({
          subscription_monthly_price: null,
          additional_monthly_price: null,
          total_monthly_price: null,
          subscription_delivered_quantity: null,
          additional_delivered_quantity: null,
          total_delivered_quantity: null,
        })
        .where({ id: data.id });
    });
  }
  if (add_on_product.length !== 0) {
    add_on_product.map(async (data) => {
      await knex("bill_history_details").insert({
        bill_history_id: bill[0],
        add_on_order_id: data.id,
        total_price: data.sub_total,
      });

      await knex("add_on_orders")
        .update({ is_bill_generated: "1" })
        .where({ id: data.id });
    });
  }

  // await  swal("Done", "New Add On Order Placed", "success");
  req.flash("success", "Bill Generated SuccessFully");
  res.redirect(`/branch_admin/user/get_bill?user_id=${user_id}`);
};

// get bill
export const getBill = async (req, res) => {
  try {
    const { admin_id } = req.body;
    const { user_id } = req.query;

    const { searchKeyword } = req.query;
    let loading = false;
    let data_length = [];

    // get generate bill details
    const get_subscription_price = await knex("subscribed_user_details")
      .select(
        "total_monthly_price",
        "subscription_monthly_price",
        "additional_monthly_price",
        "id",
        "subscription_delivered_quantity",
        "additional_delivered_quantity",
        "total_delivered_quantity"
      )
      .where({ user_id })
      .whereNot({ total_monthly_price: null });

    const get_add_on_price = await knex("add_on_orders")
      .select("sub_total", "id")
      .where({ user_id, status: "delivered", is_bill_generated: "0" });

    let sub_total = 0;

    if (get_subscription_price.length !== 0) {
      get_subscription_price.map((data) => {
        sub_total += Number(data.total_monthly_price);
      });
    }
    if (get_add_on_price.length !== 0) {
      get_add_on_price.map((data) => {
        sub_total += Number(data.sub_total);
      });
    }


    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,bill_no FROM bill_history WHERE user_id = ${user_id} AND bill_no LIKE '%${searchKeyword}%'`
      );
      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Bill  Found");
        return res.redirect("/branch_admin/user/get_bill");
      }
    } else {
      data_length = await knex("bill_history").select("id").where({ user_id });
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/users/get_bill", {
        data: data_length,
        searchKeyword,
        sub_total,
        get_subscription_price,
        get_add_on_price,
        user_id,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "user/get_bill");

    let results;

    let is_search = false;
    if (searchKeyword) {
      results =
        await knex.raw(`SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ${user_id} AND bill_no LIKE '%${searchKeyword}%' 
      LIMIT ${startingLimit},${resultsPerPage}`);
      is_search = true;
    } else {
      results =
        await knex.raw(`SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ${user_id}
      LIMIT ${startingLimit},${resultsPerPage}`);
    }

    const data = results[0];
    loading = false;

    data.map((d) => {
      d.date = moment(d.date).format("DD-MM-YYYY");
    });

    res.render("branch_admin/users/get_bill", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      sub_total,
      get_subscription_price,
      get_add_on_price,
      user_id,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getusers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT  users.name,users.user_unique_id  FROM  user_address
        JOIN users ON users.id = user_address.user_id
        WHERE user_address.branch_id= ${admin_id} AND users.name LIKE '%${searchKeyword}%' 
        OR users.mobile_number LIKE '%${searchKeyword}%'`
      );
      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User  Found");
        return res.redirect("/branch_admin/user/branch_user");
      }
    } else {
      data_length = await knex("user_address")
        .select("id")
        .where({ branch_id: admin_id });
    }
    const routes = await knex("users")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/user/branch_user", {
        data: data_length,
        searchKeyword,
        routes,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "user/branch_user");

    let results;

    console.log(data_length);

    let is_search = false;
    if (searchKeyword) {
      results =
        await knex.raw(`SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      routes.name as route_name
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN routes ON routes.id = user_address.router_id
      WHERE user_address.branch_id = ${admin_id} AND users.name LIKE '%${searchKeyword}%' 
      OR users.mobile_number LIKE '%${searchKeyword}%' 
      LIMIT ${startingLimit},${resultsPerPage}`);
      is_search = true;
    } else {
      results =
        await knex.raw(`SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      routes.name as route_name
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN routes ON routes.id = user_address.router_id
      WHERE user_address.branch_id = ${admin_id} 
      LIMIT ${startingLimit},${resultsPerPage}`);
    }

    const data = results[0];
    loading = false;

    res.render("branch_admin/users/users", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { user_address_id } = req.query;
    const { admin_id } = req.body;

    const get_user_query =
      await knex.raw(`SELECT user_address.id as user_address_id,
      user_address.address,user_address.user_id as user_id, 
      users.name as user_name,users.user_unique_id,users.mobile_number,
      routes.name as route_name
      FROM user_address 
      JOIN users ON users.id = user_address.user_id 
      LEFT JOIN routes ON routes.id = user_address.router_id
      WHERE user_address.id = ${user_address_id} AND user_address.branch_id = ${admin_id}`);

    if (get_user_query[0].length === 0) {
      req.flash("error", "User Not Found");
      return res.redirect("/home");
    }

    const user = get_user_query[0][0];

    const get_subscription_products = await knex(
      "subscribed_user_details as sub"
    )
      .select(
        "sub.id as sub_id",
        "sub.user_id",
        "sub.start_date",
        "sub.customized_days",
        "sub.quantity",
        "sub.subscription_status",
        "products.name as product_name",
        "products.unit_value",
        "products.id as product_id",
        "products.price",
        "unit_types.value",
        "subscription_type.name as sub_name"
      )
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      )

      .where({
        "sub.user_id": user.user_id,
        "sub.user_address_id": user_address_id,
      });

    const current_month = moment().format("M");

    let get_additional_orders = [];

    let subscription_ids = [];

    let is_subscription_active = 0;
    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        subscription_ids.push(get_subscription_products[i].sub_id);

        /////////////////////////////////////////////////////////////////////////////// pause

        let pause_dates = [];

        const pause_orders_query = await knex("pause_dates")
          .select("date", "id")
          .where({ subscription_id: get_subscription_products[i].sub_id });

        if (pause_orders_query.length !== 0) {
          for (let k = 0; k < pause_orders_query.length; k++) {
            pause_dates.push(
              moment(pause_orders_query[k].date).format("YYYY-MM-DD")
            );
          }
        }
        get_subscription_products[i].pause_dates = pause_dates;
        pause_dates = [];

        /////////////////////////////////////////////////////////////////////////////// additional
        const additional_orders_parent_id = await knex(
          "additional_orders_parent"
        )
          .select("id")
          .where({
            subscription_id: get_subscription_products[i].sub_id,
            // month: current_month,
          });

        // if (additional_orders_parent_id.length !== 0) {
        let additional_orders = {};
        const additional_orders_query = await knex("additional_orders")
          .select("date", "status", "quantity")
          .where({
            subscription_id: get_subscription_products[i].sub_id,
            is_cancelled: "0",
          });
        // .where({
        //   additional_orders_parent_id: additional_orders_parent_id[0].id,
        // });

        if (additional_orders_query.length !== 0) {
          // additional_orders.additional_orders_parent_id =
          //   additional_orders_parent_id[0].id;
          additional_orders.qty = additional_orders_query[0].quantity;
          let orders = [];
          let dates = [];
          let is_active = false;
          for (let i = 0; i < additional_orders_query.length; i++) {
            if (additional_orders_query[i].status == "pending") {
              is_active = true;
            }

            orders.push({
              date: moment(additional_orders_query[i].date).format(
                "DD-MM-YYYY"
              ),
              qty: additional_orders_query[i].quantity,
              status: additional_orders_query[i].status,
            });

            dates.push(
              moment(additional_orders_query[i].date).format("YYYY-MM-DD")
            );
          }
          additional_orders.dates = dates;
          additional_orders.order_details = orders;
          additional_orders.sub_id = get_subscription_products[i].sub_id;
          additional_orders.is_active = is_active;
          orders = [];

          // additional_orders

          get_subscription_products[i].additional_orders = additional_orders;
          get_additional_orders.push(additional_orders);
          // }
        }

        if (get_subscription_products[i].subscription_status == "subscribed") {
          is_subscription_active = 1;
        }

        get_subscription_products[i].start_date = moment(
          get_subscription_products[i].start_date
        ).format("DD-MM-YYYY");
      }
    }

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status
      FROM add_on_orders as adds 
      WHERE adds.user_id = ${user.user_id} AND adds.address_id = ${user_address_id}`);

    // console.log(add_on_order_query[0]);
    let add_on = add_on_order_query[0];

    let is_add_on_active = 0;
    let get_user_products_query;
    if (add_on.length !== 0) {
      for (let i = 0; i < add_on.length; i++) {
        if (
          add_on[i].status == "pending" ||
          add_on[i].status == "new_order" ||
          add_on[i].status == "order_placed"
        ) {
          is_add_on_active = 1;
        }

        get_user_products_query = await knex("add_on_order_items as adds")
          .select(
            "adds.add_on_order_id",
            "adds.quantity",
            "adds.price",
            "adds.total_price",
            "adds.status",
            "products.name as product_name",
            "products.image",
            "products.unit_value",
            "unit_types.value"
          )
          .join("products", "products.id", "=", "adds.product_id")
          .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
          .where({ "adds.add_on_order_id": add_on[i].id });

        for (let j = 0; j < get_user_products_query.length; j++) {
          get_user_products_query[j].image =
            process.env.BASE_URL + get_user_products_query[j].image;
        }
        add_on[i].add_on_products = get_user_products_query;
        add_on[i].delivery_date = moment(add_on[i].delivery_date).format(
          "DD-MM-YYYY"
        );
      }
    }

    // for new subscription and add on

    const get_plan = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });

    let sub_product_id = [];
    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        sub_product_id.push(get_subscription_products[i].product_id);
      }
    }

    const add_subscription_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 1,
        "products.status": "1",
      })
      .whereNotIn("products.id", sub_product_id);

    const add_on_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 2,
        "products.status": "1",
      });

    // console.log(get_additional_orders , "check")
    // console.log(get_subscription_products[0]);
    // console.log(get_subscription_products[0].pause_dates);

    res.render("branch_admin/users/user_detail", {
      user,
      sub_products: get_subscription_products,
      add_on,
      is_add_on_active,
      is_subscription_active,
      get_plan,
      get_subscription_products: add_subscription_products,
      add_on_products,
      get_additional_orders,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const getAddUser = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const get_routes = await knex("routes")
      .select("id", "name")
      .where({ status: "1", branch_id: admin_id });

    const get_subscription_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 1,
        "products.status": "1",
      });
    const add_on_products = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 2,
        "products.status": "1",
      });

    const get_plan = await knex("subscription_type")
      .select("name", "id")
      .where({ status: "1" });

    res.render("branch_admin/users/add_user", {
      get_subscription_products,
      add_on_products,
      get_plan,
      get_routes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createUser = async (req, res) => {
  try {
    const { data, admin_id } = req.body;
    console.log(req.body);

    let user_query = {};
    user_query.mobile_number = data.mobile_number;
    user_query.name = data.user_name;

    let get_all_users = await knex.select("id").from("users");
    let users_length = get_all_users.length + 1;

    user_query.user_unique_id = "CUSTOMER" + users_length;

    if (data.email) {
      user_query.email = data.email;
    }

    const user = await knex("users").insert(user_query);

    const address = await knex("user_address").insert({
      user_id: user[0],
      branch_id: admin_id,
      title: data.address_title,
      address: data.address,
      landmark: data.address_landmark ? data.address_landmark : null,
      latitude: data.latitude,
      longitude: data.longitude,
      alternate_mobile: data.alternate_mobile_number
        ? data.alternate_mobile_number
        : null,
      router_id: data.router_id ? data.router_id : null,
    });

    if (data.sub_product) {
      let sub_product_query = {
        start_date: data.sub_start_date,
        user_id: user[0],
        product_id: data.sub_product,
        user_address_id: address[0],
        quantity: data.sub_qty,
        subscribe_type_id: data.your_plan,
        branch_id: admin_id,
        date: data.sub_start_date,
        subscription_start_date: data.sub_start_date,
        subscription_status: "subscribed",
      };

      if (data.router_id) {
        sub_product_query.router_id = data.router_id;
      }

      if (data.your_plan == 3) {
        let weekdays = await knex("weekdays").select("id", "name");
        let store_weekdays = [];
        for (let i = 0; i < data.custom_days.length; i++) {
          for (let j = 0; j < weekdays.length; j++) {
            if (weekdays[j].id == data.custom_days[i]) {
              store_weekdays.push(weekdays[j].name);
            }
          }
        }
        sub_product_query.customized_days = JSON.stringify(store_weekdays);
      }

      await knex("subscribed_user_details").insert(sub_product_query);
    }

    if (data.add_on.length !== 0) {
      const order = await knex("add_on_orders").insert({
        user_id: user[0],
        delivery_date: data.delivery_date,
        address_id: address[0],
        branch_id: admin_id,
        status: "new_order",
      });

      let order_id = order[0];

      let sub_total = 0;

      for (let i = 0; i < data.add_on.length; i++) {
        const product_price = await knex("products")
          .select("price")
          .where({ id: data.add_on[i].product_id });

        await knex("add_on_order_items").insert({
          add_on_order_id: order_id,
          user_id: user[0],
          product_id: data.add_on[i].product_id,
          quantity: data.add_on[i].qty,
          price: product_price[0].price,
          total_price: product_price[0].price * data.add_on[i].qty,
        });

        sub_total = sub_total + product_price[0].price * data.add_on[i].qty;
      }

      await knex("add_on_orders").update({ sub_total }).where({ id: order_id });
    }

    // assign the route in user_mapping
    if (data.router_id) {
      const users = await knex("routes")
        .select("user_mapping")
        .where({ id: data.router_id });

      if (users.length === 0 || users[0].user_mapping === null) {
        let arr_users = [Number(address[0])];
        await knex("routes")
          .update({ user_mapping: JSON.stringify(arr_users) })
          .where({ id: data.router_id });
      } else {
        const get_users = await knex("routes")
          .select("user_mapping")
          .where({ id: data.router_id });
        get_users[0].user_mapping.push(Number(address[0]));

        await knex("routes")
          .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
          .where({ id: data.router_id });
      }

      // await knex("user_address")
      //   .update({ router_id: data.router_id })
      //   .where({ id: address[0] });
    }

    req.flash("success", "Success Fully Added");
    res.redirect("/home?is_user_added=2");
    // return { status: true };
  } catch (error) {
    console.log(error);
    res.redirect("/home?is_user_added=1");
  }
};

export const newSubscription = async (req, res) => {
  try {
    const { data, user_address_id } = req.body;

    const user_query = await knex("user_address")
      .select("user_id", "branch_id", "router_id")
      .where({ id: user_address_id });

    const user = user_query[0];

    let sub_product_query = {
      start_date: data.sub_start_date,
      user_id: user.user_id,
      product_id: data.sub_product,
      user_address_id,
      quantity: data.sub_qty,
      subscribe_type_id: data.your_plan,
      branch_id: user.branch_id,
      date: data.sub_start_date,
      subscription_start_date: data.sub_start_date,
      subscription_status: "subscribed",
    };

    if (user.router_id) {
      sub_product_query.router_id = user.router_id;
    }

    if (data.your_plan == 3) {
      let weekdays = await knex("weekdays").select("id", "name");
      let store_weekdays = [];
      for (let i = 0; i < data.custom_days.length; i++) {
        for (let j = 0; j < weekdays.length; j++) {
          if (weekdays[j].id == data.custom_days[i]) {
            store_weekdays.push(weekdays[j].name);
          }
        }
      }
      sub_product_query.customized_days = JSON.stringify(store_weekdays);
    }

   const sub_id =  await knex("subscribed_user_details").insert(sub_product_query);

    await sendNotification({
      include_external_user_ids: [ user.user_id.toString()],
      contents: { en: `New Subsciption Was Placed By Maram Admin, Your Susbcription Start From ${moment(data.sub_start_date).format("DD-MM-YYYY")}` },
      headings: { en: "Subscription Notification" },
      name: "Appoinment Request",
      data: {
        subscription_status: "subscribed",
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: sub_id[0],
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const newAddOn = async (req, res) => {
  try {
    const { data, user_address_id } = req.body;

    const user_query = await knex("user_address")
      .select("user_id", "branch_id", "router_id")
      .where({ id: user_address_id });

    const user = user_query[0];

    const order = await knex("add_on_orders").insert({
      user_id: user.user_id,
      delivery_date: data.delivery_date,
      address_id: user_address_id,
      branch_id: user.branch_id,
      status: "new_order",
    });

    let order_id = order[0];

    let sub_total = 0;

    for (let i = 0; i < data.add_on.length; i++) {
      const product_price = await knex("products")
        .select("price")
        .where({ id: data.add_on[i].product_id });

      await knex("add_on_order_items").insert({
        add_on_order_id: order_id,
        user_id: user.user_id,
        product_id: data.add_on[i].product_id,
        quantity: data.add_on[i].qty,
        price: product_price[0].price,
        total_price: product_price[0].price * data.add_on[i].qty,
      });

      sub_total = sub_total + product_price[0].price * data.add_on[i].qty;
    }

    await knex("add_on_orders").update({ sub_total }).where({ id: order_id });

    await sendNotification({
      include_external_user_ids: [ user.user_id.toString()],
      contents: { en: `New Add on Order Was Placed By Maram Admin, Your Add On Will be delivered On ${moment(data.delivery_date).format("DD-MM-YYYY")}` },
      headings: { en: "Add On Notification" },
      name: "New Add On ",
      data: {
        subscription_status: 0,
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: 0,
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

// additional

export const createAdditional = async (req, res) => {
  try {
    const { data } = req.body;

    for (let i = 0; i < data.dates.length; i++) {
      await knex("additional_orders").insert({
        subscription_id: data.sub_id,
        user_id: data.user_id,
        quantity: data.qty,
        date: data.dates[i],
      });
    }

    await sendNotification({
      include_external_user_ids: [ data.user_id.toString()],
      contents: { en: `Additional Order was Placed for Your Subscription` },
      headings: { en: "Subscription Notification" },
      name: "Subscription Updated",
      data: {
        subscription_status: "subscribed",
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: data.sub_id,
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
export const editAdditional = async (req, res) => {
  try {
    const { data } = req.body;


    await knex("additional_orders")
      .where({
        subscription_id: data.sub_id,
        user_id: data.user_id,
        status: "pending",
      })
      .del();

    for (let i = 0; i < data.dates.length; i++) {
      await knex("additional_orders").insert({
        subscription_id: data.sub_id,
        user_id: data.user_id,
        quantity: data.qty,
        date: data.dates[i],
      });
    }
    await sendNotification({
      include_external_user_ids: [ data.user_id.toString()],
      contents: { en: `Additional Order was Updated for Your Subscription` },
      headings: { en: "Subscription Notification" },
      name: "Subscription Updated",
      data: {
        subscription_status: "subscribed",
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: data.sub_id,
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const cancelAdditional = async (req, res) => {
  try {
    const { sub_id, user_id, user_address_id } = req.body;

    await knex("additional_orders")
      .update({ status: "cancelled", is_cancelled: "1" })
      .where({ subscription_id: sub_id, user_id });

      await sendNotification({
        include_external_user_ids: [ user_id.toString()],
        contents: { en: `Additional Order was Cancelled for Your Subscription` },
        headings: { en: "Subscription Notification" },
        name: "Subscription Updated",
        data: {
          subscription_status: "subscribed",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_id: sub_id,
          bill_id: 0,
        },
      });

    req.flash("success", "SuccessFully Additional Orders Cancelled");
    res.redirect(
      `/branch_admin/user/single_user?user_address_id=${user_address_id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// subscribe
export const unsubscribeSubscription = async (req, res) => {
  try {
    const { sub_id, user_id, user_address_id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "unsubscribed" })
      .where({ id: sub_id, user_id });


      await sendNotification({
        include_external_user_ids: [ user_id.toString()],
        contents: { en: `Your Subscription Was UnSubscribed` },
        headings: { en: "Subscription Notification" },
        name: "Subscription Updated",
        data: {
          subscription_status: "subscribed",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_id: sub_id,
          bill_id: 0,
        },
      });


    req.flash("success", "UnSubscribed SuccessFully");
    res.redirect(
      `/branch_admin/user/single_user?user_address_id=${user_address_id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const subscribeSubscription = async (req, res) => {
  try {
    const { sub_id, user_id, user_address_id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "subscribed" })
      .where({ id: sub_id, user_id });

      await sendNotification({
        include_external_user_ids: [ user_id.toString()],
        contents: { en: `Your Subscription Was Re Subscribed SuccessFully` },
        headings: { en: "Subscription Notification" },
        name: "Subscription Updated",
        data: {
          subscription_status: "subscribed",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_id: sub_id,
          bill_id: 0,
        },
      });

    req.flash("success", "Subscribed SuccessFully");
    res.redirect(
      `/branch_admin/user/single_user?user_address_id=${user_address_id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// paused
export const createPaused = async (req, res) => {
  try {
    const { data } = req.body;
    console.log("hitting");
    console.log(data);

    for (let i = 0; i < data.dates.length; i++) {
      await knex("pause_dates").insert({
        subscription_id: data.sub_id,
        user_id: data.user_id,
        date: data.dates[i],
      });
    }

    await sendNotification({
      include_external_user_ids: [ data.user_id.toString()],
      contents: { en: `Paused Dates Created for Your Subscription` },
      headings: { en: "Subscription Notification" },
      name: "Subscription Updated",
      data: {
        subscription_status: "subscribed",
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: data.sub_id,
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const editPaused = async (req, res) => {
  try {
    const { data } = req.body;

    await knex("pause_dates")
      .where({ subscription_id: data.sub_id, user_id: data.user_id })
      .del();

    if (data.dates[0] != "") {
      for (let i = 0; i < data.dates.length; i++) {
        await knex("pause_dates").insert({
          subscription_id: data.sub_id,
          user_id: data.user_id,
          date: data.dates[i],
        });
      }
    }

    await sendNotification({
      include_external_user_ids: [ data.user_id.toString()],
      contents: { en: `Paused Dates Updated for Your Subscription` },
      headings: { en: "Subscription Notification" },
      name: "Subscription Updated",
      data: {
        subscription_status: "subscribed",
        category_id: 0,
        product_type_id: 0,
        type: 2,
        subscription_id: data.sub_id,
        bill_id: 0,
      },
    });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// change user plan
export const changeUserPlan = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateQty = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    await knex("subscribed_user_details")
      .update({ quantity: data.qty })
      .where({ user_id: data.user_id, id: data.sub_id });

      await sendNotification({
        include_external_user_ids: [ data.user_id.toString()],
        contents: { en: `Subscription Quantity Updated` },
        headings: { en: "Subscription Notification" },
        name: "Subscription Updated",
        data: {
          subscription_status: "subscribed",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_id: data.sub_id,
          bill_id: 0,
        },
      });

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
