"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _general = require("../../controllers/user/general.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var appsettingRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
appsettingRouter.get("/app_settings", _general.getAppSetting);
appsettingRouter.post("/add_feed_backs", _general.addFeedback);
var _default = appsettingRouter;
exports["default"] = _default;