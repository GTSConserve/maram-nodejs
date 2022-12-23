import express from "express";

// Inner routes
import loginRouter from "./rider/login.route";
import riderRouter from "./rider/rider.route";





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
    path: "/rider",
    route: riderRouter,
  },
  
  
];

defaultRoutes.forEach((route) => {
  mainRouter.use(route.path, route.route);
});

export default mainRouter;
