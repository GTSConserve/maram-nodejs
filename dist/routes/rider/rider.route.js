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
loginRouter.get("/rider_details", _rider.getRiderdetails);
loginRouter.post("/update_rider_status", _rider.updateRiderstatus);
loginRouter.post("/update_rider_location", _rider.updeteRiderLocation);
loginRouter.post("/update_starttour", _rider.updateStartTour);
loginRouter.post("/update_endtour", _rider.updateEndtour);
var _default = loginRouter;
exports["default"] = _default;