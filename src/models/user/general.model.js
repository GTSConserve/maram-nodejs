import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";

export const get_AppSettings = async () => {
    const appSetting= await knex.select('key','value').from('app_settings')
    
    try {
    return { status: responseCode.SUCCESS, body: appSetting }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
    }
  }

  export const add_feedback = async (user_id,comments,message_id,currentDate) =>{

    
    const feed_back = await knex('feedbacks').select('created_at').where({created_at:currentDate})
    // var issame = moment([created_at]).isSame([currentDate]);

    // // var created_at = new Date();    
    // // dateFormat(created_at, "dd/mm/yyyy");
    if(created_at){
      // console.log("hi")
    return { status: false, body: feed_back  }
    }
    else{
      const feed_backs = await knex('feedbacks').insert({
            user_id: user_id,
            comments: comments,
            message_id:message_id 
      })
    // .Where({user_id:user_id})
   }
  }
  //   if( !new Date()){
  //     const feed_backs = await knex('feedbacks').update({
  //     user_id: user_id,
  //     comments: comments,
  //     message_id:message_id,
  //     // created_at: new Date()s
  //     }).Where({user_id:user_id})
  //     try{
  
  //       return { status: responseCode.SUCCESS, body: feed_backs }
  //     } 
  //     catch (error) {
  //       return { status: false}
  //     }}
  // }

  