import knex from "../../services/db.service";
import responseCode from "../../constants/responseCode";
import bcrypt from "bcrypt"




export const updateRiderToken = async (refresh_token, user_name) => {
  const query = await knex("rider_details")
    .update({ refresh_token: refresh_token })
    .where({ user_name: user_name });
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};


export const checkPassword = async (user_name, password) => {
  // console.log(user_name, password)
  try {
    const get_user = await knex("rider_details")
      .select( "password")
      .where({ user_name ,status : "1" });
      console.log(get_user)

    if (get_user.length === 0) {
      return { status: false, message: "User Not Found" };
    }
    console.log(get_user);

    // const isPassword = '12345678'

    const isPassword = await bcrypt.compare(password, get_user[0].password);
    console.log(isPassword);

    if (!isPassword) {
      return { status: false, message: "Invalid Password" };
    }

    return { status: true , data : get_user[0] };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Error at getting user details" };
  }
};



export const userLogin = async (password) => {

    const checkPassword = await knex.select('*').from('rider_details').where({'password': password})
    
    try {
      return { status: responseCode.SUCCESS, body: checkPassword }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }
  
  export const insertUser = async (payload,otp,today) => {

    const user_query = await knex.select(['id']).from('rider_details')
  
    let user_length = user_query.body
  
    user_length += 1
  
    const generate_id = 'MARAM' + user_length
  
    const { user_name, password} = payload
    const query  = await knex.insert([{
      user_unique_id : generate_id,
      password: password,
      user_name:user_name,
      // name:name
      // user_id: userGroup.USER_GROUP_ID,
      // app_version:'1.0',
      // status:'1',
  
    }]).into('rider_details')
    try {
    return { status: responseCode.SUCCESS, body: query }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }

  // get rider app controls 
  export const get_Appcontrol = async () => {
    const appSetting= await knex.select('key','value').from('app_settings')
    // .where({name:'terms'}) .where({ name:'contact us'})
    
    try {
    return { status: responseCode.SUCCESS, body: appSetting }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
    }
  }




  // get single rider details 
  export const get_riderdetails = async (delivery_partner_id) => {
    try {
      const getcategories = await knex
        .select(
          "rider.id as delivery_partner_id",
          "routes.name as router_name",
          "rider.address as address",
          "rider.online_status as online_status",
          "rider.status as status"

          
        )
        .from("rider_details as rider")
        .join("routes", "routes.rider_id", "=", "rider.id")
        .where({ "rider.id": delivery_partner_id });
  
      console.log(getcategories);
      return { status: true, body: getcategories };
       }
    catch(error){
      console.log(error);
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: error.message };
    }
  }

  // update rider status
  export const update_riderstatus = async (delivery_partner_id,status) => {
    try{
        if(status==1){
        const update = await knex("rider_details").update({status:status}).where({id:delivery_partner_id})
        return{status:true,message: "SuccessFully Updated"};
        }
        else{
          return{status:false,message:"cannot updated"}
        }
        
    }
    catch(error){
      console.log(error)
      return{ status: false, message: "Cannot Update the status" };
    }
  }


  // update rider location 
  export const update_location = async (delivery_partner_id,latitude,longitude) => {
    try{
        const riderlocation = await knex('rider_details').update({latitude:latitude,longitude:longitude}).where({id:delivery_partner_id})
        return{status:true,data:riderlocation}
    }catch(error){
      console.log(error);
      return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error.message}
    }

  }

  // update start tour 
  export const update_starttour = async (delivery_partner_id,tour_id,tour_status) => {
    try {
      if(tour_status==1){
      const updatetour = await knex('rider_details').update({status:'1'}).where({id:delivery_partner_id})
      return{status:true,message:"successfully updated"}
      }
      else{
        return{status:false,message:"cannot updated"}
      }
    } catch (error) {
      console.log(error);
      return{ status: false, message: "Cannot Update the status" };
    }
  }


  //  update endtour 
  export const update_endtour = async (delivery_partner_id,tour_id,tour_status) => {
    try{
      if(tour_status==2){
        const updatetour = await knex('rider_details').update({status:'2'}).where({id:delivery_partner_id})
        return{status:true,message:"successfully updated"}
        }
        else{
          return{status:false,message:"cannot updated"}
        }
    }
    catch (error) {
      console.log(error);
      return{ status: false, message: "Cannot Update the status" };
    }
  }
  
  // get single order
  export const getsingleorder = async (order_id,delivery_partner_id,order_status,router_id) => {
    
        try {
              
          const daily = await knex('daily_orders').select('id','router_id','status','total_collective_bottle','add_on_order_id','user_id','subscription_id','additional_order_id',"total_qty").where({status:order_status,id:order_id})

          // console.log(daily);

        const query1 =  await knex("daily_orders")
        .select(
          "id",
          // "daily_orders.task_name",
          "tour_status",
          "status ",
        )
        .where({"daily_orders.id":daily[0].id})
        
        const query2 = await knex("users")
        .join("user_address", "user_address.user_id", "=", "users.id")        
        .select(
          "users.id as user_id",
          "users.name as user_name",
          "users.user_unique_id as customer_id",
          "users.mobile_number as user_mobile",
          "user_address.address as user_address",
          "user_address.landmark as landmark",
          "user_address.latitude as user_latitude",
          "user_address.longitude as user_longitude"
        )
        .where({"users.id":daily[0].user_id})

        // console.log(query2)

        const query3 = await knex('daily_orders')
        .join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id")
        .join("products", "products.id", "=", "subscribed_user_details.product_id")
        .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
        .select(
          "products.id as product_id",
          "products.name as product_name",
          "subscribed_user_details.quantity as quantity",
          "products.unit_value as unit_value",
          "unit_types.value as unit_type",
          "products.price as price",
          "subscribed_user_details.id as id",
          "subscribed_user_details.status as status",
          "daily_orders.id"
        ).where({"subscribed_user_details.id":daily[0].subscription_id,"daily_orders.id":order_id})
        console.log(query3.length)

        const query4 = await knex('daily_orders')
        .join("additional_orders", "additional_orders.id", "=", "daily_orders.additional_order_id")
        .join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id")
        .join("products", "products.id", "=", "subscribed_user_details.product_id")
        .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
        .select(
          "products.id as product_id",
          "products.name as product_name",
          "additional_orders.quantity as quantity",
          "products.unit_value",
          "unit_types.value as unit_type",
          "products.price",
          "additional_orders.id as add_id",
          "additional_orders.status as status",
          "daily_orders.id"
        ).where({"additional_orders.id":daily[0].additional_order_id,"daily_orders.id":order_id});
        // console.log(query4)


        const query5 = await knex('daily_orders')
        .join("add_on_orders", "add_on_orders.id", "=", "daily_orders.add_on_order_id")
        .join("add_on_order_items", "add_on_order_items.add_on_order_id", "=", "add_on_orders.id")
        .join("products", "products.id", "=", "add_on_order_items.product_id")
        .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
        .select(
          "products.id as product_id",
          "products.name as product_name",
          "add_on_order_items.quantity as quantity",
          "products.unit_value as unit_value",
          "unit_types.value as unit_type",
          "products.price",
          "add_on_orders.id as order_id",
          "add_on_orders.id as addon_id",
          "add_on_order_items.status as status",
          "daily_orders.id"
        )
        .where({"add_on_orders.id":daily[0].add_on_order_id,"daily_orders.id":order_id})
      console.log(query5)


      const query6 = await knex('add_on_order_items').select('id','add_on_order_id').where({"add_on_order_items.add_on_order_id":daily[0].add_on_order_id,status:"delivered"})
      
      // console.log(query6)
      
      return{status:true,daily,query1,query2,query3,query4,query5,query6,data:query5.length}


    } catch (error) {
      console.log(error);
      return{ status: false, message: "Cannot get single orders" };
    }
  }

  // oder status update
  // export const statusupdate = async (user_id,delivery_partner_id,one_liter_count,half_liter_count,order_id,order_status,product,addons) => {
  //   try {
  //        const update = await knex('daily_orders')
  //        .update({
  //         status:order_status,
  //         collected_one_liter_bottle:one_liter_count ,
  //         collected_half_liter_bottle:half_liter_count
  //        }).where({user_id:user_id,id:order_id});


         
  //        if(product){
  //        for(let i=0; i<product.length; i++){
  //         const subscription = await knex('subscribed_user_details').update({subscription_status:order_status}).where({id:product[i].subscription_id})
  //        }
  //        for(let i=0; i<product.length; i++){
  //         const subscription_list = await knex('additional_orders').update({status:order_status}).where({subscription_id:product[i].subscription_id})
  //        }
  //       }
  //       else{
  //         return{status:false,message:"no subscription product"}
  //       }
  //       if(addons){
  //         for(let i=0; i<addons.length; i++){
  //          const add_on_subscription = await knex('add_on_orders')
  //          .update({status:order_status}).where({id:addons[i].id})
  //         }
  //         for(let i=0; i<addons.length; i++){
  //           const add_on_order_items_subscription = await knex('add_on_order_items')
  //           .update({status:order_status}).where({add_on_order_id:addons[i].id})
  //          }

  //        }
  //        else{
  //          return{status:false,message:"no addon product"}
  //        }
  //       return{status:true}
      
  //   } catch (error) {
  //     console.log(error);
  //     return{ status: false, message: "Cannot Update the status" };
  //   }
  // }

  // dashboard
  export const dashboard = async(delivery_partner_id,date) => {
    try {
          const route = await knex('routes').select('id').where({rider_id:delivery_partner_id});
          // console.log(route[0].id)
          const order = await knex('daily_orders').select('id').where({router_id:route[0].id,date:date});

          const delivery = await knex('daily_orders').select('id').where({router_id:route[0].id,date:date,status:"delivered"});
          
          const pending = await knex('daily_orders').select('id').where({router_id:route[0].id,date:date,status:"pending"})
          // .orwhere({status:"undelivered"});
          const undelivered = await knex('daily_orders').select('id').where({router_id:route[0].id,date:date,status:"undelivered"})
         
      
      return{status:true,data:route[0].id,order,delivery,pending,undelivered}
      
    } catch (error) {
      console.log(error);
      return{ status: false, message: "No data found" };
    }
  }


  // // rider cancel order
  // export const cancel_order = async (user_id,order_id,delivery_partner_id,order_status,date,reason) => {
  //   try { 
         
  //       const router = await knex('routes').select('id').where({rider_id:delivery_partner_id});

  //        const order = await knex('daily_orders').update({status:order_status}).where({user_id:user_id,router_id:router[0].id,date:date});

  //        return{status:true,message:"order cancelled by rider"};

  //   } catch (error) {
  //     console.log(error);
  //     return{ status: false, message: "No data found" };
  //   }
  // }

// order list 
export const order_list = async (delivery_partner_id,status) =>{
  try {
    const router = await knex('routes').select('id','name').where({rider_id:delivery_partner_id});
    // console.log(router)
    const query3 = await knex('daily_orders')
        .join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id")
        .join("products", "products.id", "=", "subscribed_user_details.product_id")
        .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
        .select(
          "daily_orders.router_id",
          "products.unit_value as unit_value",
          "unit_types.value as unit_type",
          
        ).where({"daily_orders.router_id":router[0].id});

    const order = await knex('daily_orders').select(
      'id',
      'total_collective_bottle',
      'status','add_on_order_id',
      'user_id','total_qty')
      .where({router_id:router[0].id,status:status});

      console.log(order)

    const delivery = await knex('daily_orders')
    .select('id')
    .where({router_id:router[0].id,status:status});

    const order1 = await knex('daily_orders').select(
      'id',
      'total_collective_bottle',
      'status',
      'add_on_order_id',
      'user_id','total_qty')
      .where({router_id:router[0].id,status:status});
    console.log(order1)
  
    const addon = await knex('add_on_order_items')
    .select('id')
    .where({add_on_order_id:order1[0].add_on_order_id,status:"delivered"});

    const bottle = await knex('empty_bottle_tracking').select('status');

    
    const addon1 = await knex('add_on_order_items')
    .select('id')
    .where({add_on_order_id:order1[0].add_on_order_id,status:"undelivered"});
   
    
    const user = await knex('users')
    .select('name','user_unique_id')
    .where({id:order[0].user_id})

    // console.log(router,router1,order,delivery,addon)
    return{status:true,router,order,delivery,addon,addon1,order1,user,query3,bottle};
  } catch (error) {
    console.log(error)
    return{ status: false, message: "No data found" };    
  }
}

// location check 
export const locationcheck =async(delivery_partner_id,order_id) => {
  try {
      const check = await knex('rider_details').select('latitude','longitude').where({id:delivery_partner_id});

      const address = await knex('daily_orders')
      .join("user_address", "user_address.user_id", "=", "daily_orders.user_id")
      .select(
        'user_address.latitude',
        'user_address.longitude')
        .where({'daily_orders.id':order_id});

      console.log(address)

      return{status:true,check,address};

    
  } catch (error) {
    console.log(error)
    return{ status: false, message: "No data found" };  
  }
} 


// home delivery details 
// export const home_delivery = async (delivery_partner_id) => {
//   try {
//     const router = await knex('routes').select('id','name').where({rider_id:delivery_partner_id});

//     const order = await knex('daily_orders').select(
//       'id',
//       'total_collective_bottle',
//       'status','add_on_order_id',
//       'user_id','total_qty')
//       .where({router_id:router[0].id});

//     const delivery = await knex('daily_orders')
//     .select('id')
//     .where({router_id:router[0].id});

//   } catch (error) {
//     console.log(error)
//     return{ status: false, message: "No data found" };  
//   }
// }


// rider logout
export const logout_rider = async (delivery_partner_id) => {
  try {
    const query = await knex("rider_details")
      .update({status: "0"})
      .where({ id: delivery_partner_id });

    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};