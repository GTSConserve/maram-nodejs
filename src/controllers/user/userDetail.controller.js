import responseCode from "../../constants/responseCode";
import { parseJwtPayload } from "../../services/jwt.service";
import { userAddressValidator } from "../../services/validator.service";
import knex from "../../services/db.service";
import { sendNotification } from "../../notifications/message.sender";
import moment from "moment";
import {
  change_plan,
  delete_user_address,
  edit,
  edit_address,
  get_address,
  get_user,
  remove_order,
  checkAddress,
  get_user_bill,
  get_single_bill,
  single_calendar_data,
  rider_location
} from "../../models/user/user_details.model";
import messages from "../../constants/messages";

export const addUserAddress = async (req, res) => {
  try {
    const payload = userAddressValidator(req.body);

    const { userId } = req.body;

    if (payload.status) {

      await knex("user_address")

        .insert({
          user_id: userId,

          address: payload.address,

          landmark: payload.landmark,

          title: payload.title,

          type: payload.type,

          alternate_mobile: payload.alternate_mobile,

          latitude: payload.latitude,

          longitude: payload.longitude
        })
        .where({ user_id: payload.user_id });

      return res
        .status(responseCode.SUCCESS)

        .json({ status: true, message: "address added successfully" });
    }


  } catch (error) {
    console.log(error);

    res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)

      .json({ status: false, error });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    const address = await get_address(userId);

    res.status(200).json({ status: true, data: address.body });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: false });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { 
      userId, 
      address_id, 
      title, 
      address, 
      landmark, 
      type, 
      alternate_mobile, 
      latitude, 
      longitude 
    } = req.body;

    if (!latitude && !longitude) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    // console.log(userId, address_id, title, address, landmark, type, alternate_mobile, latitude, longitude)

    await edit_address(
      userId, 
      address_id, 
      title, 
      address, 
      landmark, 
      type, 
      alternate_mobile, 
      latitude, 
      longitude);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const getUser = async (req, res) => {
  console.log("hi");
  try {
    const { userId } = req.body;
    
    const user = await get_user(userId);

    console.log(user)
    if (user.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "User Not Found" });
    }

    const daily = await knex('daily_orders').select('user_id').where({user_id: userId})
//     const user1 = await knex("bill_history").select("id").where({user_id:id});

// console.log(user[0].id)

// let bill = [];

// if(user.id){
     const bill = await knex("bill_history_details").select(
    "bill_history_details.subscription_price",
    "bill_history_details.additional_price",
    "bill_history_details.total_price",
    "bill_history_details.additional_qty",
    "bill_history_details.total_qty",
    "bill_history_details.subscription_qty"
    )
    .join("bill_history","bill_history.id","=","bill_history_details.bill_history_id")
    .where({"bill_history.user_id":userId})
    // }

    // else{
    //   return {message:"you have no bill" };
    // }
    const sub = await knex.select(
      "subscribed_user_details.subscription_delivered_quantity",
      "subscribed_user_details.additional_delivered_quantity",
      "subscribed_user_details.total_delivered_quantity",
      // "subscribed_user_details.subscription_delivered_quantity",
    )
    .from("subscribed_user_details")
    .where({user_id: userId})
    // console.log(getuser)
  const rider = await knex('daily_orders')
  .join("routes","routes.id","=","daily_orders.router_id")
  .join("rider_details","rider_details.id","=","routes.rider_id")
  .select(
    "rider_details.id",
    "rider_details.name",
    "rider_details.tour_status as status",
  )
  .where({'daily_orders.user_id':userId});

  console.log(rider);

  let get_user_detail = {};
  let status;
  if(rider.length!=0){
 if(rider[0].status==0){
   status = "rider is assigned"
 }
 else if(rider[0].status==1){
   status = "rider can start the tour and delivered soon"
 }
 else if(rider[0].status==2){
   status ="rider can end the tour"
 }
 else{
   status = "no rider can assigned"
 }}
 else{
  status = "no rider can assigned"
  
 }

 

   const address = await knex('user_address').select('id').where({user_id:userId})

   const subscription = await knex('subscribed_user_details').select('id').where({user_id: userId})
   const additional = await knex('additional_orders').select('id').where({user_id: userId,status:"delivered"})

   const subscription1 = await knex('subscribed_user_details').select('product_id').where({user_id:userId,rider_status:"delivered"})

   const addon = await knex('add_on_order_items').select('product_id').where({user_id: userId,status:"delivered"})

   

    user.body.map((data) => {

      get_user_detail.user_id = data.id;
      get_user_detail.name = data.name;
      get_user_detail.image = data.image
      ? process.env.BASE_URL + data.image
      : null;
      get_user_detail.mobile_number = data.mobile_number;
      get_user_detail.email = data.email;
      get_user_detail.rider_name =rider.length!=0?rider[0].name : "no rider";
      get_user_detail.rider_status = status;
      get_user_detail.total_bill_due_Amount = bill.length!=0 ? "Bill due amount"+ ' ' +bill[0].total_price.toString():"0";
      get_user_detail.total_bill_count = bill.length.toString()+ ' ' + "bills";
      get_user_detail.total_address_count = address.length.toString()+ ' ' + "address count";
      get_user_detail.total_subcription_count = subscription.length.toString()+ ' ' + "subcription";
      get_user_detail.total_delivered_product_count = subscription1.length +additional.length +addon.length .toString()+ ' ' + "Product Delivery" && "0" ;
    });
   
    res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: get_user_detail });
  } catch (error) {
    console.log(error);

    res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "no user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await parseJwtPayload(req.headers.authorization);

    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    let query = {};

    let image;
    if (req.file) {
      query.image = req.file.destination.slice(1) + "/" + req.file.filename;
    }

    query.name = name;
    query.email = email;

    console.log(query);
    await knex("users").update(query).where({ id: user.user_id });

    // await sendNotification({
      //   include_external_user_ids: [userId],
      //   contents: { en: `Addon Products Created notificaiton` },
      //   headings: { en: "Addon Products Notification" },
      //   name: "Addon Products",
      //   data: {
      //     status: "new_order",
      //     type: 2,
      //     // appointment_id: user._id,
      //     // appointment_chat_id: user_chat._id
      //   },
      // });

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "User Profile Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: error });
  }
};

export const deleteUseraddress = async (req, res) => {
  try {
    const { userId, address_id } = req.body;

    if (!address_id)
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });

    const addresses = await delete_user_address(address_id, userId);

    // await sendNotification({
      //   include_external_user_ids: [userId],
      //   contents: { en: `Addon Products Created notificaiton` },
      //   headings: { en: "Addon Products Notification" },
      //   name: "Addon Products",
      //   data: {
      //     status: "new_order",
      //     type: 2,
      //     // appointment_id: user._id,
      //     // appointment_chat_id: user_chat._id
      //   },
      // });

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "delete successfully" });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const RemoveOrder = async (req, res) => {
  try {
    const { user_id } = req.body;

    const remove = await remove_order(user_id);

    // await sendNotification({
      //   include_external_user_ids: [userId],
      //   contents: { en: `Addon Products Created notificaiton` },
      //   headings: { en: "Addon Products Notification" },
      //   name: "Addon Products",
      //   data: {
      //     status: "new_order",
      //     type: 2,
      //     // appointment_id: user._id,
      //     // appointment_chat_id: user_chat._id
      //   },
      // });

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "remove successfully" });

  } catch (error) {

    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const Edit = async (req, res) => {
  try {
    const { id, user_id, value } = req.body;

    const edit_order = await edit(id, user_id, value);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "edit successfully" });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const changePlan = async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      subscribe_type_id,
      changeplan_name,
      start_date,
    } = req.body;
    if (
      !user_id &&
      product_id &&
      subscribe_type_id &&
      changeplan_name &&
      start_date
    ) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory Fields are missing" });
    }
    const plan = await change_plan(
      changeplan_name,
      start_date,
      subscribe_type_id
    );

    // await sendNotification({
      //   include_external_user_ids: [userId],
      //   contents: { en: `Addon Products Created notificaiton` },
      //   headings: { en: "Addon Products Notification" },
      //   name: "Addon Products",
      //   data: {
      //     status: "new_order",
      //     type: 2,
      //     // appointment_id: user._id,
      //     // appointment_chat_id: user_chat._id
      //   },
      // });

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const checkDeliveryAddress = async (req, res) => {
  try {
    const { address_id } = req.body;

    // let maram_latitude = '10.369384601477861'
    // let maram_longitude = '78.81283443421125'

    const check_address = await checkAddress(address_id);
    console.log(check_address.body[0].latitude)

    if (check_address.body[0].latitude <= 15.9165 || check_address.body[0].longitude <= 80.1325) {
      return res
        .status(200)
        .json({ status: true, message: "successfully delivery" });
    }
    else if (!latitude <= 15.9165 && !longitude <=  80.1325) {
      return res
        .status(200)
        .json({ status: true, message: "out of locations" });
    }

  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const getEmptyBottle = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {


      const this_month_item_detail = await knex("users").select(
          "one_liter_in_hand as delivered_orders",
          "half_liter_in_hand as additional_delivered_orders",
          "one_liter_in_return as remaining_orders",
          "one_liter_in_return as additional_remaining_orders"
        )
        let empty_bottle_in_hand= {
                 one_liter : this_month_item_detail[0].delivered_orders,
                 half_liter : this_month_item_detail[0].additional_delivered_orders
        }
      let empty_bottle_in_return = {
                 one_liter : this_month_item_detail[0].remaining_orders,
                 half_liter : this_month_item_detail[0].additional_remaining_orders
                }
   

      res
        .status(responseCode.SUCCESS)
        .json({ status: true,empty_bottle_in_hand,empty_bottle_in_return });
      }
    else {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "Bottle Not Found" });
    }

  } catch (error) {
    console.log(error);

    res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "no user" });
  }
};

export const userAddressChange = async (req, res) => {
  try {
    const { 
      userId, 
      title, 
      address, 
      landmark, 
      type, 
      address_id 
    } = req.body;

    // await edit_address(userId, address_id, title, address, landmark, type);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

// export const getSingleCalendar = async (req, res) => {
//   try {
//     const { date } = req.body;

//     const single_calendar_data =
//     {
//       "subscription_products": [
//         {
//           "subscription_id": 1,
//           "product_name": "Farm Fresh Natural Milk",
//           "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
//           "product_variation": 1,
//           "product_price": 130,
//           "product_quantity": 2,
//           "subcription_status": "1",
//           "subcription_mode": "Daily Order",
//         },
//       ],
//       "addons_products": [
//         {
//           "product_id": 1,
//           "product_name": "Farm Fresh Natural Milk",
//           "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
//           "product_variation": "1 liter",
//           "product_price": 130,
//           "product_quantity": 2,
//           "remove_status": 0
//         },
//       ],

//     }


//     // await edit_address(userId, address_id, title, address, landmark, type);

//     res
//       .status(responseCode.SUCCESS)
//       .json({ status: true, data: single_calendar_data });
//   } catch (error) {
//     console.log(error);

//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
//   }
// };

// export const getOverallCalendar = async (req, res) => {
//   try {
//     const { date } = req.body;

//     const overall_calendar_data = 
//       {
//         "date": date,
//         "products": {
//           "subscription": {
//             "1-liter": 1,
//             "0.5-liter": 0,
//             "packed-milk": 0
//           },
//           "addons-products": 0,
//           "is_delivered": 0
//         }
//       }
    

//     // await edit_address(userId, address_id, title, address, landmark, type);

//     res
//       .status(responseCode.SUCCESS)
//       .json({ status: true, data: overall_calendar_data });
//   } catch (error) {
//     console.log(error);

//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
//   }
// };

export const getSingleCalendarEvent = async (req, res) => {
  try {
    const { date, userId } = req.body;

    if (!date) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const sub = await single_calendar_data(date, userId);

    if (!sub.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: sub.message });
    }

    for (let i = 0; i < sub.data.length; i++) {

      sub.data[i].product_image = process.env.BASE_URL + sub.data[i].image;
      sub.data[i].quantity = sub.data[i].quantity;
      sub.data[i].price = sub.data[i].price;

      for (let j = 0; j < sub.additional1.length; j++) {

        sub.additional1[0][j].product_id = sub.additional1[0][j].product_id;
        sub.additional1[0][j].image = sub.additional1[0][j].image;


        if (sub.data[i].product_variation_type >= 500) {
          sub.data[i].product_variation_type =
            sub.data[i].product_variation_type / 1000 +
            " " +
            (sub.data[i].product_variation_type === "ml" ? "litre" : sub.data[i].unit_type);
        }
      }


      for (let j = 0; j < sub.add_product.length; j++) {

        sub.add_product[0][j].product_id = sub.add_product[0][j].product_id;
        sub.add_product[0][j].image = sub.add_product[0][j].image;


        if (sub.data[i].product_variation_type >= 500) {
          sub.data[i].product_variation_type =
            sub.data[i].product_variation_type / 1000 +
            " " +
            (sub.data[i].product_variation_type === "ml" ? "litre" : sub.data[i].unit_type);
        }

        delete sub.data[i].unit_value;
        delete sub.data[i].unit_type;
      }

      const response = {
        subscription_products: [sub.data[0]],
        additional_order_products:sub.additional1[0],
        addons_products: sub.add_product[0],

      };

      return res
        .status(responseCode.SUCCESS)
        .json({ status: true, data: { ...response } });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.DATA_NOT_FOUND)
      .json({ status: false, message: messages.DATA_NOT_FOUND });
  }
};

export const getOverallCalendarEvent = async (req, res) => {
  try {
    const { date, userId } = req.body;

    console.log(userId)

    if (!date) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }
    const products = await knex("subscribed_user_details AS sub")
      .select(
        "sub.date",
      )
      .where({ "sub.date": date, "sub.user_id":userId });

      console.log(products[0])


    if (products.length == 0) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Please check date" });
    }

    // console.log(sub.data[0].date)
    const diary = await knex('users').select('today_one_liter', 'today_half_liter')
      .where({ id: userId })

    console.log(diary[0].today_one_liter)

    let status;

    if (diary[0].today_one_liter === 0 || null) {
      status = 0;
    }
    if (diary[0].today_half_liter === 0 || null) {
      status = 0;
    }
    else {
      status = 1;
    }

    const add_on = await knex('add_on_orders').select('id', 'status')
      .where({ user_id: userId })

    let add;
    if (add_on[0].id === 0 || null) {
      add = 0;
    } else {
      add = 1;
    }

    let delivered;

    if (add_on[0].status == "delivered") {
      delivered = 1;
    } else {
      delivered = 0;
    }

    const data = {
      "date": moment(products.date).format("DD-MM-YYYY"),
      "products": {
        "subscription": {
          "1-liter": status,
          "0.5-liter": status,
          "packed-milk": 0
        },
        "addons-products": add,
        "is_delivered": delivered
      }
    }

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: data });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};


export const getBillList = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId)

    const user = await get_user_bill(userId);

    // await sendNotification({
      //   include_external_user_ids: [userId],
      //   contents: { en: `Addon Products Created notificaiton` },
      //   headings: { en: "Addon Products Notification" },
      //   name: "Addon Products",
      //   data: {
      //     status: "new_order",
      //     type: 2,
      //     // appointment_id: user._id,
      //     // appointment_chat_id: user_chat._id
      //   },
      // });
      
    if (user.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "User Not Found" });
    }

    let get_bill = {
      "id": user.id,
      "payment_status": "pending",
      "bill_no": "MA1673413428513",
      "sub_total": 1450
     }

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: user.body });
  } catch (error) {
    console.log(error);

    res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "no user" });
  }
};

export const getSingleBillList = async (req, res) => {
  try {
    const { bill_id,userId } = req.body;

    if (!bill_id) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "Cannot find bill list" });
    }

    const list = await get_single_bill(bill_id,userId);
    // console.log(list)

    if (!list) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "Cannot find bill list" });
    }
    for (let i = 0; i < list.data.length; i++) {
      console.log(list)
      
      list.data[i].id = list.data[i].id;
      list.data[i].bill_value = list.data[i].bill_value;
      list.data[i].date = moment().format("DD-MM-YYYY"); 
    }
    return res.status(responseCode.SUCCESS).json({ status: true, data: list });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: false });
  }
};


// rider location 
export const RiderLocation = async (req,res) => {
  try{
      const { userId } = req.body;
    
    const rider1= await rider_location(userId)
    let data =[];

    let user ={
      'id':rider1.location[0].user_id,
      'name':rider1.location[0].user_name,
      'address':rider1.location[0].user_address,
      'latitude':rider1.location[0].user_latitude,
      'longitude':rider1.location[0].user_longitude,

    }

    let branch ={
      'id':rider1.location[0].admin_id,
      'name':rider1.location[0].admin_name,
      'address':rider1.location[0].admin_address,
      'latitude':rider1.location[0].admin_latitude,
      'longitude':rider1.location[0].admin_longitude,
    }

    let rider ={
      'id':rider1.location[0].rider_id,
      'name':rider1.location[0].rider_name,
      'latitude':rider1.location[0].rider_latitude,
      'longitude':rider1.location[0].rider_longitude,
    }
    return res.status(responseCode.SUCCESS).json({ status: true, data:{user,branch,rider} });

  }
  catch(error){
    console.log(error);
    res.status(500).json({ status: false, message:"no order placed today SORRY!!!!!" });
  }
}

