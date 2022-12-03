import express from 'express';
import { addUserAddress,getAddress,editAddress,getUser,updateUser,deleteUseraddress, changePlan,RemoveOrder,Edit } from '../../controllers/user/userDetail.controller';
import multer from "multer";
// import { edit_address } from '../../models/user/user_details.model';


const userRouter = express.Router({
    caseSensitive: true,
    strict: true
  })





  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
    filename: function (req, file, cb) {
      // console.log(req.headers.authorization)
      let index = file.mimetype.indexOf('/') + 1
      cb(null, Date.now() + "." + file.mimetype.slice(index));
    }
  });
  
  const uploadImg = multer({storage: storage}).single('image');
  
  userRouter.get('/get_address',getAddress)
  userRouter.post("/edit_address",editAddress)
  userRouter.get('/get_users',getUser)
  userRouter.post('/update_users',uploadImg,updateUser)
  

 
  userRouter.post('/remove_orders',RemoveOrder)
  userRouter.post('/edit_orders',Edit)
  userRouter.get('/delete_useraddress',deleteUseraddress)
  userRouter.post('/add_user_address',addUserAddress)
  userRouter.post('/change_plan',changePlan)





  export default userRouter;