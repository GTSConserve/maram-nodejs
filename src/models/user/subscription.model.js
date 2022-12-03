// import { pushVerdictNumberArguments } from "@redis/client/dist/lib/commands/generic-transformers";
import knex from "../../services/db.service";

export const new_subscription = async (
  userId,
  subscription_plan_id,
  product_id,
  user_address_id,
  start_date,
  qty,
  customized_days
) => {
  try {
    let query = {
      start_date,
      user_id: userId,
      product_id,
      user_address_id,
      quantity: qty,
      subscribe_type_id: subscription_plan_id,
    };

    if (subscription_plan_id == 3) {
      let weekdays = await knex("weekdays").select("id", "name");
      let store_weekdays = [];
      for (let i = 0; i < customized_days.length; i++) {
        for (let j = 0; j < weekdays.length; j++) {
          if (weekdays[j].id == customized_days[i]) {
            store_weekdays.push(weekdays[j].name);
          }
        }
      }
      query.customized_days = JSON.stringify(store_weekdays);
    }

    await knex("subscribed_user_details").insert(query);
    console.log(query)

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};

export const get_subscription_product = async (userId) => {
  try {
    const products = await knex("subscribed_user_details AS sub")
      .select(
        "sub.id as subscription_id",
        "products.name as product_name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "subscription_type.name as subscription_name"
      )
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      )
      .where({ "sub.subscription_status": "subscribed", user_id: userId });

    if (products.length === 0) {
      return { status: false, message: "No Subscription Found" };
    }

    return { status: true, data: products };
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};

export const single_subscription = async (userId, sub_id) => {
  try {
    const products = await knex("subscribed_user_details AS sub")
      .select(
        "sub.id as subscription_id",
        "sub.subscription_start_date",
        "products.name as product_name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "subscription_type.name as subscription_name",
        "user_address.address"
      )
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      )
      .join("user_address","user_address.id","=","sub.user_address_id")
      .where({ "sub.user_id": userId, "sub.id": sub_id });

    if (products.length === 0) {
      return { status: false, message: "No Subscription Found" };
    }

    return { status: true, data: products };
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  } 
};

export const get_subcription_order = async (user_id,type_id,name,product_id,value) => {
  try {
    const order = await knex('orders').join('users', 'users.id', '=', 'orders.user_id').insert({
      user_id:user_id,type_id:type_id,name:name,product_id:product_id,value:value
    })
    // .where({user_id:user_id,type_id:type_id})
  
return {status:true,data:order};
  }
catch(error){
  console.log(error);
    return { status: false, message: error };
}
}
