"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _add_on_products = require("../../controllers/super_admin/reports/add_on_products.controller");
var _subscription = require("../../controllers/super_admin/reports/subscription.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var reportsRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
reportsRouter.get('/get_add_on_product', _add_on_products.getAddOnProduct);
reportsRouter.get('/get_subscription_product', _subscription.getSubscriptionProduct);
var _default = reportsRouter;
exports["default"] = _default;