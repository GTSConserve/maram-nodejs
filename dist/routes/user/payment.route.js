"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _payment = require("../../controllers/user/payment.controller");
var _authToken = require("../../middlewares/authToken.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var paymentRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});

//payment api are static
paymentRouter.get("/get_payment_method", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _payment.getPaymentMethod);
paymentRouter.post("/get_payment_reminder", _authToken.authenticateJWT, _payment.getPaymentReminder);
paymentRouter.post("/get_payment_status_update", _authToken.authenticateJWT, _payment.getPaymentStatusUpdate);
paymentRouter.post("/get_razorpay_method", _authToken.authenticateJWT, _payment.getRazorpayMethod);

// paymentRouter.post("/get_razorpay",authenticateJWT,getRazorpay)
paymentRouter.post("/get_verify_payment_method", _authToken.authenticateJWT, _payment.getVerifyPaymentMethod);
var _default = paymentRouter;
exports["default"] = _default;