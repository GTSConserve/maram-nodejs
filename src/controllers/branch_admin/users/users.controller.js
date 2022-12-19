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
      JOIN routes ON routes.id = user_address.router_id
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
      JOIN routes ON routes.id = user_address.router_id
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
      JOIN routes ON routes.id = user_address.router_id
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
        "sub.user_id",
        "sub.start_date",
        "sub.customized_days",
        "sub.quantity",
        "sub.subscription_status",
        "products.name as product_name",
        "products.unit_value",
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

    // console.log(get_subscription_products);

    if (get_subscription_products.length !== 0) {
      for (let i = 0; i < get_subscription_products.length; i++) {
        get_subscription_products[i].start_date = moment(
          get_subscription_products[i].start_date
        ).format("YYYY-MM-DD");
      }
    }

    // const add_on_details = await knex("add_on_orders as adds")
    //   .select(
    //     "adds.delivery_date",
    //     "adds.sub_total",
    //     "adds.status as order_status",
    //     "adds.id as add_on_id",
    //     "products.name",
    //     "products.unit_value",
    //     "products.price",
    //     "unit_types.value",
    //     "add_on_order_items.quantity",
    //     "add_on_order_items.price",
    //     "add_on_order_items.total_price",
    //     "add_on_order_items.status as product_status"
    //   )
    //   .join(
    //     "add_on_order_items",
    //     "add_on_order_items.add_on_order_id",
    //     "=",
    //     "adds.id"
    //   )
    //   .join("products", "products.id", "=", "add_on_order_items.product_id")
    //   .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
    //   .where({
    //     "adds.user_id": user.user_id,
    //     "adds.address_id": user_address_id,
    //   });

    // console.log(add_on_details);

    const add_on_order_query =
      await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status
      FROM add_on_orders as adds 
      WHERE adds.user_id = ${user.user_id} AND adds.address_id = ${user_address_id}`);

    // console.log(add_on_order_query[0]);
    let add_on = add_on_order_query[0]
  
    let get_user_products_query;
    if (add_on.length !== 0) {
      for (let i = 0; i < add_on.length; i++) {
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
        add_on[i].delivery_date = moment(
          add_on[i].delivery_date
        ).format("YYYY-MM-DD");
      }

    }
  


    res.render("branch_admin/users/user_detail",{user,sub_products :  get_subscription_products ,add_on})

  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};
