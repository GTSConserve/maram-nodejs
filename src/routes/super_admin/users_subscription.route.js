import express  from 'express';
import { getApproveList } from '../../controllers/super_admin/users_subscription/approve.controller';
import { getNewUsers,getAllUsers ,updatePendingList,cancelPendingList,updateAllUsersStatus ,getSingleUser,getCreateUsers,createUsers} from '../../controllers/super_admin/users_subscription/pending.controller';
import { getCancelList } from '../../controllers/super_admin/users_subscription/cancel.controller';

const users_subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})


//new users
users_subscriptionRouter.get("/get_new_users",getNewUsers)
users_subscriptionRouter.get("/get_all_users",getAllUsers)
users_subscriptionRouter.get("/single_user",getSingleUser)
users_subscriptionRouter.post("/update_all_users_status",updateAllUsersStatus)



// pending
// users_subscriptionRouter.get('/get_new_users',getNewUsers)
users_subscriptionRouter.post('/approve_pending_list',updatePendingList)
users_subscriptionRouter.post('/cancel_pending_list',cancelPendingList)



//create users
users_subscriptionRouter.get("/get_create_user",getCreateUsers)
users_subscriptionRouter.post("/create_user",createUsers)


//assign
users_subscriptionRouter.get('/get_assign_list',getApproveList)



// cancel
users_subscriptionRouter.get('/get_cancel_list',getCancelList)


export default users_subscriptionRouter