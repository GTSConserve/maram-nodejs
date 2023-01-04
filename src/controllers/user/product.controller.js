import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";
import { GetProduct } from "../../utils/helper.util";
import {
  get_products,
  get_categories,
  get_subscription_or_add_on_products,
  search_products,
  addon_order,
  remove_addonorders,
  nextday_product,
} from "../../models/user/product.model";

import { parseJwtPayload } from "../../services/jwt.service";
import knex from "../../services/db.service";

export const removeAddOnOrder = async (req, res) => {
  try {

    const { userId,product_id, delivery_date } = req.body

    if (!product_id || !delivery_date ) {
      return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: messages.MANDATORY_ERROR })
    }
    //  console.log(userId,product_id, delivery_date);
    const remove = await remove_addonorders(product_id, delivery_date,userId);

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, body: remove });

  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id as product_id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price",

        "products.demo_price"

      )
      .where({ "products.id": product_id })
      const response = await GetProduct(product);

    if (product.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "Product Not Found" });
    }

    product[0].image = process.env.BASE_URL + product[0].image;

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: response.data[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category_id, product_type_id } = req.body;

    const token = req.headers.authorization;

    let userId;
    if (token) {
      const user = await parseJwtPayload(token);
      userId = user.user_id;
    }

    if (!category_id || !product_type_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const product = await get_products(category_id, product_type_id);

    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      total_items: product.data.length,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { product_type_id } = req.body;

    if (!product_type_id) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: "Product Type Is Missing" });
    }

    const category = await get_categories(product_type_id);

    if (!category.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, error: category.error });
    }

    if (category.body.length === 0) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "No Category Found" });
    }

    for (let i = 0; i < category.body.length; i++) {
      category.body[i].image = category.body[i].image
        ? process.env.BASE_URL + category.body[i].image
        : null;
    }

    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: category.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const getSubscriptionProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    const products = await get_subscription_or_add_on_products("1",userId );
    if (!products.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: products.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: products.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};
export const getAddOnProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    const product = await get_subscription_or_add_on_products("2", userId);
    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { search_keyword, product_type_id } = req.body;

    if (!product_type_id || !search_keyword) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    const token = req.headers.authorization;

    let userId;
    if (token) {
      const user = await parseJwtPayload(token);
      userId = user.user_id;
    }

    const product = await search_products(
      product_type_id,
      search_keyword,
      // userId
    );
    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: product.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};

// export const getBill = async (req,res) => {
//   try{
//     const{product_id} = req.body;
//     const bill = await

//   }
// }

export const addon_Order = async (req, res) => {
  try {
    const { userId, delivery_date, products, address_id } = req.body;
    const addon = await addon_order(
      userId,
      delivery_date,
      products,
      address_id
    );
    return res.status(responseCode.SUCCESS).json({
      status: true,
      message: "order added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error });
  }
};


export const nextDayProduct = async (req, res) => {
  try {
    const { userId } = req.body;

    const static_response = await nextday_product(userId)
    
    let query ={
        
          "product_id": static_response.product[0].product_id ,
          "product_name": static_response.product[0].product_name,
          "product_image": static_response.product[0].product_image,
          "product_status":static_response.product[0].product_status,
          "product_variation": static_response.product[0].value + static_response.product[0].unit_type,
          "Product price": static_response.product[0].price
  
    }
    if (!static_response) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: "No Product Available" });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: query,"date": "25 Oct | Mon"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};