import {
  loginUser,
  verifyOtp,
  insertUser,
  updateUserOtp,
  deleteUser,
  logoutUser,
} from "../../models/user/user.model";
import responseCode from "../../constants/responseCode";
import messageCode from "../../constants/messages";
import { createToken } from "../../services/jwt.service";
import {
  loginValidator,
  NumberValidator,
  verifyOtpValidator,
} from "../../services/validator.service";
import format from "date-fns/format";
import { userGroup } from "../../constants/controls";
import logger from "../../logger/logger";
import { updateUserToken } from "../../models/user/user.model";
import knex from "../../services/db.service";
import messages from "../../constants/messages";
import { phoneNumberValidator } from "../../utils/helper.util";

export const accountDelete = async (req,res) => {
  try {
      const {userId} = req.body

      await knex("users").update({status : "0"}).where({id : userId})

      return res.status(responseCode.SUCCESS).json({status : true , message : "Account Deleted Successfully"})

  } catch (error) {
    console.log(error)
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({status : false , message : messages.SERVER_ERROR})
  }
}

export const login = async (req, res) => {
  try {
    const payload = loginValidator(req.body);

    const { mobile_number, fcmToken, device, appOsFormat, appVersion } =
      payload;
console.log(payload)
    if (payload.status) {
      // const checkPhoneNumber = await loginUser(mobile_number)
      const checkPhoneNumber = await knex
        .select("id")
        .from("users")
        .where({ mobile_number });
        console.log(checkPhoneNumber)
      let query;
      let userId = 0;
      // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
      const otp = "1234";

      let users = await knex.select("id").from("users");
      let users_length = users.length + 1;

      console.log(checkPhoneNumber);

      if (checkPhoneNumber.length === 0) {
        query = await insertUser(payload, otp, users_length);

        userId = users_length;
      } else {
        query = await updateUserOtp(payload, otp);

        userId = checkPhoneNumber[0].id;
      }

      if (query.status === responseCode.SUCCESS) {
        return res
          .status(query.status)
          .json({
            status: true,
            user_id: userId,
            message: messageCode.LOGINMESSAGE.OTP_SENT,
          });
      } else {
        res
          .status(query.status)
          .json({ status: false, message: query.message });
      }
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: payload.message });
    }
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);
    res.status(500).send("Error!");
  }
};

export const verifyUserOtp = async (req, res) => {
  try {
    
    const today = format(new Date(), "yyyy-MM-dd H:i:s");
   
    const payload = verifyOtpValidator(req.body);
    console.log(payload);

    const { otp, userId } = payload;

    const is_user = await knex("users").select("id","otp").where({ id: userId });

    if (is_user.length === 0) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "User Not Found" });
    }

    if (payload.status === true) {
      const response = await verifyOtp(otp, userId, today);

      if (is_user[0].otp == otp) {
        const tokens = createToken({
           user_id : userId,
        });

        if (tokens.status) {
          await updateUserToken(tokens.refreshToken, userId);

          res
            .status(responseCode.SUCCESS)
            .json({
              status: true,
              token: tokens.token,
              message: messageCode.LOGINMESSAGE.OTP_VERIFY,
            });
        } else {
          res
            .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: "Token generation failed" });
        }
      } else {
        res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "otp mismatch" });
      }
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: payload.message });
    }
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);

    res.status(500).send("Error!");
  }
};

export const logout = async (req, res) => {
  try {
    const {userId} = req.body;

    if (userId) {
      const user = await logoutUser(userId);

      console.log(userId);
      res
        .status(responseCode.SUCCESS)
        .json({ status: true, message: "Succesfully Logout.." });
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Logout failed.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

// export const userDeactive = async (req, res) => {
//   try {
//     const { userId } = req.body
//     const user = await deleteUser(userId)
//     return res.status(responseCode.SUCCESS).json({ status: true, message: "Account Deleted SuccessFully" })

//   } catch (error) {
//     return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Server Error" })
//   }
// }

export const userMobileNumberChange = async (req, res) => {
  try {

    const payload = req.body;
    const payload1 = NumberValidator(req.body);
 
    const {user_id,mobile_number} = payload;

    if (payload1.status) {
    
      // const checkPhoneNumber = await loginUser(mobile_number)
      const checkPhoneNumber = await knex
        .update({mobile_number:mobile_number})
        .from("users")
        .where({ id:user_id });
        // console.log(checkPhoneNumber)
      let query;
      // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
      const otp = "1234";

      

      if (checkPhoneNumber.length === 0) {
        query = await insertUser(payload, otp);

      } else {
        query = await updateUserOtp(payload, otp);

      }

      if (query.status === responseCode.SUCCESS) {
        return res
          .status(query.status)
          .json({
            status: true,
            user_id: payload.user_id,
            message: messageCode.LOGINMESSAGE.OTP_SENT,
          });
      } else {
        res
          .status(query.status)
          .json({ status: false, message: query.message });
      }
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: payload.message });
    }
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);
    res.status(500).send("Error!");
  }
};

export const UserverifyOtp = async (req, res) => {
  try {
    
    const today = format(new Date(), "yyyy-MM-dd H:i:s");
   
    const payload = verifyOtpValidator(req.body);
    console.log(payload);

    const { otp, userId } = payload;

    const is_user = await knex("users").select("id","otp").where({ id: userId });

    if (is_user.length === 0) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "User Not Found" });
    }

    if (payload.status === true) {
      const response = await verifyOtp(otp, userId, today);

      if (is_user[0].otp == otp) {
        const tokens = createToken({
           user_id : userId,
        });

        if (tokens.status) {
          await updateUserToken(tokens.refreshToken, userId);

          res
            .status(responseCode.SUCCESS)
            .json({
              status: true,
              token: tokens.token,
              message: messageCode.LOGINMESSAGE.OTP_VERIFY,
            });
        } else {
          res
            .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: "Token generation failed" });
        }
      } else {
        res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "otp mismatch" });
      }
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: payload.message });
    }
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);

    res.status(500).send("Error!");
  }
};
