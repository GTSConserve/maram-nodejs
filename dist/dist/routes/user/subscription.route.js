"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _subscription = require("../../controllers/user/subscription.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var subscriptionRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
subscriptionRouter.post("/new_subscription", _subscription.newSubscription);
subscriptionRouter.post("/get_all_subscription", _subscription.getAllSubscription);
subscriptionRouter.post("/single_subscription", _subscription.singleSubscription);
subscriptionRouter.post("/subcription_order", _subscription.getSubcription_order);
var _default = subscriptionRouter;
exports["default"] = _default;