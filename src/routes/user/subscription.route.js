import express from "express";

import { newSubscription,getAllSubscription,getSubscriptionPlan,singleSubscription,getSubcription_order,createAdditionalOrder,removeAdditionalOrder,editAdditionalOrder } from "../../controllers/user/subscription.controller";

import {authenticateJWT} from  '../../middlewares/authToken.middleware'

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription",authenticateJWT, newSubscription);
subscriptionRouter.post("/get_all_subscription", authenticateJWT,getAllSubscription);
subscriptionRouter.post("/single_subscription",authenticateJWT, singleSubscription);

subscriptionRouter.get("/get_subscription_plan", getSubscriptionPlan);

subscriptionRouter.post("/create_additional_order",authenticateJWT,createAdditionalOrder );
subscriptionRouter.post("/edit_additional_order",authenticateJWT,editAdditionalOrder );
subscriptionRouter.post("/remove_additional_order",authenticateJWT,removeAdditionalOrder );


subscriptionRouter.post("/subcription_order",authenticateJWT, getSubcription_order);


export default subscriptionRouter;
