import express  from 'express';
import { authenticateJWT } from '../../middlewares/authToken.middleware';
import {login,verifyUserOtp,logout,accountDelete,userMobileNumberChange,UserverifyOtp} from '../../controllers/user/login.controller'

const loginRouter = express.Router({
  caseSensitive: true,
  strict: true
})


loginRouter.post('/login', login)
loginRouter.post('/verifyotp', verifyUserOtp)
loginRouter.post('/logout',authenticateJWT, logout)
loginRouter.post('/account_delete',authenticateJWT, accountDelete)

// user profile mobile number change api

loginRouter.post('/user_mobile_number_change', userMobileNumberChange)
loginRouter.post('/user_verifyotp', UserverifyOtp)


export default loginRouter 