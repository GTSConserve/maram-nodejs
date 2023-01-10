import express  from 'express';

import { getRiders,createRider,updateRider,updateRiderStatus,changePasswordRider} from '../../controllers/branch_admin/rider/rider.controller';


const riderRouter = express.Router({
  caseSensitive: true,
  strict: true
})


riderRouter.get('/get_rider',getRiders) 
riderRouter.post('/create_rider',createRider) 
riderRouter.post('/update_rider',updateRider) 
riderRouter.post('/update_rider_status',updateRiderStatus) 


riderRouter.post('/change_password_rider',changePasswordRider) 

export default riderRouter