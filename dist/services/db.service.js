"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// let knex;
// try {
//   knex = require("knex")({
//     client: "mysql2",
//     connection: {
//       host: "127.0.0.1",
//       port: 3306,
//       user: "root",
//       password: "root",
//       database: "maram",
//     },
//   });
// } catch (error) {
//   console.log(error, "error at connecting database");
// }
// console.log("database Connected");

var knex;
try {
  knex = require("knex")({
    client: "mysql2",
    connection: {
      host: 'awseb-e-x3s3f4wi2v-stack-awsebrdsdatabase-x1jmeljtlon9.cnxyneaiybt8.ap-south-1.rds.amazonaws.com',
      port: 3306,
      user: 'maramdbadmin',
      password: 'q&HJIJ^EWF7N4sBs',
      database: 'maram_live'
    }
  });
} catch (error) {
  console.log(error, "error at connecting database");
}
console.log("database Connected");

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
var _default = knex;
exports["default"] = _default;