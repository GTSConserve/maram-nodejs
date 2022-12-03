import { loginUser, verifyOtp, insertUser, updateUserOtp, deleteUser, logoutUser } from "../../models/user/user.model"
import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import { createToken } from "../../services/jwt.service"
import { loginValidator, verifyOtpValidator } from "../../services/validator.service"
import format from "date-fns/format"
import { userGroup } from "../../constants/controls"
import logger from "../../logger/logger"
import { updateUserToken } from "../../models/user/user.model"
import knex from "../../services/db.service"

export const login = async (req, res) => {
  try {
    const payload = loginValidator(req.body)

    const { mobile_number, fcmToken, device, appOsFormat, appVersion } = payload

    if (payload.status) {

      const checkPhoneNumber = await loginUser(mobile_number)
      let query;
      let userId = 0
      // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
      const otp = '1234'

      const users = await knex.select('id').from('users')

      if (!checkPhoneNumber.length) {

        const today = format(new Date(), 'yyyy-MM-dd H:i:s')

        query = await insertUser(payload, otp, today)

        userId = users.length + 1

      } else {

        query = await updateUserOtp(payload, otp)

        userId = checkPhoneNumber[0].user_id

      }

      if (query.status === responseCode.SUCCESS) {
        res.status(query.status).json({ status: true, user_id: userId, message: messageCode.LOGINMESSAGE.OTP_SENT })
      } else {
        res.status(query.status).json({ status: false, message: query.message })
      }
    } else {

      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
    }
  }
  catch (error) {
    logger.error('Whooops! This broke with error: ', error)
    res.status(500).send('Error!')
  }
}

export const verifyUserOtp = async (req, res) => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd H:i:s')

    const payload = verifyOtpValidator(req.body)

    const { otp, userId } = payload


    if (payload.status === true) {

      const response = await verifyOtp(otp, userId, today)

      if (response) {

        const tokens = createToken({ user_id: userId, user_group_id: userGroup.USER_GROUP_ID })

        if (tokens.status) {

          await updateUserToken(tokens.refreshToken, userId)

          res.status(responseCode.SUCCESS).json({ status: true, token: tokens.token, message: messageCode.LOGINMESSAGE.OTP_VERIFY })
        }
        else {
          res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({ status: false, message: "Token generation failed" })
        }
      }
      else {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "otp mismatch" })
      }
    }
    else {
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
    }
  } catch (error) {

    logger.error('Whooops! This broke with error: ', error)

    res.status(500).send('Error!')
  }
}

export const logout = async (req, res) => {
  try {

    const userId = req.body

    if (userId) {

      const user = await logoutUser(userId)

      console.log(userId)
      res.status(responseCode.SUCCESS).json({ status: true, message: "Succesfully Logout.." })
    }
    else {
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Logout failed.." })
    }


  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: false, message: "Server Error" })
  }
}

// export const userDeactive = async (req, res) => {
//   try {
//     const { userId } = req.body
//     const user = await deleteUser(userId)
//     return res.status(responseCode.SUCCESS).json({ status: true, message: "Account Deleted SuccessFully" })

//   } catch (error) {
//     return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Server Error" })
//   }
// }