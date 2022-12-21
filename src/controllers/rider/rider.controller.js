import express from 'express';
import messages from '../../constants/messages';
import { get_Appcontrol, get_riderdetails, update_endtour, update_location, update_riderstatus, update_starttour, userLogin } from '../../models/rider/rider.model';
import responseCode from '../../constants/responseCode';
import knex from '../../services/db.service'
import { userValidator } from '../../services/validator.service';
import id from 'date-fns/locale/id/index';
import { createToken } from "../../services/jwt.service";
import { updateRiderToken } from "../../models/rider/rider.model";




//  rider app controls
export const getAppControls = async (req, res) => {
  try{

    const settings = await get_Appcontrol()

    let appSettingData = {}
    for (const settingData of settings.body){
        appSettingData[settingData.key] = settingData.value;
        
    }
    res.status(200).json({ status: true,data:appSettingData,message:"ok"  }) 
   
    // res.status(200).json({ status: true,data: settings.body }) 
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ status: false,error }) 
  }
  }



// rider login 
export const login = async (req, res) => {
  try{
    
    const payload = userValidator(req.body);
    const { user_name, password} = payload;

    if (payload.status) {
      
        const checkPassword = await knex
          .select("id")
          .from("rider_details")
          .where({ password,user_name });

          console.log(checkPassword);
         let query;

         if (checkPassword[0].id ) {
          const tokens = createToken({
            user_name : user_name,
          });
  
          if (tokens.status) {
            await updateRiderToken(tokens.refreshToken, user_name);
  
            res
              .status(responseCode.SUCCESS)
              .json({
                status: true,
                token: tokens.token,
                delivary_partner_id:checkPassword[0].id,
                message: "Rider login successfully",
                
              });
          } else {
            res
              .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
              .json({ status: false, message: "Token generation failed" });
          }
        } else {
          res
            .status(responseCode.FAILURE.BAD_REQUEST)
            .json({ status: false, message: "otp mismatch" });
        }
      }
            
        // return res
        // .status(200)
        // .json({
        //   status: true,
        //   user_id:checkPassword[0].id,
        //   message: "Rider login successfully",
        // });
  
  
  }
  
  catch (error) {
    console.error('Whooops! This broke with error: ', error)
    res.status(500).json({message:"user_id and password not matching"})
  }
  }
  

//  get single rider details
export const getRiderdetails = async (req, res) => {
  try {
    const { delivary_partner_id } = req.body;

    if (!delivary_partner_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "delivary_partner_id Is Missing" });
    }

    const delivary_partner = await get_riderdetails(delivary_partner_id);

    return res
      .status(responseCode.SUCCESS)
      .json({  data: delivary_partner.body,status: true,message:"ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};


// update single rider status
export const updateRiderstatus = async (req,res) => {
  try{
       const { delivary_partner_id,status} = req.body;

       if (!delivary_partner_id || !status) {
       return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }
       const riderstatus = await update_riderstatus(delivary_partner_id,status)
       if(riderstatus.status){
        return res.status(responseCode.SUCCESS).json(riderstatus)
      }else{
        return res.status(responseCode.FAILURE.DATA_NOT_FOUND).json(riderstatus)
  
      }
  }
  catch(error){
    console.log(error);
    res.status(500).json({ status: false });
  }
}


// update single rider location 
export const updeteRiderLocation = async (req,res) =>{
  try{
       const {delivary_partner_id,latitude,longitude} = req.body;

       if (!delivary_partner_id || !latitude || !longitude) {
        return res
         .status(responseCode.FAILURE.BAD_REQUEST)
         .json({ status: false, message: "Mandatory field Is Missing" });
      }
       const location = await update_location(delivary_partner_id,latitude,longitude);
       return res.status(responseCode.SUCCESS).json({status: true,message:"ok" })
  }
  catch(error){
    console.log(error);
    res.status(500).json({ status: false });
  }
}


// update starttour 
export const updateStartTour = async (req,res)=>{
  try {
       const {delivary_partner_id,tour_id,tour_status} = req.body;

       if (!delivary_partner_id || !tour_id || !tour_status) {
        return res
         .status(responseCode.FAILURE.BAD_REQUEST)
         .json({ status: false, message: "Mandatory field Is Missing" });
      }

       const starttour = await update_starttour(delivary_partner_id,tour_id,tour_status);
       if(starttour.status){
        return res.status(responseCode.SUCCESS).json(starttour)
      }else{
        return res.status(responseCode.FAILURE.DATA_NOT_FOUND).json(starttour)
  
       }
    
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// update endtour
export const updateEndtour = async (req,res) => {
  try{
    const {delivary_partner_id,tour_id,tour_status} = req.body;

    if (!delivary_partner_id || !tour_id || !tour_status) {
      return res
       .status(responseCode.FAILURE.BAD_REQUEST)
       .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const endtour = await update_endtour(delivary_partner_id,tour_id,tour_status)
    if(endtour.status){
      return res.status(responseCode.SUCCESS).json(endtour);
    }
    else{
      return res.status(responseCode.FAILURE.DATA_NOT_FOUND).json(endtour);
    }

  }
  catch(error){
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
    .json({ status: false, message: messages.SERVER_ERROR });
  }
}


export const ten = async (req,res)=>{
  try{
 const payload = userValidator(req.body)
  const { user_name, password} = payload
  if (payload) {
    const checkPhoneNumber = await loginUser(password)
    let query;
    let userId = 0
    // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
    // const otp = '1234'
    if (!checkPhoneNumber.body.length) {
    
      const today = format(new Date(), 'yyyy-MM-dd H:i:s')
      query = await insertRider(payload)

    } 
    // else {
      
    //   userId = checkPhoneNumber.body[0].id
    //   query = await updateUserOtp(payload, otp)
    // }
  
    // if (!userId) {
    //   userId = query.body.body.insertId
    // }

    if (query.status === responseCode.SUCCESS) {
      res.status(query.status).json({ status: true, messages: "Failed...." })
    } else {
      res.status(query.status).json({ status: false, message: "pls check" })
    }
  } else {

    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "error" })
  }
  }
catch (error) {
  logger.error('Whooops! This broke with error: ', error)
  res.status(500).send('Error!')
}
}
