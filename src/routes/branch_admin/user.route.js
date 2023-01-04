import express from "express";
import {
  getusers,
  getSingleUser,
  getAddUser,
  createUser,
  newSubscription,
  newAddOn,
  createAdditional,
  editAdditional,
  cancelAdditional,
  unsubscribeSubscription,
  subscribeSubscription,
  createPaused,
  editPaused,
  changeUserPlan
} from "../../controllers/branch_admin/users/users.controller";

const userRouter = express.Router({
  caseSensitive: true,
  strict: true,
});
// userRouter.get('/get_route',getRoute)
userRouter.get("/branch_user", getusers);
userRouter.get("/single_user", getSingleUser);

// additional orders
userRouter.post("/create_additional", createAdditional);
userRouter.post("/edit_additional", editAdditional);
userRouter.post("/cancel_additional", cancelAdditional);

//paused
userRouter.post("/create_pause", createPaused);
userRouter.post("/edit_pause", editPaused);

// subscription
userRouter.post("/unsubscribe_subscription", unsubscribeSubscription);
userRouter.post("/subscribe_subscription", subscribeSubscription);

// add user
userRouter.get("/get_add_users", getAddUser);
userRouter.post("/create_user", createUser);

// new subscription product
userRouter.post("/new_subscription", newSubscription);
userRouter.post("/new_add_on", newAddOn);




// chnage user plan
userRouter.post("/change_user_plan", changeUserPlan);


export default userRouter;
