"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _home = require("../../controllers/branch_admin/home/home.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var homeRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
homeRouter.get('/home', _home.getHomePage);
homeRouter.post('/update_daily_task', _home.updateDailyTask);
var _default = homeRouter;
exports["default"] = _default;