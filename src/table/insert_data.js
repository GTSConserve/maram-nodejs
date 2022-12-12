import knex from "../services/db.service";
import bcrypt from "bcrypt";
import {
  product_type,
  banners,
  user_groups,
  coupons,
  variation_types,
  products,
  category,
  subscription_type,
  product_variations,
  week_days
} from "../seeds/dummy_data";

export const insertData = async (req, res) => {
  try {
    // get random id
    function get_random_id(arr) {
      return arr[Math.floor(Math.random() * arr.length)].id;
    }


    // weekdays
    // await knex("weekdays").insert(week_days)

    //banners
    await knex("banners").insert(banners);

    //user_groups
    await knex("user_groups").insert(user_groups);

    //fakeadmin
    let password = await bcrypt.hash("admin2022", 10);
    await knex("admin_users").insert({
      user_group_id: 1,
      first_name: "superadmin",
      email: "superadmin@gmail.com",
      password,
    });

    // // product_type
    await knex("product_type").insert(product_type);

    //variation_type
    await knex("unit_types").insert(variation_types);

    //coupons
    await knex("coupons").insert(coupons);

    // subscription type
    await knex("subscription_type").insert(subscription_type);

    const product_type_id = await knex("product_type").select("id");
    // const variation_type_id = await knex("variation_types").select("id");

    // category
    // for (let i = 0; i < category.length; i++) {
    //   category[i].product_type_id = get_random_id(product_type_id);
    // }
    await knex("categories").insert(category);

    // const category_id = await knex("categories").select("id");
    // products
    // for (let i = 0; i < products.length; i++) {
    //   // products[i].admin_id = "1";
    //   products[i].category_id = get_random_id(category_id);
    //   // products[i].variation_type_id = get_random_id(variation_type_id);
    //   products[i].product_type_id = get_random_id(product_type_id);
    // }
    // await knex("products").insert(products);

    // const product_id = await knex("products").select("id");

    // dont need
    // product_variations
    // let product_variations_data = [];
    // for (let i = 0; i < product_id.length; i++) {
    //   product_variations_data.push({
    //     product_id: get_random_id(product_id),
    //     variation_type_id: get_random_id(variation_type_id),
    //     value:
    //       product_variations[
    //         Math.floor(Math.random() * product_variations.length)
    //       ].value,
    //     price:
    //       product_variations[
    //         Math.floor(Math.random() * product_variations.length)
    //       ].price,
    //   });
    // }

    // await knex("product_variations").insert(product_variations_data);

    return res
      .status(200)
      .json({ status: true, message: "Successfully data inserted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Error at seeding data" });
  }
};
