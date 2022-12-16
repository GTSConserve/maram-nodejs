"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _route = require("../../controllers/branch_admin/route/route.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
rootRouter.get('/get_route', _route.getRoute);
rootRouter.post('/create_route', _route.createRoute);
rootRouter.post('/update_route_status', _route.updateRouteStatus);
rootRouter.post('/update_route', _route.updateRoute);
var _default = rootRouter;
exports["default"] = _default;