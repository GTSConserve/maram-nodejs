import express from 'express';
import { getAppControls, getRiderdetails, login, updateEndtour, updateRiderstatus,updateStartTour,updeteRiderLocation } from "../../controllers/rider/rider.controller"
import { nonMandatoryToken } from '../../middlewares/authToken.middleware';

const loginRouter = express.Router({
    caseSensitive: true,
    strict: true,
});
loginRouter.get("/app_controls", getAppControls);

loginRouter.post("/login",nonMandatoryToken,login)
loginRouter.get("/rider_details",getRiderdetails)
loginRouter.post("/update_rider_status",updateRiderstatus);
loginRouter.post("/update_rider_location",updeteRiderLocation);
loginRouter.post("/update_starttour",updateStartTour);
loginRouter.post("/update_endtour",updateEndtour);



export default loginRouter