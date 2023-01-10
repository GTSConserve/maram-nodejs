"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rider = require("../../controllers/rider/rider.controller");
var _authToken = require("../../middlewares/authToken.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var loginRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
loginRouter.get("/app_controls", _rider.getAppControls);
loginRouter.post("/login", _authToken.nonMandatoryToken, _rider.login);
loginRouter.post("/log_out", _authToken.nonMandatoryToken, _rider.logout);
// loginRouter.post("/rider_details",getRiderdetails)

// loginRouter.post("/update_rider_status",updateRiderstatus);
// loginRouter.post("/update_rider_location",updeteRiderLocation);
// loginRouter.post("/update_start_tour",updateStartTour);
// loginRouter.post("/update_end_tour",updateEndtour);

// loginRouter.post("/get_single_order",getSingleorder);
// loginRouter.post("/order_status_update",orderStatusUpdate);
// loginRouter.post("/rider_dashboard",riderDashboard);
var _default = loginRouter;
exports["default"] = _default;