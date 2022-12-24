"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _login = _interopRequireDefault(require("./rider/login.route"));
var _rider = _interopRequireDefault(require("./rider/rider.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Inner routes

var mainRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var defaultRoutes = [{
  path: "/auth",
  route: _login["default"]
}, {
  path: "/rider",
  route: _rider["default"]
}];
defaultRoutes.forEach(function (route) {
  mainRouter.use(route.path, route.route);
});
var _default = mainRouter;
exports["default"] = _default;