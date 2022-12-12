import { sub } from "date-fns";
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getusers = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

 


    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT  user_address.id FROM  user_address
        JOIN users ON users.id = user_address.user_id
        WHERE user_address.branch_id= ${admin_id} AND users.name LIKE '%${searchKeyword}%'`
      );   
      // JOIN add_on_orders ON add_on_orders.branch_id = subscribed_user_details.branch_id 
      data_length = search_data_length[0];
     
      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No User  Found");
        return res.redirect("/branch_admin/users/users");
      }
    } else {
      data_length = await knex("user_address")
        .select("id")
        .where({branch_id: admin_id });
    }
    const routes = await knex("users")
      .select("name", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/users/users", {
        data: data_length,
        searchKeyword,
        routes,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "users/users");
//     const user = await knex ('add_on_orders').select('user_id').where({branch_id: admin_id });
//     // console.log(user);

//     const user1 = await knex ('subscribed_user_details').select('user_id').where({branch_id: admin_id });;
//     // console.log(user1);
// const user2 =[];
// const user4 =[];
// for (let k=0; k<user1.length;k++) {
//   const user2 = user1[k].user_id;}


//   // const numbers = [1, 2, 3, 2, 4, 5, 5, 6];

// const set = new Set(user2);

// const duplicates = user2.filter(item => {
//     if (set.has(item)) {
//         set.delete(item);
//     } else {
//         return item;
//     }
// });

// console.log(duplicates.value);
// // var values = [
// //   { name: 'someName1' },
// //   { name: 'someName2' },
// //   { name: 'someName4' },
// //   { name: 'someName2' }
// // ];

// var valueArr = user1.map(function(item){ return item.user_id });
// var isDuplicate = valueArr.some(function(item, idx){ 
//   return valueArr.indexOf(item) != idx 
// });
// console.log(isDuplicate);


// // return findDuplicates(user1)
// // console.log( findDuplicates(user1));

// // for (let i=0; i<user1.length ; i++){ 
// //     for ( let j=i+1; j<user1.length ; j++){
// //         if(user1[i] == user1[j]){ 
// //             console.log(user1[j]);
// //         }
// //     }          
// // }

//     // for (let k=0; k<user1.length;k++) {
//     //   const user2 = user1[k].user_id; 

//   //   for (let m=0; m<user1.length;m++){
//   //     const user4 = user1[m].user_id;
//   //     // const user5 = user1[m].date;
      
    
//   //   if(user2[k]==user4[m]){
//   //     console.log(user4[m]);
//   //     // console.log(user5);
//   //   }
//   //   else{
//   //     // console.log("hi");
//   //   }
//   // }
// // }   
// //   // console.log(user2);
// //     for (let l=0;l<user.length;l++){
// //       const user3 = user[l].user_id 
// //       // console.log(user3); }
// //       if(user2==user3){
// //         // console.log(user2)
// //       }
// //       else{
// //         // console.log(user3);
// //       }
    
// //     }
   



    let results;
    // let results1;
    let is_search = false;
    if (searchKeyword) {

      if(user_id!=sub.user_id)
      results = await knex.raw(
        `SELECT sub.id , sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
            unit_types.value,categories.name as category_name
            FROM user_address AS sub 
            JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
            JOIN users ON users.id = sub.user_id
             JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 
            JOIN user_address ON user_address.id = sub.user_address_id
            JOIN products ON products.id = sub.product_id
            JOIN unit_types ON unit_types.id = products.unit_type_id
            JOIN categories ON categories.id = products.category_id
            WHERE  user_address.branch_id = ${admin_id}
            AND users.name LIKE '%${searchKeyword}%' `
      );
      // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id

      console.log(searchKeyword)
      is_search = true;
    } else { 
      
      results = await knex.raw(
        `SELECT sub.id ,sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            user_address.address,user_address.landmark,products.name as product_name,
            products.price,products.unit_value,
            unit_types.value,categories.name as category_name,
            routes.name as route_name
            FROM subscribed_user_details AS sub 
            JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
            JOIN users ON users.id = sub.user_id 
            JOIN user_address ON user_address.id = sub.user_address_id
            JOIN products ON products.id = sub.product_id
            JOIN routes ON routes.id = sub.router_id
            
            JOIN unit_types ON unit_types.id = products.unit_type_id
            JOIN categories ON categories.id = products.category_id
            WHERE sub.subscription_status = "subscribed" AND  sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      );
      // JOIN add_on_orders ON add_on_orders.branch_id  = sub.branch_id
      // results1 = await knex.raw(
      //   `SELECT add_order.id ,add_order.delivery_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
      //       user_address.address,user_address.landmark,products.name as product_name,
      //       products.price,products.unit_value,
      //       unit_types.value,categories.name as category_name,
      //       routes.name as route_name
      //       FROM add_on_orders AS add_order
      //       JOIN users ON users.id = sub.user_id 
      //       JOIN user_address ON user_address.id = sub.user_address_id
      //       JOIN products ON products.id = sub.product_id
      //       JOIN add_on_order_items ON add_on_order_items.id = add_on_orders.id
      //       JOIN routes ON routes.id = sub.router_id
      //       JOIN unit_types ON unit_types.id = products.unit_type_id
      //       JOIN categories ON categories.id = products.category_id
      //       WHERE sub.subscription_status = "subscribed" AND  sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`
      // );

    }
  // }
  
  // }

    // routes.name as route_name
    // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 

    // add_on_orders.route_id,sub.route_id
    // JOIN add_on_orders ON add_on_orders.user_id  = sub.user_id 

    // sub.id ,sub.start_date,sub.subscription_start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
    // user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
    // unit_types.value,categories.name as category_name
    // FROM subscribed_user_details AS sub 
    // JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id 
    // JOIN users ON users.id = sub.user_id 
    // JOIN user_address ON user_address.id = sub.user_address_id
    // JOIN products ON products.id = sub.product_id
    
    // JOIN unit_types ON unit_types.id = products.unit_type_id
    // JOIN categories ON categories.id = products.category_id
    // WHERE sub.subscription_status = "subscribed" AND sub.branch_id = ${admin_id} LIMIT ${startingLimit},${resultsPerPage}`

    // console.log(results)



    const data = results[0];
    const product = [];

    for (let i = 0; i < data.length; i++) {
      data[i].start_date = data[i].start_date.toString().slice(4, 16);
      if (data[i].subscription_start_date) {
        data[i].subscription_start_date = data[i].subscription_start_date
          .toString()
          .slice(4, 16);
      }
      // const product = [];

      for (let j=0 ;j<data.length;j++){
        product.push({
          id: data[i].id,
          user_name: data[i].user_name,
          address: data[i].address,
          route_name: data[i].route_name,
        });
      }
    }

    // console.log(product)

    loading = false;
    
    res.render("branch_admin/users/users", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      routes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
