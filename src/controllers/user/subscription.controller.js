import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";
import moment from "moment";

import {
  new_subscription,
  get_subscription_product,
  single_subscription,
  get_subcription_order,
} from "../../models/user/subscription.model";

export const newSubscription = async (req, res) => {
  try {
    const {
      userId,
      subscription_plan_id,
      product_id,
      user_address_id,
      start_date,
      qty,
      customized_days,
    } = req.body;

    if (
      !subscription_plan_id ||
      !product_id ||
      !user_address_id ||
      !start_date ||
      !qty
    ) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    if (subscription_plan_id == 3) {
      if (!customized_days || customized_days.length === 0) {
        return res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: messages.MANDATORY_ERROR });
      }
    }

    const subscription = await new_subscription(
      userId,
      subscription_plan_id,
      product_id,
      user_address_id,
      start_date,
      qty,
      customized_days
    );
    

    if (subscription.status) {
      return res
        .status(responseCode.SUCCESS)
        .json({ status: true, message: "Subscription Starts Successfully" });
    } else {
      return res
        .status(responseCode.SUCCESS)
        .json({ status: false, message: subscription.message });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};

export const getAllSubscription = async (req, res) => {
  try {
    const { userId } = req.body;

    const subscription_product = await get_subscription_product(userId);

    if (!subscription_product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: subscription_product.message });
    }

    for (let i = 0; i < subscription_product.data.length; i++) {
      subscription_product.data[i].image =
        process.env.BASE_URL + subscription_product.data[i].image;

      if (subscription_product.data[i].unit_value >= 500) {
        subscription_product.data[i].unit =
          subscription_product.data[i].unit_value / 1000 +
          " " +
          (subscription_product.data[i].unit_type === "ml"
            ? "litre"
            : subscription_product.data[i].unit_type);
      } else {
        subscription_product.data[i].unit =
          subscription_product.data[i].unit_value +
          " " +
          subscription_product.data[i].unit_type.toString();
      }
      delete subscription_product.data[i].unit_value;
      delete subscription_product.data[i].unit_type;
    }

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: subscription_product.data });
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};

export const singleSubscription = async (req, res) => {
  try {
    const { userId, subscription_id } = req.body;

    if (!subscription_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const sub = await single_subscription(userId, subscription_id);

    if (!sub.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: sub.message });
    }

    for (let i = 0; i < sub.data.length; i++) {
      sub.data[i].image = process.env.BASE_URL + sub.data[i].image;
      sub.data[i].subscription_start_date = 
      moment(sub.data[i].subscription_start_date).format("MMM Do YYYY");   
        

      if (sub.data[i].unit_value >= 500) {
        sub.data[i].unit =
          sub.data[i].unit_value / 1000 +
          " " +
          (sub.data[i].unit_type === "ml" ? "litre" : sub.data[i].unit_type);
      } else {
        sub.data[i].unit =
          sub.data[i].unit_value + " " + sub.data[i].unit_type.toString();
      }
      delete sub.data[i].unit_value;
      delete sub.data[i].unit_type;
    }

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: sub.data });
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};

export const getSubcription_order = async (req,res) => {
  try {
    const{user_id,type_id,name,product_id,value} = req.body;
    
    const subscription_order = await get_subcription_order(user_id,type_id,name,product_id,value);
if (!user_id) {
        return res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "user id is missing" });
      }
      if (!type_id) {
        return res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "type id is missing" });
      }
    return res
    .status(responseCode.SUCCESS)
    .json({ status: true, message:"order confirmed"});
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}
