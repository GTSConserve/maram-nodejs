"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _helper = require("../../utils/helper.util");
var _plan = require("../../controllers/super_admin/settings/plan.controller");
var _app_settings = require("../../controllers/super_admin/settings/app_settings.controller");
var _banner = require("../../controllers/super_admin/settings/banner.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var settingsRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
var path = "./uploads/products";
var storage = (0, _helper.multerStorage)(path);
var uploadImg = (0, _multer["default"])({
  storage: storage
}).single("image");

//plan
settingsRouter.get("/get_plan", _plan.getPlan);

// app settings
settingsRouter.get("/app_settings", _app_settings.getAppSettings);
settingsRouter.post("/create_appsettings", _app_settings.createAppsettings);
settingsRouter.post("/update_appsettings", _app_settings.updateappsettings);
settingsRouter.post("/update_settings_status", _app_settings.updateSettingsStatus);

// banners
settingsRouter.get("/get_banner", _banner.getBanners);
settingsRouter.post("/create_banners", _banner.createBanners);
settingsRouter.post("/update_banners", _banner.updateBanners);
settingsRouter.post("/update_banner_status", uploadImg, _banner.updateBannerStatus);
var _default = settingsRouter;
exports["default"] = _default;