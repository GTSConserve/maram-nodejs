  import knex from "../../../services/db.service";
  import { getPageNumber } from "../../../utils/helper.util";
  
  export const getApprovePurchaseList = async (req, res) => {
    try {
      res.render("branch_admin/purchaseOrder/apporve_purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getGeneratePurchaseList = async (req, res) => {
    try {

     res.render("branch_admin/purchaseOrder/generate-purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getCancelPurchaseList = async (req, res) => {
    try {
      
      res.render("branch_admin/purchaseOrder/cancelled_purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  // export const getNewPurchaseOrderList = async (req, res) => {
  //   try {
      
  //     res.render("branch_admin/purchaseOrder/new_purchase_order");
  //   } catch (error) {
  //     console.log(error);
  //     res.redirect("/home");
  //   }
  // };

  export const getNewPurchaseOrderList = async (req, res) => {
    try {
      let loading = true;
      const { searchKeyword } = req.query;
  
      let data_length = [];
  
      if (searchKeyword) {
        const search_data_length = await knex.raw(
          `SELECT add_on_orders.id,add_on_orders.user_id,add_on_orders.delivery_date FROM add_on_orders JOIN daily_orders ON add_on_orders.user_id = daily_orders.user_id WHERE add_on_orders.address_id LIKE '%${searchKeyword}%'`
        );
  
        data_length = search_data_length[0];
  
        if (data_length.length === 0) {
          loading = false;
          req.query.searchKeyword = "";
          req.flash("error", "No Category Found");
          return res.redirect("/branch_admin/purchaseOrder/new_purchase_order");
        }
      } else {
        data_length = await knex("daily_orders").select("id");
      }
  
  
      const productType = await knex("daily_orders")
        .select("user_id", "branch_id")
        .where({ status: "1" });
  
      if (data_length.length === 0) {
        return res.render("branch_admin/purchaseOrder/new_purchase_order", {
          data: data_length,
          searchKeyword,
          productType,
        });
      }
  
      let {
        startingLimit,
        page,
        resultsPerPage,
        numberOfPages,
        iterator,
        endingLink,
      } = await getPageNumber(req, res, data_length, "branch_admin/purchaseOrder/new_purchase_order");
  
      let results;
      let is_search = false;
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT add_on_orders.id,add_on_orders.user_id,add_on_orders.delivery_date FROM add_on_orders JOIN daily_orders ON add_on_orders.user_id = daily_orders.user_id WHERE add_on_orders.address_id LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          // `SELECT categories.id,categories.name,categories.image,categories.status,product_type.name as product_type,product_type.id as product_type_id FROM categories JOIN product_type ON categories.product_type_id=product_type.id LIMIT ${startingLimit},${resultsPerPage}`
        );
      }
  
      const data = results[0];
  
      for (let i = 0; i < data.length; i++) {
        data[i].image = process.env.BASE_URL + data[i].image;
      }
  
      loading = false;
      res.render("branch_admin/purchaseOrder/new_purchase_order", {
        data,
        page,
        iterator,
        endingLink,
        numberOfPages,
        is_search,
        searchKeyword,
        loading,
        productType,
      });
      // `SELECT categories.id,categories.name,categories.image,categories.status,product_type.name as product_type,product_type.id as product_type_id FROM categories JOIN product_type WHERE categories.product_type_id=product_type.id  name LIKE '%${searchKeyword}%'`
  
      // const categories = await knex("categories")
      //   .select(
      //     "categories.id",
      //     "categories.name",
      //     "categories.image",
      //     "categories.status",
      //     "product_type.name as product_type",
      //     "product_type.id as product_type_id"
      //   )
      //   .join(
      //     "product_type",
      //     "categories.product_type_id",
      //     "=",
      //     "product_type.id"
      //   );
  
      // for (let i = 0; i < categories.length; i++) {
      //   categories[i].image = "http://" + req.headers.host + categories[i].image;
      // }
  
      // res.render("super_admin/product/category", {
      //   data: categories,
      //   productType,
      // });
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };