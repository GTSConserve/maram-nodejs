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
        qty: Number(daily_orders[i].total_qty),
      });
    }
    if (daily_orders[i].add_on_order_id !== null) {
      const add_product_id = await knex("add_on_order_items")
        .select("product_id", "quantity")
        .where({ add_on_order_id: daily_orders[i].add_on_order_id });

      for (let i = 0; i < add_product_id.length; i++) {
       
        add_products_id.push({
          product_id: add_product_id[i].product_id,
          qty: Number(add_product_id[i].quantity),
        });
      }
    }
  }

  console.log(sub_products_id);
  console.log(add_products_id);

  //////////////////////////////////////////////////////////////////////////////// get products id (sub)
  if (sub_products_id.length !== 0) {
    let removedIndex = [];
    for (let i = 0; i < sub_products_id.length; i++) {
      for (let j = i + 1; j < sub_products_id.length; j++) {
        if (sub_products_id[i].product_id == sub_products_id[j].product_id) {
          sub_products_id[i].qty =
            sub_products_id[i].qty + sub_products_id[j].qty;
          removedIndex.push(j);
          // sub_products_id.splice(j, 1);
        }
      }

      if (removedIndex.length !== 0) {
        for (let k = removedIndex.length - 1; k >= 0; k--) {
          sub_products_id.splice(removedIndex[k], 1);
        }
        removedIndex = [];
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////////// get products id (add on)
  if (add_products_id.length !== 0) {
    let removedIndexAdd = []
    for (let i = 0; i < add_products_id.length; i++) {
      for (let j = i + 1; j < add_products_id.length; j++) {
        if (add_products_id[i].product_id == add_products_id[j].product_id) {
          add_products_id[i].qty =
            add_products_id[i].qty + add_products_id[j].qty;
            removedIndexAdd.push(j);
        }
      }
      if (removedIndexAdd.length !== 0) {
        for (let k = removedIndexAdd.length - 1; k >= 0; k--) {
          add_products_id.splice(removedIndexAdd[k], 1);
        }
        removedIndexAdd = [];
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////// get subscription product
  let subscription_products = [];

  console.log(sub_products_id, "products");

  for (let i = 0; i < sub_products_id.length; i++) {
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
  let add_on_products_id = []

  for (let i = 0; i < add_products_id.length; i++) {
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
        "products.product_type_id": 2,
        "products.id": add_products_id[i].product_id,
      });

    add_on_products.push({
      ...product[0],
      total_qty: add_products_id[i].qty,
    });
    add_on_products_id.push(product[0].id)
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




  const excess_add_on_product = await knex("products")
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
        "products.product_type_id": 2,
      }).whereNotIn("products.id",add_on_products_id)


      if(excess_add_on_product.length !==0){
        for (let i = 0; i < excess_add_on_product.length; i++) {
          if (excess_add_on_product[i].unit_type == "ml") {
            if (excess_add_on_product[i].unit_value >= 500) {
              excess_add_on_product[i].value =
                excess_add_on_product[i].unit_value / 1000 + " litre";
            } else {
              excess_add_on_product[i].value = excess_add_on_product[i].unit_value + " litre";
            }
          } else {
            excess_add_on_product[i].value =
              excess_add_on_product[i].unit_value + " " + excess_add_on_product[i].unit_type;
          }
        }
      }


      console.log(add_on_products_id)
      console.log(excess_add_on_product)

  return { add_on_products, subscription_products,excess_add_on_products : excess_add_on_product };
};
