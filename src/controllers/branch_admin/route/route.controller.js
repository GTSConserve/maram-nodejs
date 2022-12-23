import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import moment from "moment";

export const updateViewMapping = async (req, res) => {
  try {
    const { values } = req.body;
    const { router_id } = req.query;

    await knex("routes")
      .update({ user_mapping: JSON.stringify(values) })
      .where({ id: router_id });

    req.flash("success", "Updated Successfully");
    return res.redirect(
      "/branch_admin/route/user_mapping?route_id" + router_id
    );
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const tommorowRouteMapping = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword, route_id } = req.query;

    const users = await knex("routes")
      .select("user_mapping")
      .where({ id: route_id });

    if (users.length === 0 || users[0].user_mapping === null) {
      loading = false;
      req.flash("error", "No User Found");
      return res.render("branch_admin/route/tommorrow_mapping", {
        data: [],

        loading,
        router_id: route_id,
      });
    }

    let get_user_details = [];

    for (let i = 0; i < users[0].user_mapping.length; i++) {
      let user = await knex("user_address")
        .select(
          "user_address.id",
          "users.name as user_name",
          "user_address.address",
          "user_address.landmark",
          "users.user_unique_id"
        )
        .join("users", "users.id", "=", "user_address.user_id")
        .where({ "user_address.id": users[0].user_mapping[i] });

      get_user_details.push(user[0]);
    }

    const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");
    console.log(tommorow_date.format("YYYY-MM-DD"));

    const daily_orders = await knex("daily_orders")
      .select("user_address_id")
      .where({ router_id: route_id, date: tommorow_date.format("YYYY-MM-DD") });

    if(daily_orders.length ==0 ){
      req.flash("error", "No User Found");
      return res.render("branch_admin/route/tommorrow_mapping", {
        data: [],

        loading,
        router_id: route_id,
      });
    }

    const address = [];
    for (let i = 0; i < daily_orders.length; i++) {
      address.push(daily_orders[i].user_address_id);
    }

    console.log(address);

    for (let i = 0; i < get_user_details.length; i++) {
      console.log(get_user_details[i].id);
      if (!address.includes(get_user_details[i].id)) {
        get_user_details.splice([i], 1);
      }
    }

    loading = false;
    console.log(get_user_details);
    res.render("branch_admin/route/tommorrow_mapping", {
      data: get_user_details,

      loading,
      router_id: route_id,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getViewMapping = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword, route_id } = req.query;

    const users = await knex("routes")
      .select("user_mapping")
      .where({ id: route_id });

    if (users.length === 0 || users[0].user_mapping === null) {
      loading = false;
      req.flash("error", "No User Found");
      return res.render("branch_admin/route/view_mapping", {
        data: [],

        loading,
        router_id: route_id,
      });
    }

    let get_user_details = [];

    for (let i = 0; i < users[0].user_mapping.length; i++) {
      let user = await knex("user_address")
        .select(
          "user_address.id",
          "users.name as user_name",
          "user_address.address",
          "user_address.landmark",
          "users.user_unique_id"
        )
        .join("users", "users.id", "=", "user_address.user_id")
        .where({ "user_address.id": users[0].user_mapping[i] });

      get_user_details.push(user[0]);
    }

    loading = false;
    console.log(get_user_details);
    res.render("branch_admin/route/view_mapping", {
      data: get_user_details,

      loading,
      router_id: route_id,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateRoute = async (req, res) => {
  try {
    const { name, city_id, rider_id, id } = req.body;

    if (!name) {
      req.flash("error", "Route Name is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    let query = {};

    query.name = name;

    // if (city_id) {
    //   query.city_id = city_id;
    // }
    if (rider_id) {
      query.rider_id = rider_id;
    }

    await knex("routes").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateRouteStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("routes").update({ status: "0" }).where({ id: id });
    } else {
      await knex("routes").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createRoute = async (req, res) => {
  try {
    const { name, admin_id, city_id, rider_id } = req.body;

    if (!name) {
      req.flash("error", "Route Name is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    // if (!city_id) {
    //   req.flash("error", "City  is missing");
    //   return res.redirect("/branch_admin/route/get_route");
    // }

    let query = {};
    if (rider_id) {
      query.rider_id = rider_id;
    }

    query.name = name;

    // query.city_id = city_id
    query.branch_id = admin_id;

    await knex("routes").insert(query);

    req.flash("success", "Successfully Created");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getRoute = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,rider_id FROM routes WHERE branch_id = ${admin_id} AND name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Route Found");
        return res.redirect("/branch_admin/route/get_route");
      }
    } else {
      data_length = await knex("routes")
        .select("id", "rider_id")
        .where({ branch_id: admin_id });
    }

    const cities = await knex("cities")
      .select("id", "name")
      .where({ status: "1" });

    let is_rider = [];

    if (data_length.length !== 0) {
      data_length.map((data) => {
        if (data.rider_id) {
          is_rider.push(data.rider_id);
        }
      });
    }

    const riders = await knex("rider_details")
      .select("id", "name")
      .where({ status: "1", branch_id: admin_id })
      .whereNotIn("id", is_rider);

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/route/get_route", {
        data: data_length,
        searchKeyword,
        cities,
        riders,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "route/get_route");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT routes.id,routes.name as route_name,routes.status,routes.rider_id,
        rider_details.id as rider_id,
        rider_details.name as rider_name FROM routes 
        LEFT JOIN rider_details ON rider_details.id = routes.rider_id
        
        WHERE routes.branch_id = ${admin_id} 
        AND routes.starting_point LIKE '%${searchKeyword}%' OR routes.ending_point LIKE '%${searchKeyword}%' 
        LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT routes.id,routes.name as route_name,routes.status,routes.rider_id,
        rider_details.id as rider_id,
        rider_details.name as rider_name FROM routes 
        LEFT JOIN rider_details ON rider_details.id = routes.rider_id
        
        WHERE routes.branch_id = ${admin_id}  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    loading = false;
    res.render("branch_admin/route/get_route", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      cities,
      riders,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getUserMapping = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword, route_id = 1 } = req.query;

    let check_users_id = [];

    check_users_id = await knex.raw(
      `SELECT user_address.user_id,users.name,users.user_unique_id,user_address.address 
      FROM user_address 
      JOIN users ON users.id = user_address.user_id
      WHERE router_id IS NULL AND branch_id = ${admin_id}`
    );

    console.log("asdasdad", check_users_id[0]);

    if (check_users_id[0].length === 0) {
      req.flash("error", "No Users found");
      return res.redirect("/branch_admin/route/get_route");
    }

    const routes = await knex("routes")
    .select("name", "id")
    .where({  id: route_id});

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, check_users_id[0], "route/user_mapping");

    const data = await knex.raw(
      `SELECT user_address.user_id,users.name,users.user_unique_id,user_address.address ,user_address.id as address_id
      FROM user_address 
      JOIN users ON users.id = user_address.user_id
      WHERE router_id IS NULL AND branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
    );

    let is_search = false;

    loading = false;
    res.render("branch_admin/route/user_mapping", {
      data: data[0],
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes  :routes[0],
      router_id: route_id,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
// export const getUserMapping = async (req, res) => {
//   try {
//     const { admin_id } = req.body;
//     let loading = true;
//     const { searchKeyword, route_id = 1 } = req.query;

//     let data_length = [];

//     const check_users_id = await knex("routes")
//       .select("user_mapping")
//       .where({ id: route_id });

//     if (
//       check_users_id.length === 0 ||
//       check_users_id[0].user_mapping === null
//     ) {
//       loading = false;
//       return res.render("branch_admin/route/user_mapping", {
//         data: data_length,
//         searchKeyword,
//         router_id: route_id,
//       });
//     }

//     let address_ids = check_users_id[0].user_mapping;

//     if (searchKeyword) {
//       const search_data_length = await knex.raw(
//         `SELECT id FROM user_address
//         WHERE id IN ${address_ids}
//         AND user_unique_id LIKE '%${searchKeyword}%'`
//       );
//       // const search_data_length = await knex.raw(
//       //   `SELECT sub.id FROM subscribed_user_details as sub
//       //   JOIN users ON users.id = sub.user_id
//       //   WHERE sub.router_id = ${route_id} AND sub.subscription_status = "subscribed"
//       //   AND users.user_unique_id LIKE '%${searchKeyword}%'`
//       // );

//       data_length = search_data_length[0];

//       if (data_length.length === 0) {
//         loading = false;
//         req.query.searchKeyword = "";
//         req.flash("error", "No User Found");
//         return res.redirect("/branch_admin/route/user_mapping");
//       }
//     } else {
//       data_length = await knex("user_address")
//         .select("id")
//         // .join("users", "users.id", "=", "sub.user_id")
//         .whereIn("id", address_ids);
//     }

//     if (data_length.length === 0) {
//       loading = false;
//       return res.render("branch_admin/route/user_mapping", {
//         data: data_length,
//         searchKeyword,
//         router_id: route_id,
//       });
//     }

//     let {
//       startingLimit,
//       page,
//       resultsPerPage,
//       numberOfPages,
//       iterator,
//       endingLink,
//     } = await getPageNumber(req, res, data_length, "route/user_mapping");

//     let results;
//     let users = [];
//     let is_search = false;
//     if (searchKeyword) {
//       results = await knex.raw(
//         `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//         JOIN users ON users.id = sub.user_id
//         JOIN products on products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed" AND
//         users.user_unique_id  LIKE '%${searchKeyword}%'
//         LIMIT ${startingLimit},${resultsPerPage}`
//       );
//       is_search = true;
//     } else {
//       for (let i = 0; i < address_ids.length; i++) {
//         let user = await knex("user_address")
//           .select(
//             "users.id",
//             "users.mobile_number",
//             "users.name as user_name",
//             "user_address.address",
//             "user_address.landmark",
//             "users.user_unique_id"
//           )
//           .join("users", "users.id", "=", "user_address.user_id")
//           .where({ "user_address.id": address_ids[i] });

//         users.push(user[0]);
//         // get_user_details.push(user[0]);
//       }

//       // results = await knex.raw(
//       //   `SELECT users.id as user_id  LIMIT ${startingLimit},${resultsPerPage}`
//       // );
//     }
//     // if (searchKeyword) {
//     //   results = await knex.raw(
//     //     `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//     //     JOIN users ON users.id = sub.user_id
//     //     JOIN products on products.id = sub.product_id
//     //     JOIN unit_types ON unit_types.id = products.unit_type_id
//     //     JOIN user_address ON user_address.id = sub.user_address_id
//     //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//     //     WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed" AND
//     //     users.user_unique_id  LIKE '%${searchKeyword}%'
//     //     LIMIT ${startingLimit},${resultsPerPage}`
//     //   );
//     //   is_search = true;
//     // } else {
//     //   results = await knex.raw(
//     //     `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//     //     JOIN users ON users.id = sub.user_id
//     //     JOIN products on products.id = sub.product_id
//     //     JOIN unit_types ON unit_types.id = products.unit_type_id
//     //     JOIN user_address ON user_address.id = sub.user_address_id
//     //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//     //     WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed"  LIMIT ${startingLimit},${resultsPerPage}`
//     //   );
//     // }

//     const data = users;

//     // for (let i = 0; i < data.length; i++) {
//     //   if (data[i].subscription_start_date) {
//     //     data[i].subscription_start_date = data[i].subscription_start_date
//     //       .toString()
//     //       .slice(4, 16);
//     //   }
//     // }

//     loading = false;
//     res.render("branch_admin/route/user_mapping", {
//       data,
//       page,
//       iterator,
//       endingLink,
//       numberOfPages,
//       is_search,
//       searchKeyword,
//       loading,
//       router_id: route_id,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };
