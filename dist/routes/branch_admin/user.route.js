"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("../../controllers/branch_admin/users/users.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
// userRouter.get('/get_route',getRoute)
userRouter.get('/branch_user', _users.getusers);
userRouter.get('/single_user', _users.getSingleUser);

// add user
userRouter.get('/get_add_users', _users.getAddUser);
userRouter.post('/create_user', _users.createUser);

// new subscription product
userRouter.post('/new_subscription', _users.newSubscription);
userRouter.post('/new_add_on', _users.newAddOn);
var _default = userRouter;
exports["default"] = _default;