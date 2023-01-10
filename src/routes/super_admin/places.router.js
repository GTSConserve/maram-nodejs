import express from "express";

import { getCities,createCity,updateCity,updateCityStatus } from "../../controllers/super_admin/places/city.controller";
import { getAllCountry,createCountry,updateCountry,updateCountryStatus } from "../../controllers/super_admin/places/country.controller";
import { getAllZone,newZone,updateZone,updateZoneStatus } from "../../controllers/super_admin/places/zone.controller";
import { getAllPostCode } from "../../controllers/super_admin/places/post_code.controller";

const placesRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

//cities
placesRouter.get("/city", getCities);
placesRouter.post("/create_city", createCity);
placesRouter.post("/update_city", updateCity);
placesRouter.post("/update_city_status", updateCityStatus);

// //country
// placesRouter.get("/country", getAllCountry);
// placesRouter.post("/create_country", createCountry);
// placesRouter.post("/update_country", updateCountry);
// placesRouter.post("/update_country_status", updateCountryStatus);

//zone
placesRouter.get("/zone", getAllZone);
placesRouter.post("/new_zone", newZone);
placesRouter.post("/update_zone", updateZone);
placesRouter.post("/update_zone_status", updateZoneStatus);

//post code
// placesRouter.get("/post_code", getAllPostCode);

export default placesRouter;
