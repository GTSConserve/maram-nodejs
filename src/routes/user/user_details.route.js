import express from "express";
import {
  addUserAddress,
  getAddress,
  editAddress,
  getUser,
  updateUser,
  deleteUseraddress,
  changePlan,
  RemoveOrder,
  Edit,
  checkDeliveryAddress,
  getEmptyBottle
} from "../../controllers/user/userDetail.controller";
import multer from "multer";

import { authenticateJWT } from "../../middlewares/authToken.middleware";

import { multerStorage } from "../../utils/helper.util";
const userRouter = express.Router({
  caseSensitive: true,
  strict: true,
});


const path = "./uploads/users";

const storage = multerStorage(path);

const uploadImg = multer({ storage: storage }).single("image");


userRouter.get("/get_users", authenticateJWT, getUser);
userRouter.post("/update_users", authenticateJWT, uploadImg, updateUser);

userRouter.post("/add_user_address",authenticateJWT, addUserAddress);
userRouter.get("/get_address",authenticateJWT, getAddress);
userRouter.post("/edit_address",authenticateJWT, editAddress);
userRouter.post("/delete_user_address",authenticateJWT, deleteUseraddress);
userRouter.post("/check_delivery_address",authenticateJWT, checkDeliveryAddress);

userRouter.post("/remove_orders", RemoveOrder);
userRouter.post("/edit_orders", Edit);
userRouter.post("/change_plan", changePlan);

// empty bottle tracking api

userRouter.get("/get_empty_bottle", authenticateJWT, getEmptyBottle);


export default userRouter;
