import express from 'express';
import { cancelOrder, getAppControls, getRiderdetails, getSingleorder, login, orderStatusUpdate, riderDashboard, updateEndtour, updateRiderstatus,updateStartTour,updeteRiderLocation } from "../../controllers/rider/rider.controller"
import { nonMandatoryToken } from '../../middlewares/authToken.middleware';

const riderRouter = express.Router({
    caseSensitive: true,
    strict: true,
});


riderRouter.post("/rider_details",getRiderdetails)
riderRouter.post("/update_rider_status",updateRiderstatus);
riderRouter.post("/update_rider_location",updeteRiderLocation);
riderRouter.post("/update_start_tour",updateStartTour);
riderRouter.post("/update_end_tour",updateEndtour);


riderRouter.post("/get_single_order",getSingleorder);
riderRouter.post("/order_status_update",orderStatusUpdate);
riderRouter.post("/rider_dashboard",riderDashboard);

riderRouter.post("/cancel_order",cancelOrder);






export default riderRouter