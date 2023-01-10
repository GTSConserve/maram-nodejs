import express from "express";
import { multerStorage } from "../../utils/helper.util";
import multer from "multer";

import {
  getCategory,
  createCategory,
  updateCategoryStatus,
  updateCategory,
} from "../../controllers/super_admin/product/category.controller";

import {
  getAllProductType,
  createProductType,
  updateProductType,
  updateProductTypeStatus,
} from "../../controllers/super_admin/product/product_type.controller";


// import { getUnitType } from "../../controllers/super_admin/product/unit_type.controller";

import { getProductList,createProduct,updateProduct ,updateProductStatus} from "../../controllers/super_admin/product/product_list.controller";

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

const productRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

// product_type
// productRouter.get("/get_all_product_type", getAllProductType);
// productRouter.post("/create_product_type", uploadImg, createProductType);
// productRouter.post("/update_product_type_status", updateProductTypeStatus);
// productRouter.post("/update_product_type", uploadImg, updateProductType);

// category
productRouter.get("/get_category", getCategory);
productRouter.post("/create_category", uploadImg, createCategory);
productRouter.post("/update_category_status", updateCategoryStatus);
productRouter.post("/update_category", uploadImg, updateCategory);


//product list
productRouter.get("/get_product_list", getProductList);
productRouter.post("/create_product",uploadImg, createProduct);
productRouter.post("/update_product",uploadImg, updateProduct);
productRouter.post("/update_product_status", updateProductStatus);

// // unit type
// productRouter.get("/unit_type", getUnitType);


export default productRouter;
