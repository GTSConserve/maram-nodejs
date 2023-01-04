import express from "express";
import { authenticateJWT, nonMandatoryToken } from "../../middlewares/authToken.middleware";
import {
  getProducts,
  getCategories,
  getSubscriptionProducts,
  getAddOnProducts,
  searchProducts,
  addon_Order,
  getSingleProduct,
  removeAddOnOrder,
  nextDayProduct
} from "../../controllers/user/product.controller";

const productRouter = express.Router({
  caseSensitive: true,
  strict: true,
});


productRouter.post("/get_categories",nonMandatoryToken,authenticateJWT,getCategories);
productRouter.post("/get_products", nonMandatoryToken,authenticateJWT,getProducts);
productRouter.post("/search_products",nonMandatoryToken,authenticateJWT,searchProducts);

productRouter.get("/get_subscription_product",nonMandatoryToken,authenticateJWT,getSubscriptionProducts);
productRouter.get("/get_add_on_product", nonMandatoryToken,authenticateJWT,getAddOnProducts);

productRouter.post("/get_single_product",nonMandatoryToken,getSingleProduct);


productRouter.post("/create_add_on_products", authenticateJWT,nonMandatoryToken,addon_Order);
productRouter.post("/remove_add_on_products",authenticateJWT,nonMandatoryToken,removeAddOnOrder);


// next day delivery product api for static

productRouter.post("/next_day_product", nonMandatoryToken,nextDayProduct);


export default productRouter;
