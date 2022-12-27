import express from 'express';
import messages from '../../constants/messages';
import { get_Appcontrol, get_riderdetails, statusupdate, update_endtour, update_location, update_riderstatus, update_starttour, userLogin,getsingleorder, checkPassword, dashboard, cancel_order, order_list } from '../../models/rider/rider.model';
import responseCode from '../../constants/responseCode';
import knex from '../../services/db.service'
import { userValidator } from '../../services/validator.service';
import id from 'date-fns/locale/id/index';
import { createToken } from "../../services/jwt.service";
import { updateRiderToken } from "../../models/rider/rider.model";
import bcrypt from "bcrypt";





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

      const checkPassword1 = await knex
      .select("id","password")
      .from("rider_details")
      .where({user_name,status:"1" });
      console.log(checkPassword1[0].password);

      const isPassword = await bcrypt.compare(password,checkPassword1[0].password);
      console.log(isPassword);

      console.log(checkPassword1);
     let query;

         if (isPassword) {
          res
              .status(responseCode.SUCCESS)
              .json({ status: true, delivery_partner_id: checkPassword1[0].id, message: "Rider Login Successfully" });
          }
  
        else {
          res
            .status(responseCode.FAILURE.BAD_REQUEST)
            .json({ status: false, message: "password mismatch" });
        }
      }
  
    }

  catch (error) {
    console.error('Whooops! This broke with error: ', error)
    res.status(500).json({message:"user_id and password not matching"})
  }
  }
  

//  get single rider details
export const getRiderdetails = async (req, res) => {
  try {
    const { delivery_partner_id } = req.body;

    if (!delivery_partner_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "delivery_partner_id Is Missing" });
    }

    const delivery_partner = await get_riderdetails(delivery_partner_id);

    return res
      .status(responseCode.SUCCESS)
      .json({  data: delivery_partner.body[0],status: true,message:"ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};


// update single rider status
export const updateRiderstatus = async (req,res) => {
  try{
       const { delivery_partner_id,status} = req.body;

       if (!delivery_partner_id || !status) {
       return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }
       const riderstatus = await update_riderstatus(delivery_partner_id,status)
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
       const {delivery_partner_id,latitude,longitude} = req.body;

       if (!delivery_partner_id || !latitude || !longitude) {
        return res
         .status(responseCode.FAILURE.BAD_REQUEST)
         .json({ status: false, message: "Mandatory field Is Missing" });
      }
       const location = await update_location(delivery_partner_id,latitude,longitude);
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
       const {delivery_partner_id,tour_id,tour_status} = req.body;

       if (!delivery_partner_id || !tour_id || !tour_status) {
        return res
         .status(responseCode.FAILURE.BAD_REQUEST)
         .json({ status: false, message: "Mandatory field Is Missing" });
      }

       const starttour = await update_starttour(delivery_partner_id,tour_id,tour_status);
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
    const {delivery_partner_id,tour_id,tour_status} = req.body;

    if (!delivery_partner_id || !tour_id || !tour_status) {
      return res
       .status(responseCode.FAILURE.BAD_REQUEST)
       .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const endtour = await update_endtour(delivery_partner_id,tour_id,tour_status)
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


// get single order 
export const getSingleorder = async (req,res) => {
  try{
      const {order_id,delivery_partner_id,order_status} = req.body;

      if(!order_id  ){
        return res
       .status(responseCode.FAILURE.BAD_REQUEST)
       .json({ status: false, message: "Mandatory field Is Missing" });
      }
      // console.log(order_status)

     const order = await getsingleorder (order_id,delivery_partner_id,order_status)


     console.log(order.query5)
     if(order.status = true){
      let data = {
                "task_id":order.query1[0].id,
                // "task_name": "Task 1",
                "tour_status":order.query1[0].tour_status,
                "order_status": order.query1[0].status,
                "empty_bottle_count": order.daily[0].total_collective_bottle,
                "total_litre":order.daily[0].total_qty + " " +order.query3[0].unit_value,
                "total_addons_count":order.query5[0].order_id,
                 "delivered_addons_count":order.query6.length
      }

      let user = {
                 "user_id": order.query2[0].user_id,
                 "user_name": order.query2[0].user_name,
                 "customer_id": order.query2[0].customer_id,
                 "user_mobile": order.query2[0].user_mobile ,
                 "user_address": order.query2[0].user_address,
                 "landmark": order.query2[0].landmark,
                 "user_latitude": order.query2[0].user_latitude,
                 "user_longitude": order.query2[0].user_longitude
      }

      let products = [
        {
   
     "product_id": order.query3[0].id,
     "product_name":order.query3[0].product_name,
     "variation":order.query3[0].unit_value + "" +order.query3[0].unit_type,
     "quantity": order.query3[0].quantity},
     {

     "product_id": order.query4[0].add_id,
     "product_name":order.query4[0].product_name,
     "variation":order.query4[0].unit_value + "" +order.query3[0].unit_type,
     "quantity": order.query4[0].quantity,
       }
 
]

      let addons =[];

      for( let i=0;i<order.data;i++){
         addons.push({
          "addon_id": order.query5[i].addon_id,
          "addon_name":order.query5[i].product_name,
          "variation": order.query5[i].unit_value + "" +order.query5[i].unit_type,
          "quantity": order.query5[i].quantity
        })

      }
     

     return res.status(responseCode.SUCCESS).json({status: true,data:data,user,products,addons})
    
  }
  }
  catch(error){
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
    .json({ status: false, message: messages.SERVER_ERROR });
  }
  }
  




// order_status_update
export const orderStatusUpdate = async (req,res) => {
  try {
        const {user_id,order_id,order_status,subscription_id,products,addons} = req.body;
        if(!user_id || !order_id || !order_status){
          return res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "Mandatory field Is Missing" });
         }

        const orderstatus = await statusupdate(user_id,order_id,order_status,subscription_id,products,addons);



        }
   catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
    .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// rider dashboard
export const riderDashboard = async (req,res) => {
  try{
    const {delivery_partner_id,date} = req.body;

    if(!delivery_partner_id || !date){
      return res
      .status(responseCode.FAILURE.BAD_REQUEST)
      .json({ status: false, message: "Mandatory field Is Missing" });
     }


    const total = await dashboard(delivery_partner_id,date);
    // console.log(total);

    const bottle = await knex('daily_orders').select('total_collective_bottle').where({router_id:total.data,date:date})
    
    let sum=0;
    for(let i=0; i<bottle.length; i++){
     sum+=Number(bottle[i].total_collective_bottle)
      }


      let query ={
       "total_orders":total.order.length,
       "delivered_orders":total.delivery.length,
       "undelivered_orders":total.pending.length+total.undelivered.length,
       "empty_bottle":sum
      }
      console.log(query)
      return res.status(responseCode.SUCCESS).json({status: true, query })
    }
  
  catch(error){
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
    .json({ status: false, message: messages.SERVER_ERROR });
  }
  }


  // rider cancel order 
  export const cancelOrder = async (req,res) => {
    try{
      const {user_id,order_id,delivery_partner_id,order_status,reason,date}= req.body;

      if(!delivery_partner_id || !order_status || !date){
        return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
       }

      const cancel = await cancel_order(user_id,order_id,delivery_partner_id,order_status,date);
      
    // if(cancel.status=true){
    //   const reason1 = await knex('daily_orders').insert({reason:reason})
    // }

      return res.status(responseCode.SUCCESS).json({data:cancel})


    }
    catch(error){
      console.log(error)
      return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
     .json({ status: false, message: messages.SERVER_ERROR });
    }
  }


  // order list 
  export const OrderList = async (req,res) => {
    try{
      const {delivery_partner_id,status} = req.body;

      if(!delivery_partner_id){
        return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
       }

      const order = await order_list(delivery_partner_id,status)
      console.log(order)
      let query ={
        "tour_id":order.router[0].id,
        "tour_route":order.router[0].name,
        "total_orders":order.order.length,
        "completed_orders":order.delivery.length       
       }
       let data ={
        "order_id":order.order[0].id,
        "milk_variation":order.order[0].total_qty +" "+ order.query3[0].unit_type,
        "addon_items":order.addon.length,
        "user_name":order.user[0].name,
        "customer_id":order.user[0].user_unique_id,
        "bottle_return":order.order1[0].total_collective_bottle,
        "order_status":order.order1[0].status
       }
       return res.status(responseCode.SUCCESS).json({status: true, ...query,data })
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
