"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _order = require("../../controllers/branch_admin/orders/order.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var orderRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
orderRouter.get('/daily_orders', _order.getDailyOrders);
var _default = orderRouter;
exports["default"] = _default;