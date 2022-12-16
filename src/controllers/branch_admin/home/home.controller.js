import knex from "../../../services/db.service";
import moment from "moment";
import { customizedDay } from "../../../utils/helper.util";

export const getHomePage = async (req, res) => {
  try {
    res.render("branch_admin/home/home");
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const updateDailyTask = async (req, res) => {
  try {
    const { admin_id } = req.body;
    // need to delete(empty) the daily order

    //   const assigned_date = moment(date).format("YYYY-MM-DD");
    const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");
    console.log(tommorow_date.format("YYYY-MM-DD"));

    const tommorow_customers = await knex("subscribed_user_details")
      .select(
        "id as sub_id",
        "branch_id",
        "user_id",
        "date",
        "product_id",
        "router_id",
        "user_address_id",
        "quantity",
        "subscribe_type_id",
        "customized_days"
      )
      .where({
        date: tommorow_date.format("YYYY-MM-DD"),
        branch_id: admin_id,
        subscription_status: "subscribed",
      });

    if (tommorow_customers.length === 0) {
      console.log("No Customer Found For Tomorrow");
      await req.flash("error", "No Customer Found For Tomorrow");
      return res.redirect("/home");
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // additionla orders
    const tommorow_additional_orders = await knex("additional_orders")
      .select(
        "user_id",
        "subscription_id",
        "date",
        "id",
        "quantity as additional_qty"
      )
      .where({ date: tommorow_date.format("YYYY-MM-DD"), status: "pending" });

    if (tommorow_additional_orders.length !== 0) {
      for (let i = 0; i < tommorow_additional_orders.length; i++) {
        for (let j = 0; j < tommorow_customers.length; j++) {
          if (
            tommorow_customers[j].sub_id ==
            tommorow_additional_orders[i].subscription_id
          ) {
            tommorow_customers[j].additional_order_id =
              tommorow_additional_orders[j].id;
            tommorow_customers[j].additional_qty =
              tommorow_additional_orders[j].additional_qty;
          }
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // get tommorow pased dates
    const tommorow_paused_users = await knex("pause_dates")
      .select("user_id", "subscription_id", "date")
      .where({ date: tommorow_date.format("YYYY-MM-DD") });

    let paused_customers = [];

    // need to check paused date table
    if (tommorow_paused_users.length !== 0) {
      for (let i = 0; i < tommorow_paused_users.length; i++) {
        for (let j = 0; j < tommorow_customers.length; j++) {
          if (
            tommorow_customers[j].sub_id ==
            tommorow_paused_users[i].subscription_id
          ) {
            paused_customers.push(tommorow_customers[j]);

            tommorow_customers.splice([j], 1);
          }
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    // need to add add_on_product id in daily order table
    const tommorow_add_on_orders = await knex("add_on_orders")
      .select("user_id", "address_id", "delivery_date", "id as add_on_order_id")
      .where({
        delivery_date: tommorow_date.format("YYYY-MM-DD"),
        status: "pending",
      });
      console.log(tommorow_add_on_orders)

    // checking add on orders and subscription product
    if (tommorow_add_on_orders.length !== 0) {
      for (let i = 0; i < tommorow_add_on_orders.length; i++) {
        for (let j = 0; j < tommorow_customers.length; j++) {
          if (
            tommorow_customers[j].user_id ==
              tommorow_add_on_orders[i].user_id &&
            tommorow_customers[j].user_address_id ==
              tommorow_add_on_orders[i].address_id
          ) {
            tommorow_customers[j].add_on_order_id =
              tommorow_add_on_orders[i].add_on_order_id;

            tommorow_add_on_orders.splice([i], 1);
          }
        }

        const get_address_id = await knex("user_address")
          .select("branch_id", "router_id")
          .where({ id: tommorow_add_on_orders[i].address_id });

        tommorow_customers.push({
          branch_id: get_address_id[0].branch_id,
          user_id: tommorow_add_on_orders[i].user_id,
          user_address_id: tommorow_add_on_orders[i].address_id,
          date: tommorow_add_on_orders[i].delivery_date,
          add_on_order_id: tommorow_add_on_orders[i].add_on_order_id,
          router_id: get_address_id[0].router_id,
        });
      }
    }

    // console.log("tommorow customers");
    // console.log(tommorow_customers);
    // console.log("paused customers");
    // console.log(paused_customers);

    await tommorow_customers.map(async (data) => {
      // data.date = moment(data.date, "YYYY-MM-DD")

      // need to get rider id based on router id
      // let rider_id = await knex("routes")
      //   .select("rider_id")
      //   .where({ id: data.router_id });

      // before update the date need to check that if next update date is availble in paused date is it availble then choose another date

      let date;

      // before update the date nned to check the PO is raised or not (check the previous PO if no PO raised then date should not be updated)

      // for noraml subscription
      if (data.subscribe_type_id) {
        if (data.subscribe_type_id == "1") {
          date = moment(data.date, "YYYY-MM-DD").add(1, "days");
        } else if (data.subscribe_type_id == "2") {
          date = moment(data.date, "YYYY-MM-DD").add(2, "days");
        } else if (data.subscribe_type_id == "3") {
          const customized_date = await customizedDay(
            data.date,
            data.customized_days
          );

          date = customized_date;
        }

        // update the date in sub user details and insert the data ro daily orders
        await knex("subscribed_user_details")
          .update({ date: date.format("YYYY-MM-DD HH:mm:ss") })
          .where({ id: data.sub_id });
      }

      if (data.add_on_order_id) {
        await knex("add_on_orders")
          .update({ status: "assigned" })
          .where({ id: data.add_on_order_id });
      }

      await knex("daily_orders").insert({
        branch_id: admin_id,
        user_id: data.user_id,
        user_address_id: data.user_address_id,
        date: data.date,
        router_id: data.router_id,
        // product_id: data.product_id && data.product_id,
        add_on_order_id: data.add_on_order_id && data.add_on_order_id,
        additional_order_id:
          data.additional_order_id && data.additional_order_id,
        subscription_id: data.sub_id && data.sub_id,
        qty: data.quantity && data.quantity,
        additional_order_qty: data.additional_qty && data.additional_qty,
        total_qty:
          data.additional_qty &&
          Number(data.additional_qty) + Number(data.quantity),
        //       rider_id: rider_id[0].rider_id,
      });
      //     rider_id = "";
    });

    // for paused customers need to update the date in subscribed user table
    if (paused_customers.length !== 0) {
      let date;
      paused_customers.map(async (data) => {
        if (data.subscribe_type_id) {
          if (data.subscribe_type_id == "1") {
            date = moment(data.date, "YYYY-MM-DD").add(1, "days");
          } else if (data.subscribe_type_id == "2") {
            date = moment(data.date, "YYYY-MM-DD").add(2, "days");
          } else if (data.subscribe_type_id == "3") {
            const customized_date = await customizedDay(
              data.date,
              data.customized_days
            );

            date = customized_date;
          }

          // update the date in sub user details and insert the data ro daily orders
          await knex("subscribed_user_details")
            .update({ date: date.format("YYYY-MM-DD HH:mm:ss") })
            .where({ id: data.sub_id });
        }
      });
    }
    req.flash("success", "Tomorrow Routes and PO Updated");
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};
