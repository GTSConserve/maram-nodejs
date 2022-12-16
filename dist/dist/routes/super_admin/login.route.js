"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _login = require("../../controllers/super_admin/auth/login.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var authRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
authRouter.get('/login', _login.loginForm);
authRouter.post('/login', _login.loginHandler);
var _default = authRouter;
exports["default"] = _default;