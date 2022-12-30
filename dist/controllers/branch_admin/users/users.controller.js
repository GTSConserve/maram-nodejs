"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newSubscription = exports.newAddOn = exports.getusers = exports.getSingleUser = exports.getAddUser = exports.createUser = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getusers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var admin_id, loading, searchKeyword, data_length, search_data_length, routes, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context.next = 17;
              break;
            }
            _context.next = 8;
            return _db["default"].raw("SELECT  users.name,users.user_unique_id  FROM  user_address\n        JOIN users ON users.id = user_address.user_id\n        WHERE user_address.branch_id= ".concat(admin_id, " AND users.name LIKE '%").concat(searchKeyword, "%' \n        OR users.mobile_number LIKE '%").concat(searchKeyword, "%'"));
          case 8:
            search_data_length = _context.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context.next = 15;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User  Found");
            return _context.abrupt("return", res.redirect("/branch_admin/user/branch_user"));
          case 15:
            _context.next = 20;
            break;
          case 17:
            _context.next = 19;
            return (0, _db["default"])("user_address").select("id").where({
              branch_id: admin_id
            });
          case 19:
            data_length = _context.sent;
          case 20:
            _context.next = 22;
            return (0, _db["default"])("users").select("name", "id").where({
              status: "1"
            });
          case 22:
            routes = _context.sent;
            if (!(data_length.length === 0)) {
              _context.next = 26;
              break;
            }
            loading = false;
            return _context.abrupt("return", res.render("branch_admin/user/branch_user", {
              data: data_length,
              searchKeyword: searchKeyword,
              routes: routes
            }));
          case 26:
            _context.next = 28;
            return (0, _helper.getPageNumber)(req, res, data_length, "user/branch_user");
          case 28:
            _yield$getPageNumber = _context.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            console.log(data_length);
            is_search = false;
            if (!searchKeyword) {
              _context.next = 44;
              break;
            }
            _context.next = 40;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.branch_id = ".concat(admin_id, " AND users.name LIKE '%").concat(searchKeyword, "%' \n      OR users.mobile_number LIKE '%").concat(searchKeyword, "%' \n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 40:
            results = _context.sent;
            is_search = true;
            _context.next = 47;
            break;
          case 44:
            _context.next = 46;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.branch_id = ".concat(admin_id, " \n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 46:
            results = _context.sent;
          case 47:
            data = results[0];
            loading = false;
            res.render("branch_admin/users/users", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes
            });
            _context.next = 56;
            break;
          case 52:
            _context.prev = 52;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 52]]);
  }));
  return function getusers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getusers = getusers;
var getSingleUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_address_id, admin_id, get_user_query, user, get_subscription_products, is_subscription_active, i, add_on_order_query, add_on, is_add_on_active, get_user_products_query, _i, j, get_plan, sub_product_id, _i2, add_subscription_products, add_on_products;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user_address_id = req.query.user_address_id;
            admin_id = req.body.admin_id;
            console.log(user_address_id, admin_id);
            _context2.next = 6;
            return _db["default"].raw("SELECT user_address.id as user_address_id,\n      user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.id = ".concat(user_address_id, " AND user_address.branch_id = ").concat(admin_id));
          case 6:
            get_user_query = _context2.sent;
            if (!(get_user_query[0].length === 0)) {
              _context2.next = 10;
              break;
            }
            req.flash("error", "User Not Found");
            return _context2.abrupt("return", res.redirect("/home"));
          case 10:
            user = get_user_query[0][0]; // console.log(user);
            _context2.next = 13;
            return (0, _db["default"])("subscribed_user_details as sub").select("sub.id as sub_id", "sub.user_id", "sub.start_date", "sub.customized_days", "sub.quantity", "sub.subscription_status", "products.name as product_name", "products.unit_value", "products.id as product_id", "products.price", "unit_types.value", "subscription_type.name as sub_name").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").join("subscription_type", "subscription_type.id", "=", "sub.subscribe_type_id").where({
              "sub.user_id": user.user_id,
              "sub.user_address_id": user_address_id
            });
          case 13:
            get_subscription_products = _context2.sent;
            is_subscription_active = 0;
            if (get_subscription_products.length !== 0) {
              for (i = 0; i < get_subscription_products.length; i++) {
                if (get_subscription_products[i].subscription_status == "subscribed") {
                  is_subscription_active = 1;
                }
                get_subscription_products[i].start_date = (0, _moment["default"])(get_subscription_products[i].start_date).format("YYYY-MM-DD");
              }
            }
            _context2.next = 18;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status\n      FROM add_on_orders as adds \n      WHERE adds.user_id = ".concat(user.user_id, " AND adds.address_id = ").concat(user_address_id));
          case 18:
            add_on_order_query = _context2.sent;
            // console.log(add_on_order_query[0]);
            add_on = add_on_order_query[0];
            is_add_on_active = 0;
            if (!(add_on.length !== 0)) {
              _context2.next = 34;
              break;
            }
            _i = 0;
          case 23:
            if (!(_i < add_on.length)) {
              _context2.next = 34;
              break;
            }
            if (add_on[_i].status == "pending") {
              is_add_on_active = 1;
            }
            _context2.next = 27;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "adds.status", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on[_i].id
            });
          case 27:
            get_user_products_query = _context2.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on[_i].add_on_products = get_user_products_query;
            add_on[_i].delivery_date = (0, _moment["default"])(add_on[_i].delivery_date).format("YYYY-MM-DD");
          case 31:
            _i++;
            _context2.next = 23;
            break;
          case 34:
            _context2.next = 36;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 36:
            get_plan = _context2.sent;
            sub_product_id = [];
            if (get_subscription_products.length !== 0) {
              for (_i2 = 0; _i2 < get_subscription_products.length; _i2++) {
                sub_product_id.push(get_subscription_products[_i2].product_id);
              }
            }
            _context2.next = 41;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            }).whereNotIn("products.id", sub_product_id);
          case 41:
            add_subscription_products = _context2.sent;
            _context2.next = 44;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 44:
            add_on_products = _context2.sent;
            res.render("branch_admin/users/user_detail", {
              user: user,
              sub_products: get_subscription_products,
              add_on: add_on,
              is_add_on_active: is_add_on_active,
              is_subscription_active: is_subscription_active,
              get_plan: get_plan,
              get_subscription_products: add_subscription_products,
              add_on_products: add_on_products
            });
            _context2.next = 52;
            break;
          case 48:
            _context2.prev = 48;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.redirect("/home"));
          case 52:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 48]]);
  }));
  return function getSingleUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getSingleUser = getSingleUser;
var getAddUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var admin_id, get_routes, get_subscription_products, add_on_products, get_plan;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            admin_id = req.body.admin_id;
            _context3.next = 4;
            return (0, _db["default"])("routes").select("id", "name").where({
              status: "1",
              branch_id: admin_id
            });
          case 4:
            get_routes = _context3.sent;
            _context3.next = 7;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            });
          case 7:
            get_subscription_products = _context3.sent;
            _context3.next = 10;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 10:
            add_on_products = _context3.sent;
            _context3.next = 13;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 13:
            get_plan = _context3.sent;
            res.render("branch_admin/users/add_user", {
              get_subscription_products: get_subscription_products,
              add_on_products: add_on_products,
              get_plan: get_plan,
              get_routes: get_routes
            });
            _context3.next = 21;
            break;
          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function getAddUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAddUser = getAddUser;
var createUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, data, admin_id, user_query, get_all_users, users_length, user, address, sub_product_query, weekdays, store_weekdays, i, j, order, order_id, sub_total, _i3, product_price, users, arr_users, get_users;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, data = _req$body.data, admin_id = _req$body.admin_id;
            console.log(req.body);
            user_query = {};
            user_query.mobile_number = data.mobile_number;
            user_query.name = data.user_name;
            _context4.next = 8;
            return _db["default"].select("id").from("users");
          case 8:
            get_all_users = _context4.sent;
            users_length = get_all_users.length + 1;
            user_query.user_unique_id = "CUSTOMER" + users_length;
            if (data.email) {
              user_query.email = data.email;
            }
            _context4.next = 14;
            return (0, _db["default"])("users").insert(user_query);
          case 14:
            user = _context4.sent;
            _context4.next = 17;
            return (0, _db["default"])("user_address").insert({
              user_id: user[0],
              branch_id: admin_id,
              title: data.address_title,
              address: data.address,
              landmark: data.address_landmark ? data.address_landmark : null,
              latitude: data.latitude,
              longitude: data.longitude,
              alternate_mobile: data.alternate_mobile_number ? data.alternate_mobile_number : null,
              router_id: data.router_id ? data.router_id : null
            });
          case 17:
            address = _context4.sent;
            if (!data.sub_product) {
              _context4.next = 30;
              break;
            }
            sub_product_query = {
              start_date: data.sub_start_date,
              user_id: user[0],
              product_id: data.sub_product,
              user_address_id: address[0],
              quantity: data.sub_qty,
              subscribe_type_id: data.your_plan,
              branch_id: admin_id,
              date: data.sub_start_date,
              subscription_start_date: data.sub_start_date,
              subscription_status: "subscribed"
            };
            if (data.router_id) {
              sub_product_query.router_id = data.router_id;
            }
            if (!(data.your_plan == 3)) {
              _context4.next = 28;
              break;
            }
            _context4.next = 24;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 24:
            weekdays = _context4.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            sub_product_query.customized_days = JSON.stringify(store_weekdays);
          case 28:
            _context4.next = 30;
            return (0, _db["default"])("subscribed_user_details").insert(sub_product_query);
          case 30:
            if (!(data.add_on.length !== 0)) {
              _context4.next = 49;
              break;
            }
            _context4.next = 33;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user[0],
              delivery_date: data.delivery_date,
              address_id: address[0],
              branch_id: admin_id,
              status: "new_order"
            });
          case 33:
            order = _context4.sent;
            order_id = order[0];
            sub_total = 0;
            _i3 = 0;
          case 37:
            if (!(_i3 < data.add_on.length)) {
              _context4.next = 47;
              break;
            }
            _context4.next = 40;
            return (0, _db["default"])("products").select("price").where({
              id: data.add_on[_i3].product_id
            });
          case 40:
            product_price = _context4.sent;
            _context4.next = 43;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user[0],
              product_id: data.add_on[_i3].product_id,
              quantity: data.add_on[_i3].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * data.add_on[_i3].qty
            });
          case 43:
            sub_total = sub_total + product_price[0].price * data.add_on[_i3].qty;
          case 44:
            _i3++;
            _context4.next = 37;
            break;
          case 47:
            _context4.next = 49;
            return (0, _db["default"])("add_on_orders").update({
              sub_total: sub_total
            }).where({
              id: order_id
            });
          case 49:
            if (!data.router_id) {
              _context4.next = 65;
              break;
            }
            _context4.next = 52;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: data.router_id
            });
          case 52:
            users = _context4.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context4.next = 59;
              break;
            }
            arr_users = [Number(address[0])];
            _context4.next = 57;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(arr_users)
            }).where({
              id: data.router_id
            });
          case 57:
            _context4.next = 65;
            break;
          case 59:
            _context4.next = 61;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: data.router_id
            });
          case 61:
            get_users = _context4.sent;
            get_users[0].user_mapping.push(Number(address[0]));
            _context4.next = 65;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(get_users[0].user_mapping)
            }).where({
              id: data.router_id
            });
          case 65:
            req.flash("success", "Success Fully Added");
            res.redirect("/home?is_user_added=2");
            // return { status: true };
            _context4.next = 73;
            break;
          case 69:
            _context4.prev = 69;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home?is_user_added=1");
          case 73:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 69]]);
  }));
  return function createUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createUser = createUser;
var newSubscription = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, data, user_address_id, user_query, user, sub_product_query, weekdays, store_weekdays, i, j;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, data = _req$body2.data, user_address_id = _req$body2.user_address_id;
            _context5.next = 4;
            return (0, _db["default"])("user_address").select("user_id", "branch_id", "router_id").where({
              "id": user_address_id
            });
          case 4:
            user_query = _context5.sent;
            user = user_query[0];
            sub_product_query = {
              start_date: data.sub_start_date,
              user_id: user.user_id,
              product_id: data.sub_product,
              user_address_id: user_address_id,
              quantity: data.sub_qty,
              subscribe_type_id: data.your_plan,
              branch_id: user.branch_id,
              date: data.sub_start_date,
              subscription_start_date: data.sub_start_date,
              subscription_status: "subscribed"
            };
            if (user.router_id) {
              sub_product_query.router_id = user.router_id;
            }
            if (!(data.your_plan == 3)) {
              _context5.next = 15;
              break;
            }
            _context5.next = 11;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 11:
            weekdays = _context5.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            sub_product_query.customized_days = JSON.stringify(store_weekdays);
          case 15:
            _context5.next = 17;
            return (0, _db["default"])("subscribed_user_details").insert(sub_product_query);
          case 17:
            return _context5.abrupt("return", res.status(200).json({
              status: true
            }));
          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.redirect("/home"));
          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return function newSubscription(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.newSubscription = newSubscription;
var newAddOn = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, data, user_address_id, user_query, user, order, order_id, sub_total, i, product_price;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, data = _req$body3.data, user_address_id = _req$body3.user_address_id;
            _context6.next = 4;
            return (0, _db["default"])("user_address").select("user_id", "branch_id", "router_id").where({
              "id": user_address_id
            });
          case 4:
            user_query = _context6.sent;
            user = user_query[0];
            _context6.next = 8;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user.user_id,
              delivery_date: data.delivery_date,
              address_id: user_address_id,
              branch_id: user.branch_id,
              status: "new_order"
            });
          case 8:
            order = _context6.sent;
            order_id = order[0];
            sub_total = 0;
            i = 0;
          case 12:
            if (!(i < data.add_on.length)) {
              _context6.next = 22;
              break;
            }
            _context6.next = 15;
            return (0, _db["default"])("products").select("price").where({
              id: data.add_on[i].product_id
            });
          case 15:
            product_price = _context6.sent;
            _context6.next = 18;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user.user_id,
              product_id: data.add_on[i].product_id,
              quantity: data.add_on[i].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * data.add_on[i].qty
            });
          case 18:
            sub_total = sub_total + product_price[0].price * data.add_on[i].qty;
          case 19:
            i++;
            _context6.next = 12;
            break;
          case 22:
            _context6.next = 24;
            return (0, _db["default"])("add_on_orders").update({
              sub_total: sub_total
            }).where({
              id: order_id
            });
          case 24:
            return _context6.abrupt("return", res.status(200).json({
              status: true
            }));
          case 27:
            _context6.prev = 27;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.redirect("/home"));
          case 31:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 27]]);
  }));
  return function newAddOn(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.newAddOn = newAddOn;