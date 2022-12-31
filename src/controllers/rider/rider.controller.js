import express, { query } from 'express';
import messages from '../../constants/messages';
import { get_Appcontrol, get_riderdetails, statusupdate, update_endtour, update_location, update_riderstatus, update_starttour, userLogin, getsingleorder, checkPassword, dashboard, cancel_order, order_list, locationcheck, home_delivery, logout_rider } from '../../models/rider/rider.model';
import responseCode from '../../constants/responseCode';
import knex from '../../services/db.service'
import { userValidator } from '../../services/validator.service';
import id from 'date-fns/locale/id/index';
import { createToken } from "../../services/jwt.service";
import { updateRiderToken } from "../../models/rider/rider.model";
import bcrypt from "bcrypt";
import haversine from "haversine-distance";





//  rider app controls
export const getAppControls = async (req, res) => {
  try {

    const settings = await get_Appcontrol()

    let appSettingData = {}
    for (const settingData of settings.body) {
      appSettingData[settingData.key] = settingData.value;

    }
    res.status(200).json({ status: true, data: appSettingData, message: "ok" })

    // res.status(200).json({ status: true,data: settings.body }) 
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error })
  }
}



// rider login 
export const login = async (req, res) => {
  try {

    const payload = userValidator(req.body);
    const { user_name, password } = payload;

    if (payload.status) {

      const checkPassword1 = await knex
        .select("id", "password")
        .from("rider_details")
        .where({ user_name, login_status: "0" });

      console.log(checkPassword1);

      const isPassword = await bcrypt.compare(password,checkPassword1[0].password);
      console.log(isPassword);

      console.log(checkPassword1);
      let query;

      if (isPassword) {
        const checkPassword2 = await knex
        .update({login_status:"1"})
        .from("rider_details")
        .where({ user_name,});
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
    res.status(500).json({ message: "user_id and password not matching" })
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
      .json({ data: delivery_partner.body[0], status: true, message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};


// update single rider status
export const updateRiderstatus = async (req, res) => {
  try {
    const { delivery_partner_id, status } = req.body;
    
    if (!delivery_partner_id) {
      return res

        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }
    const riderstatus = await update_riderstatus(delivery_partner_id, status)
    if (riderstatus.status) {
      return res.status(responseCode.SUCCESS).json(riderstatus)
    } else {
      return res.status(responseCode.FAILURE.DATA_NOT_FOUND).json(riderstatus)

    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
}


// update single rider location 
export const updeteRiderLocation = async (req, res) => {
  try {
    const { delivery_partner_id, latitude, longitude } = req.body;

    if (!delivery_partner_id || !latitude || !longitude) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }
    const location = await update_location(delivery_partner_id, latitude, longitude);
    return res.status(responseCode.SUCCESS).json({ status: true, message: "ok" })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
}


// update starttour 
export const updateStartTour = async (req, res) => {
  try {
    const { delivery_partner_id, tour_id, tour_status } = req.body;

    if (!delivery_partner_id || !tour_id || !tour_status) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const starttour = await update_starttour(delivery_partner_id, tour_id, tour_status);
    if (starttour.status) {
      const route = await knex('routes').select('id').where({ rider_id: delivery_partner_id });

      const status = await knex("daily_orders").update({ tour_status: "started" }).where({ router_id: route[0].id })
      console.log(status)
      return res.status(responseCode.SUCCESS).json(starttour)
    } else {
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
export const updateEndtour = async (req, res) => {
  try {
    const { delivery_partner_id, tour_id, tour_status } = req.body;

    if (!delivery_partner_id || !tour_id || !tour_status) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const endtour = await update_endtour(delivery_partner_id, tour_id, tour_status)
    if (endtour.status) {
      const route = await knex('routes').select('id').where({ rider_id: delivery_partner_id });

      const status = await knex("daily_orders").update({ tour_status: "completed" }).where({ router_id: route[0].id })
      return res.status(responseCode.SUCCESS).json(endtour);
    }
    else {
      return res.status(responseCode.FAILURE.DATA_NOT_FOUND).json(endtour);
    }

  }
  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// get single order 
export const getSingleorder = async (req, res) => {
  try {
    const { order_id, delivery_partner_id, order_status } = req.body;

    if (!order_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }
    // console.log(order_status)

    const order = await getsingleorder(order_id, delivery_partner_id, order_status)


    //  console.log(order.query5)
    if (order.status = true) {
      let data = {
        "task_id": order.query1[0].id,
        "task_name": "Task " + order.query2[0].user_id,
        "tour_status": order.query1[0].tour_status,
        "order_status": order.query1[0].status,
        "empty_bottle_count": order.daily[0].total_collective_bottle,
        "total_litre": order.daily[0].total_qty + " " + order.query3[0].unit_type,
        "total_addons_count": order.query5[0].order_id,
        "delivered_addons_count": order.query6.length
      }

      let user = {
        "user_id": order.query2[0].user_id,
        "user_name": order.query2[0].user_name,
        "customer_id": order.query2[0].customer_id,
        "user_mobile": order.query2[0].user_mobile,
        "user_address": order.query2[0].user_address,
        "landmark": order.query2[0].landmark,
        "user_latitude": order.query2[0].user_latitude,
        "user_longitude": order.query2[0].user_longitude
      }

      let products = [];
      for (let i = 0; i < order.query3.length; i++) {
        products.push({
          "product_id": order.query3[0].id,
          "product_name": order.query3[0].product_name,
          "subscription_id": order.query3[0].id,
          "variation": order.query3[0].unit_value + "" + order.query3[0].unit_type,
          "quantity": order.query3[0].quantity,
          "delivered_status": order.query5[i].status
        })
      }

      let additional = [];
      for (let i = 0; i < order.query4.length; i++) {
        additional.push({
          "product_id": order.query4[0].add_id,
          "product_name": order.query4[0].product_name,
          "additional_order_id": order.query4[0].add_id,
          "subscription_id": order.query4[0].id,
          "variation": order.query4[0].unit_value + "" + order.query3[0].unit_type,
          "quantity": order.query4[0].quantity,
          "delivered_status": order.query4[i].status
        })
      }


      let addons = [];

      for (let i = 0; i < order.data; i++) {
        addons.push({
          "addon_id": order.query5[i].addon_id,
          "addon_name": order.query5[i].product_name,
          "variation": order.query5[i].unit_value + "" + order.query5[i].unit_type,
          "quantity": order.query5[i].quantity,
          "delivered_status": order.query5[i].status
        })

      }


      return res.status(responseCode.SUCCESS).json({ status: true, data: data, user, products, additional, addons })

    }
  }
  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}





// order_status_update
export const orderStatusUpdate = async (req, res) => {
  try {

    const { user_id, delivery_partner_id, one_liter_count, half_liter_count, order_id, order_status, product, addons, additional_orders } = req.body;

    if (!user_id || !order_id || !order_status) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const orderstatus = await statusupdate(user_id,
      delivery_partner_id,
      one_liter_count,
      half_liter_count,
      order_id, order_status,
      product, addons,
      additional_orders);

    let sum = one_liter_count + half_liter_count;

    const collect_bottle = await knex('daily_orders')
      .update({ total_collective_bottle: sum })
      .where({ user_id: user_id, id: order_id })

    const collect_bottle1 = await knex('users')
      .update({ one_liter_in_return: one_liter_count, half_liter_in_return: half_liter_count,bottle_status:"0" })
      .where({ id: user_id })

    return res.status(responseCode.SUCCESS).json({  data:orderstatus })

  }


  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}





// rider dashboard
export const riderDashboard = async (req, res) => {
  try {
    const { delivery_partner_id, date } = req.body;

    if (!delivery_partner_id || !date) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }


    const total = await dashboard(delivery_partner_id, date);
    // console.log(total);

    const bottle = await knex('daily_orders').select('total_collective_bottle').where({ router_id: total.data, date: date })

    let sum = 0;
    for (let i = 0; i < bottle.length; i++) {
      sum += Number(bottle[i].total_collective_bottle)
    }


    let query = {
      "total_orders": total.order.length,
      "delivered_orders": total.delivery.length,
      "undelivered_orders": total.pending.length + total.undelivered.length,
      "empty_bottle": sum
    }
    console.log(query)
    return res.status(responseCode.SUCCESS).json({ status: true, query })
  }

  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.DATA_NOT_FOUND)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// rider cancel order 
export const cancelOrder = async (req, res) => {
  try {
    const { user_id, order_id, delivery_partner_id, order_status, reason, date } = req.body;

    if (!delivery_partner_id || !order_status || !date) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const router = await knex('routes').select('id').where({ rider_id: delivery_partner_id });

    const order = await knex('daily_orders').update({ status: order_status }).where({ user_id: user_id, router_id: router[0].id, date: date });

    return res.status(responseCode.SUCCESS).json({ status: true, message: "order cancelled by rider" });
    // if(cancel.status=true){
    //   const reason1 = await knex('daily_orders').insert({reason:reason})
    // }

    // return res.status(responseCode.SUCCESS).json({data:cancel.status})


  }
  catch (error) {
    console.log(error)
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// order list 
export const OrderList = async (req, res) => {
  try {
    const { delivery_partner_id, status } = req.body;

    if (!delivery_partner_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const order = await order_list(delivery_partner_id, status)
    // console.log(order)
    
    //  const  = Object.keys(person);

    return res.status(responseCode.SUCCESS).json({ ...order })
  }
  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// location check
export const LocationCheck = async (req, res) => {
  try {
    const { delivery_partner_id, order_id } = req.body;

    if (!delivery_partner_id || !order_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const location = await locationcheck(delivery_partner_id, order_id);

    console.log(location)

    let point1 = { lat: location.check[0].latitude, lng: location.check[0].longitude }

    let point2 = { lat: location.address[0].latitude, lng: location.address[0].longitude }

    let haversine_m = haversine(point1, point2); //Results in meters (default)
    let haversine_km = haversine_m / 20000; //Results in kilometers


    if (haversine_km <= 1000) {
      return res.status(responseCode.SUCCESS).json({ status: true, message: "ok" })
    }
    else {
      return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "out of range" })

    }


  } catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}


// home delivery details 
export const homeDelivery = async (req, res) => {
  try {
    const { delivery_partner_id, date } = req.body;


    if (!delivery_partner_id || !date) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Mandatory field Is Missing" });
    }

    const home = await home_delivery(delivery_partner_id, date);
    let query = {
      "tour_id": home.router[0].id,
      "tour_route": home.router[0].name,
      "total_orders": home.order.length,
      "completed_orders": home.delivery.length
    }
    let milk = {
      "one_litre_count":home.sum,
       "half_litre_count":home.sum1,
        "half_litre_pouch":home.sum,
        
        }
    let addon = {
      "addons_count":home.sum4,

    } 
    let empty_bottle = {
          "one_litre_bottle":home.sum2,
           "half_litre_bottle":home.sum3
            }

    const router = {

      "tour_id": 1,
      "route": "East Tambaram",
      "total_orders": 15,
      "completed_orders": 12,
      "milk": {
        "one_liter_count": 30,
        "half_liter_count": 30,
        "half_liter_pouch": 10
      },
      "addons_count": 30,
      "empty_bottle": {
        "one_litre_bottle": 12,
        "half_litr_bottle": 10
      }
    }
    res
    .status(responseCode.SUCCESS)
    .json({ status: true, data: query,milk,addon,empty_bottle });
  }
  catch (error) {
    console.log(error);
    return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
}

// rider logout 
export const logout = async (req, res) => {
  try {
    const { delivery_partner_id } = req.body;

    if (delivery_partner_id) {
      const rider = await logout_rider(delivery_partner_id);

      console.log(delivery_partner_id);
      res
        .status(responseCode.SUCCESS)
        .json({ status: true, message: "Succesfully Logout.." });
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Logout failed.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};


