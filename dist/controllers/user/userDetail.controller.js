"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAddressChange = exports.updateUser = exports.getUser = exports.getSingleCalendarEvent = exports.getSingleBillList = exports.getOverallCalendarEvent = exports.getEmptyBottle = exports.getBillList = exports.getAddress = exports.editAddress = exports.deleteUseraddress = exports.checkDeliveryAddress = exports.changePlan = exports.addUserAddress = exports.RiderLocation = exports.RemoveOrder = exports.Edit = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _jwt = require("../../services/jwt.service");
var _validator = require("../../services/validator.service");
var _db = _interopRequireDefault(require("../../services/db.service"));
var _message = require("../../notifications/message.sender");
var _moment = _interopRequireDefault(require("moment"));
var _user_details = require("../../models/user/user_details.model");
var _messages = _interopRequireDefault(require("../../constants/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var addUserAddress = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var payload, userId;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            payload = (0, _validator.userAddressValidator)(req.body);
            userId = req.body.userId;
            if (!payload.status) {
              _context.next = 7;
              break;
            }
            _context.next = 6;
            return (0, _db["default"])("user_address").insert({
              user_id: userId,
              address: payload.address,
              landmark: payload.landmark,
              title: payload.title,
              type: payload.type,
              alternate_mobile: payload.alternate_mobile,
              latitude: payload.latitude,
              longitude: payload.longitude
            }).where({
              user_id: payload.user_id
            });
          case 6:
            return _context.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "address added successfully"
            }));
          case 7:
            _context.next = 13;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              error: _context.t0
            });
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function addUserAddress(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.addUserAddress = addUserAddress;
var getAddress = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var userId, address;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.body.userId;
            _context2.next = 4;
            return (0, _user_details.get_address)(userId);
          case 4:
            address = _context2.sent;
            res.status(200).json({
              status: true,
              data: address.body
            });
            _context2.next = 12;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).json({
              status: false
            });
          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getAddress(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getAddress = getAddress;
var editAddress = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, userId, address_id, title, address, landmark, type, alternate_mobile, _latitude, _longitude;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, userId = _req$body.userId, address_id = _req$body.address_id, title = _req$body.title, address = _req$body.address, landmark = _req$body.landmark, type = _req$body.type, alternate_mobile = _req$body.alternate_mobile, _latitude = _req$body.latitude, _longitude = _req$body.longitude;
            if (!(!_latitude && !_longitude)) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context3.next = 6;
            return (0, _user_details.edit_address)(userId, address_id, title, address, landmark, type, alternate_mobile, _latitude, _longitude);
          case 6:
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "updated successfully"
            });
            _context3.next = 13;
            break;
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context3.t0
            });
          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function editAddress(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.editAddress = editAddress;
var getUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, user, daily, bill, sub, rider, get_user_detail, status, address, subscription, additional, subscription1, addon;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("hi");
            _context4.prev = 1;
            userId = req.body.userId;
            _context4.next = 5;
            return (0, _user_details.get_user)(userId);
          case 5:
            user = _context4.sent;
            console.log(user);
            if (!(user.body.length === 0)) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "User Not Found"
            }));
          case 9:
            _context4.next = 11;
            return (0, _db["default"])('daily_orders').select('user_id').where({
              user_id: userId
            });
          case 11:
            daily = _context4.sent;
            _context4.next = 14;
            return (0, _db["default"])("bill_history_details").select("bill_history_details.subscription_price", "bill_history_details.additional_price", "bill_history_details.total_price", "bill_history_details.additional_qty", "bill_history_details.total_qty", "bill_history_details.subscription_qty").join("bill_history", "bill_history.id", "=", "bill_history_details.bill_history_id").where({
              "bill_history.user_id": userId
            });
          case 14:
            bill = _context4.sent;
            _context4.next = 17;
            return _db["default"].select("subscribed_user_details.subscription_delivered_quantity", "subscribed_user_details.additional_delivered_quantity", "subscribed_user_details.total_delivered_quantity"
            // "subscribed_user_details.subscription_delivered_quantity",
            ).from("subscribed_user_details").where({
              user_id: userId
            });
          case 17:
            sub = _context4.sent;
            _context4.next = 20;
            return (0, _db["default"])('daily_orders').join("routes", "routes.id", "=", "daily_orders.router_id").join("rider_details", "rider_details.id", "=", "routes.rider_id").select("rider_details.id", "rider_details.name", "rider_details.tour_status as status").where({
              'daily_orders.user_id': userId
            });
          case 20:
            rider = _context4.sent;
            console.log(rider);
            get_user_detail = {};
            if (rider.length != 0) {
              if (rider[0].status == 0) {
                status = "rider is assigned";
              } else if (rider[0].status == 1) {
                status = "rider can start the tour and delivered soon";
              } else if (rider[0].status == 2) {
                status = "rider can end the tour";
              } else {
                status = "no rider can assigned";
              }
            } else {
              status = "no rider can assigned";
            }
            _context4.next = 26;
            return (0, _db["default"])('user_address').select('id').where({
              user_id: userId
            });
          case 26:
            address = _context4.sent;
            _context4.next = 29;
            return (0, _db["default"])('subscribed_user_details').select('id').where({
              user_id: userId
            });
          case 29:
            subscription = _context4.sent;
            _context4.next = 32;
            return (0, _db["default"])('additional_orders').select('id').where({
              user_id: userId,
              status: "delivered"
            });
          case 32:
            additional = _context4.sent;
            _context4.next = 35;
            return (0, _db["default"])('subscribed_user_details').select('product_id').where({
              user_id: userId,
              rider_status: "delivered"
            });
          case 35:
            subscription1 = _context4.sent;
            _context4.next = 38;
            return (0, _db["default"])('add_on_order_items').select('product_id').where({
              user_id: userId,
              status: "delivered"
            });
          case 38:
            addon = _context4.sent;
            user.body.map(function (data) {
              get_user_detail.user_id = data.id;
              get_user_detail.name = data.name;
              get_user_detail.image = data.image ? process.env.BASE_URL + data.image : null;
              get_user_detail.mobile_number = data.mobile_number;
              get_user_detail.email = data.email;
              get_user_detail.rider_name = rider.length != 0 ? rider[0].name : "no rider";
              get_user_detail.rider_status = status;
              get_user_detail.total_bill_due_Amount = bill.length != 0 ? "Bill due amount" + ' ' + bill[0].total_price.toString() : "0";
              get_user_detail.total_bill_count = bill.length.toString() + ' ' + "bills";
              get_user_detail.total_address_count = address.length.toString() + ' ' + "address count";
              get_user_detail.total_subcription_count = subscription.length.toString() + ' ' + "subcription";
              get_user_detail.total_delivered_product_count = subscription1.length + additional.length + addon.length.toString() + ' ' + "Product Delivery" && "0";
            });
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: get_user_detail
            });
            _context4.next = 47;
            break;
          case 43:
            _context4.prev = 43;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "no user"
            });
          case 47:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 43]]);
  }));
  return function getUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getUser = getUser;
var updateUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user, _req$body2, name, email, query, image;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _jwt.parseJwtPayload)(req.headers.authorization);
          case 3:
            user = _context5.sent;
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email;
            if (!(!name || !email)) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 7:
            query = {};
            if (req.file) {
              query.image = req.file.destination.slice(1) + "/" + req.file.filename;
            }
            query.name = name;
            query.email = email;
            console.log(query);
            _context5.next = 14;
            return (0, _db["default"])("users").update(query).where({
              id: user.user_id
            });
          case 14:
            return _context5.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "User Profile Updated"
            }));
          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _context5.t0
            }));
          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 17]]);
  }));
  return function updateUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateUser = updateUser;
var deleteUseraddress = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, userId, address_id, addresses;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, userId = _req$body3.userId, address_id = _req$body3.address_id;
            if (address_id) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context6.next = 6;
            return (0, _user_details.delete_user_address)(address_id, userId);
          case 6:
            addresses = _context6.sent;
            // await sendNotification({
            //   include_external_user_ids: [userId],
            //   contents: { en: `Addon Products Created notificaiton` },
            //   headings: { en: "Addon Products Notification" },
            //   name: "Addon Products",
            //   data: {
            //     status: "new_order",
            //     type: 2,
            //     // appointment_id: user._id,
            //     // appointment_chat_id: user_chat._id
            //   },
            // });

            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "delete successfully"
            });
            _context6.next = 14;
            break;
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context6.t0
            });
          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function deleteUseraddress(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteUseraddress = deleteUseraddress;
var RemoveOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var user_id, remove;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            user_id = req.body.user_id;
            _context7.next = 4;
            return (0, _user_details.remove_order)(user_id);
          case 4:
            remove = _context7.sent;
            // await sendNotification({
            //   include_external_user_ids: [userId],
            //   contents: { en: `Addon Products Created notificaiton` },
            //   headings: { en: "Addon Products Notification" },
            //   name: "Addon Products",
            //   data: {
            //     status: "new_order",
            //     type: 2,
            //     // appointment_id: user._id,
            //     // appointment_chat_id: user_chat._id
            //   },
            // });

            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "remove successfully"
            });
            _context7.next = 12;
            break;
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context7.t0
            });
          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function RemoveOrder(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.RemoveOrder = RemoveOrder;
var Edit = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body4, id, user_id, value, edit_order;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body4 = req.body, id = _req$body4.id, user_id = _req$body4.user_id, value = _req$body4.value;
            _context8.next = 4;
            return (0, _user_details.edit)(id, user_id, value);
          case 4:
            edit_order = _context8.sent;
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "edit successfully"
            });
            _context8.next = 12;
            break;
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
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
  return function Edit(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.Edit = Edit;
var changePlan = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, user_id, product_id, subscribe_type_id, changeplan_name, start_date, plan;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body5 = req.body, user_id = _req$body5.user_id, product_id = _req$body5.product_id, subscribe_type_id = _req$body5.subscribe_type_id, changeplan_name = _req$body5.changeplan_name, start_date = _req$body5.start_date;
            if (!(!user_id && product_id && subscribe_type_id && changeplan_name && start_date)) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory Fields are missing"
            }));
          case 4:
            _context9.next = 6;
            return (0, _user_details.change_plan)(changeplan_name, start_date, subscribe_type_id);
          case 6:
            plan = _context9.sent;
            // await sendNotification({
            //   include_external_user_ids: [userId],
            //   contents: { en: `Addon Products Created notificaiton` },
            //   headings: { en: "Addon Products Notification" },
            //   name: "Addon Products",
            //   data: {
            //     status: "new_order",
            //     type: 2,
            //     // appointment_id: user._id,
            //     // appointment_chat_id: user_chat._id
            //   },
            // });

            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "updated successfully"
            });
            _context9.next = 14;
            break;
          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context9.t0
            });
          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function changePlan(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.changePlan = changePlan;
var checkDeliveryAddress = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var address_id, check_address;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            address_id = req.body.address_id; // let maram_latitude = '10.369384601477861'
            // let maram_longitude = '78.81283443421125'
            _context10.next = 4;
            return (0, _user_details.checkAddress)(address_id);
          case 4:
            check_address = _context10.sent;
            console.log(check_address.body[0].latitude);
            if (!(check_address.body[0].latitude <= 15.9165 || check_address.body[0].longitude <= 80.1325)) {
              _context10.next = 10;
              break;
            }
            return _context10.abrupt("return", res.status(200).json({
              status: true,
              message: "successfully delivery"
            }));
          case 10:
            if (!(!latitude <= 15.9165 && !longitude <= 80.1325)) {
              _context10.next = 12;
              break;
            }
            return _context10.abrupt("return", res.status(200).json({
              status: true,
              message: "out of locations"
            }));
          case 12:
            _context10.next = 18;
            break;
          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context10.t0
            });
          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 14]]);
  }));
  return function checkDeliveryAddress(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.checkDeliveryAddress = checkDeliveryAddress;
var getEmptyBottle = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var userId, this_month_item_detail, empty_bottle_in_hand, empty_bottle_in_return;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            userId = req.body.userId;
            if (!userId) {
              _context11.next = 11;
              break;
            }
            _context11.next = 5;
            return (0, _db["default"])("users").select("one_liter_in_hand as delivered_orders", "half_liter_in_hand as additional_delivered_orders", "one_liter_in_return as remaining_orders", "one_liter_in_return as additional_remaining_orders");
          case 5:
            this_month_item_detail = _context11.sent;
            empty_bottle_in_hand = {
              one_liter: this_month_item_detail[0].delivered_orders,
              half_liter: this_month_item_detail[0].additional_delivered_orders
            };
            empty_bottle_in_return = {
              one_liter: this_month_item_detail[0].remaining_orders,
              half_liter: this_month_item_detail[0].additional_remaining_orders
            };
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              empty_bottle_in_hand: empty_bottle_in_hand,
              empty_bottle_in_return: empty_bottle_in_return
            });
            _context11.next = 12;
            break;
          case 11:
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "Bottle Not Found"
            }));
          case 12:
            _context11.next = 18;
            break;
          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "no user"
            });
          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function getEmptyBottle(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getEmptyBottle = getEmptyBottle;
var userAddressChange = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body6, userId, title, address, landmark, type, address_id;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            try {
              _req$body6 = req.body, userId = _req$body6.userId, title = _req$body6.title, address = _req$body6.address, landmark = _req$body6.landmark, type = _req$body6.type, address_id = _req$body6.address_id; // await edit_address(userId, address_id, title, address, landmark, type);
              res.status(_responseCode["default"].SUCCESS).json({
                status: true,
                message: "updated successfully"
              });
            } catch (error) {
              console.log(error);
              res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
                status: false,
                error: error
              });
            }
          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function userAddressChange(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

// export const getSingleCalendar = async (req, res) => {
//   try {
//     const { date } = req.body;

//     const single_calendar_data =
//     {
//       "subscription_products": [
//         {
//           "subscription_id": 1,
//           "product_name": "Farm Fresh Natural Milk",
//           "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
//           "product_variation": 1,
//           "product_price": 130,
//           "product_quantity": 2,
//           "subcription_status": "1",
//           "subcription_mode": "Daily Order",
//         },
//       ],
//       "addons_products": [
//         {
//           "product_id": 1,
//           "product_name": "Farm Fresh Natural Milk",
//           "product_image": "https://i.pinimg.com/originals/e1/e3/e6/e1e3e608910263114b0f03560bdcd966.jpg",
//           "product_variation": "1 liter",
//           "product_price": 130,
//           "product_quantity": 2,
//           "remove_status": 0
//         },
//       ],

//     }

//     // await edit_address(userId, address_id, title, address, landmark, type);

//     res
//       .status(responseCode.SUCCESS)
//       .json({ status: true, data: single_calendar_data });
//   } catch (error) {
//     console.log(error);

//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
//   }
// };

// export const getOverallCalendar = async (req, res) => {
//   try {
//     const { date } = req.body;

//     const overall_calendar_data = 
//       {
//         "date": date,
//         "products": {
//           "subscription": {
//             "1-liter": 1,
//             "0.5-liter": 0,
//             "packed-milk": 0
//           },
//           "addons-products": 0,
//           "is_delivered": 0
//         }
//       }

//     // await edit_address(userId, address_id, title, address, landmark, type);

//     res
//       .status(responseCode.SUCCESS)
//       .json({ status: true, data: overall_calendar_data });
//   } catch (error) {
//     console.log(error);

//     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error });
//   }
// };
exports.userAddressChange = userAddressChange;
var getSingleCalendarEvent = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body7, date, userId, sub, i, j, response;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _req$body7 = req.body, date = _req$body7.date, userId = _req$body7.userId;
            if (date) {
              _context13.next = 4;
              break;
            }
            return _context13.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context13.next = 6;
            return (0, _user_details.single_calendar_data)(date, userId);
          case 6:
            sub = _context13.sent;
            if (sub.status) {
              _context13.next = 9;
              break;
            }
            return _context13.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: sub.message
            }));
          case 9:
            i = 0;
          case 10:
            if (!(i < sub.data.length)) {
              _context13.next = 20;
              break;
            }
            sub.data[i].product_image = process.env.BASE_URL + sub.data[i].image;
            sub.data[i].quantity = sub.data[i].quantity;
            sub.data[i].price = sub.data[i].price;
            for (j = 0; j < sub.add_product.length; j++) {
              sub.add_product[0][j].id = sub.add_product[0][j].id;
              sub.add_product[0][j].image = sub.add_product[0][j].image;
              if (sub.data[i].product_variation_type >= 500) {
                sub.data[i].product_variation_type = sub.data[i].product_variation_type / 1000 + " " + (sub.data[i].product_variation_type === "ml" ? "litre" : sub.data[i].unit_type);
              }
              delete sub.data[i].unit_value;
              delete sub.data[i].unit_type;
            }
            response = {
              addons_products: sub.add_product[0]
            };
            return _context13.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: _objectSpread(_objectSpread({}, sub.data[0]), response)
            }));
          case 17:
            i++;
            _context13.next = 10;
            break;
          case 20:
            _context13.next = 26;
            break;
          case 22:
            _context13.prev = 22;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            return _context13.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: _messages["default"].DATA_NOT_FOUND
            }));
          case 26:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 22]]);
  }));
  return function getSingleCalendarEvent(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getSingleCalendarEvent = getSingleCalendarEvent;
var getOverallCalendarEvent = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$body8, date, userId, products, diary, status, add_on, add, delivered, data;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body8 = req.body, date = _req$body8.date, userId = _req$body8.userId;
            if (date) {
              _context14.next = 4;
              break;
            }
            return _context14.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            _context14.next = 6;
            return (0, _db["default"])("subscribed_user_details AS sub").select("sub.date").where({
              "sub.date": date
            });
          case 6:
            products = _context14.sent;
            if (!(products.length == 0)) {
              _context14.next = 9;
              break;
            }
            return _context14.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Please check date"
            }));
          case 9:
            _context14.next = 11;
            return (0, _db["default"])('users').select('today_one_liter', 'today_half_liter').where({
              id: userId
            });
          case 11:
            diary = _context14.sent;
            console.log(diary[0].today_one_liter);
            if (diary[0].today_one_liter === 0 || null) {
              status = 0;
            }
            if (diary[0].today_half_liter === 0 || null) {
              status = 0;
            } else {
              status = 1;
            }
            _context14.next = 17;
            return (0, _db["default"])('add_on_orders').select('id', 'status').where({
              user_id: userId
            });
          case 17:
            add_on = _context14.sent;
            if (add_on[0].id === 0 || null) {
              add = 0;
            } else {
              add = 1;
            }
            if (add_on[0].status == "delivered") {
              delivered = 1;
            } else {
              delivered = 0;
            }
            data = {
              "date": (0, _moment["default"])().format("DD-MM-YYYY"),
              "products": {
                "subscription": {
                  "1-liter": status,
                  "0.5-liter": status,
                  "packed-milk": 0
                },
                "addons-products": add,
                "is_delivered": delivered
              }
            };
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: data
            });
            _context14.next = 28;
            break;
          case 24:
            _context14.prev = 24;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              error: _context14.t0
            });
          case 28:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 24]]);
  }));
  return function getOverallCalendarEvent(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.getOverallCalendarEvent = getOverallCalendarEvent;
var getBillList = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            userId = req.body.userId;
            _context15.next = 4;
            return (0, _user_details.get_user_bill)(userId);
          case 4:
            user = _context15.sent;
            if (!(user.body.length === 0)) {
              _context15.next = 7;
              break;
            }
            return _context15.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "User Not Found"
            }));
          case 7:
            // let get_bill = {};
            // user.body.map((data) => {
            //   get_bill.id = data.id;
            //   get_bill.user_id = data.user_id;
            //   get_bill.payment_id = data.id // payment id set to id
            //   // ? process.env.BASE_URL + data.image
            //   // : null;
            //   get_bill.items = data.items;
            //   get_bill.bill_no = data.bill_no
            //   get_bill.bill_value = data.bill_value;
            //   get_bill.status = data.status;
            // });

            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: user.body
            });
            _context15.next = 14;
            break;
          case 10:
            _context15.prev = 10;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "no user"
            });
          case 14:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function getBillList(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getBillList = getBillList;
var getSingleBillList = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var bill_id, list, i;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            bill_id = req.body.bill_id;
            if (bill_id) {
              _context16.next = 4;
              break;
            }
            return _context16.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "Cannot find bill list"
            }));
          case 4:
            _context16.next = 6;
            return (0, _user_details.get_single_bill)(bill_id);
          case 6:
            list = _context16.sent;
            if (list) {
              _context16.next = 9;
              break;
            }
            return _context16.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "Cannot find bill list"
            }));
          case 9:
            for (i = 0; i < list.data.length; i++) {
              console.log(list);
              list.data[i].id = list.data[i].id;
              list.data[i].bill_value = list.data[i].bill_value;
              list.data[i].date = (0, _moment["default"])().format("DD-MM-YYYY");
            }
            return _context16.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: list
            }));
          case 13:
            _context16.prev = 13;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0);
            res.status(500).json({
              status: false
            });
          case 17:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 13]]);
  }));
  return function getSingleBillList(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

// rider location 
exports.getSingleBillList = getSingleBillList;
var RiderLocation = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var userId, rider1, data, user, branch, rider;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            userId = req.body.userId;
            _context17.next = 4;
            return (0, _user_details.rider_location)(userId);
          case 4:
            rider1 = _context17.sent;
            data = [];
            user = {
              'id': rider1.location[0].user_id,
              'name': rider1.location[0].user_name,
              'address': rider1.location[0].user_address,
              'latitude': rider1.location[0].user_latitude,
              'longitude': rider1.location[0].user_longitude
            };
            branch = {
              'id': rider1.location[0].admin_id,
              'name': rider1.location[0].admin_name,
              'address': rider1.location[0].admin_address,
              'latitude': rider1.location[0].admin_latitude,
              'longitude': rider1.location[0].admin_longitude
            };
            rider = {
              'id': rider1.location[0].rider_id,
              'name': rider1.location[0].rider_name,
              'latitude': rider1.location[0].rider_latitude,
              'longitude': rider1.location[0].rider_longitude
            };
            return _context17.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: {
                user: user,
                branch: branch,
                rider: rider
              }
            }));
          case 12:
            _context17.prev = 12;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);
            res.status(500).json({
              status: false,
              message: "no order placed today SORRY!!!!!"
            });
          case 16:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 12]]);
  }));
  return function RiderLocation(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
exports.RiderLocation = RiderLocation;