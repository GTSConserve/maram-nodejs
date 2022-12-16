"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth/auth.controller");
var _authToken = require("../middlewares/authToken.middleware");
var _helper = require("../utils/helper.util");
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var path = "./uploads/admin_users";
var storage = (0, _helper.multerStorage)(path);
var uploadImg = (0, _multer["default"])({
  storage: storage
}).single("image");
var authRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
authRouter.get('/login', _auth.loginForm);
authRouter.post('/login', _auth.loginHandler);
authRouter.get('/logout', _auth.logoutHandler);
authRouter.get('/get_profile', _authToken.authenticateJWTSession, _auth.getProfile);
authRouter.post('/update_profile', _authToken.authenticateJWTSession, uploadImg, _auth.updateProfile);
authRouter.get('/get_change_password', _auth.getChangePassword);
authRouter.post('/update_change_password', _auth.updateChangePassword);
authRouter.get('/get_password_recovery', _auth.getPasswordRecovery);
authRouter.post('/forgot_password', _auth.sendPasswordResetEmail);
authRouter.post('/update_email_password', _auth.updateEmailPassword);
var _default = authRouter;
exports["default"] = _default;