import knex from "../../../services/db.service";

import { getPageNumber } from "../../../utils/helper.util";

import moment from "moment";

export const getPendingBill = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT branch_bills.id FROM branch_bills
            JOIN admin_users ON admin_users.id = branch_bills.branch_id
          WHERE branch_bills.payment_status = "pending" AND branch_bills.branch_id = ${admin_id}  AND  admin_users.first_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Branch Found");
        return res.redirect("/branch_admin/bill/get_pending_bill");
      }
    } else {
      data_length = await knex("branch_bills")
        .select("id")
        .where({ payment_status: "pending", branch_id: admin_id });
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/bills/pending_bills", {
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
    } = await getPageNumber(req, res, data_length, "bill/get_pending_bill");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT branch_bills.id, branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "pending" AND branch_bills.branch_id = ${admin_id} AND
          admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT branch_bills.id, branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name 
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "pending" AND branch_bills.branch_id = ${admin_id}
          LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].generated_date = moment(data[i].generated_date).format(
        "DD-MM-YYYY"
      );
    }

    console.log(data);

    loading = false;
    res.render("branch_admin/bills/pending_bills", {
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

export const getPayedBill = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;
    const { admin_id } = req.body;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT branch_bills.id FROM branch_bills
            JOIN admin_users ON admin_users.id = branch_bills.branch_id
          WHERE branch_bills.payment_status = "payed" AND branch_bills.branch_id = ${admin_id} AND admin_users.first_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Branch Found");
        return res.redirect("/branch_admin/bill/get_payed_bill");
      }
    } else {
      data_length = await knex("branch_bills")
        .select("id")
        .where({ payment_status: "payed", branch_id: admin_id });
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/bills/payed_bills", {
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
    } = await getPageNumber(req, res, data_length, "bill/get_payed_bill");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT branch_bills.generated_date, branch_bills.payed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "payed" AND branch_bills.branch_id = ${admin_id} AND
          admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name 
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "payed" AND branch_bills.branch_id = ${admin_id} 
          LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].generated_date = moment(data[i].generated_date).format(
        "DD-MM-YYYY"
      );
      data[i].payed_date = moment(data[i].payed_date).format("DD-MM-YYYY");
    }

    console.log(data);

    loading = false;
    res.render("branch_admin/bills/payed_bills", {
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

export const getCompletedBill = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;
    const { admin_id } = req.body;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT branch_bills.id FROM branch_bills
            JOIN admin_users ON admin_users.id = branch_bills.branch_id
          WHERE branch_bills.payment_status = "completed" AND branch_bills.branch_id = ${admin_id} AND  admin_users.first_name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Branch Found");
        return res.redirect("/branch_admin/bill/get_completed_bill");
      }
    } else {
      data_length = await knex("branch_bills")
        .select("id")
        .where({ payment_status: "completed", branch_id: admin_id });
    }

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/bills/completed_bills", {
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
    } = await getPageNumber(req, res, data_length, "bill/get_completed_bill");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT branch_bills.generated_date, branch_bills.payed_date,branch_bills.completed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "completed" AND branch_bills.branch_id = ${admin_id} AND
          admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT branch_bills.generated_date,branch_bills.completed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,
          admin_users.first_name as branch_name 
          FROM branch_bills
          JOIN admin_users ON admin_users.id = branch_bills.branch_id 
          WHERE branch_bills.payment_status = "completed" AND branch_bills.branch_id = ${admin_id} 
          LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].generated_date = moment(data[i].generated_date).format(
        "DD-MM-YYYY"
      );
      data[i].payed_date = moment(data[i].payed_date).format("DD-MM-YYYY");
      data[i].completed_date = moment(data[i].completed_date).format(
        "DD-MM-YYYY"
      );
    }

    console.log(data);

    loading = false;
    res.render("branch_admin/bills/completed_bills", {
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

export const payBill = async (req, res) => {
  try {
    const { admin_id, bill_id } = req.body;

    await knex("branch_bills")
      .update({ payment_status: "payed"  , payed_date : moment().format("YYYY-MM-DD")})
      .where({ id: bill_id, branch_id: admin_id });
    req.flash("success", "Payed SuccessFully");
    res.redirect("/branch_admin/bill/get_pending_bill")
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
