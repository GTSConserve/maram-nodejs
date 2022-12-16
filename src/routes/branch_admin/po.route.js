import express  from 'express';


import { getPoForm,createPoForm,getPoFormPending,getApprovePO,getSingleApprovePO } from '../../controllers/branch_admin/po/po.controller';

const poRouter = express.Router({
  caseSensitive: true,
  strict: true
})


poRouter.get('/get_po_form',getPoForm) 
poRouter.post('/create_po',createPoForm) 

poRouter.get('/get_po_pending',getPoFormPending) 
poRouter.get('/get_po_approved',getApprovePO) 
poRouter.get('/get_po_single_approved',getSingleApprovePO) 

export default poRouter