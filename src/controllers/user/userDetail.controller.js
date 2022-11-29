
import responseCode from '../../constants/responseCode';

import { userAddressValidator } from '../../services/validator.service';
import knex from '../../services/db.service'
import { delete_user_address, edit, edit_address, get_address, get_user, remove_order } from "../../models/user/user_details.model"

export const addUserAddress = async (req, res) => {
  try {
    const payload = userAddressValidator(req.body);

    if (payload) {

      const userAddress = await knex("user_address").insert({
        
        user_id: payload.user_id,
        address: payload.address,
        landmark: payload.landmark,
        title: payload.title,
        type: payload.type,
      })
      .where({user_id:payload.user_id})

      // console.log(userAddress)

      res
        .status(responseCode.SUCCESS)
        .json({ status: true, message: "address added successfully" });
    }
    //   else {
    //     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Mandatory Fields are missing" })
    //   }
  } catch (error) {
    console.log(error);

    res
      .status(responseCode.FAILURE.BAD_REQUEST)
      .json({ status: false, error });
  }
};

export const getAddress = async (req, res) => {
  try {
    const user_id = req.body;
    const address = await get_address(user_id);
    res.status(200).json({ status: true, data: address.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { user_id, title, address, landmark, type } = req.body;

    const addresses = await edit_address(
      user_id,
      title,
      address,
      landmark,
      type
    );

    if (!user_id)
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "invalid User" });

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.body;
    const user = await get_user(id);

    res.status(responseCode.SUCCESS).json({ status: true, data: user.body });
  } catch (error) {
    console.log(error);
    res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "no user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email,id } = req.body;
    if (!name) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Name is missing" });
    }
    if (!email) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Email is missing" });
    }
    if (!id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "user_id is missing" });
    }

    if (!req.file) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "file is missing" });
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("users").update({ name, email, image,id }).where({id:id});

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "User Profile Updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: error});
  }
};

// export const deleteUseraddress = async (req,res) => {
//   try{
//     const user_id = req.body
//     // const address_id = req.body
//     const del_user = await delete_user_address(user_id)
//     res.status(responseCode.SUCCESS).json({ status: true, data:del_user, message : "deleted successfully" })
//   }
//   catch (error) {
//       console.log(error)
//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error })
//   }
// }

export const deleteUseraddress = async (req, res) => {
  try {
    const { user_id, address_id, id } = req.body;

    const addresses = await delete_user_address(user_id, id);

    if (!user_id)
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "invalid User" });

    res
      .status(responseCode.SUCCESS)
      .json({ status: true, message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
  
}
}

export const RemoveOrder = async (req,res) => {
  try{
    const {id,user_id} = req.body ;
    const remove = await remove_order(id,user_id)
    // console.log("hi")
    res.status(responseCode.SUCCESS).json({ status: true, message : "remove successfully" })

  }
  catch(error){
    console.log(error)
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error })
  }
} 

export const Edit = async (req,res) => {
  try{
      const {id,user_id,value} = req.body; 
      const edit_order = await edit (id,user_id,value)
      res.status(responseCode.SUCCESS).json({ status: true, message : "edit successfully" })
    }
    catch(error){
      console.log(error)
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error })
    }
}
