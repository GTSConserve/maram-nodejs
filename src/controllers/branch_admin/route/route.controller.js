import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";


export const getViewMapping = async (req,res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword,route_id } = req.query;

    let data_length = [];
    // user_mapping

    const users = await knex("routes").select("user_mapping").where({id  :route_id})
    console.log(users)


    if (data_length.length === 0) {
          loading = false;
         
          req.flash("error", "No User Found");
          return res.redirect("/branch_admin/route/user_mapping");
        }

    // const users2 = await knex("routes").select("id").whereIn("user_mapping")

    // if (searchKeyword) {
    //   const search_data_length = await knex.raw(
    //     `SELECT sub.id FROM subscribed_user_details as sub
    //     JOIN users ON users.id = sub.user_id
    //     WHERE sub.router_id = ${route_id} AND sub.subscription_status = "subscribed" AND users.user_unique_id LIKE '%${searchKeyword}%'`
    //   );

    //   data_length = search_data_length[0];

    //   if (data_length.length === 0) {
    //     loading = false;
    //     req.query.searchKeyword = "";
    //     req.flash("error", "No User Found");
    //     return res.redirect("/branch_admin/route/user_mapping");
    //   }
    // } else {
    //   data_length = await knex("subscribed_user_details")
    //     .select("id")
    //     .where({ subscription_status: "subscribed" ,router_id : route_id  });
    // }



    // if (data_length.length === 0) {
    //   loading = false;
    //   return res.render("branch_admin/route/user_mapping", {
    //     data: data_length,
    //     searchKeyword,
    //     router_id : route_id
    //   });
    // }

    // let {
    //   startingLimit,
    //   page,
    //   resultsPerPage,
    //   numberOfPages,
    //   iterator,
    //   endingLink,
    // } = await getPageNumber(req, res, data_length, "route/user_mapping");

    let results;

      results = await knex.raw(
        `SELECT users.name as user_name, sub.id,user_address.address,user_address.landmark, users.user_unique_id FROM subscribed_user_details as sub 
        JOIN users ON users.id = sub.user_id
        JOIN user_address ON user_address.id = sub.user_address_id
        WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed"  `
      );
    

    const data = results[0];

        console.log(data)

loading = false
    // for (let i = 0; i < data.length; i++) {
     
    //   if (data[i].subscription_start_date) {
    //     data[i].subscription_start_date = data[i].subscription_start_date
    //       .toString()
    //       .slice(4, 16);
    //   }
    // }

    loading = false;
    res.render("branch_admin/route/view_mapping", {
      data,
      // page,
      // iterator,
      // endingLink,
      // numberOfPages,
      // is_search,
      // searchKeyword,
      loading,
      router_id : route_id
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
}




export const getUserMapping = async(req,res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword,route_id } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT sub.id FROM subscribed_user_details as sub
        JOIN users ON users.id = sub.user_id
        WHERE sub.router_id = ${route_id} AND sub.subscription_status = "subscribed" AND users.user_unique_id LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/branch_admin/route/user_mapping");
      }
    } else {
      data_length = await knex("subscribed_user_details")
        .select("id")
        .where({ subscription_status: "subscribed" ,router_id : route_id  });
    }



    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/route/user_mapping", {
        data: data_length,
        searchKeyword,
        router_id : route_id
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "route/user_mapping");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub 
        JOIN users ON users.id = sub.user_id
        JOIN products on products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
        WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed" AND
        users.user_unique_id  LIKE '%${searchKeyword}%' 
        LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub 
        JOIN users ON users.id = sub.user_id
        JOIN products on products.id = sub.product_id
        JOIN unit_types ON unit_types.id = products.unit_type_id
        JOIN user_address ON user_address.id = sub.user_address_id
        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
        WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed"  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];


    for (let i = 0; i < data.length; i++) {
     
      if (data[i].subscription_start_date) {
        data[i].subscription_start_date = data[i].subscription_start_date
          .toString()
          .slice(4, 16);
      }
    }

    loading = false;
    res.render("branch_admin/route/user_mapping", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      router_id : route_id
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
}


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
    const { name, admin_id, city_id, rider_id } =
      req.body;
  
    if (!name) {
      req.flash("error", "Route Name is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    // if (!city_id) {
    //   req.flash("error", "City  is missing");
    //   return res.redirect("/branch_admin/route/get_route");
    // }

    let query = {}
    if (rider_id) {
      query.rider_id = rider_id
    }

    query.name = name
  
    // query.city_id = city_id
    query.branch_id = admin_id

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
        if(data.rider_id){

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
