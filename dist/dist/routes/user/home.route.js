"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _home = require("../../controllers/user/home.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import {getProducts, getCategories, getProduct_type } from '../../controllers/user/product.controller';
// import { addUserAddress } from '../../controllers/user/userdetails.controller';
// import { nonMandatoryToken,authenticateJWT } from '../../middlewares/authToken.middleware'; 

var homeRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
homeRouter.get('/getbanner', _home.getBanner);

// userdetailsRouter.get('/products',getProducts)

// userdetailsRouter.get('/getproducttype',getProduct_type)
var _default = homeRouter;
exports["default"] = _default;