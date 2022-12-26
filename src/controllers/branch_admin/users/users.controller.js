import moment from "moment";
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

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
    console.log(user_address_id, admin_id);

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

    // console.log(user);

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



    let is_subscription_active = 0;
    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        if (get_subscription_products[i].subscription_status == "subscribed") {
          is_subscription_active = 1;
        }

        get_subscription_products[i].start_date = moment(
          get_subscription_products[i].start_date
        ).format("YYYY-MM-DD");
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
        if (add_on_order_query[i].status == "pending") {
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
          "YYYY-MM-DD"
        );
      }
    }

    // for new subscription and add on 

    const get_plan = await knex("subscription_type").select("name", "id").where({status : "1"})

    let sub_product_id = []
    if(get_subscription_products.length !== 0){
      for (let i = 0 ; i< get_subscription_products.length ; i++){
        sub_product_id.push(get_subscription_products[i].product_id)
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
        "products.status": "1"
      }).whereNotIn("products.id",sub_product_id)


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
        "products.status": "1"
      });


    res.render("branch_admin/users/user_detail", {
      user,
      sub_products: get_subscription_products,
      add_on,
      is_add_on_active,
      is_subscription_active,
      get_plan,
      get_subscription_products : add_subscription_products,
      add_on_products
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
        "products.status": "1"
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
        "products.status": "1"
      });

    const get_plan = await knex("subscription_type").select("name", "id").where({status : "1"})

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
      alternate_mobile : data.alternate_mobile_number ? data.alternate_mobile_number : null,
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

      await knex("subscribed_user_details").insert(sub_product_query)

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
    if(data.router_id){
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

    req.flash("success","Success Fully Added")
    res.redirect("/home?is_user_added=2")
    // return { status: true };
  } catch (error) {
    console.log(error);
    res.redirect("/home?is_user_added=1");
  }
};

export const newSubscription = async(req,res) => {
  try {
    const {data,user_address_id} = req.body


    const user_query = await knex("user_address")
    .select("user_id","branch_id","router_id")
    .where({"id":user_address_id})

    const user = user_query[0]

    
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

      await knex("subscribed_user_details").insert(sub_product_query)

return res.status(200).json({status : true})
  } catch (error) {
    console.log(error)
    return res.redirect("/home")
  }
}


export const newAddOn = async(req,res) =>{
  try {
    const {data,user_address_id} = req.body


    const user_query = await knex("user_address")
    .select("user_id","branch_id","router_id")
    .where({"id":user_address_id})

    const user = user_query[0]

    
   
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
   

return res.status(200).json({status : true})
  } catch (error) {
    console.log(error)
    return res.redirect("/home")
  }
}