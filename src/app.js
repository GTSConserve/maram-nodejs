import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import fs from "fs";

import flash from "connect-flash";
import session from "express-session";
import nodemailer from "nodemailer"
import axios from "axios";

import knex from "./services/db.service";
import { parseJwtPayload } from "./services/jwt.service";
import bodyParsercheck from "./middlewares/bodyParser.middleware";
import { authenticateJWTSession } from "./middlewares/authToken.middleware";

import mainRouter from "./routes/user_main.route";
import superAdminRouter from "./routes/super_admin_main.route";
import branchAdminRouter from "./routes/branch_admin_main.route";
import riderRouter from "./routes/rider_main.route";
import authRouter from "./routes/auth_main.route";

import { createTable } from "./table/create_table";
import { insertData } from "./table/insert_data";
import { html } from "./controllers/about/about.controller";

require("dotenv").config();
const path = require("path");

const app = express();
const cors = require("cors");

const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");


// const MySQLStore = require('connect-mysql')(session) // mysql session store
// const options = {
//   config: {
//     user: 'root', 
//     password: 'root',
//     database: 'maram' 
//   }
// }

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/uploads", express.static("./uploads"));
// console.log(__dirname +  "/public")
app.use(flash());

app.use(express.static("public"));
// app.use(express.static(__dirname +  "/public"));

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// create upload folder
fs.access("./uploads", (error) => {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    fs.mkdir("./uploads", (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  }
});


let dirname = 'D:/maram-api/public/'


app.get('/', (req, res) => {
  res.json({ 'message': 'ok' });
})


app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about_us.html'));
})

app.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/Blogs.html'));
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contact_us.html'));
})

app.get('/privacy_policy', (req, res) => {
  res.sendFile(path.join(__dirname, './static/privacy_policy.html'));
})

app.get('/corporates', (req, res) => {
  res.sendFile(path.join(__dirname, './static/Corporates.html'));
})

app.get('/terms_and_conditions', (req, res) => {
  res.sendFile(path.join(__dirname, './static/Terms & Conditions.html'));
})
app.get('/news_and_media', (req, res) => {
  res.sendFile(path.join(__dirname, './static/news&media.html'));
})
app.use('/api', bodyParsercheck, mainRouter)

let secret = "thisissecret";

//https://github.com/nlf/connect-mysql
// for future we need to store the session in mysql to keep the sessions data

const sessionConfig = {
  name: "token",
  // secure:true,
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    HttpOnly: true, // this is default was true
    // secure:true, // note we only can give this on deployment mode not in localhost . if we give in localhost it will break things, eg: we can't login
    // expires: new Date().setDate(new Date().getDate() + 1),
    // maxAge: new Date().setDate(new Date().getDate() + 1),
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    //    miliseconds * seconds * minutes * hours * days = 1 week in miliseconds
  },
  // store: new MySQLStore(options)
};

app.use(session(sessionConfig));
dotenv.config();

app.use(async (req, res, next) => {
  res.locals.host_name = req.headers.host;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  const token = req.session.token;

  if (token) {
    const currentTokenPayload = parseJwtPayload(token.token);

    if (!currentTokenPayload.group_id) {
      req.flash("error", "Need To Login First");
      return res.redirect("/auth/login");
    }

    const user = await knex("admin_users")
      .select("first_name", "profile_photo_path")
      .where({ id: currentTokenPayload.user_id });

    if (user[0].profile_photo_path) {
      user[0].profile_photo_path =
        "http://" + req.headers.host + user[0].profile_photo_path;
    }

    res.locals.admin_id = currentTokenPayload.user_id;
    res.locals.user = user[0]

    let is_super_admin = false;

    if (currentTokenPayload.group_id == 1) {
      is_super_admin = true;
    }


    res.locals.is_super_admin = is_super_admin;
  }

  // need to check token and navbar set profile and name

  // res.locals.currentUser = req.user;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  // const user = await User.find({});
  // const owner = user[0];
  // console.log(owner)
  // res.locals.owner = owner;
  // if(!['/login', '/','/cart','/cart/:id'].includes(req.originalUrl)) {
  //     req.session.previousReturnTo = req.session.returnTo; // store the previous url
  //     req.session.returnTo = req.originalUrl; // assign a new url
  //     // console.log('req.session.previousReturnTo', req.session.previousReturnTo)
  //     // console.log('req.session.returnTo', req.session.returnTo);
  //  }

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok", expire: req.session.cookie.expires });
});

app.get("/home", authenticateJWTSession, (req, res) => {
const {is_super_admin} = req.body
const {is_user_added} = req.query



  if(!is_super_admin && is_user_added == 1){
    req.flash("error","User Already Found")
    return res.render("super_admin/home/home");
  }
  if(!is_super_admin && is_user_added == 2){
    req.flash("success","User Created SuccessFully")
    return res.render("super_admin/home/home");
  }

  if(is_super_admin && is_user_added == 1){
    req.flash("error","User Already Found")
    return res.render("super_admin/home/home");
  }
  if(is_super_admin && is_user_added == 2){
    req.flash("success","User Created SuccessFully")
    return res.render("super_admin/home/home");
  }



  if(is_super_admin){

    res.render("super_admin/home/home");
  }else{

    res.render("branch_admin/home/home");
  }
});



// app.get("/recovery",(req,res)=>{
//   res.sendFile(path.join(__dirname, '../public/auth_pass_recovery.html'));
// })

  
app.use("/auth", bodyParsercheck, authRouter);

app.get("/insert_data", insertData);
app.get("/create_table", createTable);
// app.get("/gethtml",html);
app.use((err,req,res,next)=>{
  // because err.status is undefined 
   res.status(400).json({
       error : {
           message : err.message
      }
   });
})

app.use(
  "/super_admin",
  bodyParsercheck,
  authenticateJWTSession,
  superAdminRouter
);
app.use(
  "/branch_admin",
  bodyParsercheck,
  authenticateJWTSession,
  branchAdminRouter
);
app.use("/api", bodyParsercheck, mainRouter);

app.use(
  "/rider_api",
  bodyParsercheck,
  
  riderRouter
);

export default app;
