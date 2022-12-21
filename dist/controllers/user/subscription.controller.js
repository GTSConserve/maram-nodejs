"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleSubscription = exports.removeAdditionalOrder = exports.pauseSubscription = exports.newSubscription = exports.getSubscriptionPlan = exports.getSubcription_order = exports.getAllSubscription = exports.editAdditionalOrder = exports.createAdditionalOrder = exports.changeSubscriptionplan = exports.changeQuantity = exports.Remove_Subscription = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _moment = _interopRequireDefault(require("moment"));
var _subscription = require("../../models/user/subscription.model");
var _db = _interopRequireDefault(require("../../services/db.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var removeAdditionalOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, userId, subscription_id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, userId = _req$body.userId, subscription_id = _req$body.subscription_id;
            if (subscription_id) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context.next = 6;
            return (0, _db["default"])("additional_orders").where({
              subscription_id: subscription_id,
              status: "pending",
              user_id: userId
            }).del();
          case 6:
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "SuccessFully Removed"
            });
            _context.next = 13;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function removeAdditionalOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.removeAdditionalOrder = removeAdditionalOrder;
var editAdditionalOrder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, userId, subscription_id, dates, qty;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, userId = _req$body2.userId, subscription_id = _req$body2.subscription_id, dates = _req$body2.dates, qty = _req$body2.qty;
            if (!(!subscription_id || dates.length === 0 || !qty)) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context3.next = 6;
            return (0, _db["default"])("additional_orders").where({
              subscription_id: subscription_id,
              status: "pending",
              user_id: userId
            }).del();
          case 6:
            dates.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _db["default"])("additional_orders").insert({
                          user_id: userId,
                          subscription_id: subscription_id,
                          quantity: qty,
                          date: data
                        });
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "SuccessFully Updated"
            });
            _context3.next = 14;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            });
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function editAdditionalOrder(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.editAdditionalOrder = editAdditionalOrder;
var createAdditionalOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, userId, subscription_id, qty, dates;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, subscription_id = _req$body3.subscription_id, qty = _req$body3.qty, dates = _req$body3.dates;
            if (!(dates.length === 0 || !subscription_id || !qty)) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            dates.map( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return (0, _db["default"])("additional_orders").insert({
                          user_id: userId,
                          subscription_id: subscription_id,
                          quantity: qty,
                          date: data
                        });
                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return function (_x8) {
                return _ref5.apply(this, arguments);
              };
            }());
            return _context5.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "Additional Order Added SuccessFully"
            }));
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            });
          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function createAdditionalOrder(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createAdditionalOrder = createAdditionalOrder;
var getSubscriptionPlan = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var types;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _db["default"])("subscription_type").select("id", "name").where({
              status: "1"
            });
          case 3:
            types = _context6.sent;
            if (!(types.length === 0)) {
              _context6.next = 6;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "Type Not Found"
            }));
          case 6:
            return _context6.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: types
            }));
          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            });
          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function getSubscriptionPlan(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getSubscriptionPlan = getSubscriptionPlan;
var newSubscription = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, userId, subscription_plan_id, product_id, user_address_id, start_date, qty, customized_days, subscription;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body4 = req.body, userId = _req$body4.userId, subscription_plan_id = _req$body4.subscription_plan_id, product_id = _req$body4.product_id, user_address_id = _req$body4.user_address_id, start_date = _req$body4.start_date, qty = _req$body4.qty, customized_days = _req$body4.customized_days;
            if (!(!subscription_plan_id || !product_id || !user_address_id || !start_date || !qty)) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            if (!(subscription_plan_id == 3)) {
              _context7.next = 7;
              break;
            }
            if (!(!customized_days || customized_days.length === 0)) {
              _context7.next = 7;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 7:
            _context7.next = 9;
            return (0, _subscription.new_subscription)(userId, subscription_plan_id, product_id, user_address_id, start_date, qty, customized_days);
          case 9:
            subscription = _context7.sent;
            if (!subscription.status) {
              _context7.next = 14;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "Subscription Starts Successfully"
            }));
          case 14:
            return _context7.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: false,
              message: subscription.message
            }));
          case 15:
            _context7.next = 21;
            break;
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function newSubscription(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
exports.newSubscription = newSubscription;
var getAllSubscription = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, subscription_product, i;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userId = req.body.userId;
            _context8.next = 4;
            return (0, _subscription.get_subscription_product)(userId);
          case 4:
            subscription_product = _context8.sent;
            if (subscription_product.status) {
              _context8.next = 7;
              break;
            }
            return _context8.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: subscription_product.message
            }));
          case 7:
            for (i = 0; i < subscription_product.data.length; i++) {
              subscription_product.data[i].image = process.env.BASE_URL + subscription_product.data[i].image;
              if (subscription_product.data[i].unit_value >= 500) {
                subscription_product.data[i].unit = subscription_product.data[i].unit_value / 1000 + " " + (subscription_product.data[i].unit_type === "ml" ? "litre" : subscription_product.data[i].unit_type);
              } else {
                subscription_product.data[i].unit = subscription_product.data[i].unit_value + " " + subscription_product.data[i].unit_type.toString();
              }
              delete subscription_product.data[i].unit_value;
              delete subscription_product.data[i].unit_type;
            }
            return _context8.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: subscription_product.data
            }));
          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function getAllSubscription(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getAllSubscription = getAllSubscription;
var singleSubscription = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, userId, subscription_id, sub, i, bottle_tracker, response;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body5 = req.body, userId = _req$body5.userId, subscription_id = _req$body5.subscription_id;
            if (subscription_id) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context9.next = 6;
            return (0, _subscription.single_subscription)(userId, subscription_id);
          case 6:
            sub = _context9.sent;
            if (sub.status) {
              _context9.next = 9;
              break;
            }
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: sub.message
            }));
          case 9:
            for (i = 0; i < sub.data.length; i++) {
              sub.data[i].image = process.env.BASE_URL + sub.data[i].image;
              sub.data[i].subscription_start_date = (0, _moment["default"])(sub.data[i].subscription_start_date).format("MMM Do YYYY");
              if (sub.data[i].unit_value >= 500) {
                sub.data[i].unit = sub.data[i].unit_value / 1000 + " " + (sub.data[i].unit_type === "ml" ? "litre" : sub.data[i].unit_type);
              } else {
                sub.data[i].unit = sub.data[i].unit_value + " " + sub.data[i].unit_type.toString();
              }
              delete sub.data[i].unit_value;
              delete sub.data[i].unit_type;
            }

            // const query = [{data: sub.data[0],additional_orders: sub.additional_orders[0]}]
            bottle_tracker = {
              "delivered_orders": 25,
              "remaining_orders": 5,
              "additional_delivered_orders": 5,
              "additional_remaining_orders": 25
            };
            response = {
              additional_orders: [sub.query[0]],
              this_month_item_detail: bottle_tracker
            };
            return _context9.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: _objectSpread(_objectSpread({}, sub.data[0]), response)
            }));
          case 15:
            _context9.prev = 15;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 15]]);
  }));
  return function singleSubscription(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
exports.singleSubscription = singleSubscription;
var getSubcription_order = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body6, user_id, type_id, name, product_id, value, subscription_order;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body6 = req.body, user_id = _req$body6.user_id, type_id = _req$body6.type_id, name = _req$body6.name, product_id = _req$body6.product_id, value = _req$body6.value;
            _context10.next = 4;
            return (0, _subscription.get_subcription_order)(user_id, type_id, name, product_id, value);
          case 4:
            subscription_order = _context10.sent;
            if (user_id) {
              _context10.next = 7;
              break;
            }
            return _context10.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "user id is missing"
            }));
          case 7:
            if (type_id) {
              _context10.next = 9;
              break;
            }
            return _context10.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "type id is missing"
            }));
          case 9:
            return _context10.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "order confirmed"
            }));
          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 12]]);
  }));
  return function getSubcription_order(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();
exports.getSubcription_order = getSubcription_order;
var Remove_Subscription = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body7, user_id, subscription_id, unsubscription;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$body7 = req.body, user_id = _req$body7.user_id, subscription_id = _req$body7.subscription_id;
            if (!(!user_id || !subscription_id)) {
              _context11.next = 4;
              break;
            }
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context11.next = 6;
            return (0, _subscription.remove_subscription)(user_id, subscription_id);
          case 6:
            unsubscription = _context11.sent;
            if (!unsubscription.status) {
              _context11.next = 11;
              break;
            }
            return _context11.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(unsubscription));
          case 11:
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json(unsubscription));
          case 12:
            _context11.next = 18;
            break;
          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function Remove_Subscription(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();

// change  subscription quantity 
exports.Remove_Subscription = Remove_Subscription;
var changeQuantity = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body8, userId, subscription_id, quantity, quantity1;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _req$body8 = req.body, userId = _req$body8.userId, subscription_id = _req$body8.subscription_id, quantity = _req$body8.quantity;
            if (!(!userId || !subscription_id || !quantity)) {
              _context12.next = 4;
              break;
            }
            return _context12.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context12.next = 6;
            return (0, _subscription.change_quantity)(userId, subscription_id, quantity);
          case 6:
            quantity1 = _context12.sent;
            if (!quantity.status) {
              _context12.next = 11;
              break;
            }
            return _context12.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(quantity1));
          case 11:
            return _context12.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json(quantity1));
          case 12:
            _context12.next = 18;
            break;
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 18:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 14]]);
  }));
  return function changeQuantity(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();

//  change subscription plan
exports.changeQuantity = changeQuantity;
var changeSubscriptionplan = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body9, userId, subscription_id, subscription_plan_id, start_date, customized_days, changeplan;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _req$body9 = req.body, userId = _req$body9.userId, subscription_id = _req$body9.subscription_id, subscription_plan_id = _req$body9.subscription_plan_id, start_date = _req$body9.start_date, customized_days = _req$body9.customized_days;
            if (!(!userId || !subscription_id || !subscription_plan_id || start_date)) {
              _context13.next = 4;
              break;
            }
            return _context13.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context13.next = 6;
            return (0, _subscription.change_subscriptionplan)(userId, subscription_id, subscription_plan_id, start_date, customized_days);
          case 6:
            changeplan = _context13.sent;
            return _context13.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(changeplan));
          case 10:
            _context13.prev = 10;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            return _context13.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 10]]);
  }));
  return function changeSubscriptionplan(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

// pause subscription dates
exports.changeSubscriptionplan = changeSubscriptionplan;
var pauseSubscription = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$body10, userId, subscription_id, pausedates, dates;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body10 = req.body, userId = _req$body10.userId, subscription_id = _req$body10.subscription_id, pausedates = _req$body10.pausedates;
            if (!(!userId || !subscription_id || !pausedates)) {
              _context14.next = 4;
              break;
            }
            return _context14.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context14.next = 6;
            return (0, _subscription.pause_subscriptiondate)(userId, subscription_id, pausedates);
          case 6:
            dates = _context14.sent;
            _context14.next = 13;
            break;
          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            return _context14.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 9]]);
  }));
  return function pauseSubscription(_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}();
exports.pauseSubscription = pauseSubscription;