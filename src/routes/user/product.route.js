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
  removeAddOnOrder
} from "../../controllers/user/product.controller";

const productRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

productRouter.post("/get_categories", getCategories);
productRouter.post("/get_products", getProducts);
productRouter.post("/search_products", searchProducts);

productRouter.get("/get_subscription_product", getSubscriptionProducts);
productRouter.get("/get_add_on_product", getAddOnProducts);

productRouter.post("/get_single_product", getSingleProduct);

productRouter.post("/create_add_on_products", authenticateJWT, addon_Order);
productRouter.post("/remove_add_on_products", removeAddOnOrder);

export default productRouter;
