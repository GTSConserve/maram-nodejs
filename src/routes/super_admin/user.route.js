import express  from 'express';

import {getBill,createUserBill} from '../../controllers/super_admin/users/users.controller'

const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})


userRouter.get("/get_bill", getBill);
userRouter.post("/create_user_bill", createUserBill);




export default userRouter