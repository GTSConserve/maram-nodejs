// import { pushVerdictNumberArguments } from "@redis/client/dist/lib/commands/generic-transformers";
import knex from "../../services/db.service";
import moment from "moment";
import messages from "../../constants/messages";
import { sendNotification } from "../../notifications/message.sender";

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

    const is_exist_address = await knex("user_address")
      .select("branch_id","router_id")
      .whereNotNull("branch_id")
      .where({ user_id: userId, id: user_address_id });

    console.log(is_exist_address);

    if (is_exist_address.length !== 0) {
      query.branch_id = is_exist_address[0].branch_id;
      query.subscription_status = "branch_pending";
      if(is_exist_address[0].router_id){

        query.router_id = is_exist_address[0].router_id;
      }
    }

   const sub_id =  await knex("subscribed_user_details").insert(query);

   await sendNotification({
    include_external_user_ids: [userId.toString()],
    contents: { en: `Your Subscription Placed SuccessFully` },
    headings: { en: "Subscription Notification" },
    name: "Subscription Notification",
    data: {
      subscription_status: "pending",
      category_id: 0,
      product_type_id: 0,
      type: 2,
      subscription_id: sub_id[0],
      bill_id: 0,
    },
  });


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
        "products.price",
        "products.unit_value",
        "unit_types.value as unit_type",
        "subscription_type.name as subscription_name",
        "sub.subscription_status",
        "sub.quantity"
      )
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      ).orderBy('subscription_id','desc')
      .where({ user_id: userId });

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

    let add_product = []
    const products = await knex("subscribed_user_details AS sub")
      .select(
        "sub.id as subscription_id",
        "sub.customized_days",
        "sub.subscription_start_date",
        "sub.subscription_status",
        "sub.quantity",
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
      .join("user_address", "user_address.id", "=", "sub.user_address_id")
      .where({ "sub.user_id": userId, "sub.id": sub_id });

      // console.log(products)
     const additional = await knex('additional_orders').select('id','subscription_id','user_id').where({subscription_id: sub_id})

    

     for (let i=0;i<additional.length;i++){
      
      const query = await knex("subscribed_user_details AS sub").select(
        "additional_orders.id",
        "additional_orders.id as id", 
        "additional_orders.date ",
        "additional_orders.quantity",
        "additional_orders.status",
        "products.name as product_name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
      )
      .join("additional_orders","additional_orders.user_id","=","sub.user_id")
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .where({'additional_orders.user_id':additional[i].user_id})
      

     add_product.push(query)
      }
      //  console.log(add_product)
      const this_month_item_detail = await knex("users").select(
        "one_liter_in_hand as delivered_orders",
        "one_liter_in_return as remaining_orders",
        "half_liter_in_hand as additional_delivered_orders",
        "one_liter_in_return as additional_remaining_orders"
      ).where({id: userId })

    if (products.length === 0) {
      return { status: false, message: "No Subscription Found" };
    }

    return { status: true, data: products,add_product,this_month_item_detail  };
  } catch (error) {
    console.log(error);
    return { status: false, message: "No Subscription Found"};
  }
};

export const get_subcription_order = async (
  user_id,
  type_id,
  name,
  product_id,
  value
) => {
  try {
    const order = await knex("orders")
      .join("users", "users.id", "=", "orders.user_id")
      .insert({
        user_id: user_id,
        type_id: type_id,
        name: name,
        product_id: product_id,
        value: value,
      });
    // .where({user_id:user_id,type_id:type_id})

    return { status: true, data: order };
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};

// remove subscription 
export const remove_subscription = async (user_id, subscription_id) => {
  try {
    const remove = await knex("subscribed_user_details")
      .update({ subscription_status: "unsubscribed" })
      .where({ user_id: user_id, id: subscription_id });

      await sendNotification({
        include_external_user_ids: [user_id.toString()],
        contents: { en: `Your Additional Order Placed SuccessFully` },
        headings: { en: "Subscription Notification" },
        name: "Remove Subscription",
        data: {
          subscription_status: "unsubscribed",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_status: subscription_status[0],
          bill_id: 0,
        },
      });

    return { status: true, message: "SuccessFully Updated" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Cannot Update the Subscription" };
  }
};


// change quantity 
export const change_quantity = async (userId,subscription_id,quantity,) => {
  try {
       const change = await knex('subscribed_user_details').update({quantity:quantity}).where({id:subscription_id,user_id:userId});

       await sendNotification({
        include_external_user_ids: [user_id.toString()],
        contents: { en: `Your Additional Order Placed SuccessFully` },
        headings: { en: "Subscription Notification" },
        name: "Remove Subscription",
        data: {
          subscription_status: "pending",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          bill_id: 0,
        },
      });

       return { status: true, message: "SuccessFully Updated" };

  } catch (error) {
    console.log(error);
    return { status: false, message: "Cannot Update the Subscription" };
  }

  }

  // change subscription plan 
  export const change_subscriptionplan = async (
    userId,
    subscription_id,
    subscription_plan_id,
    start_date,
    customized_days
    ) => {
    try{
      let query = {
        start_date,
        user_id: userId,
        subscribe_type_id: subscription_plan_id,
      };

      const subscription_status = await knex('subscribed_user_details').update({subscription_status:"change_plan"}).where({id:subscription_id});
      
      
      const previous = await knex('subscribed_user_details').select("subscribe_type_id").where({id:subscription_id});

      await sendNotification({
        include_external_user_ids: [userId].toString(),
        contents: { en: `Your Subscription Placed SuccessFully` },
        headings: { en: "Subscription Notification" },
        name: "Subscription Notification",
        data: {
          subscription_status: "change_plan",
          category_id: 0,
          product_type_id: 0,
          type: 2,
          subscription_id: previous[0],
          bill_id: 0,
        },
      });
      // console.log(previous)

      let weekdays = await knex("weekdays").select("id");
          let store_weekdays = [];
          for (let i = 0; i < customized_days.length; i++) {
            for (let j = 0; j < weekdays.length; j++) {
              if (weekdays[j].id == customized_days[i]) {
                store_weekdays.push(weekdays[j].id);
              }
            }
          }
          query.customized_days = JSON.stringify(store_weekdays);

// console.log(query.customized_days)
      // const changeplan = await knex("subscription_users_change_plan").insert({
      //   user_id:userId,
      //   subscription_id:subscription_id,
      //   previous_subscription_type_id:previous[0].subscribe_type_id,
      //   change_subscription_type_id: subscription_plan_id,
      //   start_date:start_date,
      //   customized_days:customized_days
      // })

      // console.log(changeplan)
  return {status:true, message: "Successfully change subscription plan"}
    }
    catch(error){
      console.log(error)
      return {status:false,message:"cannot change plan"}
    }
  }

  // pause subscription dates
  export const pause_subscriptiondate = async (userId,subscription_id,dates) => {
    try {
      
        
        for(let i = 0; i < dates.length; i++){
          const subscriptiondate = await knex('pause_dates') .insert({date:dates[i].date,user_id:userId,subscription_id:subscription_id});
        }
       
        
        // = await knex('pause_dates').select('user_id')
        // if(subscriptiondate.user_id == userId){
        //   const pausedate = await knex('pause_dates').update({date:pausedates}).where({user_id:userId,subscription_id:subscription_id})
        // } 
       return{status:true,message:"your pause dates comformed"}

      
    } catch (error) {
      console.log(error)
      return {status:false,message:"cannot pause date"}
    }
  }
