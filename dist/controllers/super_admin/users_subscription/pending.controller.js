"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePendingList = exports.updateAllUsersStatus = exports.unsubscribeSubscription = exports.subscribeSubscription = exports.getSingleUser = exports.getNewUsers = exports.getCreateUsers = exports.getAllUsers = exports.createUsers = exports.cancelPendingList = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var createUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data, user_query, get_all_users, users_length, user, address, sub_product_query, weekdays, store_weekdays, i, j, order, order_id, sub_total, _i, product_price;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.body.data;
            console.log(req.body);
            user_query = {};
            user_query.mobile_number = data.mobile_number;
            user_query.name = data.user_name;
            _context.next = 8;
            return _db["default"].select("id").from("users");
          case 8:
            get_all_users = _context.sent;
            users_length = get_all_users.length + 1;
            user_query.user_unique_id = "CUSTOMER" + users_length;
            if (data.email) {
              user_query.email = data.email;
            }
            _context.next = 14;
            return (0, _db["default"])("users").insert(user_query);
          case 14:
            user = _context.sent;
            _context.next = 17;
            return (0, _db["default"])("user_address").insert({
              user_id: user[0],
              branch_id: data.branch_id,
              title: data.address_title,
              address: data.address,
              landmark: data.address_landmark ? data.address_landmark : null,
              latitude: data.latitude,
              longitude: data.longitude,
              alternate_mobile: data.alternate_mobile_number ? data.alternate_mobile_number : null
            });
          case 17:
            address = _context.sent;
            if (!data.sub_product) {
              _context.next = 29;
              break;
            }
            sub_product_query = {
              start_date: data.sub_start_date,
              user_id: user[0],
              product_id: data.sub_product,
              user_address_id: address[0],
              quantity: data.sub_qty,
              subscribe_type_id: data.your_plan,
              branch_id: data.branch_id,
              date: data.sub_start_date,
              subscription_start_date: data.sub_start_date,
              subscription_status: "assigned"
            };
            if (!(data.your_plan == 3)) {
              _context.next = 27;
              break;
            }
            _context.next = 23;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 23:
            weekdays = _context.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            sub_product_query.customized_days = JSON.stringify(store_weekdays);
          case 27:
            _context.next = 29;
            return (0, _db["default"])("subscribed_user_details").insert(sub_product_query);
          case 29:
            if (!(data.add_on.length !== 0)) {
              _context.next = 48;
              break;
            }
            _context.next = 32;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user[0],
              delivery_date: data.delivery_date,
              address_id: address[0],
              branch_id: data.branch_id,
              status: "assigned"
            });
          case 32:
            order = _context.sent;
            order_id = order[0];
            sub_total = 0;
            _i = 0;
          case 36:
            if (!(_i < data.add_on.length)) {
              _context.next = 46;
              break;
            }
            _context.next = 39;
            return (0, _db["default"])("products").select("price").where({
              id: data.add_on[_i].product_id
            });
          case 39:
            product_price = _context.sent;
            _context.next = 42;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user[0],
              product_id: data.add_on[_i].product_id,
              quantity: data.add_on[_i].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * data.add_on[_i].qty
            });
          case 42:
            sub_total = sub_total + product_price[0].price * data.add_on[_i].qty;
          case 43:
            _i++;
            _context.next = 36;
            break;
          case 46:
            _context.next = 48;
            return (0, _db["default"])("add_on_orders").update({
              sub_total: sub_total
            }).where({
              id: order_id
            });
          case 48:
            req.flash("success", "Success Fully Added");
            res.redirect("/home?is_user_added=2");
            // return { status: true };
            _context.next = 56;
            break;
          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home?is_user_added=1");
          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 52]]);
  }));
  return function createUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createUsers = createUsers;
var getCreateUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var branch_admin, get_subscription_products, add_on_products, get_plan;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])("admin_users").select("id", "first_name").where({
              status: "1",
              user_group_id: 2
            });
          case 3:
            branch_admin = _context2.sent;
            _context2.next = 6;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            });
          case 6:
            get_subscription_products = _context2.sent;
            _context2.next = 9;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 9:
            add_on_products = _context2.sent;
            _context2.next = 12;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 12:
            get_plan = _context2.sent;
            res.render("super_admin/users/add_user", {
              get_subscription_products: get_subscription_products,
              add_on_products: add_on_products,
              get_plan: get_plan,
              branch_admin: branch_admin
            });
            _context2.next = 20;
            break;
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.redirect("/home");
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function getCreateUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getCreateUsers = getCreateUsers;
var cancelPendingList = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.body.id;
            _context3.next = 4;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "cancelled"
            }).where({
              id: id
            });
          case 4:
            req.flash("success", "SuccessFully Cancelled the Subscription");
            return _context3.abrupt("return", res.redirect("/super_admin/users_subscription/get_new_users"));
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function cancelPendingList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.cancelPendingList = cancelPendingList;
var getNewUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var loading, searchKeyword, data_length, data_length_2, search_data_length, search_data_2_length, branches, both_data, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, subscription_users, add_on_users, i, search_query, add_on_order_query, get_user_products_query, _i2, j, view_add_on_products, _i3, _j, _i4, _j2;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            data_length_2 = [];
            if (!searchKeyword) {
              _context4.next = 21;
              break;
            }
            _context4.next = 8;
            return _db["default"].raw("SELECT subscribed_user_details.id FROM subscribed_user_details JOIN users ON users.id = subscribed_user_details.user_id WHERE subscribed_user_details.subscription_status = \"pending\" AND users.user_unique_id LIKE '%".concat(searchKeyword, "%'"));
          case 8:
            search_data_length = _context4.sent;
            _context4.next = 11;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n        users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n          user_address.address,user_address.id as user_address_id ,user_address.landmark\n          FROM add_on_orders as adds \n          JOIN users ON users.id = adds.user_id \n          JOIN user_address ON user_address.id = adds.address_id\n          WHERE adds.branch_id IS NULL AND adds.status = \"pending\" AND  users.user_unique_id LIKE '%".concat(searchKeyword, "%'"));
          case 11:
            search_data_2_length = _context4.sent;
            data_length = search_data_length[0];
            data_length_2 = search_data_2_length[0];
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context4.next = 19;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User Found");
            return _context4.abrupt("return", res.redirect("/super_admin/users_subscription/get_new_users"));
          case 19:
            _context4.next = 27;
            break;
          case 21:
            _context4.next = 23;
            return (0, _db["default"])("subscribed_user_details").select("id").where({
              subscription_status: "pending"
            });
          case 23:
            data_length = _context4.sent;
            _context4.next = 26;
            return (0, _db["default"])("add_on_orders").select("id").whereNull("branch_id");
          case 26:
            data_length_2 = _context4.sent;
          case 27:
            _context4.next = 29;
            return (0, _db["default"])("admin_users").select("first_name", "id", "location").where({
              user_group_id: "2",
              status: "1"
            });
          case 29:
            branches = _context4.sent;
            if (!(data_length.length === 0 && data_length_2.length === 0)) {
              _context4.next = 33;
              break;
            }
            loading = false;
            return _context4.abrupt("return", res.render("super_admin/users_subscription/pending", {
              subscription_users: data_length,
              add_on_users: data_length_2,
              searchKeyword: searchKeyword,
              branches: branches
            }));
          case 33:
            both_data = [];
            if (data_length.length === 0 && data_length_2.length !== 0) {
              both_data = data_length_2;
            } else if (data_length.length !== 0 && data_length_2.length === 0) {
              both_data = data_length;
            } else {
              both_data = [].concat(_toConsumableArray(data_length), _toConsumableArray(data_length_2));
            }
            _context4.next = 37;
            return (0, _helper.getPageNumber)(req, res, both_data, "users_subscription/get_new_users");
          case 37:
            _yield$getPageNumber = _context4.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            data = [];
            subscription_users = [];
            add_on_users = [];
            if (!(data_length !== 0)) {
              _context4.next = 61;
              break;
            }
            if (!searchKeyword) {
              _context4.next = 56;
              break;
            }
            _context4.next = 52;
            return _db["default"].raw("SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"pending\" \n        AND users.user_unique_id LIKE '%".concat(searchKeyword, "%'"));
          case 52:
            results = _context4.sent;
            is_search = true;
            _context4.next = 59;
            break;
          case 56:
            _context4.next = 58;
            return _db["default"].raw("SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n        user_address.address,user_address.id as user_address_id ,user_address.landmark,products.name as product_name,products.price,products.unit_value,products.image,\n        unit_types.value,categories.name as category_name\n        FROM subscribed_user_details AS sub \n        JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id \n        JOIN users ON users.id = sub.user_id \n        JOIN user_address ON user_address.id = sub.user_address_id\n        JOIN products ON products.id = sub.product_id\n        JOIN unit_types ON unit_types.id = products.unit_type_id\n        JOIN categories ON categories.id = products.category_id\n        WHERE sub.subscription_status = \"pending\" ");
          case 58:
            results = _context4.sent;
          case 59:
            subscription_users = results[0];
            for (i = 0; i < subscription_users.length; i++) {
              subscription_users[i].start_date = (0, _moment["default"])(subscription_users[i].start_date).format("DD-MM-YYYY");
              subscription_users[i].image = process.env.BASE_URL + subscription_users[i].image;
            }
          case 61:
            if (searchKeyword) {
              search_query = "AND  users.user_unique_id LIKE '%".concat(searchKeyword, "%'");
            }
            _context4.next = 64;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,\n    users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,\n      user_address.address,user_address.id as user_address_id ,user_address.landmark\n      FROM add_on_orders as adds \n      JOIN users ON users.id = adds.user_id \n      JOIN user_address ON user_address.id = adds.address_id\n      WHERE adds.branch_id IS NULL AND adds.status = \"pending\" ".concat(searchKeyword ? search_query : ""));
          case 64:
            add_on_order_query = _context4.sent;
            if (!(add_on_order_query[0].length !== 0)) {
              _context4.next = 80;
              break;
            }
            _i2 = 0;
          case 67:
            if (!(_i2 < add_on_order_query[0].length)) {
              _context4.next = 80;
              break;
            }
            _context4.next = 70;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on_order_query[0][_i2].id
            });
          case 70:
            get_user_products_query = _context4.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on_order_query[0][_i2].is_add_on = true;
            add_on_order_query[0][_i2].add_on_order_id = add_on_order_query[0][_i2].id;
            add_on_order_query[0][_i2].add_on_products = get_user_products_query;
            add_on_order_query[0][_i2].delivery_date = (0, _moment["default"])(add_on_order_query[0][_i2].delivery_date).format("DD-MM-YYYY");
            add_on_users.push(add_on_order_query[0][_i2]);
          case 77:
            _i2++;
            _context4.next = 67;
            break;
          case 80:
            // console.log(data);
            // check that new user did the sub and add on at same time (like if he did the add on while pending the subscription)
            view_add_on_products = [];
            for (_i3 = 0; _i3 < subscription_users.length; _i3++) {
              for (_j = 0; _j < add_on_users.length; _j++) {
                if (add_on_users[_j].user_address_id == subscription_users[_i3].user_address_id) {
                  add_on_users[_j].is_subscription_pending = true;
                  subscription_users[_i3].is_add_on_pending = true;
                  view_add_on_products.push({
                    add_on_order_id: add_on_users[_j].add_on_order_id,
                    delivery_date: add_on_users[_j].delivery_date,
                    sub_total: add_on_users[_j].sub_total,
                    add_on_products: add_on_users[_j].add_on_products
                  });
                }
              }
              subscription_users[_i3].add_on_details = view_add_on_products;
              view_add_on_products = [];
            }
            // console.log(add_on_users, "some");
            //  console.log(subscription_users)
            //  console.log(subscription_users[0])

            // if new user did the two add on orders

            for (_i4 = 0; _i4 < add_on_users.length; _i4++) {
              if (add_on_users[_i4].is_subscription_pending != true) {
                for (_j2 = 0; _j2 < add_on_users.length; _j2++) {
                  if (add_on_users[_i4].user_address_id == add_on_users[_j2].user_address_id && add_on_users[_i4].id != add_on_users[_j2].id) {
                    add_on_users[_i4].is_add_on_duplicate = true;
                    add_on_users[_j2].is_add_on_duplicate = true;
                    if (add_on_users[_j2].add_on_duplicate_details) {
                      add_on_users[_j2].add_on_duplicate_details.push({
                        add_on_order_id: add_on_users[_i4].add_on_order_id,
                        delivery_date: add_on_users[_i4].delivery_date,
                        sub_total: add_on_users[_i4].sub_total,
                        add_on_products: add_on_users[_i4].add_on_products
                      });
                    } else {
                      add_on_users[_j2].add_on_duplicate_details = [{
                        add_on_order_id: add_on_users[_j2].add_on_order_id,
                        delivery_date: add_on_users[_j2].delivery_date,
                        sub_total: add_on_users[_j2].sub_total,
                        add_on_products: add_on_users[_j2].add_on_products
                      }, {
                        add_on_order_id: add_on_users[_i4].add_on_order_id,
                        delivery_date: add_on_users[_i4].delivery_date,
                        sub_total: add_on_users[_i4].sub_total,
                        add_on_products: add_on_users[_i4].add_on_products
                      }];
                    }
                  }
                }
              }
            }
            console.log(add_on_users);
            loading = false;
            res.render("super_admin/users_subscription/pending", {
              data: data,
              subscription_users: subscription_users,
              add_on_users: add_on_users,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: 1,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              branches: branches
            });
            _context4.next = 92;
            break;
          case 88:
            _context4.prev = 88;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 92:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 88]]);
  }));
  return function getNewUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getNewUsers = getNewUsers;
var getAllUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var admin_id, loading, searchKeyword, data_length, search_data_length, branch, routes, _yield$getPageNumber2, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context5.next = 17;
              break;
            }
            _context5.next = 8;
            return _db["default"].raw("SELECT  users.name,users.user_unique_id  FROM  user_address\n        JOIN users ON users.id = user_address.user_id\n        JOIN admin_users ON admin_users.id = user_address.branch_id\n        WHERE users.name LIKE '%".concat(searchKeyword, "%' \n        OR users.mobile_number LIKE '%").concat(searchKeyword, "%' \n        OR admin_users.first_name LIKE '%").concat(searchKeyword, "%'"));
          case 8:
            search_data_length = _context5.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context5.next = 15;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User Found");
            return _context5.abrupt("return", res.redirect("/super_admin/users_subscription/get_all_users"));
          case 15:
            _context5.next = 20;
            break;
          case 17:
            _context5.next = 19;
            return (0, _db["default"])("user_address").select("id");
          case 19:
            data_length = _context5.sent;
          case 20:
            _context5.next = 22;
            return (0, _db["default"])("admin_users").select("first_name", "id").where({
              status: "1",
              user_group_id: "2"
            });
          case 22:
            branch = _context5.sent;
            _context5.next = 25;
            return (0, _db["default"])("users").select("name", "id").where({
              status: "1"
            });
          case 25:
            routes = _context5.sent;
            if (!(data_length.length === 0)) {
              _context5.next = 29;
              break;
            }
            loading = false;
            return _context5.abrupt("return", res.render("super_admin/users/users", {
              data: data_length,
              searchKeyword: searchKeyword,
              routes: routes,
              branch: branch
            }));
          case 29:
            _context5.next = 31;
            return (0, _helper.getPageNumber)(req, res, data_length, "users_subscription/get_all_users");
          case 31:
            _yield$getPageNumber2 = _context5.sent;
            startingLimit = _yield$getPageNumber2.startingLimit;
            page = _yield$getPageNumber2.page;
            resultsPerPage = _yield$getPageNumber2.resultsPerPage;
            numberOfPages = _yield$getPageNumber2.numberOfPages;
            iterator = _yield$getPageNumber2.iterator;
            endingLink = _yield$getPageNumber2.endingLink;
            console.log(data_length);
            is_search = false;
            if (!searchKeyword) {
              _context5.next = 47;
              break;
            }
            _context5.next = 43;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      admin_users.first_name as branch_name , admin_users.id as branch_id\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id\n      WHERE users.name LIKE '%".concat(searchKeyword, "%' \n      OR users.mobile_number LIKE '%").concat(searchKeyword, "%' \n      OR admin_users.first_name LIKE '%").concat(searchKeyword, "%'\n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 43:
            results = _context5.sent;
            is_search = true;
            _context5.next = 50;
            break;
          case 47:
            _context5.next = 49;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      admin_users.first_name as branch_name,admin_users.id as branch_id\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id\n      LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 49:
            results = _context5.sent;
          case 50:
            data = results[0];
            loading = false;
            res.render("super_admin/users/users", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes,
              branch: branch
            });

            // let loading = true;
            // const { searchKeyword } = req.query;

            // let data_length = [];

            // if (searchKeyword) {
            //   const search_data_length = await knex.raw(
            //     `SELECT admin_users.first_name FROM admin_users WHERE admin_users.first_name LIKE '%${searchKeyword}%'`
            //   );
            //   // `SELECT  .id,admin_users.first_name as admin_users.first_name,subscription_type.name,products.name,user_address.address,users.mobile_number,product_type.name
            //   //   FROM subscription_type
            //   //   JOIN product_type ON products.product_type_id = product_type.id
            //   //   JOIN admin_users ON admin_users.id = subscription_type.id
            //   //   JOIN user_address ON user_address.user_id = users.user_group_id
            //   //    WHERE admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`

            //   data_length = search_data_length[0];

            //   if (data_length.length === 0) {
            //     loading = false;
            //     req.query.searchKeyword = "";
            //     req.flash("error", "No Product Type Found");
            //     return res.redirect("/super_admin/users_subscription/get_all_users");
            //   }
            // } else {
            //   data_length = await knex("subscription_type").select("id");
            // }

            // // const branches = await knex("admin_users")
            // //   .select("first_name", "id", "location")
            // //   .where({ user_group_id: "2" });

            // if (data_length.length === 0) {
            //   loading = false;
            //   return res.render("super_admin/users_subscription/approve", {
            //     data: data_length,
            //     searchKeyword,
            //     // branches,
            //   });
            // }

            // let {
            //   startingLimit,
            //   page,
            //   resultsPerPage,
            //   numberOfPages,
            //   iterator,
            //   endingLink,
            // } = await getPageNumber(
            //   req,
            //   res,
            //   data_length,
            //   "users_subscription/get_all_users"
            // );

            // let results;
            // let is_search = false;
            // if (searchKeyword) {
            //   results = await knex.raw(
            //     `SELECT sub.id , sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
            //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name
            //     FROM subscribed_user_details AS sub
            //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
            //     JOIN users ON users.id = sub.user_id
            //     JOIN user_address ON user_address.id = sub.user_address_id
            //     JOIN products ON products.id = sub.product_id
            //     JOIN unit_types ON unit_types.id = products.unit_type_id
            //     JOIN categories ON categories.id = products.category_id
            //     JOIN admin_users ON admin_users.user_group_id = subscription_type.id
            //     WHERE sub.subscription_status = "subscribed"
            //     AND admin_users.first_name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
            //   );
            //   is_search = true;
            //   console.log(results);
            // } else if (!searchKeyword) {
            //   results = await knex.raw(
            //     `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
            //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
            //     FROM subscribed_user_details AS sub
            //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
            //     JOIN users ON users.id = sub.user_id
            //     JOIN user_address ON user_address.id = sub.user_address_id
            //     JOIN products ON products.id = sub.product_id
            //     JOIN unit_types ON unit_types.id = products.unit_type_id
            //     JOIN categories ON categories.id = products.category_id
            //     JOIN admin_users ON admin_users.user_group_id = users.id
            //     JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
            //     WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
            //   );
            // } else {
            //   data1 = await knex.raw(
            //     `SELECT sub.id ,sub.start_date,sub.quantity,sub.customized_days,sub.status,subscription_type.name as subscription_name,users.user_unique_id as customer_id,users.mobile_number,users.name as user_name,
            //     user_address.address,user_address.landmark,products.name as product_name,products.price,products.unit_value,
            //     unit_types.value,categories.name as category_name,admin_users.first_name as first_name,user_address_subscribe_branch.user_id,products.unit_value as product_unit,products.price as product_price
            //     FROM subscribed_user_details AS sub
            //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
            //     JOIN users ON users.id = sub.user_id
            //     JOIN user_address ON user_address.user_id = sub.user_address_id
            //     JOIN products ON products.product_type_id = sub.user_id
            //     JOIN unit_types ON unit_types.id = products.unit_type_id
            //     JOIN categories ON categories.id = products.product_type_id
            //     JOIN admin_users ON admin_users.user_group_id = users.id
            //     JOIN user_address_subscribe_branch ON user_address_subscribe_branch.product_id = products.product_type_id
            //     JOIN add_on_order_items ON add_on_order_items.add_on_order_id = products.product_type_id
            //     WHERE sub.subscription_status = "subscribed" AND users.user_unique_id  LIMIT ${startingLimit},${resultsPerPage}`
            //   );
            // }

            // console.log(data1);

            // const data = results[0];

            // for (let i = 0; i < data.length; i++) {
            //   data[i].start_date = data[i].start_date.toString().slice(4, 16);
            // }

            // const data1 = results[0];

            // for (let i = 0; i < data1.length; i++) {
            //   data1[i].start_date = data1[i].start_date.toString().slice(4, 16);
            // }

            // loading = false;
            // res.render("super_admin/users_subscription/approve", {
            //   data: data,
            //   data1: data1,
            //   page,
            //   iterator,
            //   endingLink,
            //   numberOfPages,
            //   is_search,
            //   searchKeyword,
            //   loading,
            //   // branches,
            // });
            _context5.next = 59;
            break;
          case 55:
            _context5.prev = 55;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.redirect("/home");
          case 59:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 55]]);
  }));
  return function getAllUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getAllUsers = getAllUsers;
var updatePendingList = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body, sub_id, branch_id, address_id, add_on_id, add_on_order_id, i;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body = req.body, sub_id = _req$body.sub_id, branch_id = _req$body.branch_id, address_id = _req$body.address_id, add_on_id = _req$body.add_on_id; // console.log(address_id);
            // console.log(add_on_id);
            add_on_order_id = req.body.add_on_order_id;
            console.log(add_on_order_id, "add", _typeof(add_on_order_id));
            console.log(sub_id, "sub");
            console.log(address_id, "address");
            if (!add_on_order_id) {
              _context6.next = 19;
              break;
            }
            if (!(typeof add_on_order_id == "string")) {
              _context6.next = 12;
              break;
            }
            _context6.next = 10;
            return (0, _db["default"])("add_on_orders").update({
              branch_id: branch_id,
              status: "assigned"
            }).where({
              id: add_on_order_id
            });
          case 10:
            _context6.next = 19;
            break;
          case 12:
            i = 0;
          case 13:
            if (!(i < add_on_order_id.length)) {
              _context6.next = 19;
              break;
            }
            _context6.next = 16;
            return (0, _db["default"])("add_on_orders").update({
              branch_id: branch_id,
              status: "assigned"
            }).where({
              id: add_on_order_id[i]
            });
          case 16:
            i++;
            _context6.next = 13;
            break;
          case 19:
            if (!sub_id) {
              _context6.next = 22;
              break;
            }
            _context6.next = 22;
            return (0, _db["default"])("subscribed_user_details").update({
              branch_id: branch_id,
              subscription_status: "assigned",
              assigned_date: new Date().toISOString().slice(0, 19).replace("T", " ")
            }).where({
              id: sub_id
            });
          case 22:
            _context6.next = 24;
            return (0, _db["default"])("user_address").update({
              branch_id: branch_id
            }).where({
              id: address_id
            });
          case 24:
            req.flash("success", "Subscription Moved To Branch");
            res.redirect("/super_admin/users_subscription/get_new_users");
            _context6.next = 32;
            break;
          case 28:
            _context6.prev = 28;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.redirect("/home");
          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 28]]);
  }));
  return function updatePendingList(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updatePendingList = updatePendingList;
var updateAllUsersStatus = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, status, id;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body2 = req.body, status = _req$body2.status, id = _req$body2.id;
            if (!(status == "1")) {
              _context7.next = 7;
              break;
            }
            _context7.next = 5;
            return (0, _db["default"])("admin_users").update({
              status: "1"
            }).where({
              id: id
            });
          case 5:
            _context7.next = 9;
            break;
          case 7:
            _context7.next = 9;
            return (0, _db["default"])("admin_users").update({
              status: "0"
            }).where({
              id: id
            });
          case 9:
            console.log("hell");
            req.flash("success", "Updated SuccessFully");
            return _context7.abrupt("return", res.redirect("/super_admin/users_subscription/update_all_users_status"));
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.redirect("/home");
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function updateAllUsersStatus(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateAllUsersStatus = updateAllUsersStatus;
var getSingleUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user_address_id, admin_id, get_user_query, user, get_subscription_products, current_month, get_additional_orders, subscription_ids, is_subscription_active, i, pause_dates, pause_orders_query, k, additional_orders_parent_id, additional_orders, additional_orders_query, orders, dates, is_active, _i5, add_on_order_query, add_on, is_add_on_active, get_user_products_query, _i6, j, get_plan, sub_product_id, _i7, add_subscription_products, add_on_products;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            user_address_id = req.query.user_address_id;
            admin_id = req.body.admin_id;
            _context8.next = 5;
            return _db["default"].raw("SELECT user_address.id as user_address_id,\n      user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name,admin_users.first_name as branch_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN admin_users ON admin_users.id = user_address.branch_id\n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.id = ".concat(user_address_id));
          case 5:
            get_user_query = _context8.sent;
            if (!(get_user_query[0].length === 0)) {
              _context8.next = 9;
              break;
            }
            req.flash("error", "User Not Found");
            return _context8.abrupt("return", res.redirect("/home"));
          case 9:
            user = get_user_query[0][0];
            _context8.next = 12;
            return (0, _db["default"])("subscribed_user_details as sub").select("sub.id as sub_id", "sub.user_id", "sub.start_date", "sub.customized_days", "sub.quantity", "sub.subscription_status", "products.name as product_name", "products.unit_value", "products.id as product_id", "products.price", "unit_types.value", "subscription_type.name as sub_name").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").join("subscription_type", "subscription_type.id", "=", "sub.subscribe_type_id").where({
              "sub.user_id": user.user_id,
              "sub.user_address_id": user_address_id
            });
          case 12:
            get_subscription_products = _context8.sent;
            current_month = (0, _moment["default"])().format("M");
            get_additional_orders = [];
            subscription_ids = [];
            is_subscription_active = 0;
            if (!(get_subscription_products.length !== 0)) {
              _context8.next = 41;
              break;
            }
            i = 0;
          case 19:
            if (!(i < get_subscription_products.length)) {
              _context8.next = 41;
              break;
            }
            subscription_ids.push(get_subscription_products[i].sub_id);

            /////////////////////////////////////////////////////////////////////////////// pause
            pause_dates = [];
            _context8.next = 24;
            return (0, _db["default"])("pause_dates").select("date", "id").where({
              subscription_id: get_subscription_products[i].sub_id
            });
          case 24:
            pause_orders_query = _context8.sent;
            if (pause_orders_query.length !== 0) {
              for (k = 0; k < pause_orders_query.length; k++) {
                pause_dates.push((0, _moment["default"])(pause_orders_query[k].date).format("YYYY-MM-DD"));
              }
            }
            get_subscription_products[i].pause_dates = pause_dates;
            pause_dates = [];

            /////////////////////////////////////////////////////////////////////////////// additional
            _context8.next = 30;
            return (0, _db["default"])("additional_orders_parent").select("id").where({
              subscription_id: get_subscription_products[i].sub_id
              // month: current_month,
            });
          case 30:
            additional_orders_parent_id = _context8.sent;
            // if (additional_orders_parent_id.length !== 0) {
            additional_orders = {};
            _context8.next = 34;
            return (0, _db["default"])("additional_orders").select("date", "status", "quantity").where({
              subscription_id: get_subscription_products[i].sub_id,
              is_cancelled: "0"
            });
          case 34:
            additional_orders_query = _context8.sent;
            // .where({
            //   additional_orders_parent_id: additional_orders_parent_id[0].id,
            // });

            if (additional_orders_query.length !== 0) {
              // additional_orders.additional_orders_parent_id =
              //   additional_orders_parent_id[0].id;
              additional_orders.qty = additional_orders_query[0].quantity;
              orders = [];
              dates = [];
              is_active = false;
              for (_i5 = 0; _i5 < additional_orders_query.length; _i5++) {
                if (additional_orders_query[_i5].status == "pending") {
                  is_active = true;
                }
                orders.push({
                  date: (0, _moment["default"])(additional_orders_query[_i5].date).format("DD-MM-YYYY"),
                  qty: additional_orders_query[_i5].quantity,
                  status: additional_orders_query[_i5].status
                });
                dates.push((0, _moment["default"])(additional_orders_query[_i5].date).format("YYYY-MM-DD"));
              }
              additional_orders.dates = dates;
              additional_orders.order_details = orders;
              additional_orders.sub_id = get_subscription_products[i].sub_id;
              additional_orders.is_active = is_active;
              orders = [];

              // additional_orders

              get_subscription_products[i].additional_orders = additional_orders;
              get_additional_orders.push(additional_orders);
              // }
            }

            if (get_subscription_products[i].subscription_status == "subscribed") {
              is_subscription_active = 1;
            }
            get_subscription_products[i].start_date = (0, _moment["default"])(get_subscription_products[i].start_date).format("DD-MM-YYYY");
          case 38:
            i++;
            _context8.next = 19;
            break;
          case 41:
            _context8.next = 43;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status\n      FROM add_on_orders as adds \n      WHERE adds.user_id = ".concat(user.user_id, " AND adds.address_id = ").concat(user_address_id));
          case 43:
            add_on_order_query = _context8.sent;
            // console.log(add_on_order_query[0]);
            add_on = add_on_order_query[0];
            is_add_on_active = 0;
            if (!(add_on.length !== 0)) {
              _context8.next = 59;
              break;
            }
            _i6 = 0;
          case 48:
            if (!(_i6 < add_on.length)) {
              _context8.next = 59;
              break;
            }
            if (add_on[_i6].status == "pending" || add_on[_i6].status == "new_order" || add_on[_i6].status == "order_placed") {
              is_add_on_active = 1;
            }
            _context8.next = 52;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "adds.status", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on[_i6].id
            });
          case 52:
            get_user_products_query = _context8.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on[_i6].add_on_products = get_user_products_query;
            add_on[_i6].delivery_date = (0, _moment["default"])(add_on[_i6].delivery_date).format("DD-MM-YYYY");
          case 56:
            _i6++;
            _context8.next = 48;
            break;
          case 59:
            _context8.next = 61;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 61:
            get_plan = _context8.sent;
            sub_product_id = [];
            if (get_subscription_products.length !== 0) {
              for (_i7 = 0; _i7 < get_subscription_products.length; _i7++) {
                sub_product_id.push(get_subscription_products[_i7].product_id);
              }
            }
            _context8.next = 66;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            }).whereNotIn("products.id", sub_product_id);
          case 66:
            add_subscription_products = _context8.sent;
            _context8.next = 69;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 69:
            add_on_products = _context8.sent;
            // console.log(get_additional_orders , "check")
            // console.log(get_subscription_products[0]);
            // console.log(get_subscription_products[0].pause_dates);

            res.render("super_admin/users/user_detail", {
              user: user,
              sub_products: get_subscription_products,
              add_on: add_on,
              is_add_on_active: is_add_on_active,
              is_subscription_active: is_subscription_active,
              get_plan: get_plan,
              get_subscription_products: add_subscription_products,
              add_on_products: add_on_products,
              get_additional_orders: get_additional_orders
            });
            _context8.next = 77;
            break;
          case 73:
            _context8.prev = 73;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.redirect("/home"));
          case 77:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 73]]);
  }));
  return function getSingleUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// subscribe and unsubscrivbe
exports.getSingleUser = getSingleUser;
var unsubscribeSubscription = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body3, sub_id, user_id, user_address_id;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body3 = req.body, sub_id = _req$body3.sub_id, user_id = _req$body3.user_id, user_address_id = _req$body3.user_address_id;
            _context9.next = 4;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "unsubscribed"
            }).where({
              id: sub_id,
              user_id: user_id
            });
          case 4:
            req.flash("success", "UnSubscribed SuccessFully");
            res.redirect("/super_admin/users_subscription/single_user?user_address_id=".concat(user_address_id));
            _context9.next = 12;
            break;
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.redirect("/home");
          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function unsubscribeSubscription(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.unsubscribeSubscription = unsubscribeSubscription;
var subscribeSubscription = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body4, sub_id, user_id, user_address_id;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body4 = req.body, sub_id = _req$body4.sub_id, user_id = _req$body4.user_id, user_address_id = _req$body4.user_address_id;
            _context10.next = 4;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "subscribed"
            }).where({
              id: sub_id,
              user_id: user_id
            });
          case 4:
            req.flash("success", "Subscribed SuccessFully");
            res.redirect("/super_admin/users_subscription/single_user?user_address_id=".concat(user_address_id));
            _context10.next = 12;
            break;
          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            res.redirect("/home");
          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function subscribeSubscription(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// export const getSingleUser = async (req, res) => {
//   try {
//     const { user_address_id } = req.query;
//     const { admin_id } = req.body;

//     const get_user_query =
//       await knex.raw(`SELECT user_address.id as user_address_id,
//       user_address.address,user_address.user_id as user_id, 
//       users.name as user_name,users.user_unique_id,users.mobile_number,
//       routes.name as route_name,admin_users.first_name as branch_name
//       FROM user_address 
//       JOIN users ON users.id = user_address.user_id 
//       LEFT JOIN admin_users ON admin_users.id = user_address.branch_id
//       LEFT JOIN routes ON routes.id = user_address.router_id
//       WHERE user_address.id = ${user_address_id}`);

//     if (get_user_query[0].length === 0) {
//       req.flash("error", "User Not Found");
//       return res.redirect("/home");
//     }

//     const user = get_user_query[0][0];

//     // console.log(user);

//     const get_subscription_products = await knex(
//       "subscribed_user_details as sub"
//     )
//       .select(
//         "sub.id as sub_id",
//         "sub.user_id",
//         "sub.start_date",
//         "sub.customized_days",
//         "sub.quantity",
//         "sub.subscription_status",
//         "products.name as product_name",
//         "products.unit_value",
//         "products.price",
//         "unit_types.value",
//         "subscription_type.name as sub_name"
//       )
//       .join("products", "products.id", "=", "sub.product_id")
//       .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//       .join(
//         "subscription_type",
//         "subscription_type.id",
//         "=",
//         "sub.subscribe_type_id"
//       )

//       .where({
//         "sub.user_id": user.user_id,
//         "sub.user_address_id": user_address_id,
//       });

//     // console.log(get_subscription_products);

//     let is_subscription_active = 0;
//     if (get_subscription_products.length !== 0) {
//       for (let i = 0; i < get_subscription_products.length; i++) {
//         if (get_subscription_products[i].subscription_status == "subscribed") {
//           is_subscription_active = 1;
//         }

//         get_subscription_products[i].start_date = moment(
//           get_subscription_products[i].start_date
//         ).format("DD-MM-YYYY");
//       }
//     }

//     const add_on_order_query =
//       await knex.raw(`SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status
//       FROM add_on_orders as adds 
//       WHERE adds.user_id = ${user.user_id} AND adds.address_id = ${user_address_id}`);

//     // console.log(add_on_order_query[0]);
//     let add_on = add_on_order_query[0];
//     console.log(add_on)

//     let is_add_on_active = 0;
//     let get_user_products_query;
//     if (add_on.length !== 0) {
//       for (let i = 0; i < add_on.length; i++) {
//         if (add_on[i].status == "pending") {
//           is_add_on_active = 1;
//         }

//         get_user_products_query = await knex("add_on_order_items as adds")
//           .select(
//             "adds.add_on_order_id",
//             "adds.quantity",
//             "adds.price",
//             "adds.total_price",
//             "adds.status",
//             "products.name as product_name",
//             "products.image",
//             "products.unit_value",
//             "unit_types.value"
//           )
//           .join("products", "products.id", "=", "adds.product_id")
//           .join("unit_types", "unit_types.id", "=", "products.unit_type_id")
//           .where({ "adds.add_on_order_id": add_on[i].id });

//         for (let j = 0; j < get_user_products_query.length; j++) {
//           get_user_products_query[j].image =
//             process.env.BASE_URL + get_user_products_query[j].image;
//         }
//         add_on[i].add_on_products = get_user_products_query;
//         add_on[i].delivery_date = moment(add_on[i].delivery_date).format(
//           "DD-MM-YYYY"
//         );
//       }
//     }

//     res.render("super_admin/users/user_detail", {
//       user,
//       sub_products: get_subscription_products,
//       add_on,
//       is_add_on_active,
//       is_subscription_active,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.redirect("/home");
//   }
// };
exports.subscribeSubscription = subscribeSubscription;