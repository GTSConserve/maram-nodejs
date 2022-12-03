import bcrypt from "bcrypt";
import knex from "../../services/db.service";
// import mysqlRequest from "../requests/mysqlRequest.request"
// import queryBuilder from "../services/queryBuilder.service"
// import responseCode from "../constants/responseCode"
// import format from "date-fns/format"
// import distanceCalculator, { SUPPORTED_UNIT } from 'distance-calculator-js';
// import knex from "../services/queryBuilder.service"


export const checkUser = async (email, password) => {
  try {
    const get_user = await knex("admin_users")
      .select("email", "password", "id" , "user_group_id")
      .where({ email });

    if (get_user.length === 0) {
      return { status: false, message: "Email Not Found" };
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

export const getPassword = async(req,res) =>{
  try{
    const change_password = await knex("admin_users").select('email','password')
    return {status:true,data:change_password}
  }
  catch{
    console.log(error)
    return {status:false,message:data_not_found}
  }
}