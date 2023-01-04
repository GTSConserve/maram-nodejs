import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages"
import crypto from "crypto";

import { hmac } from "crypto";


// import { add_feedback, get_AppSettings } from '../../models/user/payment.model';

import knex from "../../services/db.service";

// import Razorpay from "razorpay"

import shortid from "shortid"

export const getPaymentReminder = async (req, res) => {
    try {

        res.status(200).json({ status: true, message: "Ok" })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getPaymentMethod = async (req, res) => {
    try {
        const payment_method = await knex('payment_gateways').select(
            'payment_gateways.id as payment_method_id',
            'payment_gateways.gatewayname as payment_method_name',
            'payment_gateways.status as payment_method_status')

        console.log(payment_method)
        res.status(200).json({ status: true, data: payment_method })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getPaymentStatusUpdate = async (req, res) => {
    try {
        const { 
            order_id, 
            payment_status, 
            payment_type, 
            payment_method_id, 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature, 
            token 
        } = req.body

        const response = await knex('')


        res.status(200).json({ status: true, message: "Ok" })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getRazorpayMethod = async (req, res) => {
    try {
        const { amount, order_id } = req.body

        if (!amount && !order_id) {
            return res
                .status(responseCode.FAILURE.DATA_NOT_FOUND)
                .json({ status: false, message: messages.MANDATORY_ERROR });
        }

        var razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        if (!razorpay) {
            return res
                .status(responseCode.FAILURE.DATA_NOT_FOUND)
                .json({ status: false, message: "please check razorpay id" });
        }

        const options = {
            amount,
            currency: "INR",
            receipt: order_id,

        };
        const response = await razorpay.orders.create(options);
        // console.log(response.id);
        res.status(200).json({
            status: true, data: response

        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getVerifyPaymentMethod = async (req, res) => {
    try {
        const {
            order_id,
            payment_id,
        } = req.body

        if (!order_id && !payment_id) {
            return res
            .status(responseCode.FAILURE.DATA_NOT_FOUND)
            .json({ status: false, message: messages.MANDATORY_ERROR });
        }

        const secret = "razorpaysecret";

        const shasum = crypto.createHmac("sha256", secret);
        shasum.update(order_id + "|" + payment_id);
        const digest = shasum.digest('hex');

        console.log(digest, req.headers["x-razorpay-signature"]);

        if (digest===req.headers["x-razorpay-signature"]) {
            console.log("request is properly");
            res.status(200).json({
                message: "Payment has been verified",
            });
        } else {
            res.status(403).json({ message: "Payment verification failed" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}