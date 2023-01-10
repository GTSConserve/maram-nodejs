import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getAllZone = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,name FROM zones WHERE name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No zone Found");
        return res.redirect("/super_admin/places/zone");
      }
    } else {
      data_length = await knex("zones").select("id");
    }

    const cities = await knex("cities")
      .select("id", "name")
      .where({ status: "1" });

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/places/zone", {
        data: data_length,
        searchKeyword,
        cities,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "places/zone");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT zones.id,zones.name,zones.status,cities.name as city_name,cities.id as city_id FROM zones JOIN cities ON cities.id = zones.city_id WHERE  zones.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT zones.id,zones.name,zones.status,cities.name as city_name,cities.id as city_id FROM zones JOIN cities ON cities.id = zones.city_id LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    loading = false;
    res.render("super_admin/places/zone", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      cities,
    });

    // res.render("super_admin/places/zone");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const newZone = async (req, res) => {
  try {
    const { name, city_id } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/zone");
    }

    if (!city_id) {
      req.flash("error", "code is missing");
      return res.redirect("/super_admin/places/zone");
    }

    const name_check = await knex("zones").where({name})
    console.log(name_check)

    if(name_check.length !== 0){
      req.flash("error", "Zone Name is Should Be Unique");
      return res.redirect("/super_admin/places/zone");
    }

    await knex("zones").insert({name , city_id});
    req.flash("success", "zone Created SuccessFully");
    res.redirect("/super_admin/places/zone");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateZone = async (req, res) => {
  try {
    const { name, id, city_id } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/places/zone");
    }

    let query = { name };

    if (city_id) {
      query.city_id = city_id;
    }

    await knex("zones").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/places/zone");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateZoneStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("zones").update({ status: "0" }).where({ id: id });
    } else {
      await knex("zones").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/places/zone");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
