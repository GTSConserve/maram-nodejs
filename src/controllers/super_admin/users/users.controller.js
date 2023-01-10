import moment from "moment";
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";


export const createUserBill = async (req, res) => {
    const { add_on, sub, user_id, sub_total, discount } = req.body;
  
    const sub_product = JSON.parse(sub);
    const add_on_product = JSON.parse(add_on);
  
    const bill_no = "MA" + Date.now();
  
    const bill = await knex("bill_history").insert({
      bill_no,
      user_id,
      sub_total,
      discount : discount ? discount : null,
      grand_total: Number(sub_total) - (discount ?  Number(discount) : Number(0)),
      date: moment().format("YYYY-MM-DD"),
    });
  
    if (sub_product.length !== 0) {
      sub_product.map(async (data) => {
        await knex("bill_history_details").insert({
          bill_history_id: bill[0],
          subscription_id: data.id,
          subscription_price: data.subscription_monthly_price,
          additional_price: data.additional_monthly_price,
          total_price: data.total_monthly_price,
          subscription_qty: data.subscription_delivered_quantity,
          additional_qty: data.additional_delivered_quantity,
          total_qty: data.total_delivered_quantity,
        });
  
        await knex("subscribed_user_details")
          .update({
            subscription_monthly_price: null,
            additional_monthly_price: null,
            total_monthly_price: null,
            subscription_delivered_quantity: null,
            additional_delivered_quantity: null,
            total_delivered_quantity: null,
          })
          .where({ id: data.id });
      });
    }
    if (add_on_product.length !== 0) {
      add_on_product.map(async (data) => {
        await knex("bill_history_details").insert({
          bill_history_id: bill[0],
          add_on_order_id: data.id,
          total_price: data.sub_total,
        });
  
        await knex("add_on_orders")
          .update({ is_bill_generated: "1" })
          .where({ id: data.id });
      });
    }
  
    // await  swal("Done", "New Add On Order Placed", "success");
    req.flash("success", "Bill Generated SuccessFully");
    res.redirect(`/super_admin/user/get_bill?user_id=${user_id}`);
  };
  
  // get bill
  export const getBill = async (req, res) => {
    try {
      const { admin_id } = req.body;
      const { user_id } = req.query;
  
      const { searchKeyword } = req.query;
      let loading = false;
      let data_length = [];
  
      // get generate bill details
      const get_subscription_price = await knex("subscribed_user_details")
        .select(
          "total_monthly_price",
          "subscription_monthly_price",
          "additional_monthly_price",
          "id",
          "subscription_delivered_quantity",
          "additional_delivered_quantity",
          "total_delivered_quantity"
        )
        .where({ user_id })
        .whereNot({ total_monthly_price: null });
  
      const get_add_on_price = await knex("add_on_orders")
        .select("sub_total", "id")
        .where({ user_id, status: "delivered", is_bill_generated: "0" });
  
      let sub_total = 0;
  
      if (get_subscription_price.length !== 0) {
        get_subscription_price.map((data) => {
          sub_total += Number(data.total_monthly_price);
        });
      }
      if (get_add_on_price.length !== 0) {
        get_add_on_price.map((data) => {
          sub_total += Number(data.sub_total);
        });
      }
  
  
      if (searchKeyword) {
        const search_data_length = await knex.raw(
          `SELECT id,bill_no FROM bill_history WHERE user_id = ${user_id} AND bill_no LIKE '%${searchKeyword}%'`
        );
        data_length = search_data_length[0];
  
        if (data_length.length === 0) {
          loading = false;
          req.query.searchKeyword = "";
          req.flash("error", "No Bill  Found");
          return res.redirect("/super_admin/user/get_bill");
        }
      } else {
        data_length = await knex("bill_history").select("id").where({ user_id });
      }
  
      if (data_length.length === 0) {
        loading = false;
        return res.render("super_admin/users/get_bill", {
          data: data_length,
          searchKeyword,
          sub_total,
          get_subscription_price,
          get_add_on_price,
          user_id,
        });
      }
  
      let {
        startingLimit,
        page,
        resultsPerPage,
        numberOfPages,
        iterator,
        endingLink,
      } = await getPageNumber(req, res, data_length, "user/get_bill");
  
      let results;
  
      let is_search = false;
      if (searchKeyword) {
        results =
          await knex.raw(`SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ${user_id} AND bill_no LIKE '%${searchKeyword}%' 
        LIMIT ${startingLimit},${resultsPerPage}`);
        is_search = true;
      } else {
        results =
          await knex.raw(`SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ${user_id}
        LIMIT ${startingLimit},${resultsPerPage}`);
      }
  
      const data = results[0];
      loading = false;
  
      data.map((d) => {
        d.date = moment(d.date).format("DD-MM-YYYY");
      });
  
      res.render("super_admin/users/get_bill", {
        data,
        page,
        iterator,
        endingLink,
        numberOfPages,
        is_search,
        searchKeyword,
        loading,
        sub_total,
        get_subscription_price,
        get_add_on_price,
        user_id,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
  