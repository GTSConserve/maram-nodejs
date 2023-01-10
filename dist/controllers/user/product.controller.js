"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchProducts = exports.removeAddOnOrder = exports.nextDayProduct = exports.getSubscriptionProducts = exports.getSingleProduct = exports.getProducts = exports.getCategories = exports.getAddOnProducts = exports.addon_Order = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _helper = require("../../utils/helper.util");
var _message = require("../../notifications/message.sender");
var _axios = _interopRequireDefault(require("axios"));
var _moment = _interopRequireDefault(require("moment"));
var _product = require("../../models/user/product.model");
var _jwt = require("../../services/jwt.service");
var _db = _interopRequireDefault(require("../../services/db.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var removeAddOnOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, userId, product_id, delivery_date, remove;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, product_id = _req$body.product_id, delivery_date = _req$body.delivery_date;
            if (!(!product_id || !delivery_date)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context.next = 6;
            return (0, _product.remove_addonorders)(product_id, delivery_date, userId);
          case 6:
            remove = _context.sent;
            return _context.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              body: remove
            }));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function removeAddOnOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.removeAddOnOrder = removeAddOnOrder;
var getSingleProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var product_id, product, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            product_id = req.body.product_id;
            if (product_id) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context2.next = 6;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id as product_id", "products.name", "products.image", "products.unit_value", "unit_types.value as unit_type", "products.price", "products.demo_price").where({
              "products.id": product_id
            });
          case 6:
            product = _context2.sent;
            _context2.next = 9;
            return (0, _helper.GetProduct)(product);
          case 9:
            response = _context2.sent;
            if (!(product.length === 0)) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "Product Not Found"
            }));
          case 12:
            product[0].image = process.env.BASE_URL + product[0].image;
            return _context2.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: response.data[0]
            }));
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function getSingleProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getSingleProduct = getSingleProduct;
var getProducts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, category_id, product_type_id, token, userId, user, product;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, category_id = _req$body2.category_id, product_type_id = _req$body2.product_type_id;
            token = req.headers.authorization;
            if (!token) {
              _context3.next = 8;
              break;
            }
            _context3.next = 6;
            return (0, _jwt.parseJwtPayload)(token);
          case 6:
            user = _context3.sent;
            userId = user.user_id;
          case 8:
            if (!(!category_id || !product_type_id)) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 10:
            _context3.next = 12;
            return (0, _product.get_products)(category_id, product_type_id);
          case 12:
            product = _context3.sent;
            if (product.status) {
              _context3.next = 15;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: product.message
            }));
          case 15:
            return _context3.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              total_items: product.data.length,
              data: product.data
            }));
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(500).json({
              status: false
            });
          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function getProducts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getProducts = getProducts;
var getCategories = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var product_type_id, category, i;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            product_type_id = req.body.product_type_id;
            if (product_type_id) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Product Type Is Missing"
            }));
          case 4:
            _context4.next = 6;
            return (0, _product.get_categories)(product_type_id);
          case 6:
            category = _context4.sent;
            if (category.status) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              error: category.error
            }));
          case 9:
            if (!(category.body.length === 0)) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "No Category Found"
            }));
          case 11:
            for (i = 0; i < category.body.length; i++) {
              category.body[i].image = category.body[i].image ? process.env.BASE_URL + category.body[i].image : null;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: category.body
            }));
          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(500).json({
              status: false
            });
          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function getCategories(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getCategories = getCategories;
var getSubscriptionProducts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, products;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userId = req.body.userId;
            _context5.next = 4;
            return (0, _product.get_subscription_or_add_on_products)("1", userId);
          case 4:
            products = _context5.sent;
            if (products.status) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: products.message
            }));
          case 7:
            return _context5.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: products.data
            }));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.status(500).json({
              status: false
            });
          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getSubscriptionProducts(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getSubscriptionProducts = getSubscriptionProducts;
var getAddOnProducts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId, product;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            userId = req.body.userId;
            _context6.next = 4;
            return (0, _product.get_subscription_or_add_on_products)("2", userId);
          case 4:
            product = _context6.sent;
            if (product.status) {
              _context6.next = 7;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: product.message
            }));
          case 7:
            return _context6.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: product.data
            }));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            // console.log(error);
            res.status(500).json({
              status: false
            });
          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function getAddOnProducts(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getAddOnProducts = getAddOnProducts;
var searchProducts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body3, search_keyword, product_type_id, token, userId, user, product;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body3 = req.body, search_keyword = _req$body3.search_keyword, product_type_id = _req$body3.product_type_id;
            if (!(!product_type_id || !search_keyword)) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            token = req.headers.authorization;
            if (!token) {
              _context7.next = 10;
              break;
            }
            _context7.next = 8;
            return (0, _jwt.parseJwtPayload)(token);
          case 8:
            user = _context7.sent;
            userId = user.user_id;
          case 10:
            _context7.next = 12;
            return (0, _product.search_products)(product_type_id, search_keyword
            // userId
            );
          case 12:
            product = _context7.sent;
            if (product.status) {
              _context7.next = 15;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: product.message
            }));
          case 15:
            return _context7.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: product.data
            }));
          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.status(500).json({
              status: false
            });
          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function searchProducts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// export const getBill = async (req,res) => {
//   try{
//     const{product_id} = req.body;
//     const bill = await

//   }
// }
exports.searchProducts = searchProducts;
var addon_Order = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body4, userId, delivery_date, products, address_id, addon;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body4 = req.body, userId = _req$body4.userId, delivery_date = _req$body4.delivery_date, products = _req$body4.products, address_id = _req$body4.address_id;
            _context8.next = 4;
            return (0, _product.addon_order)(userId, delivery_date, products, address_id);
          case 4:
            addon = _context8.sent;
            return _context8.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "order added"
            }));
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            res.status(500).json({
              status: false,
              error: _context8.t0
            });
          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function addon_Order(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.addon_Order = addon_Order;
var nextDayProduct = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userId, static_response, date1, date2, tommorow_date, query, _query;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            userId = req.body.userId;
            _context9.next = 4;
            return (0, _product.nextday_product)(userId);
          case 4:
            static_response = _context9.sent;
            date1 = (0, _moment["default"])(static_response.product[0].date, "YYYY-MM-DD").format("YYYY-MM-DD");
            date2 = (0, _moment["default"])(static_response.product[0].date, "YYYY-MM-DD").format("YYYY-MM-DD");
            tommorow_date = (0, _moment["default"])(new Date(), "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");
            console.log(tommorow_date, date1, date2);
            if (!(tommorow_date === date1)) {
              _context9.next = 14;
              break;
            }
            query = [{
              "product_id": static_response.product[0].product_id,
              "product_name": static_response.product[0].product_name,
              "product_image": static_response.product[0].product_image,
              "product_status": static_response.product[0].product_status,
              "product_variation": static_response.product[0].value + static_response.product[0].unit_type,
              "Product price": static_response.product[0].price
            }]; // tommorow_date = moment().format("YYYY-MM-DD")
            return _context9.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: query,
              "date": (0, _moment["default"])(static_response.product[0].date, "YYYY-MM-DD").format("DD-MM-YYYY")
            }));
          case 14:
            if (!(tommorow_date === date2)) {
              _context9.next = 19;
              break;
            }
            _query = {
              "product_id": static_response.product[0].product_id,
              "product_name": static_response.product[0].product_name,
              "product_image": static_response.product[0].product_image,
              "product_status": static_response.product[0].product_status,
              "product_variation": static_response.product[0].value + static_response.product[0].unit_type,
              "Product price": static_response.product[0].price
            }; // tommorow_date = moment().format("YYYY-MM-DD")
            return _context9.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: _query,
              "date": static_response.date[0].date
            }));
          case 19:
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "No Product Available"
            }));
          case 20:
            _context9.next = 26;
            break;
          case 22:
            _context9.prev = 22;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.status(500).json({
              status: false
            });
          case 26:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 22]]);
  }));
  return function nextDayProduct(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.nextDayProduct = nextDayProduct;