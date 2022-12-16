"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _subscription = _interopRequireDefault(require("./branch_admin/subscription.route"));
var _route = _interopRequireDefault(require("./branch_admin/route.route"));
var _rider = _interopRequireDefault(require("./branch_admin/rider.router"));
var _purchaseOrder = _interopRequireDefault(require("./branch_admin/purchaseOrder.route"));
var _home = _interopRequireDefault(require("./branch_admin/home.route"));
var _order = _interopRequireDefault(require("./branch_admin/order.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mainRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var defaultRoutes = [{
  path: "/home",
  route: _home["default"]
}, {
  path: "/subscription",
  route: _subscription["default"]
}, {
  path: "/route",
  route: _route["default"]
}, {
  path: "/rider",
  route: _rider["default"]
}, {
  path: "/purchaseOrder",
  route: _purchaseOrder["default"]
}, {
  path: "/order",
  route: _order["default"]
}];
defaultRoutes.forEach(function (route) {
  mainRouter.use(route.path, route.route);
});
var _default = mainRouter;
exports["default"] = _default;