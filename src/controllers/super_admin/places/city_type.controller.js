// import knex from "../../../services/db.service";

// export const getAllPlaces = async (req, res) => {
//     try {
//       // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
//       // .select("id", "name")
//       //   // .select("id", "name", "image", "status")
//       //   .where({ status: "1" });
  
//       res.render("places/city");
//     } catch (error) {
//       console.log(error);
//       res.redirect("/home");
//     }
//   };


export const getCities = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("places/city");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getAllCountry = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("places/country");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getAllZone = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("places/zone");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getAllPostCode = async (req, res) => {
    try {
      // const categories = await knex("categories").join('product_type','categories.id','=','product_type.id')
      // .select("id", "name")
      //   // .select("id", "name", "image", "status")
      //   .where({ status: "1" });
  
      res.render("places/post_code");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
  