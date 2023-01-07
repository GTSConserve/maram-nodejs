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
  try {
    const { userId } = req.body;

    const user = await get_user(userId);

    console.log(user)
    if (user.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "User Not Found" });
    }

    let get_user_detail = {};
     let status = [];
    if(user.rider[0].status==0){
      status.push("rider is assigned")
    }
    else if(user.rider[0].status==1){
      status.push("rider can start the tour and delivered soon")
    }
    else if(user.rider[0].status==2){
      status.push("rider can end the tour")
    }
    else{
      status.push("no rider can assigned")
    }

    user.body.map((data) => {

      get_user_detail.user_id = data.id;
      get_user_detail.name = data.name;
      get_user_detail.image = data.image
      ? process.env.BASE_URL + data.image
      : null;
      get_user_detail.mobile_number = data.mobile_number;
      get_user_detail.email = data.email;
      get_user_detail.rider_name = user.rider[0].name;
      get_user_detail.rider_status = status;
      get_user_detail.total_bill_due_Amount = user.bill[0].subscription_price;
      get_user_detail.total_bill_count = user.bill[0].additional_price;
      get_user_detail.total_address_count = user.sub[0].additional_delivered_quantity;
      get_user_detail.total_subcription_count = user.sub[0].subscription_delivered_quantity;
      get_user_detail.total_delivered_product_count = user.sub[0].total_delivered_quantity;
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

    if (check_address.body[0].latitude <= 12.9165 || check_address.body[0].longitude <= 79.1325) {
      return res
        .status(200)
        .json({ status: true, message: "successfully delivery" });
    }
    else if (!latitude <= 12.9165 && !longitude <= 79.1325) {
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

export const getSingleCalendar = async (req, res) => {
  try {
    const { date } = req.body;

    const single_calendar_data =
    {
      "subscription_products": [
        {
          "subscription_id": 1,
          "product_name": "Farm Fresh Natural Milk",
          "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
          "product_variation": 1,
          "product_price": 130,
          "product_quantity": 2,
          "subcription_status": "1",
          "subcription_mode": "Daily Order",
        },
      ],
      "addons_products": [
        {
          "product_id": 1,
          "product_name": "Farm Fresh Natural Milk",
          "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
          "product_variation": "1 liter",
          "product_price": 130,
          "product_quantity": 2,
          "remove_status": 0
        },
      ],

    }


    // await edit_address(userId, address_id, title, address, landmark, type);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: single_calendar_data });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const getOverallCalendar = async (req, res) => {
  try {
    const { date } = req.body;

    const overall_calendar_data = 
      {
        "date": date,
        "products": {
          "subscription": {
            "1-liter": 1,
            "0.5-liter": 0,
            "packed-milk": 0
          },
          "addons-products": 0,
          "is_delivered": 0
        }
      }
    

    // await edit_address(userId, address_id, title, address, landmark, type);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: overall_calendar_data });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};


export const getBillList = async (req, res) => {
  try {
    const { userId } = req.body;

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

    // let get_bill = {};
    // user.body.map((data) => {
    //   get_bill.id = data.id;
    //   get_bill.user_id = data.user_id;
    //   get_bill.payment_id = data.id // payment id set to id
    //   // ? process.env.BASE_URL + data.image
    //   // : null;
    //   get_bill.items = data.items;
    //   get_bill.bill_no = data.bill_no
    //   get_bill.bill_value = data.bill_value;
    //   get_bill.status = data.status;
    // });

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
    const { bill_id } = req.body;

    if (!bill_id) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "Cannot find bill list" });
    }

    const list = await get_single_bill(bill_id);

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

