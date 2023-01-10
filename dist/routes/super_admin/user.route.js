"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("../../controllers/super_admin/users/users.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
userRouter.get("/get_bill", _users.getBill);
userRouter.post("/create_user_bill", _users.createUserBill);
var _default = userRouter;
exports["default"] = _default;