import knex from "../../../services/db.service";
import moment from "moment";

export const getPoPending = async (req, res) => {
  try {
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
      .where({ "po.status": "pending" });

    console.log(getPo);

    for (let i = 0; i < getPo.length; i++) {
      getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
    }

    res.render("super_admin/po/po_pending", { data: getPo });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};


export const getSinglePoPending = async (req,res) => {
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

    res.render("super_admin/po/single_po_pending", {
      subscription_products,
      add_on_products,
      po_id
    });


  } catch (error) {
    console.log(error)
    return res.redirect("/home")
  }
}



export const updatePo = async (req,res) => {
  try {
    const {id} = req.body

    console.log("hititit")
    console.log(req.body)
console.log(id)
    await knex("branch_purchase_order").update({status : "approved"}).where({id})

    res.redirect("/super_admin/po/get_po_pending")
  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}


export const getPoApproved = async (req,res) => {
  try {
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
    .where({ "po.status": "approved" });



  for (let i = 0; i < getPo.length; i++) {
    getPo[i].date = moment(getPo[i].date).format("YYYY-MM-DD");
  }

  res.render("super_admin/po/po_approved", { data: getPo });
  } catch (error) {
    console.log(error)
    res.redirect("/home")
  }
}
    export const getSinglePoApproved = async (req,res) => {
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
    
        res.render("super_admin/po/single_po_approved", {
          subscription_products,
          add_on_products,
          po_id
        });
    
    
      } catch (error) {
        console.log(error)
        return res.redirect("/home")
      }
    }
