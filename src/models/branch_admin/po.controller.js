import knex from "../../services/db.service";

export const getBothProducts = async (daily_orders) => {
  let sub_products_id = [];
  let add_products_id = [];

  for (let i = 0; i < daily_orders.length; i++) {
    if (daily_orders[i].subscription_id !== null) {
      const sub_product_id = await knex("subscribed_user_details")
        .select("product_id", "quantity")
        .where({ id: daily_orders[i].subscription_id });

      sub_products_id.push({
        product_id: sub_product_id[0].product_id,
        qty: Number(sub_product_id[0].quantity),
      });
    }
    if (daily_orders[i].add_on_order_id !== null) {
      const add_product_id = await knex("add_on_order_items")
        .select("product_id", "quantity")
        .where({ add_on_order_id: daily_orders[i].add_on_order_id });

      for (let i = 0; i < add_product_id.length; i++) {
        add_products_id.push({
          product_id: add_product_id[i].product_id,
          qty: Number(add_product_id[0].quantity),
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////// get products id (sub)
  if (sub_products_id.length !== 0) {
    for (let i = 0; i < sub_products_id.length; i++) {
      for (let j = i + 1; j < sub_products_id.length; j++) {
        if (sub_products_id[i].product_id == sub_products_id[j].product_id) {
          sub_products_id[i].qty =
            sub_products_id[i].qty + sub_products_id[j].qty;
          sub_products_id.splice([j], 1);
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////// get products id (add on)
  if (add_products_id.length !== 0) {
    for (let i = 0; i < add_products_id.length; i++) {
      for (let j = i + 1; j < add_products_id.length; j++) {
        if (add_products_id[i].product_id == add_products_id[j].product_id) {
          add_products_id[i].qty =
            add_products_id[i].qty + add_products_id[j].qty;
          add_products_id.splice([j], 1);
        }
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////// get subscription product
  let subscription_products = [];

  for (let i = 0; i < sub_products_id.length; i++) {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 1,
        "products.id": sub_products_id[i].product_id,
      });

    subscription_products.push({
      ...product[0],
      total_qty: sub_products_id[i].qty,
    });
  }

  ///////////////////////////////////////////////////////////////////////// get add on product
  let add_on_products = [];

  for (let i = 0; i < add_products_id.length; i++) {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        "products.product_type_id": 2,
        "products.id": add_products_id[i].product_id,
      });

    add_on_products.push({
      ...product[0],
      total_qty: add_products_id[i].qty,
    });
  }



  ///////////////////////////////////////////////////////////////// calculating the units
  for (let i = 0; i < subscription_products.length; i++) {
    if (subscription_products[i].unit_type == "ml") {
      if (subscription_products[i].unit_value >= 500) {
        subscription_products[i].value =
          subscription_products[i].unit_value / 1000 + " litre";
      } else {
        subscription_products[i].value =
          subscription_products[i].unit_value + " litre";
      }
    } else {
      subscription_products[i].value =
        subscription_products[i].unit_value +
        " " +
        subscription_products[i].unit_type;
    }
  }
  for (let i = 0; i < add_on_products.length; i++) {
    if (add_on_products[i].unit_type == "ml") {
      if (add_on_products[i].unit_value >= 500) {
        add_on_products[i].value =
          add_on_products[i].unit_value / 1000 + " litre";
      } else {
        add_on_products[i].value = add_on_products[i].unit_value + " litre";
      }
    } else {
      add_on_products[i].value =
        add_on_products[i].unit_value + " " + add_on_products[i].unit_type;
    }
  }

  return { add_on_products, subscription_products };
};