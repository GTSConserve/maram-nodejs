"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rider = require("../../controllers/rider/rider.controller");
var _authToken = require("../../middlewares/authToken.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var riderRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
riderRouter.post("/rider_details", _rider.getRiderdetails);
riderRouter.post("/update_rider_status", _rider.updateRiderstatus);
riderRouter.post("/update_rider_location", _rider.updeteRiderLocation);
riderRouter.post("/update_start_tour", _rider.updateStartTour);
riderRouter.post("/update_end_tour", _rider.updateEndtour);
riderRouter.post("/get_single_order", _rider.getSingleorder);
riderRouter.post("/order_status_update", _rider.orderStatusUpdate);
riderRouter.post("/rider_dashboard", _rider.riderDashboard);
riderRouter.post("/cancel_order", _rider.cancelOrder);
riderRouter.post("/order_list", _rider.OrderList);
riderRouter.post("/location_check", _rider.LocationCheck);
riderRouter.post("/home_delivery_details", _rider.homeDelivery);
var _default = riderRouter;
exports["default"] = _default;