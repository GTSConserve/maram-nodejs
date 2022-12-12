import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import moment from "moment";

export const updateCancel = async (req, res) => {
  try {
    const { id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "branch_cancelled" })
      .where({ id });
    req.flash("success", "subscription cancelled ");
    res.redirect("/branch_admin/subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateSubscribed = async (req, res) => {
  try {
    const { sub_id, router_id, date } = req.body;

    if (!date) {
      req.flash("error", "Please Choose a Date ");
      return res.redirect("/branch_admin/subscription/get_new_users");
    }

    // const sub_type_id = await knex("subscribed_user_details as sub")
    //   .select("subscription_type.id", "sub.start_date")
    //   .join(
    //     "subscription_type",
    //     "subscription_type.id",
    //     "=",
    //     "sub.subscribe_type_id"
    //   )
    //   .where({ "sub.id": sub_id });

    //   const assigned_date = moment(date).format("YYYY-MM-DD");
    //   const today_date = moment().format("YYYY-MM-DD");

    //   if (assigned_date == today_date) {
    //     req.flash("error", "Cannot Accept Today Date");
    //     return res.redirect("/branch_admin/subscription/get_new_users");
    //   }
    // let dates;

    // console.log(sub_type_id[0].id)

    // for later need to check condition for date
    // if (sub_type_id[0].id == "1") {
    //   dates = date;
    // } else if (sub_type_id[0].id == "2") {

    // } else if (sub_type_id[0].id == "3") {
    // }

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

    req.flash("success", "subscribed successfully");
    res.redirect("/branch_admin/subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getNewUsers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "assigned" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Subscription  Found");
        return res.redirect("/branch_admin/subscription/get_new_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "assigned", branch_id: admin_id });
    }

    const routes = await knex("routes")
      .select("name", "id")
      .where({ status: "1", branch_id: admin_id });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/subscription/pending", {
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
    } = await getPageNumber(req, res, data_length, "subscription/get_new_users");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
          unit_types.value,categories.name as category_name
          FROM subscribed_user_details AS sub 
          JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
          JOIN users ON users.id = sub.user_id 
          JOIN user_address ON user_address.id = sub.user_address_id
          JOIN products ON products.id = sub.product_id
          JOIN unit_types ON unit_types.id = products.unit_type_id
          JOIN categories ON categories.id = products.category_id
          WHERE sub.subscription_status = "assigned" AND sub.branch_id = ${admin_id}
          AND users.user_unique_id LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
          unit_types.value,categories.name as category_name
          FROM subscribed_user_details AS sub 
          JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
          JOIN users ON users.id = sub.user_id 
          JOIN user_address ON user_address.id = sub.user_address_id
          JOIN products ON products.id = sub.product_id
          JOIN unit_types ON unit_types.id = products.unit_type_id
          JOIN categories ON categories.id = products.category_id
          WHERE sub.subscription_status = "assigned" AND sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      console.log( data[i].start_date)
      data[i].start_date = moment(data[i].start_date).format('YYYY-MM-DD')
    }

    loading = false;
    res.render("branch_admin/subscription/pending", {
      data: data,
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


export const getExistUsers = async (req,res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.branch_id = ${admin_id} AND subscribed_user_details.subscription_status = "branch_pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User  Found");
        return res.redirect("/branch_admin/subscription/get_exist_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "branch_pending", branch_id: admin_id });
    }

    const routes = await knex("routes")
      .select("name", "id")
      .where({ status: "1", branch_id: admin_id });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/subscription/exist_user", {
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
    } = await getPageNumber(req, res, data_length, "subscription/get_exist_users");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
          unit_types.value,categories.name as category_name
          FROM subscribed_user_details AS sub 
          JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
          JOIN users ON users.id = sub.user_id 
          JOIN user_address ON user_address.id = sub.user_address_id
          JOIN products ON products.id = sub.product_id
          JOIN unit_types ON unit_types.id = products.unit_type_id
          JOIN categories ON categories.id = products.category_id
          WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id}
          AND users.user_unique_id LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
          user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
          unit_types.value,categories.name as category_name
          FROM subscribed_user_details AS sub 
          JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
          JOIN users ON users.id = sub.user_id 
          JOIN user_address ON user_address.id = sub.user_address_id
          JOIN products ON products.id = sub.product_id
          JOIN unit_types ON unit_types.id = products.unit_type_id
          JOIN categories ON categories.id = products.category_id
          WHERE sub.subscription_status = "branch_pending" AND sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
    
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
    }

    loading = false;
    res.render("branch_admin/subscription/exist_user", {
      data: data,
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
}