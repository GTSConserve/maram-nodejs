import express from "express";

import { newSubscription,getAllSubscription,getSubscriptionPlan,singleSubscription,getSubcription_order,createAdditionalOrder,removeAdditionalOrder,editAdditionalOrder, Remove_Subscription, changeQuantity, changeSubscriptionplan, pauseSubscription } from "../../controllers/user/subscription.controller";

import {authenticateJWT} from  '../../middlewares/authToken.middleware'

const subscriptionRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

subscriptionRouter.post("/new_subscription",authenticateJWT, newSubscription);
subscriptionRouter.post("/get_all_subscription", authenticateJWT,getAllSubscription);
subscriptionRouter.post("/single_subscription",authenticateJWT, singleSubscription);

subscriptionRouter.get("/get_subscription_plan",authenticateJWT,getSubscriptionPlan);

subscriptionRouter.post("/create_additional_order",authenticateJWT,createAdditionalOrder );
subscriptionRouter.post("/edit_additional_order",authenticateJWT,editAdditionalOrder );
subscriptionRouter.post("/remove_additional_order",authenticateJWT,removeAdditionalOrder );


subscriptionRouter.post("/subcription_order",authenticateJWT, getSubcription_order);

subscriptionRouter.post("/un_subscription",authenticateJWT,Remove_Subscription);

subscriptionRouter.post("/change_quantity",authenticateJWT,changeQuantity);
subscriptionRouter.post("/change_subscriptionplan",changeSubscriptionplan);
subscriptionRouter.post("/pause_subscriptionplan",authenticateJWT,pauseSubscription);



export default subscriptionRouter;
