"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _product = require("../../controllers/user/product.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { authenticateJWT } from "../../middlewares/authToken.middleware";

var productRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
productRouter.post("/get_categories", _product.getCategories);
productRouter.post("/get_products", _product.getProducts);
productRouter.get("/get_subscription_product", _product.getSubscriptionProducts);
productRouter.get("/get_add_on_product", _product.getAddOnProducts);
productRouter.post("/search_products", _product.searchProducts);
productRouter.post("/additional_products", _product.additionalProduct);
productRouter.post("/addon_order", _product.addon_Order);
var _default = productRouter;
exports["default"] = _default;