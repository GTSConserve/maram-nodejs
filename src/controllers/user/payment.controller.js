// import { add_feedback, get_AppSettings } from '../../models/user/payment.model';

import knex from "../../services/db.service";

import Razorpay from "razorpay"

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
        const { order_id,payment_status,payment_type,payment_method_id,razorpay_order_id,razorpay_payment_id,razorpay_signature,token} = req.body
        
        
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
        

        const list = 
           {
                    "id": "order_J1n7KFAxwLNeun",
                    "entity": "order",
                    "amount": 19400,
                    "amount_paid": 0,
                    "amount_due": 19400,
                    "currency": "INR",
                    "receipt": "pay01032022155456",
                    "offer_id": null,
                    "status": "created",
                    "attempts": 0,
                    "notes": [],
                    "created_at": 1646130359
            }
            
        res.status(200).json({ status: true, data: list })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}