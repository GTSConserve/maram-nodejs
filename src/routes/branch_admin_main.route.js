import express from "express";
import subscriptionRouter from "./branch_admin/subscription.route";
import routeRouter from "./branch_admin/route.route";
import riderRouter from "./branch_admin/rider.router";
import purchaseOrderRouter from "./branch_admin/purchaseOrder.route";
import homeRouter from "./branch_admin/home.route";
import orderRouter from "./branch_admin/order.route";
import userRouter from "./branch_admin/user.route";
import poRouter from "./branch_admin/po.route";
import billRouter from "./branch_admin/bill.route";

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const defaultRoutes = [
  {
    path: "/home",
    route: homeRouter,
  },
  {
    path: "/subscription",
    route: subscriptionRouter,
  },
  {
    path: "/route",
    route: routeRouter,
  },
  {
    path: "/rider",
    route: riderRouter,
  },
  {
    path: "/purchaseOrder",
    route: purchaseOrderRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/po",
    route: poRouter,
  },
  {
    path: "/bill",
    route: billRouter,
  },
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
