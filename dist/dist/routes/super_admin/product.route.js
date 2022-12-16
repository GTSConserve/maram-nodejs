"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _helper = require("../../utils/helper.util");
var _multer = _interopRequireDefault(require("multer"));
var _category = require("../../controllers/super_admin/product/category.controller");
var _product_type = require("../../controllers/super_admin/product/product_type.controller");
var _product_list = require("../../controllers/super_admin/product/product_list.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { getUnitType } from "../../controllers/super_admin/product/unit_type.controller";

var path = "./uploads/products";
var storage = (0, _helper.multerStorage)(path);
var uploadImg = (0, _multer["default"])({
  storage: storage
}).single("image");
var productRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});

// product_type
productRouter.get("/get_all_product_type", _product_type.getAllProductType);
productRouter.post("/create_product_type", uploadImg, _product_type.createProductType);
productRouter.post("/update_product_type_status", _product_type.updateProductTypeStatus);
productRouter.post("/update_product_type", uploadImg, _product_type.updateProductType);

// category
productRouter.get("/get_category", _category.getCategory);
productRouter.post("/create_category", uploadImg, _category.createCategory);
productRouter.post("/update_category_status", _category.updateCategoryStatus);
productRouter.post("/update_category", uploadImg, _category.updateCategory);

//product list
productRouter.get("/get_product_list", _product_list.getProductList);
productRouter.post("/create_product", uploadImg, _product_list.createProduct);
productRouter.post("/update_product", uploadImg, _product_list.updateProduct);
productRouter.post("/update_product_status", _product_list.updateProductStatus);

// // unit type
// productRouter.get("/unit_type", getUnitType);
var _default = productRouter;
exports["default"] = _default;