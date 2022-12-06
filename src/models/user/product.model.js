import knex from "../../services/db.service";
import { GetProduct } from "../../utils/helper.util";

export const get_subscription_or_add_on_products = async (id,userId) => {
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
    console.log(error)
    return { status: false, error };
  }
};

export const get_products = async (category_id, userId) => {
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
      .where({ category_id });

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
      .select("id as category_id", "name", "image", "product_type_id")
      .from("categories")
      .where({ product_type_id });
    return { status: true, body: getcategories };
  } catch (error) {
    return { status: false, error };
  }
};

export const search_products = async (product_type_id, search_keyword,userId) => {
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

export const additional_product = async (user_id,subscribe_type_id,product_id,name,quantity,price,total_days) => { 
  if(subscribe_type_id==1){
  const added = await knex('orders').insert({user_id:user_id,subscribe_type_id:subscribe_type_id,product_id:product_id,name:name,quantity:quantity,total_days:1})}
  else{
    const added = await knex('orders').insert({user_id:user_id,subscribe_type_id:subscribe_type_id,product_id:product_id,name:name,quantity:quantity,total_days:15})
  }

   // .raw('sum(quantity * total_days) as price')
  // .where({})
try{

 return { status: true, body: added };
  } catch (error) {
    
    return { status: false, error };
  }
}

// // addon orders
export const addon_order = async (user_id,delivery_date,address_id,products) => {
  try {
    
    let query ={
      user_id:user_id,
      delivery_date:delivery_date,
      address_id:address_id,
      status:'delivery'   
    }
    
 
    const product_list = await knex('add_on_orders').join('add_on_order_items', "add_on_order_items.add_on_order_id", "=", "add_on_orders.id")
    .insert(query)

    console.log(product_list)


    const product1= await knex.select('id','user_id').from('add_on_orders').where({user_id:user_id,status:'delivery'});
    
    const product = [];

    for (let i = 0; i < products.length; i++) {
      product.push({
        product_id:  products[i]. product_id,
        quantity: products[i].quantity,
        add_on_order_id: product1[i].id,
        user_id: product1[i].user_id,
      });
    
      const price_list= await knex.select('price').from('products').where({id:products[i]. product_id});

      console.log(price_list)

      const order_list = await knex('add_on_order_items').insert({ 
      product_id:  products[i]. product_id,
      quantity: products[i].quantity,
      add_on_order_id: product1[i].id,
      user_id: product1[i].user_id,
      price:price_list[0].price,
      total_price : products[i].quantity * price_list[0].price,
      
      
        
    })
     
    // subtotal =[];
    // for (let i = 0; i < add_on_order_items.length; i++) {
    //   total_price +=add_on_order_items.products[i].total_price;
    // }

    //  const subtotal = await knex.select('total_price').from('add_on_order_items').where({ add_on_order_id:product1[i].id,status:"pending"});

    //  console.log(subtotal);


    }

    console.log(product)
   
  } catch (error) {
    console.log(error);
    return { status: false, message: "Something Went Wrong", error };
  }
}


export const additional_order = async (user_id,delivery_date,subscribe_type_id,product_id,quantity) =>{
  try {
    const price_list= await knex.select('price').from('products').where({id:product_id});

    console.log(price_list)

    let query ={
      user_id:user_id,
      subscribe_type_id:subscribe_type_id,
      product_id:product_id,
      quantity:quantity,
      delivery_date:delivery_date,
      price:price_list[0].price
    }

    console.log(query)
    // const price_list1= await knex.select('price').from('products').where({id:product_id});


    const additional = await knex ('additional_orders').insert(query)

    // const total = {
    //   total_price : quantity * price_list.price
    // }
     
    // const addition_order = await knex  ('additional_orders').insert(price_list,total)
 
  }
  catch (error) {
    console.log(error);
    return { status: false, message: "Something Went Wrong", error };
  }
}
