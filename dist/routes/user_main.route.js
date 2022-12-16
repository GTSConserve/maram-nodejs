"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _login = _interopRequireDefault(require("./user/login.route"));
var _product = _interopRequireDefault(require("./user/product.route"));
var _general = _interopRequireDefault(require("./user/general.route"));
var _home = _interopRequireDefault(require("./user/home.route"));
var _subscription = _interopRequireDefault(require("./user/subscription.route"));
var _user_details = _interopRequireDefault(require("./user/user_details.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Inner routes

// import userRouter from "./user/userdetails.route";

var mainRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var defaultRoutes = [{
  path: "/auth",
  route: _login["default"]
}, {
  path: "/product",
  route: _product["default"]
}, {
  path: "/subscription",
  route: _subscription["default"]
}, {
  path: "/user_details",
  route: _user_details["default"]
}, {
  path: "/home_details",
  route: _home["default"]
}, {
  path: "/",
  route: _general["default"]
}];
defaultRoutes.forEach(function (route) {
  mainRouter.use(route.path, route.route);
});
var _default = mainRouter;
exports["default"] = _default;