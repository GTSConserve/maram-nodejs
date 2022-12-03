import express from "express";

import { newSubscription,getAllSubscription,singleSubscription,getSubcription_order } from "../../controllers/user/subscription.controller";

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription", newSubscription);
subscriptionRouter.post("/get_all_subscription", getAllSubscription);
subscriptionRouter.post("/single_subscription", singleSubscription);
subscriptionRouter.post("/subcription_order", getSubcription_order);


export default subscriptionRouter;
