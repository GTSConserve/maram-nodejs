import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const updateProductStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("products").update({ status: "0" }).where({ id: id });
    } else {
      await knex("products").update({ status: "1" }).where({ id: id });
    }
    console.log("hell");
    req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/product/get_category");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      product_name,
      id,
      unit_type_id,
      category_id,
      product_type_id,
      description,
      price,
      unit_value,
    } = req.body;
    const file = req.file;

    if (!product_name) {
      req.flash("error", "Product name is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!description) {
      req.flash("error", "Description is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!price) {
      req.flash("error", "Price is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!unit_value) {
      req.flash("error", "unit Value is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }

    let query = {};

    console.log(description);
    query.name = product_name;
    query.description = description;
    query.price = price;
    query.unit_value = unit_value;
    if (file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;

      query.image = image;
    }

    if (product_type_id) {
      query.product_type_id = product_type_id;
    }
    if (unit_type_id) {
      query.unit_type_id = unit_type_id;
    }
    if (category_id) {
      query.category_id = category_id;
    }

    await knex("products").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/super_admin/product/get_product_list");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getProductList = async (req, res) => {
  try {
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT products.name FROM products WHERE products.name LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Category Found");
        return res.redirect("/super_admin/product/get_category");
      }
    } else {
      data_length = await knex("products").select("id");
    }

    const productType = await knex("product_type")
      .select("name", "id")
      .where({ status: "1" });
    const categories = await knex("categories")
      .select("name", "id")
      .where({ status: "1" });
    const unit_types = await knex("unit_types")
      .select("value", "id")
      .where({ status: "1" });

    if (data_length.length === 0) {
      return res.render("super_admin/product/product", {
        data: data_length,
        searchKeyword,
        productType,
        categories,
        unit_types,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "product/get_product_list");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT  products.id,products.name as product_name,products.image,products.description,products.status,products.price,products.unit_value,
        product_type.name as product_type_name,categories.name as category_name, unit_types.value FROM products
        JOIN product_type ON products.product_type_id = product_type.id 
        JOIN categories ON products.category_id = categories.id 
        JOIN unit_types ON products.unit_type_id = unit_types.id
         WHERE products.name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT  products.id,products.name as product_name,products.image,products.description,products.status,products.price,products.unit_value,
         product_type.name as product_type_name,categories.name as category_name, unit_types.value FROM products
         JOIN product_type ON products.product_type_id = product_type.id 
         JOIN categories ON products.category_id = categories.id 
         JOIN unit_types ON products.unit_type_id = unit_types.id 
         LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];

    for (let i = 0; i < data.length; i++) {
      data[i].image = process.env.BASE_URL + data[i].image;
    }


    loading = false;
    res.render("super_admin/product/product", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      productType,
      categories,
      unit_types,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category_id,
      unit_value,
      unit_type_id,
      price,
      product_type_id,
    } = req.body;
    if (!name) {
      req.flash("error", "Name is missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!product_type_id) {
      req.flash("error", "Please Choose a Product Type");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!description) {
      req.flash("error", "Description is Missing");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!category_id) {
      req.flash("error", "Please Choose a Category");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!unit_value) {
      req.flash("error", "Please Give a Unit Value");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!unit_type_id) {
      req.flash("error", "Please Choose a Unit");
      return res.redirect("/super_admin/product/get_product_list");
    }
    if (!price) {
      req.flash("error", "Please Give a Price");
      return res.redirect("/super_admin/product/get_product_list");
    }

    if (!req.file) {
      req.flash("error", "Please Choose a image");
      return res.redirect("/super_admin/product/get_product_list");
    }

    const image = req.file.destination.slice(1) + "/" + req.file.filename;

    await knex("products").insert({
      category_id,
      unit_type_id,
      product_type_id,
      name,
      unit_value,
      price,
      image,
      description,
    });

    req.flash("success", "Successfully Created");
    res.redirect("/super_admin/product/get_product_list");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};



