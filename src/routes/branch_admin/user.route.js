import express  from 'express';
import { getusers,getSingleUser } from '../../controllers/branch_admin/users/users.controller';



const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})
// userRouter.get('/get_route',getRoute)
userRouter.get('/branch_user',getusers)

userRouter.get('/single_user',getSingleUser)






export default userRouter