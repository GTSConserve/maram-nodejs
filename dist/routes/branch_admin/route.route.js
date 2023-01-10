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

//user mapping
rootRouter.get('/user_mapping', _route.getUserMapping);
rootRouter.get('/view_mapping', _route.getViewMapping);
rootRouter.post('/update_view_mapping', _route.updateViewMapping);
rootRouter.get('/tommorrow_route_mapping', _route.tommorowRouteMapping);
var _default = rootRouter;
exports["default"] = _default;