import knex from "../../services/db.service";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"
import { createToken, parseJwtPayload } from "../../services/jwt.service";

import { checkUser,getPassword } from "../../models/super_admin/login.module";

import { transporter, getPasswordResetURL, resetPasswordTemplate } from "../../notifications/message.sender"

export const updateChangePassword = async (req, res) => {
  try {
    let token = req.session.token;

    if (!token) {
      req.flash("error", "Need To Login First");
      return res.redirect("/auth/login");
    }

    const currentTokenPayload = parseJwtPayload(token.token);

    const admin_id = currentTokenPayload.user_id;

    const user = await knex("admin_users")
      .select("user_group_id", "password", "is_password_change")
      .where({ id: admin_id });

    const { old_password, new_password, confirm_new_password } = req.body;

    const isPassword = await bcrypt.compare(old_password, user[0].password);

    if (!isPassword) {
      req.flash("error", "invalid password");
      return res.redirect("/auth/get_change_password");
    }

    if (new_password.length < 8) {
      req.flash("error", "New password should be atleast 8 characters");
      return res.redirect("/auth/get_change_password");
    }
    if (confirm_new_password.length < 8) {
      req.flash("error", "Confirm password should be atleast 8 characters");
      return res.redirect("/auth/get_change_password");
    }

    if (new_password !== confirm_new_password) {
      req.flash("error", "Password Should Be Same");
      return res.redirect("/auth/get_change_password");
    }

    let query = {};
    if (user[0].user_group_id == 2) {
      if (user[0].is_password_change == 0) {
        query.is_password_change = "1";
      }
    }

    let password = await bcrypt.hash(new_password, 10);

    query.password = password;

    await knex("admin_users").update(query).where({ id: admin_id });

    req.flash("success", "successfully password changed");
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getChangePassword = async (req, res) => {
  try {
    res.render("auth/change_password");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateProfile = async (req, res) => {
  try {
    let token = req.session.token;

    if (!token) {
      req.flash("error", "Need To Login First");
      return res.redirect("/auth/login");
    }

    const currentTokenPayload = parseJwtPayload(token.token);

    const admin_id = currentTokenPayload.user_id;

    const {
      first_name,
      last_name,
      mobile_number,
      alternate_mobile_number,
      alternate_email,
    } = req.body;

    if (!first_name) {
      req.flash("error", "First Name is Missing");
      return res.redirect("/auth/get_profile");
    }
    if (!last_name) {
      req.flash("error", "Last Name is Missing");
      return res.redirect("/auth/get_profile");
    }
    if (!mobile_number) {
      req.flash("error", "Mobile Number is Missing");
      return res.redirect("/auth/get_profile");
    }

    let update_user = {
      first_name,
      last_name,
      mobile_number,
    };

    if (alternate_mobile_number) {
      update_user.alternate_mobile_number = alternate_mobile_number;
    }
    if (alternate_email) {
      update_user.alternate_email = alternate_email;
    }

    if (req.file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
      update_user.profile_photo_path = image;
    }

    await knex("admin_users").update(update_user).where({ id: admin_id });

    req.flash("success", " Updated Successfully");
    res.redirect("/auth/get_profile");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const  getProfile = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const admin = await knex("admin_users")
      .select(
        "first_name",
        "last_name",
        "mobile_number",
        "alternate_mobile_number",
        "alternate_email",
        "profile_photo_path"
      )
      .where({ id: admin_id });

    if (admin[0].profile_photo_path) {
      admin[0].profile_photo_path =
        "http://" + req.headers.host + admin[0].profile_photo_path;
    }

    res.render("auth/profile", { user: admin[0] });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const logoutHandler = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/login");
  }
};

export const loginForm = async (req, res) => {
  let token = req.session.token;

  if (token) {
    req.flash("error", "cannot login again");
    return res.redirect("/home");
  }
  res.render("auth/login");
};

export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "mandatore field are missing");
      return res.redirect("/auth/login");
    }

    if (password.length < 5) {
      req.flash("error", "Password Must Be atleast 5 Characters");
      return res.redirect("/auth/login");
    }

    const check_user = await checkUser(email, password);

    if (!check_user.status) {
      req.flash("error", check_user.message);
      return res.redirect("/auth/login");
    }

    const payload = {
      user_id: check_user.data.id,
      group_id: check_user.data.user_group_id,
    };

    const token = createToken(payload);

    if (token.status) {
      req.session.token = token;
    }

    req.flash("error", "Successfully Login");
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/login");
  }
};

// export const getForgotPassword = async(req,res) => {
//   try {
//     const {email,password} = req.body

//     if (!email) {
//       req.flash("error","manatory field is missing")
//     }
//     const password_check = await getPassword(email,password)
//     if (err) {
//       throw err;
//     }
//   } catch (error) {

//   }
// }

export const sendPasswordResetEmail = async (req,res) => {
  try {
    const email = req.body
    if (email) {
      // console.log(email)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:  "smtp.gmail.com",
        auth: {
          user: 'bhoobalan.gts@gmail.com',
          pass: 'ggvmpjcbdafvwjcg'
        }
      });
      console.log(transporter)
      const password = Math.floor(100000000 + Math.random() * 900000000)
      const new_password = await knex('admin_users').update({password:password})
      console.log(new_password)
      
      var mailOptions = {
        from: 'bhoobalan.gts@gmail.com',
        to: 'bhoobalan.gts@gmail.com',
        subject: 'Change Password',
        text: `Your Reset Password ${password}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    res.status(200).json({ status: true,message:"message send successfully" }) 
  } catch (error) {
    res.status(500).json({ status: false,error }) 
  }
  
}

export const updateEmailPassword = async (req, res) => {
  try {
  
    const user = await knex("admin_users")
      .select("user_group_id", "password", "is_password_change")
      .where({ id: admin_id });

    const { new_password, confirm_new_password } = req.body;

    if (new_password.length < 8) {
      req.flash("error", "New password should be atleast 8 characters");
      return res.redirect("/auth/get_change_password");
    }
    if (confirm_new_password.length < 8) {
      req.flash("error", "Confirm password should be atleast 8 characters");
      return res.redirect("/auth/get_change_password");
    }

    if (new_password !== confirm_new_password) {
      req.flash("error", "Password Should Be Same");
      return res.redirect("/auth/get_change_password");
    }

    let query = {};
    if (user[0].user_group_id == 2) {
      if (user[0].is_password_change == 0) {
        query.is_password_change = "1";
      }
    }

    await knex("admin_users").update(query).where({ id: admin_id });

    req.flash("success", "successfully password changed");
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// export const sendMail = async (req, res, next) => {
//   try {
//     const email = req.body
//     const recovery = await knex.select('*').from('users').where('email')
//     if(error) throw error;

//     let type = "success"
//     let msg = "Email already verified"

//     if(result.length > 0){
//       let token = req.session.token;

//       if (result[0].verify == 0) {
//         let send = sendPasswordResetEmail(email,token)
//         if (send!= '0') {
//           const data = {
//             token: token
//           }
//           await knex.select('*').update('password').where('email')
//           if(error) throw error;

//           type = 'success';
//           msg = 'The verification link has been sent to your email address';
//         }
//         else {
//           type = 'error';
//           msg = 'Something goes to wrong. Please try again';
//       }
//       }
//     }
//     else {
//       console.log('2');
//       type = 'error';
//       msg = 'The Email is not registered with us';

//   }
//   req.flash(type, msg);
//         res.redirect('/home');
//   } catch (error) {
    
//   }
// }

export const getPasswordRecovery = async (req, res) => {
  try {
    console.log("hiiiii")
    res.render("auth/auth_pass_recovery");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// export const getPasswordRecovery = async (req, res) => {
//   // let token = req.session.token;

//   if (token) {
//     req.flash("error", "cannot login again");
//     return res.redirect("/home");
//   }
//   res.render("auth/get_password_recovery");
// };