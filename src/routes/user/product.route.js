import express from "express";
// import { authenticateJWT } from "../../middlewares/authToken.middleware";
import {
  getProducts,
  getCategories,
  getSubscriptionProducts,
  getAddOnProducts,
  searchProducts,
  addProduct,
  additionalProduct,
  addon_Order,
} from "../../controllers/user/product.controller";


const productRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

productRouter.post("/get_categories", getCategories);
productRouter.post("/get_products", getProducts);
productRouter.get("/get_subscription_product", getSubscriptionProducts);
productRouter.get("/get_add_on_product", getAddOnProducts);
productRouter.post("/search_products", searchProducts);
productRouter.post("/additional_products", additionalProduct);
productRouter.post("/addon_order", addon_Order);





export default productRouter