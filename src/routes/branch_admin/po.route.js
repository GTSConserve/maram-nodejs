import express  from 'express';


import { getPoForm,createPoForm,getPoFormPending,getApprovePO,getSingleApprovePO ,getAddOnExcessProductPO,getPendingPo,getSinglePendingPO} from '../../controllers/branch_admin/po/po.controller';

const poRouter = express.Router({
  caseSensitive: true,
  strict: true
})


poRouter.get('/get_po_form',getPoForm) 
poRouter.post('/create_po',createPoForm) 

poRouter.post('/add_on_excess_po',getAddOnExcessProductPO) 

poRouter.get('/get_po_pending',getPendingPo) 
poRouter.get('/get_po_approved',getApprovePO) 

poRouter.get('/get_po_single_approved',getSingleApprovePO) 
poRouter.get('/get_po_single_pending',getSinglePendingPO) 

export default poRouter