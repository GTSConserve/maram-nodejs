import knex from "../src/services/db.service";

   export async function  getAddOnExcessProductPO (id)  {
    console.log("hiirirhirhirh")
    const product = await knex("products")
      .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
      .select(
        "products.id",
        "products.name",
        "products.image",
        "products.unit_value",
        "unit_types.value as unit_type",
        "products.price"
      )
      .where({
        
        "products.id": id,
      });

      for (let i = 0; i < product.length; i++) {
        if (product[i].unit_type == "ml") {
          if (product[i].unit_value >= 500) {
            product[i].value =
              product[i].unit_value / 1000 + " litre";
          } else {
            product[i].value = product[i].unit_value + " litre";
          }
        } else {
          product[i].value =
            product[i].unit_value + " " + product[i].unit_type;
        }
      }
      return product

}

