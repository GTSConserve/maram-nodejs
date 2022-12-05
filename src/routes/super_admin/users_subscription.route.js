import express  from 'express';
import { getApproveList } from '../../controllers/super_admin/users_subscription/approve.controller';
import { getPendingList ,updatePendingList,cancelPendingList} from '../../controllers/super_admin/users_subscription/pending.controller';
import { getCancelList } from '../../controllers/super_admin/users_subscription/cancel.controller';

const users_subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})

// pending
users_subscriptionRouter.get('/get_pending_list',getPendingList)
users_subscriptionRouter.post('/approve_pending_list',updatePendingList)
users_subscriptionRouter.post('/cancel_pending_list',cancelPendingList)



//assign
users_subscriptionRouter.get('/get_assign_list',getApproveList)



// cancel
users_subscriptionRouter.get('/get_cancel_list',getCancelList)


export default users_subscriptionRouter