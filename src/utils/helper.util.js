import multer from "multer";
import fs from "fs";
import knex from "../services/db.service";
import moment from "moment";

export const customizedDay = async (date, user_days) => {
  const current_day = moment(date).format("dddd");

  let day;

  for (let i = 0; i < user_days.length; i++) {
    if (user_days[i] == current_day && i + 1 == user_days.length) {
      day = user_days[0];
    } else if (user_days[i] == current_day) {
      day = user_days[i + 1];
      break;
    }
  }

  let customized_date;

  if (day == "Sunday") {
    customized_date = moment().day(7);
  } else if (day == "Monday") {
    customized_date = moment().day(8);
  } else if (day == "Tuesday") {
    customized_date = moment().day(9);
  } else if (day == "Wednesday") {
    customized_date = moment().day(10);
  } else if (day == "Thursday") {
    customized_date = moment().day(11);
  } else if (day == "Friday") {
    customized_date = moment().day(12);
  } else if (day == "Saturday") {
    customized_date = moment().day(13);
  }

  return customized_date

};

export const GetProduct = async (product, userId) => {
  let sub_product = [];

  if (userId) {
    sub_product = await knex("subscribed_user_details")
      .select("product_id","id")
      .where({ user_id: userId, subscription_status: "pending" })
      .orWhere({ user_id: userId, subscription_status: "approved" });
  }
  console.log(sub_product[0].id)
const subscription_id = sub_product[0].id;

  if (product.length === 0) {
    return { status: false, message: "No Product Found" };
  }

  if (sub_product.length !== 0) {
    console.log("hi")
    for (let i = 0; i < product.length; i++) {
      for (let j = 0; j < sub_product.length; j++) {
        if (product[i].id == sub_product[j].product_id) {
          product[i].is_subscribed = "1";
        } else {
          product[i].is_subscribed = "0";
        }
      }
    }
  }

  for (let i = 0; i < product.length; i++) {
    product[i].image = product[i].image ?  process.env.BASE_URL + product[i].image : null
    if (!userId || sub_product.length == 0) {
      product[i].is_subscribed = "0";
    }
  }

  return { status: true, data: product,subscription_id };
};

export const getPageNumber = (req, res, data, url, is_super_admin = true) => {
  let adminUrl = is_super_admin ? "super_admin" : "branch_admin";

  const resultsPerPage = process.env.RESULT_PER_PAGE;
  const numOfResults = data.length;
  const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

  let page = req.query.page ? Number(req.query.page) : 1;
  if (page > numberOfPages) {
    return res.redirect(
      `/${adminUrl}/${url}?page=` + encodeURIComponent(numberOfPages)
    );
  } else if (page < 1) {
    return res.redirect(`/${adminUrl}/${url}?page=` + encodeURIComponent("1"));
  }
  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage;
  //Get the relevant number of POSTS for this starting page

  let iterator = page - 5 < 1 ? 1 : page - 5;
  let endingLink =
    iterator + 4 <= numberOfPages
      ? iterator + 4
      : page + (numberOfPages - page);
  if (endingLink < page + 1) {
    iterator -= page + 1 - numberOfPages;
  }

  return {
    startingLimit,
    page,
    resultsPerPage,
    numberOfPages,
    iterator,
    endingLink,
  };
};

export const multerStorage = (path) => {
  // console.log("hittihn");
  fs.access(path, (error) => {
    // To check if the given directory
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      fs.mkdir(path, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    }
  });

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      // console.log(req.headers.authorization)
      let index = file.mimetype.indexOf("/") + 1;
      cb(null, Date.now() + "." + file.mimetype.slice(index));
    },
  });

  return storage;
};

// export const uploadImg = multer({ storage: storage }).single("image");

export const phoneNumberValidator = (phoneNumber) => {
  console.log("hi")
  //  console.log(phoneNumber)
  if (!phoneNumber) {
    return false;
  }
  // if (typeof phoneNumber !== 'number') {
  //     console.log('p')

  //     return false
  // }
  if (phoneNumber.toString().length != 10) {
    console.log("c");
    return false;
  }
  return true;
};

export const integerValidator = (value) => {
  if (!value) return false;
 

  return true;
  // return isNumberValidator(value);
};

export const isNumberValidator = (value) => {
  if (typeof value !== "number") return false;

  return true;
};

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
export default {
  getOffset,
  emptyOrRows,
};
