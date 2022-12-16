import express from 'express';
import { getRiderdetails, login, updateEndtour, updateRiderstatus,updateStartTour,updeteRiderLocation } from "../../controllers/rider/rider.controller"

const loginRouter = express.Router({
    caseSensitive: true,
    strict: true,
});

loginRouter.post("/login",login)
loginRouter.get("/rider_details",getRiderdetails)
loginRouter.post("/update_rider_status",updateRiderstatus);
loginRouter.post("/update_rider_location",updeteRiderLocation);
loginRouter.post("/update_starttour",updateStartTour);
loginRouter.post("/update_endtour",updateEndtour);



export default loginRouter