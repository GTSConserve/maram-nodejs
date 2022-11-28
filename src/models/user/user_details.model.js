// import mysqlRequest from "../requests/mysqlRequest.request"
// import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../../constants/responseCode";
// import { userGroup } from "../constants/controls"
import knex from "../../services/db.service";




// export const add_address = async (req,res ) =>
//  {
//     const address = await knex('user_address').insert({user_id,title,address,landmark,type});   // insert user into user table
//          // respond back to request
// ;
//     try{
//         res.json({ success: true, message: 'ok' });
//     }
//      catch (error) {
//       return {
//         status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//         message: error.body,
//       };
//     }
// }

export const get_address = async (req,res) => {
    const getaddress = await knex.select('user_id','title','address','landmark','type','status').from('user_address')
    try{
        console.log('hi')
        return { status:responseCode.SUCCESS, body: getaddress };
    }
    catch(error){
        return {
                  status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,
                  message: error,
                };

    }
}

export const edit_address = async (user_id,title,address,landmark,type) => {
    const user = await knex('user_address').update({
        address : address,title : title,landmark : landmark,type : type
    })
    .where({user_id : user_id})
    try{
        return { status:responseCode.SUCCESS, body: user };
    }
    catch(error){
        console.log(error)
        return {
                  status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,
                  error,
                };

    }
    
}

export const get_user = async (user_id) => {
    const getuser = await knex.select('name','profile_photo_path','mobile_number','email').from('users').where({id:user_id})
    try{
         return { status:responseCode.SUCCESS,body:getuser};
    }
    catch(error){
        console.log(error);
        return {status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,error}
    }
}


export const delete_user_address = async (user_id) => {
    const deluser = await knex('user_address').update({status:'0'})
    .where({user_id:user_id})
    try{
        return { status:responseCode.SUCCESS, body: deluser };
    }
    catch(error){
        console.log(error)
        return {
                  status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,
                  error,
                };

    }
}

export const remove_order = async (id,user_id) => {
    const deluser = await knex('orders').where({id:id,user_id:user_id}).del()
    try{
        return { status:responseCode.SUCCESS, body: deluser };
    }
    catch(error){
        console.log(error)
        return {
                  status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,
                  error,
                };
}
}
  
export const edit = async (id,user_id,value) => {
    const editorder = await knex('orders').where({id:id,user_id:user_id}).update({value:value})
    try{
        return { status:responseCode.SUCCESS, body: editorder };
    }
    catch(error){
        console.log(error)
        return {
                  status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,
                  error,
                };
}
}

