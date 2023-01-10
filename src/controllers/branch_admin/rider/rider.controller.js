import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";
import bcrypt from "bcrypt";

export const updateRider = async (req, res) => {
  try {
    const { name , mobile_number, address,id } = req.body;

    if (!name) {
      req.flash("error", "location is missing");
      return res.redirect("/branch_admin/rider/get_rider");
    }
    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/branch_admin/rider/get_rider"); 
    }

    let query = {};
   

    query.name = name;
    query.mobile_number = mobile_number;
    query.address = address;

    await knex("rider_details").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/rider/get_rider");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateRiderStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("rider_details").update({ status: "0" }).where({ id: id });
    } else {
      await knex("rider_details").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/rider/get_rider");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createRider = async (req, res) => {
  try {
    const { name, password, mobile_number, address,admin_id } = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/branch_admin/rider/get_rider");
    }

    if (!password) {
      req.flash("error", "password is missing");
      return res.redirect("/branch_admin/rider/get_rider");
    }

    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/branch_admin/rider/get_rider");
    }

    if (password.length < 8) {
      req.flash("error", "password Should be atleast 8 characters");
      return res.redirect("/branch_admin/rider/get_rider");
    }

    let hash_password = await bcrypt.hash(password, 10);

    const user_length = await knex("rider_details").select("id")

    await knex("rider_details").insert({
      name,
      password: hash_password,
      mobile_number,
      address,
      user_name : `rider${user_length.length + 1}`,
      branch_id : admin_id
    });

    req.flash("success", "Successfully Created");
    res.redirect("/branch_admin/rider/get_rider");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getRiders = async (req, res) => {
  try {

    const {admin_id} = req.body
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id FROM rider_details WHERE branch_id = ${admin_id} AND user_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Rider Found");
        return res.redirect("/branch_admin/rider/get_rider");
      }
    } else {
      data_length = await knex("rider_details").select("id").where({branch_id : admin_id})
    }

    // const cities = await knex("cities")
    //   .select("id", "name")
    //   .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/rider/get_rider", {
        data: data_length,
        searchKeyword,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "/rider/get_rider");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,name,user_name,mobile_number,address,status FROM rider_details WHERE branch_id = ${admin_id} AND user_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT id,name,user_name,mobile_number,address,status FROM rider_details WHERE branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].password = process.env.BASE_URL + data[i].password;
    // }

    loading = false;
    res.render("branch_admin/rider/get_rider", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};



export const changePasswordRider  = async (req,res) => {
  try {
      const {new_password,confirm_new_password,rider_id} = req.body

      if(new_password != confirm_new_password){
        req.flash("error","Password Should Be Same")
        return res.redirect("/branch_admin/rider/get_rider")
      }

      let hash_password = await bcrypt.hash(new_password, 10);

      await knex("rider_details").update({password : hash_password}).where({id : rider_id})

      req.flash("success","Password Updated")
      res.redirect("/branch_admin/rider/get_rider")

  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}

