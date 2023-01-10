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
userRouter.get("/get_bill", _users.getBill);
userRouter.post("/create_user_bill", _users.createUserBill);

// userRouter.get('/get_route',getRoute)
userRouter.get("/branch_user", _users.getusers);
userRouter.get("/single_user", _users.getSingleUser);

// additional orders
userRouter.post("/create_additional", _users.createAdditional);
userRouter.post("/edit_additional", _users.editAdditional);
userRouter.post("/cancel_additional", _users.cancelAdditional);

//paused
userRouter.post("/create_pause", _users.createPaused);
userRouter.post("/edit_pause", _users.editPaused);

// subscription
userRouter.post("/unsubscribe_subscription", _users.unsubscribeSubscription);
userRouter.post("/subscribe_subscription", _users.subscribeSubscription);

// add user
userRouter.get("/get_add_users", _users.getAddUser);
userRouter.post("/create_user", _users.createUser);

// new subscription product
userRouter.post("/new_subscription", _users.newSubscription);
userRouter.post("/new_add_on", _users.newAddOn);

// chnage user plan
userRouter.post("/change_user_plan", _users.changeUserPlan);

// edit qty
userRouter.post("/update_qty", _users.updateQty);
var _default = userRouter;
exports["default"] = _default;