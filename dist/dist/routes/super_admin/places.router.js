"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _city = require("../../controllers/super_admin/places/city.controller");
var _country = require("../../controllers/super_admin/places/country.controller");
var _zone = require("../../controllers/super_admin/places/zone.controller");
var _post_code = require("../../controllers/super_admin/places/post_code.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var placesRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});

//cities
placesRouter.get("/city", _city.getCities);
placesRouter.post("/create_city", _city.createCity);
placesRouter.post("/update_city", _city.updateCity);
placesRouter.post("/update_city_status", _city.updateCityStatus);

//country
placesRouter.get("/country", _country.getAllCountry);
placesRouter.post("/create_country", _country.createCountry);
placesRouter.post("/update_country", _country.updateCountry);
placesRouter.post("/update_country_status", _country.updateCountryStatus);

//zone
placesRouter.get("/zone", _zone.getAllZone);
placesRouter.post("/new_zone", _zone.newZone);
placesRouter.post("/update_zone", _zone.updateZone);
placesRouter.post("/update_zone_status", _zone.updateZoneStatus);

//post code
placesRouter.get("/post_code", _post_code.getAllPostCode);
var _default = placesRouter;
exports["default"] = _default;