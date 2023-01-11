import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";

export const getPayment = async (amount,order_id, userId) => {

  const signature = await knex('users').select('id')
        .insert({
            razorpay_payment_id: options.id
        }) .where({"users.id":userId})
        console.log(options[0].id)
    // const payment = await knex('bill_history').select('bill_no','user_id')
    // // .where({"bill_history.user_id":userId})
    // .where({"bill_history.bill_no":order_id, "bill_history.user_id":userId,"bill_history.grand_total":amount})
    // // knex.select('key','value').from('app_settings')

    // console.log(payment)
    
    try {
    return { status: responseCode.SUCCESS, body: payment }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
    }
  }


  