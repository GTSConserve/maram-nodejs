import express  from 'express';

import { getApprovePurchaseList,getCities,getAllCountry,getAllZone,getAllPostCode } from '../../controllers/branch_admin/rider/rider.controller';


const riderRouter = express.Router({
  caseSensitive: true,
  strict: true
})


riderRouter.get('/get_all_places',getApprovePurchaseList) 
// riderRouter.get('/get_cities',getCities)
// riderRouter.get('/country',getAllCountry)
// riderRouter.get('/zone',getAllZone)
// riderRouter.get('/post_code',getAllPostCode)

export default riderRouter

