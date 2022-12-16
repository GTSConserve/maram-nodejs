"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _pending = require("../../controllers/branch_admin/subscription/pending.controller");
var _subscribed = require("../../controllers/branch_admin/subscription/subscribed.controller");
var _cancelled = require("../../controllers/branch_admin/subscription/cancelled.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var subscriptionRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
subscriptionRouter.get('/assigned', _pending.getAssigned);
subscriptionRouter.post('/subscribed', _pending.updateSubscribed);
subscriptionRouter.post('/cancel', _pending.updateCancel);
subscriptionRouter.get('/subscribed', _subscribed.getSubscription);
subscriptionRouter.get('/cancelled', _cancelled.getCancelled);
var _default = subscriptionRouter;
exports["default"] = _default;