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
userRouter.post("/remove_orders", _userDetail.RemoveOrder);
userRouter.post("/edit_orders", _userDetail.Edit);
userRouter.post("/change_plan", _userDetail.changePlan);

// empty bottle tracking api

userRouter.get("/get_empty_bottle", _authToken.authenticateJWT, _userDetail.getEmptyBottle);
var _default = userRouter;
exports["default"] = _default;