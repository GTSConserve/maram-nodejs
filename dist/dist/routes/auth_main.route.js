"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("./auth.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Inner routes

var authRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var defaultRoutes = [{
  path: "/",
  route: _auth["default"]
}];
defaultRoutes.forEach(function (route) {
  authRouter.use(route.path, route.route);
});
var _default = authRouter;
exports["default"] = _default;