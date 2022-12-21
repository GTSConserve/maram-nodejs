import knex from "../../services/db.service";
import responseCode from "../../constants/responseCode";




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
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message };
    }
  }

  // update rider status
  export const update_riderstatus = async (delivary_partner_id,status) => {
    try{
        if(status==1){
        const update = await knex("rider_details").update({status:status}).where({id:delivary_partner_id})
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
  export const update_location = async (delivary_partner_id,latitude,longitude) => {
    try{
        const riderlocation = await knex('rider_details').update({latitude:latitude,longitude:longitude}).where({id:delivary_partner_id})
        return{status:true,data:riderlocation}
    }catch(error){
      console.log(error);
      return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error.message}
    }

  }

  // update start tour 
  export const update_starttour = async (delivary_partner_id,tour_id,tour_status) => {
    try {
      if(tour_status==2){
      const updatetour = await knex('routes').update({status:'2'}).where({id:tour_id,rider_id:delivary_partner_id})
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
  export const update_endtour = async (delivary_partner_id,tour_id,tour_status) => {
    try{
      if(tour_status==3){
        const updatetour = await knex('routes').update({status:'3'}).where({id:tour_id,rider_id:delivary_partner_id})
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
  