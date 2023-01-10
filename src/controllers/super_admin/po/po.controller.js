import knex from "../../../services/db.service";
import moment from "moment";

export const getPoPending = async (req, res) => {
  try {
    const getPo = await knex("branch_purchase_order as po")
      .select(
        "po.branch_id",
        "po.id",
        "po.date",
        "po.grand_total",
        "admin_users.first_name",
        "zones.name as zone_name"
      )
      .join("admin_users", "admin_users.id", "=", "po.branch_id")
      .join("zones", "zones.id", "=", "admin_users.zone_id")
      .where({ "po.status": "pending" });


    for (let i = 0; i < getPo.length; i++) {
      getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
    }

    res.render("super_admin/po/po_pending", { data: getPo });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getSinglePoPending = async (req, res) => {
  try {
    const { po_id } = req.query;

    const po_details = await knex("branch_purchase_order as po")
    .select("po.grand_total", "po.date","admin_users.first_name")
    .join("admin_users","admin_users.id","=","po.branch_id")
    .where({ "po.id": po_id });

  const branch= po_details[0].first_name 

  po_details[0].date = moment(po_details[0].date).format("YYYY-MM-DD");

    const subscription_products = await knex(
      "branch_purchase_order_items as branch"
    )
      .select(
        "branch.product_type_id",
        "branch.qty",
        "branch.excess_qty",
        "branch.total_qty",
        "branch.unit_value as value",
        "branch.price",
        "branch.total_price",
        "products.name",
        "branch.product_id"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({
        "branch.branch_purchase_order_id": po_id,
        "branch.product_type_id": 1,
      });

    const add_on_products = await knex("branch_purchase_order_items as branch")
      .select(
        "branch.product_type_id",
        "branch.qty",
        "branch.excess_qty",
        "branch.total_qty",
        "branch.unit_value as value",
        "branch.price",
        "branch.total_price",
        "products.name",
        "branch.product_id"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({
        "branch.branch_purchase_order_id": po_id,
        "branch.product_type_id": 2,
      });

    res.render("super_admin/po/single_po_pending", {
      subscription_products,
      add_on_products,
      po_id,
      po_details: po_details[0],
      branch_name: branch,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};

export const updatePo = async (req, res) => {
  try {
    const { po_id, sub_products, add_on_products } = req.body;

    let add_on_total = 0;
    let sub_total = 0;

    if (add_on_products.length !== 0) {
      for (let i = 0; i < add_on_products.length; i++) {
        add_on_total = add_on_total + Number(add_on_products[i].total_price);
        await knex("branch_purchase_order_items")
          .update({
            qty: add_on_products[i].qty,
            excess_qty: add_on_products[i].excess_qty
              ? add_on_products[i].excess_qty
              : 0,
            total_qty: add_on_products[i].total_qty,
            total_price: add_on_products[i].total_price,
          })
          .where({
            branch_purchase_order_id: po_id,
            product_id: add_on_products[i].product_id,
          });
      }
    }
    if (sub_products.length !== 0) {
      for (let i = 0; i < sub_products.length; i++) {
        sub_total = sub_total + Number(sub_products[i].total_price);
        await knex("branch_purchase_order_items")
          .update({
            qty: sub_products[i].qty,
            excess_qty: sub_products[i].excess_qty
              ? sub_products[i].excess_qty
              : 0,
            total_qty: sub_products[i].total_qty,
            total_price: sub_products[i].total_price,
          })
          .where({
            branch_purchase_order_id: po_id,
            product_id: sub_products[i].product_id,
          });
      }
    }

    await knex("branch_purchase_order")
      .update({ grand_total: add_on_total + sub_total, status: "approved" })
      .where({ id: po_id });

    return res.status(200).json({ status: true });

    // await knex("branch_purchase_order").update({status : "approved"}).where({ id :po_id})

    // res.redirect("/super_admin/po/get_po_pending")
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getPoApproved = async (req, res) => {
  try {
    const getPo = await knex("branch_purchase_order as po")
      .select(
        "po.branch_id",
        "po.id",
        "po.date",
        "po.grand_total",
        "admin_users.first_name",
        "zones.name as zone_name"
      )
      .join("admin_users", "admin_users.id", "=", "po.branch_id")
      .join("zones", "zones.id", "=", "admin_users.zone_id")
      .where({ "po.status": "approved" });

    for (let i = 0; i < getPo.length; i++) {
      getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
    }

    res.render("super_admin/po/po_approved", { data: getPo });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getSinglePoApproved = async (req, res) => {
  try {
    const { po_id } = req.query;
    const { admin_id } = req.body;

    // const branch = await knex("admin_users")
    //   .select("first_name")
    //   .where({ id: admin_id });

    const po_details = await knex("branch_purchase_order as po")
      .select("po.grand_total", "po.date","admin_users.first_name")
      .join("admin_users","admin_users.id","=","po.branch_id")
      .where({ "po.id": po_id });

    const branch= po_details[0].first_name 

    po_details[0].date = moment(po_details[0].date).format("YYYY-MM-DD");

    const subscription_products = await knex(
      "branch_purchase_order_items as branch"
    )
      .select(
        "branch.product_type_id",
        "branch.qty",
        "branch.excess_qty",
        "branch.total_qty",
        "branch.unit_value as value",
        "branch.price",
        "branch.total_price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({
        "branch.branch_purchase_order_id": po_id,
        "branch.product_type_id": 1,
      });

    const add_on_products = await knex("branch_purchase_order_items as branch")
      .select(
        "branch.product_type_id",
        "branch.qty ",
        "branch.excess_qty",
        "branch.total_qty",
        "branch.unit_value as value",
        "branch.price",
        "branch.total_price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({
        "branch.branch_purchase_order_id": po_id,
        "branch.product_type_id": 2,
      });

    res.render("super_admin/po/single_po_approved", {
      subscription_products,
      add_on_products,
      po_id,
      po_details: po_details[0],
      branch_name: branch,
    });
    // try {

    //   const {po_id} = req.query

    //   const subscription_products = await knex(
    //     "branch_purchase_order_items as branch"
    //   ).select(
    //       "branch.product_type_id",
    //       "branch.qty as total_qty",
    //       "branch.excess_qty",
    //       "branch.unit_value as value",
    //       "branch.price",
    //       "products.name"
    //     )
    //     .join("products", "products.id", "=", "branch.product_id")
    //     .where({ "branch.branch_purchase_order_id": po_id, "branch.product_type_id": 1 });

    //   const add_on_products = await knex("branch_purchase_order_items as branch")
    //     .select(
    //       "branch.product_type_id",
    //       "branch.qty as total_qty",
    //       "branch.excess_qty",
    //       "branch.unit_value as value",
    //       "branch.price",
    //       "products.name"
    //     )
    //     .join("products", "products.id", "=", "branch.product_id")
    //     .where({ "branch.branch_purchase_order_id": po_id, "branch.product_type_id": 2 });

    //   res.render("super_admin/po/single_po_approved", {
    //     subscription_products,
    //     add_on_products,
    //     po_id
    //   });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};
