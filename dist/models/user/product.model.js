"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search_products = exports.remove_addonorders = exports.get_subscription_or_add_on_products = exports.get_products = exports.get_categories = exports.addon_order = void 0;
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _db = _interopRequireDefault(require("../../services/db.service"));
var _helper = require("../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var get_subscription_or_add_on_products = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, userId) {
    var product, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id")
            // .join("subscribed_user_details", "subscribed_user_details.product_id","=", "products.id")
            .select("products.id", "products.name", "products.image", "products.unit_value", "unit_types.value as unit_type", "products.price"
            // "products.demo_price"
            // "subscribed_user_details.id as subscription_id"
            ).where({
              product_type_id: id
            });
          case 3:
            product = _context.sent;
            // .where({ "subscription_status":"subscribed",product_type_id: id })

            console.log(product);
            _context.next = 7;
            return (0, _helper.GetProduct)(product, userId);
          case 7:
            response = _context.sent;
            if (!response.status) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", {
              status: true,
              data: response.data
            });
          case 12:
            return _context.abrupt("return", {
              status: false,
              message: response.message
            });
          case 13:
            _context.next = 19;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              status: false,
              error: _context.t0
            });
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function get_subscription_or_add_on_products(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.get_subscription_or_add_on_products = get_subscription_or_add_on_products;
var get_products = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(category_id, product_type_id, userId) {
    var product, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id as product_id", "products.name", "products.image", "products.unit_value", "unit_types.value as unit_type", "products.price"
            // "products.demo_price"
            ).where({
              category_id: category_id,
              product_type_id: product_type_id
            });
          case 3:
            product = _context2.sent;
            _context2.next = 6;
            return (0, _helper.GetProduct)(product, userId);
          case 6:
            response = _context2.sent;
            if (!response.status) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", {
              status: true,
              data: response.data
            });
          case 11:
            return _context2.abrupt("return", {
              status: false,
              message: response.message
            });
          case 12:
            _context2.next = 18;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              status: false,
              error: _context2.t0
            });
          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function get_products(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
exports.get_products = get_products;
var get_categories = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(product_type_id) {
    var getcategories;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _db["default"].select("categories.id as category_id", "categories.name", "categories.image").from("categories_product_type as cat").join("categories", "categories.id", "=", "cat.category_id").where({
              "cat.product_type_id": product_type_id
            });
          case 3:
            getcategories = _context3.sent;
            console.log(getcategories);
            return _context3.abrupt("return", {
              status: true,
              body: getcategories
            });
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", {
              status: false,
              error: _context3.t0
            });
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function get_categories(_x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.get_categories = get_categories;
var search_products = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(product_type_id, search_keyword, userId) {
    var product, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _db["default"].raw("\n                      SELECT products.id,products.name,products.image,products.unit_value,products.demo_price,\n                      unit_types.value as unit_type,products.price FROM products\n                      JOIN unit_types ON unit_types.id = products.unit_type_id\n                      WHERE products.product_type_id = ".concat(product_type_id, " \n                      AND  products.name  LIKE '%").concat(search_keyword, "%'"));
          case 3:
            product = _context4.sent;
            _context4.next = 6;
            return (0, _helper.GetProduct)(product[0], userId);
          case 6:
            response = _context4.sent;
            if (!response.status) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", {
              status: true,
              data: response.data
            });
          case 11:
            return _context4.abrupt("return", {
              status: false,
              message: response.message
            });
          case 12:
            _context4.next = 18;
            break;
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              status: false,
              error: _context4.t0
            });
          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function search_products(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
exports.search_products = search_products;
var addon_order = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id, delivery_date, products, address_id) {
    var order, order_id, sub_total, i, product_price, check_user_is_branch, query;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user_id,
              delivery_date: delivery_date,
              address_id: address_id
            });
          case 3:
            order = _context5.sent;
            order_id = order[0];
            sub_total = 0;
            i = 0;
          case 7:
            if (!(i < products.length)) {
              _context5.next = 18;
              break;
            }
            _context5.next = 10;
            return (0, _db["default"])("products").select("price").where({
              id: products[i].product_id
            });
          case 10:
            product_price = _context5.sent;
            console.log(product_price);
            _context5.next = 14;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user_id,
              product_id: products[i].product_id,
              quantity: products[i].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * products[i].qty
            });
          case 14:
            sub_total = sub_total + product_price[0].price * products[i].qty;
          case 15:
            i++;
            _context5.next = 7;
            break;
          case 18:
            _context5.next = 20;
            return (0, _db["default"])("user_address").select("branch_id").where({
              id: address_id
            });
          case 20:
            check_user_is_branch = _context5.sent;
            console.log(check_user_is_branch);
            if (!(check_user_is_branch.length === 0)) {
              _context5.next = 24;
              break;
            }
            return _context5.abrupt("return", {
              status: false,
              message: "Invalid User Address"
            });
          case 24:
            query = {};
            if (check_user_is_branch[0].branch_id != null) {
              query.branch_id = check_user_is_branch[0].branch_id;
            }
            query.sub_total = sub_total;
            _context5.next = 29;
            return (0, _db["default"])("add_on_orders").update(query).where({
              id: order_id
            });
          case 29:
            return _context5.abrupt("return", {
              status: true,
              message: "SuccessFully Created"
            });
          case 32:
            _context5.prev = 32;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              status: false,
              message: "Something Went Wrong",
              error: _context5.t0
            });
          case 36:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 32]]);
  }));
  return function addon_order(_x10, _x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();
exports.addon_order = addon_order;
var remove_addonorders = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(product_id, delivery_date, addon_id) {
    var addon_status, select, select1, total, update, status;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            console.log(product_id);
            _context6.next = 4;
            return (0, _db["default"])('add_on_orders').select('status').where({
              id: addon_id,
              delivery_date: delivery_date
            });
          case 4:
            addon_status = _context6.sent;
            console.log(addon_status);
            if (!(addon_status[0] != "cancelled")) {
              _context6.next = 26;
              break;
            }
            _context6.next = 9;
            return (0, _db["default"])("add_on_order_items").update({
              status: "removed"
            }).where({
              product_id: product_id,
              add_on_order_id: addon_id
            });
          case 9:
            _context6.next = 11;
            return (0, _db["default"])('add_on_order_items').select("price").where({
              product_id: product_id,
              add_on_order_id: addon_id,
              status: "removed"
            });
          case 11:
            select = _context6.sent;
            _context6.next = 14;
            return (0, _db["default"])('add_on_orders').select("sub_total").where({
              id: addon_id,
              delivery_date: delivery_date
            });
          case 14:
            select1 = _context6.sent;
            total = select1[0].sub_total - select[0].price;
            console.log(total);
            _context6.next = 19;
            return (0, _db["default"])('add_on_orders').update({
              sub_total: total
            }).where({
              id: addon_id,
              delivery_date: delivery_date
            });
          case 19:
            update = _context6.sent;
            _context6.next = 22;
            return (0, _db["default"])('add_on_orders').update({
              status: "cancelled"
            }).where({
              sub_total: 0
            });
          case 22:
            status = _context6.sent;
            return _context6.abrupt("return", {
              status: true,
              message: "Successfully removed"
            });
          case 26:
            return _context6.abrupt("return", {
              status: false,
              message: "already cancelled"
            });
          case 27:
            _context6.next = 33;
            break;
          case 29:
            _context6.prev = 29;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              status: false,
              message: "Cannot Remove addon order"
            });
          case 33:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 29]]);
  }));
  return function remove_addonorders(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();
exports.remove_addonorders = remove_addonorders;