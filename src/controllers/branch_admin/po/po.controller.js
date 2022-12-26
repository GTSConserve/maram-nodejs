import knex from "../../../services/db.service";
import { getBothProducts } from "../../../models/branch_admin/po.controller";
import moment from "moment";

// get single product for po form execess add on product
export const getAddOnExcessProductPO = async (req, res) => {
  const { id } = req.body;
  const product = await knex("products")
    .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
    .select(
      "products.id",
      "products.name",
      "products.image",
      "products.unit_value",
      "unit_types.value as unit_type",
      "products.branch_price as price"
    )
    .where({
      "products.id": id,
    });

  for (let i = 0; i < product.length; i++) {
    if (product[i].unit_type == "ml") {
      if (product[i].unit_value >= 500) {
        product[i].value = product[i].unit_value / 1000 + " litre";
      } else {
        product[i].value = product[i].unit_value + " litre";
      }
    } else {
      product[i].value = product[i].unit_value + " " + product[i].unit_type;
    }
  }

  return res.status(200).json({ status: true, data: product });
};

export const getPoForm = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");

    const today_date = moment(new Date()).format("YYYY-MM-DD");

    const check_already_po_generated = await knex("branch_purchase_order")
      .select("id")
      .where({ branch_id: admin_id, date: today_date});

    if (check_already_po_generated.length !== 0) {
      req.flash("error", "Cannot Send  Again PO For Today");
      return res.redirect("/home");
    }

    const branch_details = await knex("admin_users")
      .select("first_name")
      .where({ id: admin_id });

    const daily_orders = await knex("daily_orders")
      .select("subscription_id", "add_on_order_id", "total_qty")
      .where({ branch_id: admin_id, date: tommorow_date.format("YYYY-MM-DD") });

    // if no daily orders length === 0  then return to home



    const { add_on_products, subscription_products, excess_add_on_products } =
      await getBothProducts(daily_orders);

    // console.log(excess_add_on_products)

    // console.log(add_on_products)
    // console.log(subscription_products)
    res.render("branch_admin/po/po_form", {
      add_on_products,
      subscription_products,
      branch_details,
      today_date,
      excess_add_on_products,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createPoForm = async (req, res) => {
  const { admin_id, sub_products, add_on_products } = req.body;
  console.log(sub_products , add_on_products)

  const today_date = moment(new Date()).format("YYYY-MM-DD")
  


  const po_id = await knex("branch_purchase_order").insert({
    branch_id: admin_id,
    date: today_date,
  });

  let add_on_total = 0;
  let sub_total = 0;

  if (add_on_products.length !== 0) {
    for (let i = 0; i < add_on_products.length; i++) {
      add_on_total =
        add_on_total + Number(add_on_products[i].total_price )
      await knex("branch_purchase_order_items").insert({
        branch_purchase_order_id: po_id[0],
        branch_id: admin_id,
        product_id: add_on_products[i].product_id,
        price: add_on_products[i].price,
        qty: add_on_products[i].qty,
        excess_qty : add_on_products[i].excess_qty ? add_on_products[i].excess_qty : 0 ,
        total_qty :add_on_products[i].total_qty ,
        unit_value: add_on_products[i].value,
        total_price: add_on_products[i].total_price,
        product_type_id: 2,
      });
    }
  }
  if (sub_products.length !== 0) {
    for (let i = 0; i < sub_products.length; i++) {
      sub_total =
        sub_total + Number(sub_products[i].total_price) 
      await knex("branch_purchase_order_items").insert({
        branch_purchase_order_id: po_id[0],
        branch_id: admin_id,
        product_id: sub_products[i].product_id,
        price: sub_products[i].price,
        qty: sub_products[i].qty,
        excess_qty : sub_products[i].excess_qty ? sub_products[i].excess_qty : 0 ,
        total_qty :sub_products[i].total_qty ,
        unit_value: sub_products[i].value,
        total_price: sub_products[i].total_price,
        product_type_id: 1,
      });
    }
  }



  await knex("branch_purchase_order")
    .update({ grand_total: add_on_total + sub_total })
    .where({ id: po_id[0] });

  return res.status(200).json({status : true})

  // res.redirect("/branch_admin/po/get_po_form")
  req.flash("success","Po Raised SuccessFully")
  res.redirect("/home");
};

// export const getPoFormPending = async (req, res) => {
//   try {
//     const { admin_id } = req.body;

//     const get_products = await knex("branch_purchase_order")
//       .select("id")
//       .where({ branch_id: admin_id, status: "pending" });

//     console.log(get_products);

//     if (get_products.length === 0) {
//       req.flash("error", "No Pending PO found");
//       return res.redirect("/home");
//     }

//     const subscription_products = await knex(
//       "branch_purchase_order_items as branch"
//     )
//       .select(
//         "branch.product_type_id",
//         "branch.qty",
//         "branch.excess_qty",
//         "branch.total_qty",
//         "branch.total_price",
//         "branch.unit_value as value",
//         "branch.price",
//         "products.name"
//       )
//       .join("products", "products.id", "=", "branch.product_id")
//       .where({
//         "branch.branch_purchase_order_id": get_products[0].id,
//         "branch.product_type_id": 1,
//       });

//     const add_on_products = await knex("branch_purchase_order_items as branch")
//       .select(
//         "branch.product_type_id",
//         "branch.qty",
//         "branch.total_qty",   
//         "branch.total_price",   
//         "branch.excess_qty",
//         "branch.unit_value as value",
//         "branch.price",
//         "products.name"
//       )
//       .join("products", "products.id", "=", "branch.product_id")
//       .where({
//         "branch.branch_purchase_order_id": get_products[0].id,
//         "branch.product_type_id": 2,
//       });

//     console.log(subscription_products);
//     console.log(add_on_products);

//     res.render("branch_admin/po/po_pending", {
//       subscription_products,
//       add_on_products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

export const getPendingPo = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const getPo = await knex("branch_purchase_order as po")
      .select(
        "po.branch_id",
        "po.id",
        "po.date","po.grand_total",
        "admin_users.first_name",
        "zones.name as zone_name"
      )
      .join("admin_users", "admin_users.id", "=", "po.branch_id")
      .join("zones", "zones.id", "=", "admin_users.zone_id")
      .where({ "po.status": "pending", "po.branch_id": admin_id });

    for (let i = 0; i < getPo.length; i++) {
      getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
    }

    res.render("branch_admin/po/get_po_pending", { data: getPo });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getApprovePO = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const getPo = await knex("branch_purchase_order as po")
      .select(
        "po.branch_id",
        "po.id",
        "po.date","po.grand_total",
        "admin_users.first_name",
        "zones.name as zone_name"
      )
      .join("admin_users", "admin_users.id", "=", "po.branch_id")
      .join("zones", "zones.id", "=", "admin_users.zone_id")
      .where({ "po.status": "approved", "po.branch_id": admin_id });

    for (let i = 0; i < getPo.length; i++) {
      getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
    }

    res.render("branch_admin/po/get_po_approved", { data: getPo });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};


export const getSingleApprovePO = async (req, res) => {
  try {
    const { po_id } = req.query;
    const {admin_id} = req.body

    const branch = await knex("admin_users").select("first_name").where({id: admin_id})

      const po_details = await knex("branch_purchase_order").select("grand_total","date").where({id : po_id})

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

    res.render("branch_admin/po/get_single_po_approved", {
      subscription_products,
      add_on_products,
      po_id,
      po_details : po_details[0],
      branch_name : branch[0].first_name
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};


export const getSinglePendingPO = async (req, res) => {
  try {
    const { po_id } = req.query;
    const {admin_id} = req.body

    const branch = await knex("admin_users").select("first_name").where({id: admin_id})

      const po_details = await knex("branch_purchase_order").select("grand_total","date").where({id : po_id})

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

    res.render("branch_admin/po/get_single_po_pending", {
      subscription_products,
      add_on_products,
      po_id,
      po_details : po_details[0],
      branch_name : branch[0].first_name
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/home");
  }
};
