import express from "express";
import { authenticateJWT } from "../../middlewares/authToken.middleware";
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

productRouter.post("/get_categories", getCategories);
productRouter.post("/get_products", getProducts);
productRouter.post("/search_products", searchProducts);

productRouter.get("/get_subscription_product",authenticateJWT,getSubscriptionProducts);
productRouter.get("/get_add_on_product", authenticateJWT,getAddOnProducts);

productRouter.post("/get_single_product", authenticateJWT,getSingleProduct);

productRouter.post("/create_add_on_products", authenticateJWT, addon_Order);
productRouter.post("/remove_add_on_products", authenticateJWT,removeAddOnOrder);

// next day delivery product api for static

productRouter.post("/next_day_product", authenticateJWT,nextDayProduct);


export default productRouter;
