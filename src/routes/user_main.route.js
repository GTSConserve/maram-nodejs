import express from "express";

// Inner routes
import loginRouter from "./user/login.route";
import productRouter from "./user/product.route";


// import userRouter from "./user/userdetails.route";
import appsettingRouter from "./user/general.route";


import homeRouter from "./user/home.route";

import subscriptionRouter from "./user/subscription.route";
import userRouter from "./user/user_details.route";


const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});
 
const defaultRoutes = [
  {
    path: "/auth",
    route: loginRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/subscription",
    route: subscriptionRouter,
  },
  {
    path: "/user_details",
    route: userRouter,

  },
  {
    path: "/home_details",
    route: homeRouter,

  },
  {
    path: "/",
    route: appsettingRouter,

  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
