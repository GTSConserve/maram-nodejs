"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userDetail = require("../../controllers/user/userDetail.controller");
var _multer = _interopRequireDefault(require("multer"));
var _authToken = require("../../middlewares/authToken.middleware");
var _helper = require("../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var path = "./uploads/users";
var storage = (0, _helper.multerStorage)(path);
var uploadImg = (0, _multer["default"])({
  storage: storage
}).single("image");
userRouter.get("/get_users", _authToken.authenticateJWT, _userDetail.getUser);
userRouter.post("/update_users", _authToken.authenticateJWT, uploadImg, _userDetail.updateUser);
userRouter.post("/add_user_address", _authToken.authenticateJWT, _userDetail.addUserAddress);
userRouter.get("/get_address", _authToken.authenticateJWT, _userDetail.getAddress);
userRouter.post("/edit_address", _authToken.authenticateJWT, _userDetail.editAddress);
userRouter.post("/delete_user_address", _authToken.authenticateJWT, _userDetail.deleteUseraddress);
userRouter.post("/check_delivery_address", _authToken.authenticateJWT, _userDetail.checkDeliveryAddress);
userRouter.post("/remove_orders", _authToken.authenticateJWT, _userDetail.RemoveOrder);
userRouter.post("/edit_orders", _authToken.authenticateJWT, _userDetail.Edit);
userRouter.post("/change_plan", _authToken.authenticateJWT, _userDetail.changePlan);
userRouter.get("/get_empty_bottle", _authToken.authenticateJWT, _userDetail.getEmptyBottle);
userRouter.post("/get_bill_list", _authToken.authenticateJWT, _userDetail.getBillList);
userRouter.post("/get_single_bill_list", _authToken.authenticateJWT, _userDetail.getSingleBillList);
userRouter.post("/user_address_change", _authToken.authenticateJWT, _userDetail.userAddressChange);
userRouter.post("/single_calendar", _authToken.authenticateJWT, _userDetail.getSingleCalendarEvent);
userRouter.post("/over_all_calendar", _authToken.authenticateJWT, _userDetail.getOverallCalendarEvent);

// rider details 
userRouter.post("/rider_location", _authToken.authenticateJWT, _userDetail.RiderLocation);
var _default = userRouter;
exports["default"] = _default;