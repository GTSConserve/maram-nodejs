import express from "express";

import { getPaymentMethod, getPaymentReminder,getPaymentStatusUpdate,getRazorpayMethod, getVerifyPaymentMethod } from "../../controllers/user/payment.controller";

import { authenticateJWT,nonMandatoryToken } from "../../middlewares/authToken.middleware";


const paymentRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

//payment api are static
paymentRouter.get("/get_payment_method",nonMandatoryToken,authenticateJWT,getPaymentMethod);
paymentRouter.post("/get_payment_reminder",authenticateJWT,getPaymentReminder);
paymentRouter.post("/get_payment_status_update",authenticateJWT,getPaymentStatusUpdate);
paymentRouter.post("/get_razorpay_method",authenticateJWT,getRazorpayMethod);

// paymentRouter.post("/get_razorpay",authenticateJWT,getRazorpay)
paymentRouter.post("/get_verify_payment_method",authenticateJWT,getVerifyPaymentMethod)

export default paymentRouter;

