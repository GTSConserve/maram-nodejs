import responseCode from "../../constants/responseCode";
import { parseJwtPayload } from "../../services/jwt.service";
import { userAddressValidator } from "../../services/validator.service";
import knex from "../../services/db.service";
import {
  change_plan,
  delete_user_address, 
  edit,
  edit_address,
  get_address,
  get_user,
  remove_order,
  checkAddress
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
          
          longitude: payload.longitude,


        })
        .where({ user_id: payload.user_id });

      res
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
    const { userId, title, address, landmark, type, address_id } = req.body;

    await edit_address(userId, address_id, title, address, landmark, type);

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
    if (user.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "User Not Found" });
    }
    
    let get_user_detail = {};
    user.body.map((data) => {
      get_user_detail.user_id = data.id;
      get_user_detail.name = data.name;
      get_user_detail.image = data.image
        // ? process.env.BASE_URL + data.image
        // : null;
      get_user_detail.mobile_number = data.mobile_number;
      get_user_detail.email = data.email;
      get_user_detail.total_bill_due_Amount = 'Bill due amount ₹0'
      get_user_detail.total_bill_count = '0 bills'
      get_user_detail.total_address_count = '0 Saved Address'
      get_user_detail.total_subcription_count = '0 subscriptions'
      get_user_detail.total_delivered_product_count = '0 Product Delivery'
      get_user_detail.rider_status = 'No rider Assign'
      get_user_detail.rider_status = '0 empty bottles in hand'
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
        .json({ status: false, message: messages.MANDATORY_ERROR});

    const addresses = await delete_user_address(address_id,userId);


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
    
    if (check_address.body[0].latitude <= 10.9956 || check_address.body[0].longitude <= 77.2852) {
      
    
      return res
      .status(200) 
      .json({ status: true, message: "successfully delivery" });  
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

      let get_user_bottle_detail = 
      {
        "empty_bottle_in_hand_1_litre": "0",
        "empty_bottle_in_hand_0.5_litre": "30",
        "empty_bottle_return_1_litre": "0",
        "empty_bottle_return_0.5_litre": "30"
      }
    
      res
      .status(responseCode.SUCCESS)
      .json({ status: true, this_month_item_detail: get_user_bottle_detail });
    }
    else{
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
    const { userId, title, address, landmark, type, address_id } = req.body;

    // await edit_address(userId, address_id, title, address, landmark, type);

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

