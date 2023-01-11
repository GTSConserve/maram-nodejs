"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _subscription = require("../../controllers/user/subscription.controller");
var _authToken = require("../../middlewares/authToken.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var subscriptionRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
subscriptionRouter.post("/new_subscription", _authToken.authenticateJWT, _subscription.newSubscription);
subscriptionRouter.post("/get_all_subscription", _authToken.authenticateJWT, _subscription.getAllSubscription);
subscriptionRouter.post("/single_subscription", _authToken.authenticateJWT, _subscription.singleSubscription);
subscriptionRouter.get("/get_subscription_plan", _authToken.authenticateJWT, _subscription.getSubscriptionPlan);
subscriptionRouter.post("/create_additional_order", _authToken.authenticateJWT, _subscription.createAdditionalOrder);
subscriptionRouter.post("/edit_additional_order", _authToken.authenticateJWT, _subscription.editAdditionalOrder);
subscriptionRouter.post("/remove_additional_order", _authToken.authenticateJWT, _subscription.removeAdditionalOrder);
subscriptionRouter.post("/subcription_order", _authToken.authenticateJWT, _subscription.getSubcription_order);
subscriptionRouter.post("/un_subscription", _authToken.authenticateJWT, _subscription.Remove_Subscription);
subscriptionRouter.post("/change_quantity", _authToken.authenticateJWT, _subscription.changeQuantity);
subscriptionRouter.post("/change_subscriptionplan", _authToken.authenticateJWT, _subscription.changeSubscriptionplan);
subscriptionRouter.post("/pause_subscriptionplan", _authToken.authenticateJWT, _subscription.pauseSubscription);
var _default = subscriptionRouter;
exports["default"] = _default;