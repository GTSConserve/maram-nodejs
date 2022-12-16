import knex from "../../../services/db.service";
import { getBothProducts } from "../../../models/branch_admin/po.controller";
import moment from "moment";

export const getPoForm = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");
    console.log(tommorow_date.format("YYYY-MM-DD"));

    const check_already_po_generated = await knex("branch_purchase_order")
      .select("id")
      .where({ branch_id: admin_id, date: tommorow_date.format("YYYY-MM-DD") });

    if (check_already_po_generated.length !== 0) {
      req.flash("error", "Cannot Send  Again PO For Today");
      return res.redirect("/home");
    }

    const daily_orders = await knex("daily_orders")
      .select("subscription_id", "add_on_order_id")
      .where({ branch_id: admin_id, date: tommorow_date.format("YYYY-MM-DD") });

    // if no daily orders length === 0  then return to home

    const { add_on_products, subscription_products } = await getBothProducts(
      daily_orders
    );

    // console.log(add_on_products)
    // console.log(subscription_products)
    res.render("branch_admin/po/po_form", {
      add_on_products,
      subscription_products,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createPoForm = async (req, res) => {
  const { admin_id } = req.body;

  const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");
  console.log(tommorow_date.format("YYYY-MM-DD"));

  const daily_orders = await knex("daily_orders")
    .select("subscription_id", "add_on_order_id")
    .where({ branch_id: admin_id, date: tommorow_date.format("YYYY-MM-DD") });

  // if no daily orders length === 0  then return to home

  const { add_on_products, subscription_products } = await getBothProducts(
    daily_orders
  );

  const po_id = await knex("branch_purchase_order").insert({
    branch_id: admin_id,
    date: tommorow_date.format("YYYY-MM-DD"),
  });

  let add_on_total = 0;
  let sub_total = 0;

  for (let i = 0; i < add_on_products.length; i++) {
    add_on_total =
      add_on_total + add_on_products[i].total_qty * add_on_products[i].price;
    await knex("branch_purchase_order_items").insert({
      branch_purchase_order_id: po_id[0],
      branch_id: admin_id,
      product_id: add_on_products[i].id,
      price: add_on_products[i].price,
      qty: add_on_products[i].total_qty,
      unit_value: add_on_products[i].value,
      total_price: add_on_products[i].total_qty * add_on_products[i].price,
      product_type_id: 2,
    });
  }
  for (let i = 0; i < subscription_products.length; i++) {
    sub_total =
      sub_total +
      subscription_products[i].total_qty * subscription_products[i].price;
    await knex("branch_purchase_order_items").insert({
      branch_purchase_order_id: po_id[0],
      branch_id: admin_id,
      product_id: subscription_products[i].id,
      price: subscription_products[i].price,
      qty: subscription_products[i].total_qty,
      unit_value: subscription_products[i].value,
      total_price:
        subscription_products[i].total_qty * subscription_products[i].price,
      product_type_id: 1,
    });
  }

  await knex("branch_purchase_order")
    .update({ grand_total: add_on_total + sub_total })
    .where({ id: po_id[0] });

  // res.redirect("/branch_admin/po/get_po_form")
  res.redirect("/home");
};

export const getPoFormPending = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const get_products = await knex("branch_purchase_order")
      .select("id")
      .where({ branch_id: admin_id, status: "pending" });

    console.log(get_products);

    if(get_products.length ===0){
      req.flash("error","No Pending PO found")
      return res.redirect("/home")
    }

    const subscription_products = await knex(
      "branch_purchase_order_items as branch"
    ).select(
        "branch.product_type_id",
        "branch.qty as total_qty",
        "branch.excess_qty",
        "branch.unit_value as value",
        "branch.price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({ "branch.branch_purchase_order_id": get_products[0].id, "branch.product_type_id": 1 });

    const add_on_products = await knex("branch_purchase_order_items as branch")
      .select(
        "branch.product_type_id",
        "branch.qty as total_qty",
        "branch.excess_qty",
        "branch.unit_value as value",
        "branch.price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({ "branch.branch_purchase_order_id": get_products[0].id, "branch.product_type_id": 2 });

    console.log(subscription_products);
    console.log(add_on_products);

    res.render("branch_admin/po/po_pending", {
      subscription_products,
      add_on_products,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};


export const getApprovePO = async(req,res) => {
  try {

    const {admin_id} = req.body

    const getPo = await knex("branch_purchase_order as po")
    .select(
      "po.branch_id",
      "po.id",
      "po.date",
      "admin_users.first_name",
      "zones.name as zone_name"
    )
    .join("admin_users", "admin_users.id", "=", "po.branch_id")
    .join("zones", "zones.id", "=", "admin_users.zone_id")
    .where({ "po.status": "approved" ,"po.branch_id" : admin_id });



  for (let i = 0; i < getPo.length; i++) {
    getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
  }

  res.render("branch_admin/po/get_po_approved", { data: getPo });
  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}


export const getSingleApprovePO = async(req,res) => {
  try {
        
    const {po_id} = req.query

    const subscription_products = await knex(
      "branch_purchase_order_items as branch"
    ).select(
        "branch.product_type_id",
        "branch.qty as total_qty",
        "branch.excess_qty",
        "branch.unit_value as value",
        "branch.price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({ "branch.branch_purchase_order_id": po_id, "branch.product_type_id": 1 });

    const add_on_products = await knex("branch_purchase_order_items as branch")
      .select(
        "branch.product_type_id",
        "branch.qty as total_qty",
        "branch.excess_qty",
        "branch.unit_value as value",
        "branch.price",
        "products.name"
      )
      .join("products", "products.id", "=", "branch.product_id")
      .where({ "branch.branch_purchase_order_id": po_id, "branch.product_type_id": 2 });

    res.render("branch_admin/po/get_single_po_approved", {
      subscription_products,
      add_on_products,
      po_id
    });


  } catch (error) {
    console.log(error)
    return res.redirect("/home")
  }
}