import express  from 'express';
import { getusers,getSingleUser,getAddUser,createUser } from '../../controllers/branch_admin/users/users.controller';



const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})
// userRouter.get('/get_route',getRoute)
userRouter.get('/branch_user',getusers)
userRouter.get('/single_user',getSingleUser)


// add user
userRouter.get('/get_add_users',getAddUser)
userRouter.post('/create_user',createUser)




export default userRouter