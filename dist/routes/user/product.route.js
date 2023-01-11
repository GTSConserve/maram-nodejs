"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authToken = require("../../middlewares/authToken.middleware");
var _product = require("../../controllers/user/product.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var productRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
productRouter.post("/get_categories", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.getCategories);
productRouter.post("/get_products", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.getProducts);
productRouter.post("/search_products", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.searchProducts);
productRouter.get("/get_subscription_product", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.getSubscriptionProducts);
productRouter.get("/get_add_on_product", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.getAddOnProducts);
productRouter.post("/get_single_product", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _product.getSingleProduct);
productRouter.post("/create_add_on_products", _authToken.authenticateJWT, _authToken.nonMandatoryToken, _product.addon_Order);
productRouter.post("/remove_add_on_products", _authToken.nonMandatoryToken, _authToken.authenticateJWT, _authToken.nonMandatoryToken, _product.removeAddOnOrder);

// next day delivery product api

productRouter.post("/next_day_product", _authToken.nonMandatoryToken, _product.nextDayProduct);
var _default = productRouter;
exports["default"] = _default;