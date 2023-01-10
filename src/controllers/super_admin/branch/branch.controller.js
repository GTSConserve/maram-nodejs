import knex from "../../../services/db.service";
import { createToken, parseJwtPayload } from "../../../services/jwt.service";
import { getPageNumber } from "../../../utils/helper.util";
import bcrypt from "bcrypt";

export const updateBranch = async (req, res) => {
  try {
    const { location, id, mobile_number, city_id ,incharge_name} = req.body;

    if (!location) {
      req.flash("error", "location is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    let query = {};
    if (city_id) {
      query.city_id = city_id
    }


    query.incharge_name = incharge_name;
    query.location = location;
    query.mobile_number = mobile_number;

    await knex("admin_users").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateBranchStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("admin_users").update({ status: "0" }).where({ id: id });
    } else {
      await knex("admin_users").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createBranchAdmin = async (req, res) => {
  try {
    const { name, email, password, location, mobile_number, zone_id ,incharge_name} = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!email) {
      req.flash("error", "email is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (!password) {
      req.flash("error", "password is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    // if (!location) {
    //   req.flash("error", "location is missing");
    //   return res.redirect("/super_admin/branch/get_branch_admin");
    // }
    if (!mobile_number) {
      req.flash("error", "mobile number is missing");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    if (password.length < 8) {
      req.flash("error", "password Should be atleast 8 characters");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    let hash_password = await bcrypt.hash(password, 10);

    await knex("admin_users").insert({
      user_group_id: "2",
      first_name: name,
      password: hash_password,
      // location,
      mobile_number,
      email,
      zone_id,
      incharge_name
    });

    req.flash("success", "Successfully Created");
    res.redirect("/super_admin/branch/get_branch_admin");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getBranchAdmin = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id FROM admin_users WHERE user_group_id = "2" AND  first_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User Found");
        return res.redirect("/super_admin/branch/get_branch_admin");
      }
    } else {
      data_length = await knex("admin_users")
        .select("id")
        .where({ user_group_id: "2" });
    }

    const zones = await knex("zones").select("id", "name").where({ status: "1" })


    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/branch/branch", {
        data: data_length,
        searchKeyword,
        zones
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "branch/branch");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT admin_users.id,admin_users.first_name,admin_users.location,admin_users.mobile_number,admin_users.email,admin_users.status,admin_users.password,admin_users.is_password_change,zones.name as zone_name,zones.id as zone_id,admin_users.incharge_name FROM admin_users 
        JOIN zones ON zones.id = admin_users.zone_id 
        WHERE admin_users.user_group_id = "2" AND admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT admin_users.id,admin_users.first_name,admin_users.location,admin_users.mobile_number,admin_users.email,admin_users.status,admin_users.password,admin_users.is_password_change,zones.name as zone_name,zones.id as zone_id,admin_users.incharge_name FROM admin_users 
        JOIN zones ON zones.id = admin_users.zone_id
         WHERE admin_users.user_group_id = "2" LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].password = process.env.BASE_URL + data[i].password;
    // }

    loading = false;
    res.render("super_admin/branch/branch", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      zones
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateChangePassword = async (req, res) => {
  try {
    let token = req.session.token;

    if (!token) {
      req.flash("error", "Need To Login First");
      return res.redirect("/auth/login");
    }

    const currentTokenPayload = parseJwtPayload(token.token);

    const admin_id = currentTokenPayload.user_id;

    const user = await knex("admin_users")
      .select("user_group_id", "password", "is_password_change")
      .where({ id: admin_id });

    const { new_password, confirm_new_password } = req.body;

    // const isPassword = await bcrypt.compare(confirm_new_password, user[0].password);

    // if (!isPassword) {
    //   req.flash("error", "invalid password");
    //   return res.redirect("/super_admin/branch/get_branch_admin");
    // }

    if (new_password.length < 8) {
      req.flash("error", "New password should be atleast 8 characters");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }
    if (confirm_new_password.length < 8) {
      req.flash("error", "Confirm password should be atleast 8 characters");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    if (new_password !== confirm_new_password) {
      req.flash("error", "Password Should Be Same");
      return res.redirect("/super_admin/branch/get_branch_admin");
    }

    let query = {};
    if (user[0].user_group_id == 2) {
      if (user[0].is_password_change == 0) {
        query.is_password_change = "1";
      }
    }

    let password = await bcrypt.hash(confirm_new_password, 10);
    console.log(password)

    query.password = password;

    await knex("admin_users").update(query).where({ user_group_id: '2' });

    req.flash("success", "successfully password changed");
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// export const getChangePassword = async (req, res) => {
//   try {
//     res.render("super_admin/branch/change_password");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

// export const updateChangePassword = async (req, res) => {
//   // console.log(req)
//   try {
//     const { new_password, confirm_new_password } = req.body;
//     console.log(new_password, confirm_new_password)

//     if (new_password !== confirm_new_password) {
//       req.flash("error", "Password Should Be Same");
//       return res.redirect("/super_admin/branch/get_branch_admin");
//     }

//     let hash_password = await bcrypt.hash(new_password, 10);
//     console.log(hash_password)

//     let query = {};
//     if (user[0].user_group_id == 2) {
//       if (user[0].is_password_change == 0) {
//         query.is_password_change = "1";
//       }
//     }

//     await knex("admin_users").update({
//       query
//     }).where({id: admin_id})

//     req.flash("success", "Successfully Created");
//     res.redirect("/home");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };