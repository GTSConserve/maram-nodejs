import express  from 'express';

import { getNewUsers,updateSubscribed,updateCancel,getExistUsers,updateSubscribedExistUser } from '../../controllers/branch_admin/subscription/pending.controller';

import { getSubscription } from '../../controllers/branch_admin/subscription/subscribed.controller';
import { getCancelled } from '../../controllers/branch_admin/subscription/cancelled.controller';

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true
})




subscriptionRouter.get('/get_new_users',getNewUsers)

subscriptionRouter.get('/get_exist_users',getExistUsers)

subscriptionRouter.post('/subscribed',updateSubscribed)

// subscriptionRouter.post('/subscribed_exist_user',updateSubscribedExistUser)

subscriptionRouter.post('/cancel',updateCancel)



subscriptionRouter.get('/subscribed',getSubscription)


subscriptionRouter.get('/cancelled',getCancelled)


export default subscriptionRouter