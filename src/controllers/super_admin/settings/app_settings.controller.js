// export const getAppSettings = async (req,res) => {
//     try {
//         res.render("super_admin/settings/app_settings")
//     } catch (error) {
        
//     }
// }
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";


export const getAppSettings = async (req, res) => {
    try {
      let loading = true;
      const { searchKeyword } = req.query;
  
      let data_length = [];
  
      if (searchKeyword) {
        const search_data_length = await knex.raw(
          `SELECT id,name,value,app_settings.key FROM app_settings WHERE name LIKE '%${searchKeyword}%'`
        );
  
        data_length = search_data_length[0];
  
        if (data_length.length === 0) {
          loading = false;
          req.query.searchKeyword = "";
          req.flash("error", "No App Found");
          return res.redirect("/super_admin/settings/app_settings");
        }
      } else {
        data_length = await knex("app_settings").select("id");
      }
  
   
      if (data_length.length === 0) {
        loading = false;
        return res.render("super_admin/settings/app_settings", {
          data: data_length,
          searchKeyword,
         
        });
      }
  
      let {
        startingLimit,
        page,
        resultsPerPage,
        numberOfPages,
        iterator,
        endingLink,
      } = await getPageNumber(req, res, data_length, "settings/app_settings");
  
      let results;
      let is_search = false;
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT id,name,app_settings.key,value,status FROM app_settings
          WHERE app_settings.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          `SELECT id,name,app_settings.key,value,status FROM app_settings  LIMIT ${startingLimit},${resultsPerPage}`
        );
      }
  
      const data = results[0];
  
      loading = false;
      res.render("super_admin/settings/app_settings", {
        data: data,
        page,
        iterator,
        endingLink,
        numberOfPages,
        is_search,
        searchKeyword,
        loading,
       
      });
  
      // res.render("super_admin/places/zone");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
  
  export const createAppsettings = async (req, res) => {
    try {
      const { name,key,value } = req.body;
  
      if (!name) {
        req.flash("error", "Name is missing");
        return res.redirect("/super_admin/settings/app_settings");
      }
  
      let query = {
        name,
      
   
      }
  
      if(key){
        query.key=  key
      }
      if(value){
        query.value = value
      }
  
      await knex("app_settings").insert(query);
      req.flash("success", "APP Created SuccessFully");
      res.redirect("/super_admin/settings/app_settings");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };


  export const updateappsettings = async (req, res) => {
    try {
      const { name,key,value,id } = req.body;
  
      if (!value) {
        req.flash("error", "Value is missing");
        return res.redirect("/super_admin/settings/app_settings");
      }
  
      let query = {};
  
  
     
    
      if (key) {
        query.key = key;
      }
      if (value) {
        query.value = value;
      }
  
      await knex("app_settings").update(query).where({ id: id });
  
      req.flash("success", "Updated SuccessFully");
      res.redirect("/super_admin/settings/app_settings");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
  
  export const updateSettingsStatus = async (req, res) => {
    try {
      const { status,id } = req.body;
  
      if (status == "1") {
        await knex("app_settings").update({ status: "0" }).where({ id: id });
      } else {
        await knex("app_settings").update({ status: "1" }).where({ id: id });
      }
  
      req.flash("success", "Updated SuccessFully");
      return res.redirect("/super_admin/settings/app_settings");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }

  };

  // export const updateCity = async (req, res) => {
  //   try {
  //     const { name, id,latitude,longitude } = req.body;
  
  //     if (!name) {
  //       req.flash("error", "Name is missing");
  //       return res.redirect("/super_admin/places/city");
  //     }
  
  //     let query = {};
  
  //     query.name = name;
     
    
  //     if (latitude) {
  //       query.latitude = latitude;
  //     }
  //     if (longitude) {
  //       query.longitude = longitude;
  //     }
  
  //     await knex("cities").update(query).where({ id: id });
  
  //     req.flash("success", "Updated SuccessFully");
  //     res.redirect("/super_admin/places/city");
  //   } catch (error) {
  //     console.log(error);
  //     res.redirect("/home");
  //   }
  // };
  
  // export const updateCityStatus = async (req, res) => {
  //   try {
  //     const { status, id } = req.body;
  
  //     if (status == "1") {
  //       await knex("cities").update({ status: "0" }).where({ id: id });
  //     } else {
  //       await knex("cities").update({ status: "1" }).where({ id: id });
  //     }
  
  //     req.flash("success", "Updated SuccessFully");
  //     return res.redirect("/super_admin/places/city");
  //   } catch (error) {
  //     console.log(error);
  //     res.redirect("/home");
  //   }
  // };
  