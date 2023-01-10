import express from "express";
import multer from "multer";
import { multerStorage } from "../../utils/helper.util";

import { getPlan } from "../../controllers/super_admin/settings/plan.controller";

import { createAppsettings, getAppSettings, updateappsettings, updateSettingsStatus } from "../../controllers/super_admin/settings/app_settings.controller";
import { createBanners, getBanners, updateBanners, updateBannerStatus } from "../../controllers/super_admin/settings/banner.controller";



const settingsRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

const path = "./uploads/products";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");

//plan
settingsRouter.get("/get_plan", getPlan);

// app settings
settingsRouter.get("/app_settings", getAppSettings);
settingsRouter.post("/create_appsettings", createAppsettings);
settingsRouter.post("/update_appsettings", updateappsettings);
settingsRouter.post("/update_settings_status", updateSettingsStatus);

// banners
settingsRouter.get("/get_banner", getBanners);
settingsRouter.post("/create_banners",uploadImg, createBanners);
settingsRouter.post("/update_banners",uploadImg, updateBanners);
settingsRouter.post("/update_banner_status",updateBannerStatus);



export default settingsRouter;
