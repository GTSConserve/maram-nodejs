"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.week_days = exports.variation_types = exports.user_groups = exports.subscription_type = exports.products = exports.product_variations = exports.product_type = exports.coupons = exports.category = exports.banners = void 0;
var product_type = [{
  name: "subscription",
  image: "sub image for testing",
  status: "1"
}, {
  name: "add on product",
  image: "add on image for testing",
  status: "1"
}];
exports.product_type = product_type;
var banners = [{
  name: "bannner 1",
  image: "bannner image 1",
  status: "1"
}, {
  name: "bannner 2",
  image: "bannner image 2",
  status: "1"
}];
exports.banners = banners;
var user_groups = [{
  name: "superAdmin",
  status: "1"
}, {
  name: "branchAdmin",
  status: "1"
}, {
  name: "user",
  status: "1"
}];
exports.user_groups = user_groups;
var coupons = [{
  name: "coupon 1",
  coupon_code: "TRYFREE",
  image: "FREEEEEEEEEE",
  admin_id: "1",
  discount: "50",
  minimum_amount: "100",
  maximum_discount_amount: "100",
  minimum_billing_amount: "500"
}, {
  name: "coupon 22",
  coupon_code: "FRIDAY",
  image: "2imagte",
  admin_id: "1",
  discount: "10",
  minimum_amount: "100",
  maximum_discount_amount: "150",
  minimum_billing_amount: "200"
}];
exports.coupons = coupons;
var variation_types = [{
  name: "gram",
  value: "gm",
  status: "1"
}, {
  name: "milli liter",
  value: "ml",
  status: "1"
}];
exports.variation_types = variation_types;
var products = [{
  name: "Milk",
  description: "Best Milk Ever"
}, {
  name: "Tomato",
  description: "Best Tomtoooooo Ever"
}, {
  name: "oil",
  description: "oil oil oil"
}, {
  name: "Framer Fresher Natural",
  description: "tatekweas tatakea"
}, {
  name: "Natural wood Oil",
  description: "Best Noice wood Ever"
}];
exports.products = products;
var category = [{
  name: "Diary",
  image: "some image"
}, {
  name: "vegetables",
  image: "some image"
}, {
  name: "oil",
  image: "some image"
}];
exports.category = category;
var subscription_type = [{
  name: "daily"
}, {
  name: "alternative"
}, {
  name: "customized"
}];
exports.subscription_type = subscription_type;
var product_variations = [{
  value: "1000",
  price: "50"
}, {
  value: "500",
  price: "25"
}, {
  value: "250",
  price: "15"
}];
exports.product_variations = product_variations;
var week_days = [{
  name: "Sunday",
  code: "sun"
}, {
  name: "Monday",
  code: "mon"
}, {
  name: "Tuesday",
  code: "tue"
}, {
  name: "Wednesday",
  code: "wed"
}, {
  name: "Thursday",
  code: "thu"
}, {
  name: "Friday",
  code: "fri"
}, {
  name: "Saturday",
  code: "sat"
}];
exports.week_days = week_days;