import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getCities = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,name FROM cities WHERE name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No City Found");
        return res.redirect("/super_admin/places/city");
      }
    } else {
      data_length = await knex("cities").select("id");
    }

 
    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/places/city", {
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
    } = await getPageNumber(req, res, data_length, "places/city");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,name,status,latitude,longitude FROM cities
        WHERE cities.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT id,name,status,latitude,longitude FROM cities  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    loading = false;
    res.render("super_admin/places/city", {
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

export const createCity = async (req, res) => {
  try {
    const { name,  latitude, longitude } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/city");
    }

    let query = {
      name,
    
 
    }

    if(latitude){
      query.latitude = latitude
    }
    if(longitude){
      query.latitude = longitude
    }

    await knex("cities").insert(query);
    req.flash("success", "City Created SuccessFully");
    res.redirect("/super_admin/places/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateCity = async (req, res) => {
  try {
    const { name, id,latitude,longitude } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/city");
    }

    let query = {};

    query.name = name;
   
  
    if (latitude) {
      query.latitude = latitude;
    }
    if (longitude) {
      query.longitude = longitude;
    }

    await knex("cities").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/places/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateCityStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("cities").update({ status: "0" }).where({ id: id });
    } else {
      await knex("cities").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/places/city");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
