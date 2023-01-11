// import responseCode from "../../constants/responseCode";

// import knex from "../../services/db.service";

// export const getPayment = async (order_id, userId) => {

//   const signature = await knex('users').select('id')
//         .insert({
//             razorpay_payment_id: order_id
//         }) .where({"users.id":userId})

//     try {
//     return { status: responseCode.SUCCESS, body: signature }
//     } catch (error) {
//       return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
//     }
//   }
"use strict";