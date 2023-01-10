// import axios from "axios"
import nodemailer from "nodemailer"

// sendNotificationToSpecific =function (token) {

// const sdk = require('api')('@onesignal/v9.0#26fd81ml9sbufxr');

// sdk.addADevice({
//   app_id: 'c4878328-bc00-49a1-b741-df30c9ac4621',
//   device_type: 14,
//   language: 'en',
//   timezone: '-28800',
//   game_version: '1.1.1',
//   device_model: 'Android,1',
//   device_os: '15.1.1',
//   session_count: 600,
//   tags: {
//     first_name: 'Jon',
//     last_name: 'Smith',
//     level: '99',
//     amount_spent: '6000',
//     account_type: 'VIP',
//     key_to_delete: '""'
//   },
//   amount_spent: '100.99',
//   playtime: 600,
//   notification_types: 1,
//   // country: 'US'
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// const sendNotification = function(data) {
//     var headers = {
//       "Content-Type": "application/json;charset=utf-8",
//       "Authorization": `Basic ${process.env.ONE_SIGNAL_REST_API_KEY}`
      
//     };
//     console.log(headers)
//     const options = {
//       host: "onesignal.com",
//       port: 443,  
//       path: "/api/v1/notifications",
//       method: "POST",
//       headers: headers
//     };
//     const https = require('https');
//     const req = https.request(options, function(res) {  
//       res.on('data', function(data) {
//         console.log("Response:");
//         console.log(JSON.parse(data));
//       });
//     });
//     req.on('error', function(e) {
//       console.log("ERROR:");
//       console.log(e);
//     });
//     req.write(JSON.stringify(data));
//     req.end();
//   };


//   const message = {
//     app_id: 'c4878328-bc00-49a1-b741-df30c9ac4621',
//     contents: {"en": "this from medagg app"},
//     included_segments: ["Subscribed Users"],
//     include_phone_numbers: ["+19840730996"],
//     small_icon: "notify_icon",
//   };
//   sendNotification(message);
//   console.log(message.app_id)
// };



export const riderSendNotification = async (data) => {
 
  try {
   
    const instance = axios.create({
      baseURL: "https://onesignal.com/api/v1/notifications",
      headers: {
        authorization: `Basic ${process.env.RIDER_REST_API_KEY}`,
      },
      
    });
    console.log("hi2")
    data.small_icon = "notify_icon";
    data.large_icon =
      "https://pickneats.com/yummychopps/dashboard/assets/img/favicon.png";

    const response = await instance.post(
      `?app_id
      
      =${process.env.RIDER_APP_ID}`,
      data
    );
    console.log("hi2")
    return { status: true };
  } catch (error) {
    console.log(error.data);
    return { status: false };
  }
};


// const test = sendNotification({
//   included_segments: ["Subscribed Users"],
//   include_phone_numbers: ["+19840730996"],
//   contents: { en: "Successfully Appoinment Created" },
//   name: "Appoinment",
//   data: {
//     appointment_status: "1",
//     hospital_id: 0,
//     type: 0,
//     appointment_id: "1",
//     // smallIcon: "0",
//   },
// });

//call the above function
// test
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

 
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: 'bhoobalan.gts@gmail.com',
      pass: 'Bhoo2022*'
  }
})

export const getPasswordResetURL = (user, token) => {
  `http://localhost:3000/password/reset/${user.id}/${token}`
}

// export const resetPasswordTemplate = (user, url) => {
//   const from = 'bhoobalan.gts@gmail.com'
//   const to = user.email
//   const subject = "Password Reset"
//   const html = `
//       <p>Hey ${user.name || user.email},</p>
//       <p>We heard that you forgot your password. Sorry about that!</p>
//       <p>But don’t worry! You can use the following link to reset your password:</p>
//       <a href=${url}>${url}</a>
//       <p>If you don’t use this link within 1 hour, it will expire.</p>
//   `
// }

// return html