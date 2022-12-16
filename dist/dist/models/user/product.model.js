"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search_products = exports.get_subscription_or_add_on_products = exports.get_products = exports.get_categories = exports.addon_order = exports.additional_product = void 0;
var _db = _interopRequireDefault(require("../../services/db.service"));
var _helper = require("../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.image", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              product_type_id: id
            });
          case 3:
            product = _context.sent;
            _context.next = 6;
            return (0, _helper.GetProduct)(product, userId);
          case 6:
            response = _context.sent;
            if (!response.status) {
              _context.next = 11;
              break;
            }
            return _context.abrupt("return", {
              status: true,
              data: response.data
            });
          case 11:
            return _context.abrupt("return", {
              status: false,
              message: response.message
            });
          case 12:
            _context.next = 18;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              status: false,
              error: _context.t0
            });
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function get_subscription_or_add_on_products(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.get_subscription_or_add_on_products = get_subscription_or_add_on_products;
var get_products = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(category_id, userId) {
    var product, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.image", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              category_id: category_id
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
  return function get_products(_x3, _x4) {
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
            return _db["default"].select("id as category_id", "name", "image", "product_type_id").from("categories").where({
              product_type_id: product_type_id
            });
          case 3:
            getcategories = _context3.sent;
            return _context3.abrupt("return", {
              status: true,
              body: getcategories
            });
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", {
              status: false,
              error: _context3.t0
            });
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function get_categories(_x5) {
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
            return _db["default"].raw("\n                      SELECT products.id,products.name,products.image,products.unit_value,\n                      unit_types.value as unit_type,products.price FROM products\n                      JOIN unit_types ON unit_types.id = products.unit_type_id\n                      WHERE products.product_type_id = ".concat(product_type_id, " \n                      AND  products.name  LIKE '%").concat(search_keyword, "%'"));
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
  return function search_products(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.search_products = search_products;
var additional_product = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id, subscribe_type_id, product_id, name, quantity, price, total_days) {
    var _added, _added2;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(subscribe_type_id == 1)) {
              _context5.next = 6;
              break;
            }
            _context5.next = 3;
            return (0, _db["default"])('orders').insert({
              user_id: user_id,
              subscribe_type_id: subscribe_type_id,
              product_id: product_id,
              name: name,
              quantity: quantity,
              total_days: 1
            });
          case 3:
            _added = _context5.sent;
            _context5.next = 9;
            break;
          case 6:
            _context5.next = 8;
            return (0, _db["default"])('orders').insert({
              user_id: user_id,
              subscribe_type_id: subscribe_type_id,
              product_id: product_id,
              name: name,
              quantity: quantity,
              total_days: 15
            });
          case 8:
            _added2 = _context5.sent;
          case 9:
            _context5.prev = 9;
            return _context5.abrupt("return", {
              status: true,
              body: added
            });
          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](9);
            return _context5.abrupt("return", {
              status: false,
              error: _context5.t0
            });
          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[9, 13]]);
  }));
  return function additional_product(_x9, _x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

// export const get_bill = async (product_id) => {
//   const bill_details = await knex.('bill_history').
// }
exports.additional_product = additional_product;
var addon_order = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user_id, delivery_date, products, address_id) {
    var query, order, order1, query1;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            //   let products_id = [];
            //   await products.map((id) => products_id.push(id.product_id));
            query = {
              user_id: user_id,
              delivery_date: delivery_date,
              address_id: address_id

              // sub_total:quantity*100
              // quantity:quantity
            };

            console.log(query);
            _context6.next = 5;
            return (0, _db["default"])('add_on_orders').insert(query);
          case 5:
            order = _context6.sent;
            _context6.next = 8;
            return _db["default"].select('id').from('add_on_orders').where({
              user_id: user_id
            });
          case 8:
            order1 = _context6.sent;
            console.log(order1);
            query1 = {
              add_on_order_id: order1.id
            }; // const query1 = await knex.select(['id']).from('add_on_orders');
            console.log(query1);

            // let new_products = []

            // for( let i=0;i<=products.length;i++){

            //     new_products.push({
            //       products:query1.id
            //     }) 

            // console.log(query)

            // const data2 = knex.select('price').from('products').where({id:product_id});
            // return data2
            // const table = await knex ('add_on_order_items')
            // .join('products', 'products.id', '=', 'add_on_orders.product_id')
            // .select('products.id', 'products.price')

            // let new_products = []

            // for( let i=0;i<=products.length;i++){

            //   new_products.push({

            //   }) 
            //   console.log(products)
            _context6.next = 18;
            break;
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              status: false,
              message: "Something Went Wrong",
              error: _context6.t0
            });
          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function addon_order(_x16, _x17, _x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();
exports.addon_order = addon_order;