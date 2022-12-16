import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const cancelPendingList = async (req, res) => {
  try {
    const { id } = req.body;

    await knex("subscribed_user_details")
      .update({ subscription_status: "cancelled" })
      .where({ id });

    req.flash("success", "SuccessFully Cancelled the Subscription");
    return res.redirect("/super_admin/users_subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getNewUsers = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];
    // let data_length_2 = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.subscription_status = "pending" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Product Type Found");
        return res.redirect("/super_admin/users_subscription/get_new_users");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "pending" });

        // data_length_2 = await knex("add_on_orders").select("id").where({branch_id : null})
    }

    const branches = await knex("admin_users")
      .select("first_name", "id", "location")
      .where({ user_group_id: "2" });

    if (data_length.length === 0 ) {
      loading = false;
      return res.render("super_admin/users_subscription/pending", {
        data: data_length,
        searchKeyword,
        branches,
      });
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
      data_length,
      "users_subscription/get_new_users"
    );

    let results;
    let is_search = false;
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
        WHERE sub.subscription_status = "pending" 
        AND users.user_unique_id LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
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
        WHERE sub.subscription_status = "pending"  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];
// console.log("daklsdjklajdk")
//     const add_on_order_query =
//       await knex.raw(`SELECT add.id,add.delivery_date,add.sub_total 
//         FROM add_on_orders as add
//         JOIN users ON users.id = add.user_id 
//         JOIN user_address ON user_address.id = add.address_id
//         WHERE add.status = "pending" AND add.branch_id = null
//     `);


    for (let i = 0; i < data.length; i++) {
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
      data[i].image = process.env.BASE_URL + data[i].image;
    }

    loading = false;
    res.render("super_admin/users_subscription/pending", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      branches,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT admin_users.first_name FROM admin_users WHERE admin_users.first_name LIKE '%${searchKeyword}%'`
      );
      // `SELECT  .id,admin_users.first_name as admin_users.first_name,subscription_type.name,products.name,user_address.address,users.mobile_number,product_type.name
      //   FROM subscription_type
      //   JOIN product_type ON products.product_type_id = product_type.id
      //   JOIN admin_users ON admin_users.id = subscription_type.id
      //   JOIN user_address ON user_address.user_id = users.user_group_id
      //    WHERE admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Product Type Found");
        return res.redirect("/super_admin/users_subscription/get_all_users");
      }
    } else {
      data_length = await knex("subscription_type").select("id");
    }

    // const branches = await knex("admin_users")
    //   .select("first_name", "id", "location")
    //   .where({ user_group_id: "2" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/users_subscription/approve", {
        data: data_length,
        searchKeyword,
        // branches,
      });
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
      data_length,
      "users_subscription/get_all_users"
    );

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
        unit_types.value,categories.name as category_name,admin_users.first_name as first_name
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        JOIN admin_users ON admin_users.user_group_id = subscription_type.id
        WHERE sub.subscription_status = "subscribed" 
        AND admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
      console.log(results);
    } else if (!searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
        unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id 
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN products ON products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.category_id
        JOIN admin_users ON admin_users.user_group_id = users.id
        JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
        WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
      );
    } else {
      data1 = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
        user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
        unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
        FROM subscribed_user_details AS sub 
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
        JOIN users ON users.id = sub.user_id
        JOIN user_address ON user_address.user_id = sub.user_address_id
        JOIN products ON products.product_type_id = sub.user_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN categories ON categories.id = products.product_type_id
        JOIN admin_users ON admin_users.user_group_id = users.id
        JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
        JOIN add_on_order_items ON add_on_order_items.add_on_order_id = products.product_type_id
        WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    console.log(data1);

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
    }

    const data1 = results[0];

    for (let i = 0; i < data1.length; i++) {
      data1[i].start_date = data1[i].start_date.toString().slice(4, 16);
    }

    loading = false;
    res.render("super_admin/users_subscription/approve", {
      data: data,
      data1: data1,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      // branches,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updatePendingList = async (req, res) => {
  try {
    const { sub_id, branch_id, address_id } = req.body;
    console.log(address_id)
    await knex("subscribed_user_details")
      .update({
        branch_id,
        subscription_status: "assigned",
        assigned_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .where({ id: sub_id });

    await knex("user_address").update({ branch_id }).where({ id: address_id });

    req.flash("success", "Subscription Moved To Branch");
    res.redirect("/super_admin/users_subscription/get_new_users");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateAllUsersStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("admin_users").update({ status: "1" }).where({ id: id });
    } else {
      await knex("admin_users").update({ status: "0" }).where({ id: id });
    }
    console.log("hell");
    req.flash("success", "Updated SuccessFully");
    return res.redirect(
      "/super_admin/users_subscription/update_all_users_status"
    );
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
