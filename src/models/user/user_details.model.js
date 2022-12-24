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
  type
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

  const user = await knex("user_address")
    .update(query)
    .where({ user_id: user_id, id: address_id });
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

export const get_user = async (id) => {
  const getuser = await knex
    .select("id", "name", "image", "mobile_number", "email","total_bill_due_Amount","total_bill_count","total_address_count","total_subcription_count",'total_delivered_product_count','rider_status')
    .from("users")
    .where({ id });
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
