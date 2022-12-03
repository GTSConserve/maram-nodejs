import express from "express";

import { addFeedback, getAppSetting } from "../../controllers/user/general.controller";




const appsettingRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

appsettingRouter.get("/app_settings", getAppSetting);
appsettingRouter.post("/add_feed_backs", addFeedback);

export default appsettingRouter;

