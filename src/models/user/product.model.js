import e from "connect-flash";
import knex from "../../services/db.service";
import { GetProduct } from "../../utils/helper.util";

export const get_subscription_or_add_on_products = async (id, userId) => {
  try {
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
      .where({ product_type_id: id });
    const response = await GetProduct(product, userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }

    // return { status: true, body: product };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export const get_products = async (category_id, product_type_id, userId) => {
  try {
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id as product_id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({ category_id, product_type_id });

    const response = await GetProduct(product, userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export const get_categories = async (product_type_id) => {
  try {
    const getcategories = await knex
      .select(
        "categories.id as category_id",
        "categories.name",
        "categories.image"
      )
      .from("categories_product_type as cat")
      .join("categories", "categories.id", "=", "cat.category_id")
      .where({ "cat.product_type_id": product_type_id });

    console.log(getcategories);
    return { status: true, body: getcategories };
  } catch (error) {
    return { status: false, error };
  }
};

export const search_products = async (
  product_type_id,
  search_keyword,
  userId
) => {
  try {
    const product = await knex.raw(`
                      SELECT products.id,products.name,products.image,products.unit_value,
                      unit_types.value as unit_type,products.price FROM products
                      JOIN unit_types ON unit_types.id = products.unit_type_id
                      WHERE products.product_type_id = ${product_type_id} 
                      AND  products.name  LIKE '%${search_keyword}%'`);

    const response = await GetProduct(product[0], userId);

    if (response.status) {
      return { status: true, data: response.data };
    } else {
      return { status: false, message: response.message };
    }

    // return { status: true, body: product[0] };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
};

export const addon_order = async (
  user_id,
  delivery_date,
  products,
  address_id
) => {
  try {
    const order = await knex("add_on_orders").insert({
      user_id,
      delivery_date,
      address_id,
    });

    let order_id = order[0];

    let sub_total = 0;

    for (let i = 0; i < products.length; i++) {
      const product_price = await knex("products")
        .select("price")
        .where({ id: products[i].product_id });

      console.log(product_price);

      await knex("add_on_order_items").insert({
        add_on_order_id: order_id,
        user_id,
        product_id: products[i].product_id,
        quantity: products[i].qty,
        price: product_price[0].price,
        total_price: product_price[0].price * products[i].qty,
      });

      sub_total = sub_total + product_price[0].price * products[i].qty;
    }

    const check_user_is_branch = await knex("user_address")
      .select("branch_id")
      .where({ id: address_id });
    console.log(check_user_is_branch);
    if (check_user_is_branch.length === 0) {
      return { status: false, message: "Invalid User Address" };
    }

    let query = {};

    if (check_user_is_branch[0].branch_id != null) {
      query.branch_id = check_user_is_branch[0].branch_id;
    }
    query.sub_total = sub_total;

    await knex("add_on_orders").update(query).where({ id: order_id });

    return { status: true, message: "SuccessFully Created" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something Went Wrong", error };
  }
};


export const remove_addonorders = async (product_id , delivery_date,addon_id) => {
  try{

   const addon_status = await knex('add_on_orders').select('status').where({id:addon_id,delivery_date:delivery_date})

   if(addon_status[0].status!="cancelled"){

    await knex("add_on_order_items").update({status : "removed"}).where({product_id:product_id,add_on_order_id:addon_id})

    const select = await knex('add_on_order_items').select("price").where({product_id:product_id,add_on_order_id:addon_id, status :"removed"});

    const select1 = await knex('add_on_orders').select("sub_total").where({id:addon_id,delivery_date:delivery_date});   


    const total = select1[0].sub_total-select[0].price;

  const update = await knex('add_on_orders').update({sub_total:total}).where({id:addon_id,delivery_date:delivery_date});

  const status = await knex('add_on_orders').update({status:"cancelled"}).where({sub_total:0})
return{status:true,message:"Successfully removed"};
  }
  
  else{
    return{status:false,message:"already cancelled"};
  }
}
  catch(error){
    console.log(error);
    return { status: false, message: "Cannot Remove addon order"};
  }
}