// import mysqlRequest from "../requests/mysqlRequest.request"
// import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../../constants/responseCode";
// import { userGroup } from "../constants/controls"
import knex from "../../services/db.service";

// export const add_address = async (req,res ) =>
//  {
//     const address = await knex('user_address').insert({user_id,title,address,landmark,type});   // insert user into user table
//          // respond back to request
// ;
//     try{
//         res.json({ success: true, message: 'ok' });
//     }
//      catch (error) {
//       return {
//         status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//         message: error.body,
//       };
//     }
// }

export const get_address = async (userId) => {
  const getaddress = await knex
    .select(
      "id as address_id",
      "title",
      "address",
      "landmark",
      "type",
      "alternate_mobile",
      "latitude",
      "longitude"

    )
    .from("user_address")
    .where({ user_id: userId , status : "1" });
  try {
    return { status: responseCode.SUCCESS, body: getaddress };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error,
    };
  }
};

export const edit_address = async (
  user_id,
  address_id,
  title,
  address,
  landmark,
  type,
  alternate_mobile,
  latitude,
  longitude
) => {
  let query = {};

  if (title) {
    query.title = title;
  }
  if (address) {
    query.address = address;
  }
  if (landmark) {
    query.landmark = landmark;
  }
  if (type) {
    query.type = type;
  }
  if (alternate_mobile) {
    query.alternate_mobile = alternate_mobile;
  }
  if (latitude) {
    query.latitude = latitude
  }
  if (longitude) {
    query.longitude = longitude
  }

  const user = await knex("user_address")
    .update(query)
    .where({ user_id: user_id , id : address_id });
    console.log(user)
  try {
    return { status: responseCode.SUCCESS, body: user };
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const get_user = async (id,userId) => {
  const getuser = await knex
    .select("id", "name", "image", "mobile_number", "email")
    .from("users")
    .where({ id });
    console.log(id)


   try {
    return { status: responseCode.SUCCESS, body: getuser };
  } catch (error) {
    console.log(error);
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error };
  }
};

export const delete_user_address = async (address_id,userId) => {
  const deluser = await knex("user_address")
    .update({ status: "0" })
    .where({ user_id: userId , id : address_id});
  try {
    return { status: responseCode.SUCCESS, body: deluser };
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const remove_order = async (user_id) => {
  const deluser = await knex("orders").where({ user_id: user_id }).del();
  try {
    return { status: responseCode.SUCCESS, body: deluser };
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const edit = async (id, user_id, value) => {
  const editorder = await knex("orders")
    .where({ id: id, user_id: user_id })
    .update({ value: value });
  try {
    return { status: responseCode.SUCCESS, body: editorder };
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const change_plan = async (
  subscribe_type_id,
  changeplan_name,
  start_date
) => {
  try {
    if (subscribe_type_id == 1) {
      if (changeplan_name == "alternate") {
        console.log("hi");
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 2,
          start_date: start_date,
          status: "plan changed",
        });
      } else {
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 3,
          start_date: start_date,
          status: "plan changed",
        });
      }
    } else if (subscribe_type_id == 2) {
      if (changeplan_name == "daily") {
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 1,
          start_date: start_date,
          status: "plan changed",
        });
      } else {
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 3,
          start_date: start_date,
          status: "plan changed",
        });
      }
    } else {
      if (changeplan_name == "daily") {
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 1,
          start_date: start_date,
          status: "plan changed",
        });
      } else {
        const change = await knex("subscribed_user_details").update({
          subscribe_type_id: 2,
          start_date: start_date,
          status: "plan changed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};


export const checkAddress = async (id) => {
  const editorder = await knex("user_address").select('latitude','longitude')
    .where({id})
  try {
    return { status: responseCode.SUCCESS, body: editorder };
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      error,
    };
  }
};

export const get_user_bill = async (userId) => {
  const getuser = await knex("bill_history")
    .join("bill_history_details","bill_history_details.bill_history_id","=","bill_history.id")
    .select(
      "bill_history.id", 
      "bill_history.payment_status",
      "bill_history.bill_no", 
      "bill_history.sub_total",
      'bill_history_details.total_qty as items')
    .from("bill_history")
    .where({ user_id: userId });
    console.log(getuser)

    const items = await knex('bill_history_details').select('total_qty').where({bill_history_id:getuser[0].id})
    let sum = 0;
    for (let i=0;i<items.length;i++){
      sum+=items[i].total_qty;
    }
    console.log(sum)
  try {
    return { status: responseCode.SUCCESS, body: getuser };
  } catch (error) {
    console.log(error);
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error };
  }
};

export const get_single_bill = async (bill_id,userId) => {
  try {
    const getSingleBillList = await knex("bill_history")
    .select(
      "bill_history.id",
      "bill_history.bill_no as bill_id",
      "bill_history.sub_total as bill_value",
      "bill_history.date",
      "bill_history.razorpay_payment_id as payment_id",
      "bill_history.status as payment_status",
      "add_on_orders.sub_total as sub_total",
    )
    .join("payment_gateways","payment_gateways.user_id","=","bill_history.user_id")
    .join("add_on_orders","add_on_orders.user_id","=","payment_gateways.user_id")
    .where({"bill_history.user_id": userId})
   

    const subscription_products = await knex("subscribed_user_details as sub").select(
       "sub.id as subscription_id",
        "sub.subscription_status",
        "products.name as product_name",
        "products.image as product_image",
        "products.unit_value as product_variation",
        "products.price as product_price",
        "sub.quantity as product_quantity",
        "unit_types.value as product_variation_type",
        
    )
    .join("products","products.id","=","sub.user_id")
    .join("unit_types","unit_types.id","=","unit_type_id")
    // .join("subscription_type.id","=","products.unit_type_id")
    .where({"sub.user_id": userId })

    const additional_order_product = await knex("subscribed_user_details AS sub").select(
      "additional_orders.id as product_id",
      "additional_orders.quantity as no_quantity",
      "products.name as product_name",
      "products.price as product_total",
      "additional_orders.price as recipe_price",
      "products.unit_value as variation_id",
      "unit_types.value as variation_name",
    )
    .join("additional_orders","additional_orders.user_id","=","sub.user_id")
    .join("products", "products.id", "=", "sub.product_id")
    .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
    .where({'additional_orders.user_id':userId })


    const add_on_products = await knex("add_on_order_items as add").select(
      "add.product_id as product_id",
      "add.quantity as no_quantity",
      "unit_types.id as variation_id",
      "unit_types.name as variation_type",
      "products.unit_value as variation_name",
      "add.total_price as product_total",
    
    )
    .join("products","products.id","=","add.user_id")
    .join("unit_types","unit_types.id","=","products.unit_type_id")
    
    .where({ "add.user_id": userId })

    
    

    // console.log(sub_products)
      return { data: getSingleBillList, subscription_products, add_on_products, additional_order_product };
  } catch (error) {
    console.log(error);
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error };
  }
}

export const single_calendar_data = async (date,userId, sub_id,id) => {
  try {

    let add_product = [];
    let additional1 = [];
    const products = await knex("subscribed_user_details AS sub")
      .select(
        "sub.id as subscription_id",
        "sub.subscription_status",
        "products.name as product_name",
        "products.image as product_image",
        "products.unit_value as product_variation",
        "products.price as product_price",
        // "products.quantity as product_quantity",
        "unit_types.value as product_variation_type",
        "subscription_type.name as subscription_mode",
        // "additional_orders.id as additional_order_id",
        // "additional_orders.additional_orders_parent_id as additional_order_parent_id",
      )
      .join("additional_orders", "additional_orders.subscription_id", "=", "sub.id")
      .join("products", "products.id", "=", "sub.product_id")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .join(
        "subscription_type",
        "subscription_type.id",
        "=",
        "sub.subscribe_type_id"
      )
      .join("user_address", "user_address.id", "=", "sub.user_address_id")
      .where({ "sub.date": date });

      // console.log(products)
     const additional = await knex("additional_orders")
     .join("subscribed_user_details", "subscribed_user_details.id", "=", "additional_orders.subscription_id")
     .join("products", "products.id", "=", "subscribed_user_details.product_id")
     .join(
      "subscription_type",
      "subscription_type.id",
      "=",
      "subscribed_user_details.subscribe_type_id"
    )
     .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
     .select(
      "subscribed_user_details.id as subscription_id",
      "subscribed_user_details.subscription_status",
      "products.name as product_name",
      "products.image as product_image",
      "products.unit_value as product_variation",
      "products.price as product_price",
      // "products.quantity as product_quantity",
      "unit_types.value as product_variation_type",
      "subscription_type.name as subscription_mode",
      "additional_orders.id as additional_order_id",
     )
     .where({ "subscribed_user_details.user_id" : userId});
    //  console.log(additional)
     additional1.push(additional)

     const additional2 = await knex("add_on_orders")
     .join("add_on_order_items", "add_on_order_items.add_on_order_id", "=", "add_on_orders.id")
     .join("products", "products.id", "=", "add_on_order_items.product_id")
     .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
     .select(
       "products.id as product_id",
       "products.name as product_name",
       "products.image as product_image",
       "products.unit_value as product_variation",
       "unit_types.value as product_variation_type",
       "products.price as product_price",
       "add_on_order_items.remove_status as remove_status",

     )
     .where({"add_on_orders.user_id" : userId});

     console.log(additional2)
     add_product.push(additional2)

    if (products.length === 0) {
      return { status: false, message: "No Subscription Found" };
    }

    return { status: true, data: products,additional1,add_product };
  } catch (error) {
    console.log(error);
    return { status: false, message: "No Subscription Found"};
  }
};


// rider location 
export const rider_location = async (userId) => {
try {
     const router = await knex('daily_orders')
     .join("routes","routes.id","=","daily_orders.router_id")
     .join("rider_details","rider_details.id","=","routes.rider_id")
     .select('rider_details.tour_status as status')
     .where({user_id:userId});
      // console.log(router)

    if(router[0].status==1){
    const location = await knex('daily_orders')
    .join("users","users.id","=","daily_orders.user_id")
    .join("user_address","user_address.user_id","=","daily_orders.user_id")  
    .join("admin_users","admin_users.id","=","daily_orders.branch_id")
    .join("routes","routes.id","=","daily_orders.router_id")
    .join("rider_details","rider_details.id","=","routes.rider_id")
    .select(
      'users.id as user_id',
      'users.name as user_name',
      'user_address.address as user_address',
      'user_address.latitude as user_latitude',
      'user_address.longitude as user_longitude',
      'admin_users.id as admin_id',
      'admin_users.first_name as admin_name',
      'admin_users.address as admin_address',
      'admin_users.latitude as admin_latitude',
      'admin_users.longitude as admin_longitude',
      'rider_details.id as rider_id',
      'rider_details.name as rider_name',
      'rider_details.latitude as rider_latitude',
      'rider_details.longitude as rider_longitude',
      )
     .where({'daily_orders.user_id':userId});
    //  console.log(location)
    return { status: responseCode.SUCCESS, location };
    }
else{
  return { status: false, message:"no order placed today SORRY!!!!!" };
}
} catch (error) {
  console.log(error);
    return { status: responseCode.FAILURE.DATA_NOT_FOUND, error };
}
}