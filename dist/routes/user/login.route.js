"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authToken = require("../../middlewares/authToken.middleware");
var _login = require("../../controllers/user/login.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var loginRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
loginRouter.post('/login', _login.login);
loginRouter.post('/verifyotp', _login.verifyUserOtp);
loginRouter.post('/logout', _authToken.authenticateJWT, _login.logout);
loginRouter.post('/account_delete', _authToken.authenticateJWT, _login.accountDelete);

// user profile mobile number change api

loginRouter.post('/user_mobile_number_change', _authToken.authenticateJWT, _login.userMobileNumberChange);
loginRouter.post('/user_verifyotp', _authToken.authenticateJWT, _login.UserverifyOtp);
var _default = loginRouter;
exports["default"] = _default;