import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const updateBanners = async (req, res) => {
  try {
    const { name, id } = req.body;
    const file = req.file;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/settings/get_banner");
    }

    let query = {};

    query.name = name;
    if (file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
      query.image = image;
    }

    await knex("banners").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/settings/get_banner");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateBannerStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("banners").update({ status: "0" }).where({ id: id });
    } else {
      await knex("banners").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/settings/get_banner");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getBanners = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,name FROM banners WHERE name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Banner Found");
        return res.redirect("/super_admin/settings/get_banner");
      }
    } else {
      data_length = await knex("banners").select("id");
    }


    if (data_length.length === 0) {
      loading = false
      return res.render("super_admin/settings/banner", {
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
    } = await getPageNumber(req,res, data_length, "settings/get_banner");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT id,name,image,status FROM banners  WHERE name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT id,name,image,status FROM banners LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = process.env.BASE_URL + data[i].image;
    }

    loading = false;
    res.render("super_admin/settings/banner", {
      data: data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createBanners = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/settings/get_banner");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/settings/get_banner");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("banners").insert({ name, image });
    req.flash("success", "Banner Created SuccessFully");
    res.redirect("/super_admin/settings/get_banner");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
