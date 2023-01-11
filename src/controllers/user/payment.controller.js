import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages"
import { sendNotification } from "../../notifications/message.sender";
import { getPayment } from '../../models/user/payment.model';
import crypto from "crypto";

import { hmac } from "crypto";

import knex from "../../services/db.service";

import Razorpay from "razorpay"

import schedule from "node-schedule";

import shortid from "shortid"

export const getPaymentReminder = async (req, res) => {
    try {

        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(4, 6)];
        rule.hour = 17;
        rule.minute = 0;

        const job = schedule.scheduleJob(rule, function () {
            console.log('Please Pay Your Bill Amount....!');
        });

        const reminder = await knex('bill_history').select('user_id').where({payment_status:"success"})

        job.cancel();

        await sendNotification({
            include_external_user_ids: [reminder.user_id].toString(),
            contents: { en: `Your Payment Reminder` },
            headings: { en: "Your Payment Reminder" },
            name: "Your Payment Reminder",
            data: {
              status: "pending",
              category_id: 0,
              product_type_id: 0,
              type: 3,
              messages: job,
              reminder_id: reminder.user_id
            //   amount: options.amount,
            },
          });

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
            userId,
            order_id,
            payment_status,
            payment_type,
            payment_method_id,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            token
        } = req.body

        console.log(req.body)

        if (!order_id &&
            !payment_type &&
            !payment_status &&
            !razorpay_signature &&
            !payment_method_id &&
            !razorpay_order_id &&
            !razorpay_payment_id
        ) {
            return res
                .status(responseCode.FAILURE.DATA_NOT_FOUND)
                .json({ status: false, message: messages.MANDATORY_ERROR });
        }

        const response = await knex('bill_history').update({
            payment_status: payment_status
        })
        .where({user_id:userId})

        const type = await knex('payment_gateways').update({
            gatewayname: payment_type
        })
        .where({user_id:userId})


        res.status(200).json({ status: true, message: "Ok" })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getRazorpayMethod = async (req, res) => {
    try {
        const { amount, order_id, userId } = req.body

        // console.log(userId)

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

        const signature = await knex('bill_history')
        .update({
            razorpay_payment_id: response.id
        }) .where({user_id:userId,bill_no:order_id})

        if (!signature) {
            return res
                .status(responseCode.FAILURE.DATA_NOT_FOUND)
                .json({ status: false, message: "please check bill number" });
        }

        await sendNotification({
            include_external_user_ids: [userId.toString()],
            contents: { en: `Your Razorpay Placed SuccessFully` },
            headings: { en: "Razorpay Notification" },
            name: "Razorpay Notification",
            data: {
                status: "pending",
                category_id: 0,
                product_type_id: 0,
                type: 3,
                receipt: options.receipt,
                amount: options.amount,
            },
        });

        res.status(200).json({
            status: true, data: response

        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Razorpay method failed..." })
    }
}

export const getVerifyPaymentMethod = async (req, res) => {
    try {
        const {
            userId,
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

        console.log(digest)

        const signature = await knex('bill_history')
        .update({
            razorpay_signature_id: digest
        }) .where({user_id:userId,bill_no:order_id})

        console.log(signature)
        if (digest === req.headers["x-razorpay-signature"]) {
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