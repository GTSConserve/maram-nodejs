"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _settings = _interopRequireDefault(require("./super_admin/settings.router"));
var _branch = _interopRequireDefault(require("./super_admin/branch.route"));
var _places = _interopRequireDefault(require("./super_admin/places.router"));
var _product = _interopRequireDefault(require("./super_admin/product.route"));
var _orders = _interopRequireDefault(require("./super_admin/orders.route"));
var _users_subscription = _interopRequireDefault(require("./super_admin/users_subscription.route"));
var _reports = _interopRequireDefault(require("./super_admin/reports.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Inner routes

var mainRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var defaultRoutes = [{
  path: "/settings",
  route: _settings["default"]
}, {
  path: "/branch",
  route: _branch["default"]
}, {
  path: "/places",
  route: _places["default"]
}, {
  path: "/product",
  route: _product["default"]
}, {
  path: "/orders",
  route: _orders["default"]
}, {
  path: "/users_subscription",
  route: _users_subscription["default"]
}, {
  path: "/reports",
  route: _reports["default"]
}];
defaultRoutes.forEach(function (route) {
  mainRouter.use(route.path, route.route);
});
var _default = mainRouter;
exports["default"] = _default;