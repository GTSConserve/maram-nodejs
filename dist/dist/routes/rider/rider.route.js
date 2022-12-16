"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rider = require("../../controllers/rider/rider.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var riderRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
riderRouter.post("/login", _rider.login);
var _default = riderRouter;
exports["default"] = _default;