import express  from 'express';

import { getPoPending,getSinglePoPending,updatePo,getPoApproved,getSinglePoApproved } from '../../controllers/super_admin/po/po.controller';


const poRouter = express.Router({
  caseSensitive: true,
  strict: true
})


poRouter.get('/get_po_pending',getPoPending) 
poRouter.get('/single_po',getSinglePoPending) 
poRouter.post('/update_po',updatePo) 

poRouter.get('/get_po_approved',getPoApproved) 
poRouter.get('/get_single_po_approved',getSinglePoApproved) 




export default poRouter