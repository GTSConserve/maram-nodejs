import express  from 'express';
import { multerStorage } from '../../utils/helper.util';
import multer from 'multer';


import { getApprovePurchaseList,getGeneratePurchaseList,getCancelPurchaseList,getNewPurchaseOrderList } from "../../controllers/branch_admin/purchaseOrder/purchase_orders.controller"


const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

const purchaseOrderRouter = express.Router({
  caseSensitive: true,
  strict: true
})

purchaseOrderRouter.get('/get_approve_purchase_list',getApprovePurchaseList)
purchaseOrderRouter.get('/get_generate_purchase_list',getGeneratePurchaseList)
purchaseOrderRouter.get('/get_cancel_purchase_list',getCancelPurchaseList)
// purchaseOrderRouter.get('/get_new_purchase_orders_list',getNewPurchaseOrderList)


purchaseOrderRouter.get("/get_new_purchase_orders_list", getNewPurchaseOrderList);
// purchaseOrderRouter.post("/create_category", uploadImg, createCategory);
// purchaseOrderRouter.post("/update_category_status", updateCategoryStatus);
// purchaseOrderRouter.post("/update_category", uploadImg, updateCategory);


export default purchaseOrderRouter