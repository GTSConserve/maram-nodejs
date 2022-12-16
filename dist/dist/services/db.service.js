"use strict";

var _mysql = _interopRequireDefault(require("mysql2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// let knex;
// try {
//   knex = require("knex")({
//     client: "mysql2",
//     connection: {
//       host:process.env.DB_HOST,
//       port : 3306,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       // database: process.env.DB_NAME,
//     },
//   });
// } catch (error) {
//   console.log(error, "error at connecting database");
// }
// console.log("database Connected");

// import dbConfig from '../configs/db.config'

require("dotenv").config();

//   console.log(process.env.DB_USER)

// const db = {
//   host: process.env.DB_HOST ,
//   user: process.env.DB_USER ,
//   password: process.env.DB_PASSWORD ,
//   database: process.env.DB_NAME,
//   // port:"3306"
// };

// const dbConnection = mySql.createConnection(db)

// dbConnection.connect((err) => {
//   if (!err) {
//     console.log("Connected")
//   }
//   else {
//     console.log("hitting")
//     console.error(err)
//   }
// })
// dbConnection.end()

// export default dbConnection

// async function hl() {
//   await knex.schema.hasTable("users").then(function (exists) {
//     if (!exists) {
//       return knex.schema.createTable("users", function (t) {
//         t.increments("id").primary();
//         t.string("name", 100);
//         t.string("password", 100);
//         t.text("bio");
//       });
//     }
//   });
// }
// hl();
// console.log(knex)
// export default knex;

var connection = _mysql["default"].createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});
connection.end();