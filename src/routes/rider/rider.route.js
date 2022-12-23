import express from 'express';
import { getAppControls, getRiderdetails, getSingleorder, login, orderStatusUpdate, updateEndtour, updateRiderstatus,updateStartTour,updeteRiderLocation } from "../../controllers/rider/rider.controller"
import { nonMandatoryToken } from '../../middlewares/authToken.middleware';

const loginRouter = express.Router({
    caseSensitive: true,
    strict: true,
});
loginRouter.get("/app_controls", getAppControls);
loginRouter.post("/login",nonMandatoryToken,login)
loginRouter.post("/rider_details",getRiderdetails)


loginRouter.post("/update_rider_status",updateRiderstatus);
loginRouter.post("/update_rider_location",updeteRiderLocation);
loginRouter.post("/update_start_tour",updateStartTour);
loginRouter.post("/update_end_tour",updateEndtour);


loginRouter.post("/get_single_order",getSingleorder);
loginRouter.post("/order_status_update",orderStatusUpdate);




export default loginRouter