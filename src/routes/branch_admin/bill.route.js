import express  from 'express';

import { getPendingBill,getPayedBill,getCompletedBill,payBill } from '../../controllers/branch_admin/bill/bill.controller';


const billRouter = express.Router({
  caseSensitive: true,
  strict: true
})



billRouter.get('/get_pending_bill',getPendingBill)
billRouter.get('/get_payed_bill',getPayedBill)
billRouter.get('/get_completed_bill',getCompletedBill)

billRouter.post('/pay_bill',payBill)





export default billRouter