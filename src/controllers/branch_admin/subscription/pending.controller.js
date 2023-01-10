import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import moment from "moment";
import {sendNotification} from '../../../notifications/message.sender'

export const updateCancel = async (req, res) => {
  try {
    const { id } = req.body;
    const { add_on_id } = req.query;

    if (add_on_id) {
      await knex("add_on_orders")
        .update({ status: "cancelled" })
        .where({ id: add_on_id });
    } else {
      await knex("subscribed_user_details")
        .update({ subscription_status: "branch_cancelled" })
        .where({ id });
    }
    req.flash("success", "subscription cancelled ");
    res.redirect("/branch_admin/subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateSubscribedExistUser = async (req, res) => {
  try {
    const { router_id, date, add_on_order_id, address_id, sub_id } = req.body;

    if (add_on_order_id) {
      await knex("add_on_orders")
        .update({ status: "new_order" })
        .where({ id: add_on_order_id });
    }

    if (sub_id) {
      await knex("subscribed_user_details")
        .update({
          subscription_status: "subscribed",
          router_id,
          subscription_start_date: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          date,
        })
        .where({ id: sub_id });
    }

    req.flash("success", "Approved successfully");
    return res.redirect("/branch_admin/subscription/get_exist_users");
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const updateSubscribed = async (req, res) => {
  try {
    // const { sub_id, router_id, date, add_on_id, user_id } = req.body;

    const { router_id, date, add_on_order_id, address_id, sub_id,user_id } = req.body;

    const { is_exist, is_user_mapping_assign } = req.query;

    if (add_on_order_id) {
      if (typeof add_on_order_id == "string") {
        await knex("add_on_orders")
          .update({ status: "new_order" })
          .where({ id: add_on_order_id });
      } else {
        for (let i = 0; i < add_on_order_id.length; i++) {
          await knex("add_on_orders")
            .update({ status: "new_order" })
            .where({ id: add_on_order_id[i] });
        }
      }
    }

    if (sub_id) {
      await knex("subscribed_user_details")
        .update({
          subscription_status: "subscribed",
          router_id,
          subscription_start_date: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          date,
        })
        .where({ id: sub_id });


        await sendNotification({
          include_external_user_ids: [user_id.toString()],
          contents: { en: `Your Subsciption Was Placed, Your Susbcription Start From ${moment(date).format("DD-MM-YYYY")}` },
          headings: { en: "Subscription Notification" },
          name: "Appoinment Request",
          data: {
            subscription_status: "subscribed",
            category_id: 0,
            product_type_id: 0,
            type: 2,
            subscription_id: sub_id,
            bill_id: 0,
          },
        });
    }

    // if (is_user_mapping_assign) {
    //   console.log(is_user_mapping_assign , "inside")
    //   // is_user_mapping_assign - is a router id
    //   const { map_address_id } = req.body;

    //   const users = await knex("routes")
    //     .select("user_mapping")
    //     .where({ id: is_user_mapping_assign });

    //   if (users.length === 0 || users[0].user_mapping === null) {
    //     let arr_users = [Number(map_address_id)];
    //     await knex("routes")
    //       .update({ user_mapping: JSON.stringify(arr_users) })
    //       .where({ id: is_user_mapping_assign });
    //   } else {
    //     const get_users = await knex("routes")
    //       .select("user_mapping")
    //       .where({ id: is_user_mapping_assign });
    //     get_users[0].user_mapping.push(Number(map_address_id));

    //     await knex("routes")
    //       .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
    //       .where({ id: is_user_mapping_assign });
    //   }

    //   await knex("user_address")
    //     .update({ router_id: is_user_mapping_assign })
    //     .where({ id: map_address_id });
    //   req.flash("success", "Route Assigned Successfully");
    //   // return res.redirect(`/branch_admin/route/user_mapping?route_id=${is_user_mapping_assign}`)
    //   return res.redirect(`/branch_admin/route/get_route`);
    // }

    const users = await knex("routes")
      .select("user_mapping")
      .where({ id: router_id });

    if (users.length === 0 || users[0].user_mapping === null) {
      let arr_users = [Number(address_id)];
      await knex("routes")
        .update({ user_mapping: JSON.stringify(arr_users) })
        .where({ id: router_id });
    } else {
      const get_users = await knex("routes")
        .select("user_mapping")
        .where({ id: router_id });
      get_users[0].user_mapping.push(Number(address_id));

      await knex("routes")
        .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
        .where({ id: router_id });
    }

    await knex("user_address").update({ router_id }).where({ id: address_id });

    // this below call from user mapping assign

    // // if (!date) {
    // //   req.flash("error", "Please Choose a Date ");
    // //   return res.redirect("/branch_admin/subscription/get_new_users");
    // // }

    // // add on new new_user
    // // let address_id;
    // if (add_on_id) {
    //   await knex("add_on_orders")
    //     .update({ status: "new_order" })
    //     .where({ id: add_on_id });

    //   const get_add_on_address_id = await knex("add_on_orders")
    //     .select("address_id")
    //     .where({ id: add_on_id });

    //   address_id = get_add_on_address_id[0].address_id;
    // } else {
    //   // else subscribed new_user
    //   const get_address_id = await knex("subscribed_user_details")
    //     .select("user_address_id")
    //     .where({ id: sub_id });

    //   address_id = get_address_id[0].user_address_id;
    // }

    // // check if is not exist user(this api call in both new user and exist user)
    // if (!is_exist) {
    //   const users = await knex("routes")
    //     .select("user_mapping")
    //     .where({ id: router_id });

    //   if (users.length === 0 || users[0].user_mapping === null) {
    //     let arr_users = [Number(address_id)];
    //     await knex("routes")
    //       .update({ user_mapping: JSON.stringify(arr_users) })
    //       .where({ id: router_id });
    //   } else {
    //     const get_users = await knex("routes")
    //       .select("user_mapping")
    //       .where({ id: router_id });
    //     get_users[0].user_mapping.push(Number(address_id));

    //     await knex("routes")
    //       .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
    //       .where({ id: router_id });
    //   }

    //   await knex("user_address")
    //     .update({ router_id })
    //     .where({ id: address_id });
    // }

    req.flash("success", "subscribed successfully");
    if (is_exist) {
      return res.redirect("/branch_admin/subscription/get_exist_users");
    }
    res.redirect("/branch_admin/subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getNewUsers = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;
    const { admin_id } = req.body;

    let data_length = [];
    let data_length_2 = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "assigned" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      const search_data_2_length = await knex.raw(
        `SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.id as user_address_id ,user_address.landmark
          FROM add_on_orders as adds 
          JOIN users ON users.id = adds.user_id 
          JOIN user_address ON user_address.id = adds.address_id
          WHERE adds.branch_id = ${admin_id} AND adds.status = "assigned" AND  users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];
      data_length_2 = search_data_2_length[0];
      if (data_length.length === 0 && data_length_2.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/branch_admin/subscription/get_new_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "assigned", branch_id: admin_id });

      data_length_2 = await knex("add_on_orders")
        .select("id")
        .where({ branch_id: admin_id, status: "assigned" });
    }

    const routes = await knex("routes")
      .select("name", "id")
      .where({ status: "1", branch_id: admin_id });

    if (data_length.length === 0 && data_length_2.length === 0) {
      loading = false;
      return res.render("branch_admin/subscription/pending", {
        subscription_users: data_length,
        add_on_users: data_length_2,
        searchKeyword,
        routes,
      });
    }

    let both_data = [];
    if (data_length.length === 0 && data_length_2.length !== 0) {
      both_data = data_length_2;
    } else if (data_length.length !== 0 && data_length_2.length === 0) {
      both_data = data_length;
    } else {
      both_data = [...data_length, ...data_length_2];
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, both_data, "subscription/get_new_users");

    let results;
    let is_search = false;
    let data = [];

    let subscription_users = [];
    let add_on_users = [];

    if (data_length !== 0) {
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT sub.id ,sub.user_id, sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "assigned" AND sub.branch_id = ${admin_id}
        AND users.user_unique_id LIKE '%${searchKeyword}%'`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          `SELECT sub.id ,sub.user_id,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "assigned" AND sub.branch_id = ${admin_id}`
        );
      }
      subscription_users = results[0];
      for (let i = 0; i < subscription_users.length; i++) {
        subscription_users[i].start_date = moment(
          subscription_users[i].start_date
        ).format("DD-MM-YYYY");
        subscription_users[i].default_show_start_date = moment(
          subscription_users[i].start_date
        ).format("YYYY-DD-MM");
        subscription_users[i].image =
          process.env.BASE_URL + subscription_users[i].image;
      }
    }
    let search_query;
    if (searchKeyword) {
      search_query = `AND  users.user_unique_id LIKE '%${searchKeyword}%'`;
    }

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
      user_address.address,user_address.id as user_address_id ,user_address.landmark
      FROM add_on_orders as adds 
      JOIN users ON users.id = adds.user_id 
      JOIN user_address ON user_address.id = adds.address_id
      WHERE adds.branch_id = ${admin_id} AND adds.status = "assigned" ${
        searchKeyword ? search_query : ""
      }`);

    console.log(add_on_order_query[0]);

    let get_user_products_query;
    if (add_on_order_query[0].length !== 0) {
      for (let i = 0; i < add_on_order_query[0].length; i++) {
        get_user_products_query = await knex("add_on_order_items as adds")
          .select(
            "adds.add_on_order_id",
            "adds.quantity",
            "adds.price",
            "adds.total_price",
            "products.name as product_name",
            "products.image",
            "products.unit_value",
            "unit_types.value"
          )
          .join("products", "products.id", "=", "adds.product_id")
          .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
          .where({ "adds.add_on_order_id": add_on_order_query[0][i].id });

        for (let j = 0; j < get_user_products_query.length; j++) {
          get_user_products_query[j].image =
            process.env.BASE_URL + get_user_products_query[j].image;
        }
        add_on_order_query[0][i].is_add_on = true;
        add_on_order_query[0][i].add_on_order_id = add_on_order_query[0][i].id;
        add_on_order_query[0][i].add_on_products = get_user_products_query;
        add_on_order_query[0][i].delivery_date = moment(
          add_on_order_query[0][i].delivery_date
        ).format("DD-MM-YYYY");

        add_on_users.push(add_on_order_query[0][i]);
      }
      // console.log(get_user_products_query)
    }

    // check that new user did the sub and add on at same time (like if he did the add on while pending the subscription)
    let view_add_on_products = [];
    for (let i = 0; i < subscription_users.length; i++) {
      for (let j = 0; j < add_on_users.length; j++) {
        if (
          add_on_users[j].user_address_id ==
          subscription_users[i].user_address_id
        ) {
          add_on_users[j].is_subscription_pending = true;
          subscription_users[i].is_add_on_pending = true;
          view_add_on_products.push({
            add_on_order_id: add_on_users[j].add_on_order_id,
            delivery_date: add_on_users[j].delivery_date,
            sub_total: add_on_users[j].sub_total,
            add_on_products: add_on_users[j].add_on_products,
          });
        }
      }
      subscription_users[i].add_on_details = view_add_on_products;
      view_add_on_products = [];
    }

    // if new user did the two add on orders

    for (let i = 0; i < add_on_users.length; i++) {
      if (add_on_users[i].is_subscription_pending != true) {
        for (let j = 0; j < add_on_users.length; j++) {
          if (
            add_on_users[i].user_address_id ==
              add_on_users[j].user_address_id &&
            add_on_users[i].id != add_on_users[j].id
          ) {
            add_on_users[i].is_add_on_duplicate = true;
            add_on_users[j].is_add_on_duplicate = true;

            if (add_on_users[j].add_on_duplicate_details) {
              add_on_users[j].add_on_duplicate_details.push({
                add_on_order_id: add_on_users[i].add_on_order_id,
                delivery_date: add_on_users[i].delivery_date,
                sub_total: add_on_users[i].sub_total,
                add_on_products: add_on_users[i].add_on_products,
              });
            } else {
              add_on_users[j].add_on_duplicate_details = [
                {
                  add_on_order_id: add_on_users[j].add_on_order_id,
                  delivery_date: add_on_users[j].delivery_date,
                  sub_total: add_on_users[j].sub_total,
                  add_on_products: add_on_users[j].add_on_products,
                },
                {
                  add_on_order_id: add_on_users[i].add_on_order_id,
                  delivery_date: add_on_users[i].delivery_date,
                  sub_total: add_on_users[i].sub_total,
                  add_on_products: add_on_users[i].add_on_products,
                },
              ];
            }
          }
        }
      }
    }

    loading = false;
    res.render("branch_admin/subscription/pending", {
      data: data,
      subscription_users,
      add_on_users,
      page,
      iterator,
      endingLink,
      numberOfPages: 1,
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

export const getExistUsers = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;
    const { admin_id } = req.body;

    let data_length = [];
    let data_length_2 = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "branch_pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      const search_data_2_length = await knex.raw(
        `SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.id as user_address_id ,user_address.landmark
          FROM add_on_orders as adds 
          JOIN users ON users.id = adds.user_id 
          JOIN user_address ON user_address.id = adds.address_id
          WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" AND  users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];
      data_length_2 = search_data_2_length[0];
      if (data_length.length === 0 && data_length_2.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/branch_admin/subscription/get_exist_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "branch_pending", branch_id: admin_id });

      data_length_2 = await knex("add_on_orders")
        .select("id")
        .where({ branch_id: admin_id, status: "branch_pending" });
    }

    const routes = await knex("routes")
      .select("name", "id")
      .where({ status: "1", branch_id: admin_id });

    if (data_length.length === 0 && data_length_2.length === 0) {
      loading = false;
      return res.render("branch_admin/subscription/exist_user", {
        subscription_users: data_length,
        add_on_users: data_length_2,
        searchKeyword,
        routes,
      });
    }

    let both_data = [];
    if (data_length.length === 0 && data_length_2.length !== 0) {
      both_data = data_length_2;
    } else if (data_length.length !== 0 && data_length_2.length === 0) {
      both_data = data_length;
    } else {
      both_data = [...data_length, ...data_length_2];
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(
      req,
      res,
      both_data,
      "subscription/get_exist_users"
    );

    let results;
    let is_search = false;
    let data = [];

    let subscription_users = [];
    let add_on_users = [];

    if (data_length !== 0) {
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}
        AND users.user_unique_id LIKE '%${searchKeyword}%'`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
        unit_types.value,categories.name as category_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}`
        );
      }
      subscription_users = results[0];
      for (let i = 0; i < subscription_users.length; i++) {
        subscription_users[i].start_date = moment(
          subscription_users[i].start_date
        ).format("DD-MM-YYYY");
        subscription_users[i].image =
          process.env.BASE_URL + subscription_users[i].image;
      }
    }
    let search_query;
    if (searchKeyword) {
      search_query = `AND  users.user_unique_id LIKE '%${searchKeyword}%'`;
    }

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
      user_address.address,user_address.id as user_address_id ,user_address.landmark
      FROM add_on_orders as adds 
      JOIN users ON users.id = adds.user_id 
      JOIN user_address ON user_address.id = adds.address_id
      WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" ${
        searchKeyword ? search_query : ""
      }`);

    let get_user_products_query;
    if (add_on_order_query[0].length !== 0) {
      for (let i = 0; i < add_on_order_query[0].length; i++) {
        get_user_products_query = await knex("add_on_order_items as adds")
          .select(
            "adds.add_on_order_id",
            "adds.quantity",
            "adds.price",
            "adds.total_price",
            "products.name as product_name",
            "products.image",
            "products.unit_value",
            "unit_types.value"
          )
          .join("products", "products.id", "=", "adds.product_id")
          .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
          .where({ "adds.add_on_order_id": add_on_order_query[0][i].id });

        for (let j = 0; j < get_user_products_query.length; j++) {
          get_user_products_query[j].image =
            process.env.BASE_URL + get_user_products_query[j].image;
        }
        add_on_order_query[0][i].is_add_on = true;
        add_on_order_query[0][i].add_on_order_id = add_on_order_query[0][i].id;
        add_on_order_query[0][i].add_on_products = get_user_products_query;
        add_on_order_query[0][i].delivery_date = moment(
          add_on_order_query[0][i].delivery_date
        ).format("DD-MM-YYYY");

        add_on_users.push(add_on_order_query[0][i]);
      }
    }

    console.log(subscription_users);
    console.log(add_on_users);

    loading = false;
    res.render("branch_admin/subscription/exist_user", {
      data: data,
      subscription_users,
      add_on_users,
      page,
      iterator,
      endingLink,
      numberOfPages: 1,
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

export const userMappingAssign = async (req, res) => {
  try {
    const { router_id, address_id } = req.body;

    const users = await knex("routes")
      .select("user_mapping")
      .where({ id: router_id });

    if (users.length === 0 || users[0].user_mapping === null) {
      let arr_users = [Number(address_id)];
      await knex("routes")
        .update({ user_mapping: JSON.stringify(arr_users) })
        .where({ id: router_id });
    } else {
      const get_users = await knex("routes")
        .select("user_mapping")
        .where({ id: router_id });
      get_users[0].user_mapping.push(Number(address_id));

      await knex("routes")
        .update({ user_mapping: JSON.stringify(get_users[0].user_mapping) })
        .where({ id: router_id });
    }

    await knex("user_address")
      .update({ router_id: router_id })
      .where({ id: address_id });
    req.flash("success", "Route Assigned Successfully");
    // return res.redirect(`/branch_admin/route/user_mapping?route_id=${is_user_mapping_assign}`)
    return res.redirect(`/branch_admin/route/get_route`);
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const unassignUser = async (req, res) => {
  try {
    const { address_id, router_id } = req.body;

    const users = await knex("routes")
      .select("user_mapping")
      .where({ id: router_id });

    const user_mapping = users[0].user_mapping;

    if (user_mapping.length == 1) {
      await knex("routes")
        .update({ user_mapping: null })
        .where({ id: router_id });
    } else {

      for(let i = 0 ; i <user_mapping.length ; i ++){
        if(user_mapping[i] == address_id){
          user_mapping.splice(i,1)
        }
      }

    }

    await knex("user_address").update({ router_id : null }).where({ id: address_id });
    req.flash("success","SuccessFully UnAssigned")
    return res.redirect("/branch_admin/route/get_route")
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

// export const getExistUsers = async (req, res) => {
//   try {
//     const { admin_id } = req.body;
//     let loading = true;
//     const { searchKeyword } = req.query;

//     let data_length = [];
//     let data_length_2 = [];

//     if (searchKeyword) {
//       const search_data_length = await knex.raw(
//         `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "branch_pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
//       );

//       const search_data_2_length = await knex.raw(
//         `SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
//         users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//           user_address.address,user_address.id as user_address_id ,user_address.landmark
//           FROM add_on_orders as adds
//           JOIN users ON users.id = adds.user_id
//           JOIN user_address ON user_address.id = adds.address_id
//           WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" AND  users.user_unique_id LIKE '%${searchKeyword}%'`
//       );

//       data_length = search_data_length[0];
//       data_length_2 = search_data_2_length[0];
//       if (data_length.length === 0 && data_length_2.length === 0) {
//         loading = false;
//         req.query.searchKeyword = "";
//         req.flash("error", "No User Found");
//         return res.redirect("/branch_admin/subscription/get_exist_users");
//       }
//     } else {
//       data_length = await knex("subscribed_user_details")
//         .select("id")
//         .where({ subscription_status: "branch_pending" });

//       data_length_2 = await knex("add_on_orders")
//         .select("id")
//         .where({ branch_id: admin_id, status: "branch_pending" });
//     }

//     const routes = await knex("routes")
//       .select("name", "id")
//       .where({ status: "1", branch_id: admin_id });

//     if (data_length.length === 0 && data_length_2.length === 0) {
//       loading = false;
//       return res.render("branch_admin/subscription/exist_user", {
//         data: data_length,
//         searchKeyword,
//         routes,
//       });
//     }

//     let both_data = [];
//     if (data_length.length === 0 && data_length_2.length !== 0) {
//       both_data = data_length_2;
//     } else if (data_length.length !== 0 && data_length_2.length === 0) {
//       both_data = data_length;
//     } else {
//       both_data = [...data_length, ...data_length_2];
//     }

//     console.log(both_data);

//     let {
//       startingLimit,
//       page,
//       resultsPerPage,
//       numberOfPages,
//       iterator,
//       endingLink,
//     } = await getPageNumber(
//       req,
//       res,
//       both_data,
//       "subscription/get_exist_users"
//     );

//     let results;
//     let is_search = false;
//     let data = [];
//     if (data_length !== 0) {
//       if (searchKeyword) {
//         results = await knex.raw(
//           `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//         user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
//         unit_types.value,categories.name as category_name,routes.name as route_name ,routes.id as route_id
//         FROM subscribed_user_details AS sub
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         JOIN users ON users.id = sub.user_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN routes ON routes.id = user_address.router_id
//         JOIN products ON products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN categories ON categories.id = products.category_id
//         WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}
//         AND users.user_unique_id LIKE '%${searchKeyword}%'`
//         );
//         is_search = true;
//       } else {
//         results = await knex.raw(
//           `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//         user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,
//         unit_types.value,categories.name as category_name,routes.name as route_name ,routes.id as route_id
//         FROM subscribed_user_details AS sub
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         JOIN users ON users.id = sub.user_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN routes ON routes.id = user_address.router_id
//         JOIN products ON products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN categories ON categories.id = products.category_id
//         WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}`
//         );
//       }
//       data = results[0];
//       for (let i = 0; i < data.length; i++) {
//         data[i].start_date = moment(data[i].start_date).format("DD-MM-YYYY");
//         data[i].image = process.env.BASE_URL + data[i].image;
//       }
//     }
//     let search_query;
//     if (searchKeyword) {
//       search_query = `AND  users.user_unique_id LIKE '%${searchKeyword}%'`;
//     }

//     const add_on_order_query =
//       await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,
//     users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
//       user_address.address,user_address.id as user_address_id ,user_address.landmark
//       FROM add_on_orders as adds
//       JOIN users ON users.id = adds.user_id
//       JOIN user_address ON user_address.id = adds.address_id
//       WHERE adds.branch_id = ${admin_id} AND adds.status = "branch_pending" ${
//         searchKeyword ? search_query : ""
//       }`);

//     // console.log(add_on_order_query[0]);

//     let get_user_products_query;
//     if (add_on_order_query[0].length !== 0) {
//       for (let i = 0; i < add_on_order_query[0].length; i++) {
//         get_user_products_query = await knex("add_on_order_items as adds")
//           .select(
//             "adds.add_on_order_id",
//             "adds.quantity",
//             "adds.price",
//             "adds.total_price",
//             "products.name as product_name",
//             "products.image",
//             "products.unit_value",
//             "unit_types.value"
//           )
//           .join("products", "products.id", "=", "adds.product_id")
//           .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//           .where({ "adds.add_on_order_id": add_on_order_query[0][i].id });

//         for (let j = 0; j < get_user_products_query.length; j++) {
//           get_user_products_query[j].image =
//             process.env.BASE_URL + get_user_products_query[j].image;
//         }
//         add_on_order_query[0][i].is_add_on = true;
//         add_on_order_query[0][i].add_on_products = get_user_products_query;
//         add_on_order_query[0][i].delivery_date = add_on_order_query[0][
//           i
//         ].delivery_date
//           .toString()
//           .slice(4, 16);
//         data.push(add_on_order_query[0][i]);
//       }
//       // console.log(get_user_products_query)
//     }

//     loading = false;
//     res.render("branch_admin/subscription/exist_user", {
//       data: data,
//       page,
//       iterator,
//       endingLink,
//       numberOfPages: 1,
//       is_search,
//       searchKeyword,
//       loading,
//       routes,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };
