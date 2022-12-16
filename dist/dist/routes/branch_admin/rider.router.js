"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rider = require("../../controllers/branch_admin/rider/rider.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var riderRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
riderRouter.get('/get_rider', _rider.getRiders);
riderRouter.post('/create_rider', _rider.createRider);
riderRouter.post('/update_rider', _rider.updateRider);
riderRouter.post('/update_rider_status', _rider.updateRiderStatus);
var _default = riderRouter;
exports["default"] = _default;