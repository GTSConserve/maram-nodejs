"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userDetail = require("../../controllers/user/userDetail.controller");
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { edit_address } from '../../models/user/user_details.model';

var userRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    // console.log(req.headers.authorization)
    var index = file.mimetype.indexOf('/') + 1;
    cb(null, Date.now() + "." + file.mimetype.slice(index));
  }
});
var uploadImg = (0, _multer["default"])({
  storage: storage
}).single('image');
userRouter.get('/get_address', _userDetail.getAddress);
userRouter.post("/edit_address", _userDetail.editAddress);
userRouter.get('/get_users', _userDetail.getUser);
userRouter.post('/update_users', uploadImg, _userDetail.updateUser);
userRouter.post('/remove_orders', _userDetail.RemoveOrder);
userRouter.post('/edit_orders', _userDetail.Edit);
userRouter.get('/delete_useraddress', _userDetail.deleteUseraddress);
userRouter.post('/add_user_address', _userDetail.addUserAddress);
userRouter.post('/change_plan', _userDetail.changePlan);
var _default = userRouter;
exports["default"] = _default;