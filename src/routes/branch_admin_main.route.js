import express from "express";

// Inner routes
// import loginRouter from "./use";

const mainRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

// const defaultRoutes = [
//   {
//     path: "/auth",
//     route: loginRouter,
//   },
// ];

// defaultRoutes.forEach((route) => {
//   mainRouter.use(route.path, route.route);
// });

export default mainRouter;