"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updeteRiderLocation = exports.updateStartTour = exports.updateRiderstatus = exports.updateEndtour = exports.ten = exports.riderDashboard = exports.orderStatusUpdate = exports.login = exports.getSingleorder = exports.getRiderdetails = exports.getAppControls = exports.cancelOrder = exports.OrderList = void 0;
var _express = _interopRequireDefault(require("express"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _rider = require("../../models/rider/rider.model");
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _db = _interopRequireDefault(require("../../services/db.service"));
var _validator = require("../../services/validator.service");
var _index = _interopRequireDefault(require("date-fns/locale/id/index"));
var _jwt = require("../../services/jwt.service");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//  rider app controls
var getAppControls = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var settings, appSettingData, _iterator, _step, settingData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _rider.get_Appcontrol)();
          case 3:
            settings = _context.sent;
            appSettingData = {};
            _iterator = _createForOfIteratorHelper(settings.body);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                settingData = _step.value;
                appSettingData[settingData.key] = settingData.value;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            res.status(200).json({
              status: true,
              data: appSettingData,
              message: "ok"
            });

            // res.status(200).json({ status: true,data: settings.body }) 
            _context.next = 14;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              status: false,
              error: _context.t0
            });
          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getAppControls(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// rider login 
exports.getAppControls = getAppControls;
var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var payload, user_name, password, checkPassword1, isPassword, query;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            payload = (0, _validator.userValidator)(req.body);
            user_name = payload.user_name, password = payload.password;
            if (!payload.status) {
              _context2.next = 14;
              break;
            }
            _context2.next = 6;
            return _db["default"].select("id", "password").from("rider_details").where({
              user_name: user_name,
              status: "1"
            });
          case 6:
            checkPassword1 = _context2.sent;
            console.log(checkPassword1[0].password);
            _context2.next = 10;
            return _bcrypt["default"].compare(password, checkPassword1[0].password);
          case 10:
            isPassword = _context2.sent;
            console.log(isPassword);
            console.log(checkPassword1);
            if (isPassword) {
              res.status(_responseCode["default"].SUCCESS).json({
                status: true,
                delivery_partner_id: checkPassword1[0].id,
                message: "Rider Login Successfully"
              });
            } else {
              res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
                status: false,
                message: "password mismatch"
              });
            }
          case 14:
            _context2.next = 20;
            break;
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.error('Whooops! This broke with error: ', _context2.t0);
            res.status(500).json({
              message: "user_id and password not matching"
            });
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//  get single rider details
exports.login = login;
var getRiderdetails = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var delivery_partner_id, delivery_partner;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            delivery_partner_id = req.body.delivery_partner_id;
            if (delivery_partner_id) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "delivery_partner_id Is Missing"
            }));
          case 4:
            _context3.next = 6;
            return (0, _rider.get_riderdetails)(delivery_partner_id);
          case 6:
            delivery_partner = _context3.sent;
            return _context3.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              data: delivery_partner.body[0],
              status: true,
              message: "ok"
            }));
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(500).json({
              status: false
            });
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function getRiderdetails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// update single rider status
exports.getRiderdetails = getRiderdetails;
var updateRiderstatus = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, delivery_partner_id, status, riderstatus;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, delivery_partner_id = _req$body.delivery_partner_id, status = _req$body.status;
            if (!(!delivery_partner_id || !status)) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context4.next = 6;
            return (0, _rider.update_riderstatus)(delivery_partner_id, status);
          case 6:
            riderstatus = _context4.sent;
            if (!riderstatus.status) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(riderstatus));
          case 11:
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json(riderstatus));
          case 12:
            _context4.next = 18;
            break;
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(500).json({
              status: false
            });
          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function updateRiderstatus(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// update single rider location 
exports.updateRiderstatus = updateRiderstatus;
var updeteRiderLocation = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, delivery_partner_id, latitude, longitude, location;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, delivery_partner_id = _req$body2.delivery_partner_id, latitude = _req$body2.latitude, longitude = _req$body2.longitude;
            if (!(!delivery_partner_id || !latitude || !longitude)) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context5.next = 6;
            return (0, _rider.update_location)(delivery_partner_id, latitude, longitude);
          case 6:
            location = _context5.sent;
            return _context5.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "ok"
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
  return function updeteRiderLocation(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// update starttour 
exports.updeteRiderLocation = updeteRiderLocation;
var updateStartTour = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, delivery_partner_id, tour_id, tour_status, starttour;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, delivery_partner_id = _req$body3.delivery_partner_id, tour_id = _req$body3.tour_id, tour_status = _req$body3.tour_status;
            if (!(!delivery_partner_id || !tour_id || !tour_status)) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context6.next = 6;
            return (0, _rider.update_starttour)(delivery_partner_id, tour_id, tour_status);
          case 6:
            starttour = _context6.sent;
            if (!starttour.status) {
              _context6.next = 11;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(starttour));
          case 11:
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json(starttour));
          case 12:
            _context6.next = 18;
            break;
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function updateStartTour(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// update endtour
exports.updateStartTour = updateStartTour;
var updateEndtour = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, delivery_partner_id, tour_id, tour_status, endtour;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body4 = req.body, delivery_partner_id = _req$body4.delivery_partner_id, tour_id = _req$body4.tour_id, tour_status = _req$body4.tour_status;
            if (!(!delivery_partner_id || !tour_id || !tour_status)) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context7.next = 6;
            return (0, _rider.update_endtour)(delivery_partner_id, tour_id, tour_status);
          case 6:
            endtour = _context7.sent;
            if (!endtour.status) {
              _context7.next = 11;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(endtour));
          case 11:
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json(endtour));
          case 12:
            _context7.next = 18;
            break;
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function updateEndtour(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// get single order 
exports.updateEndtour = updateEndtour;
var getSingleorder = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body5, user_id, order_id, delivery_partner_id, order_status, order, data, user, products, addons, i;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body5 = req.body, user_id = _req$body5.user_id, order_id = _req$body5.order_id, delivery_partner_id = _req$body5.delivery_partner_id, order_status = _req$body5.order_status;
            if (user_id) {
              _context8.next = 4;
              break;
            }
            return _context8.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context8.next = 6;
            return (0, _rider.getsingleorder)(user_id, order_id, delivery_partner_id, order_status);
          case 6:
            order = _context8.sent;
            console.log(order.query5);
            if (!(order.status = true)) {
              _context8.next = 15;
              break;
            }
            data = {
              "task_id": order.query1[0].id,
              // "task_name": "Task 1",
              "tour_status": order.query1[0].tour_status,
              "order_status": order.query1[0].status,
              "empty_bottle_count": order.daily[0].total_collective_bottle,
              "total_litre": order.daily[0].total_qty + " " + order.query3[0].unit_value,
              "total_addons_count": order.query5[0].order_id,
              "delivered_addons_count": order.query6.length
            };
            user = {
              "user_id": order.query2[0].user_id,
              "user_name": order.query2[0].user_name,
              "customer_id": order.query2[0].customer_id,
              "user_mobile": order.query2[0].user_mobile,
              "user_address": order.query2[0].user_address,
              "landmark": order.query2[0].landmark,
              "user_latitude": order.query2[0].user_latitude,
              "user_longitude": order.query2[0].user_longitude
            };
            products = [{
              "product_id": order.query3[0].id,
              "product_name": order.query3[0].product_name,
              "variation": order.query3[0].unit_value + "" + order.query3[0].unit_type,
              "quantity": order.query3[0].quantity
            }, {
              "product_id": order.query4[0].add_id,
              "product_name": order.query4[0].product_name,
              "variation": order.query4[0].unit_value + "" + order.query3[0].unit_type,
              "quantity": order.query4[0].quantity
            }];
            addons = [];
            for (i = 0; i < order.data; i++) {
              addons.push({
                "addon_id": order.query5[i].addon_id,
                "addon_name": order.query5[i].product_name,
                "variation": order.query5[i].unit_value + "" + order.query5[i].unit_type,
                "quantity": order.query5[i].quantity
              });
            }
            return _context8.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: data,
              user: user,
              products: products,
              addons: addons
            }));
          case 15:
            _context8.next = 21;
            break;
          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 17]]);
  }));
  return function getSingleorder(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// order_status_update
exports.getSingleorder = getSingleorder;
var orderStatusUpdate = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body6, user_id, order_id, order_status, subscription_id, products, addons, orderstatus;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body6 = req.body, user_id = _req$body6.user_id, order_id = _req$body6.order_id, order_status = _req$body6.order_status, subscription_id = _req$body6.subscription_id, products = _req$body6.products, addons = _req$body6.addons;
            if (!(!user_id || !order_id || !order_status)) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context9.next = 6;
            return (0, _rider.statusupdate)(user_id, order_id, order_status, subscription_id, products, addons);
          case 6:
            orderstatus = _context9.sent;
            _context9.next = 13;
            break;
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function orderStatusUpdate(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// rider dashboard
exports.orderStatusUpdate = orderStatusUpdate;
var riderDashboard = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body7, delivery_partner_id, date, total, bottle, sum, i, query;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body7 = req.body, delivery_partner_id = _req$body7.delivery_partner_id, date = _req$body7.date;
            if (!(!delivery_partner_id || !date)) {
              _context10.next = 4;
              break;
            }
            return _context10.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context10.next = 6;
            return (0, _rider.dashboard)(delivery_partner_id, date);
          case 6:
            total = _context10.sent;
            _context10.next = 9;
            return (0, _db["default"])('daily_orders').select('total_collective_bottle').where({
              router_id: total.data,
              date: date
            });
          case 9:
            bottle = _context10.sent;
            sum = 0;
            for (i = 0; i < bottle.length; i++) {
              sum += Number(bottle[i].total_collective_bottle);
            }
            query = {
              "total_orders": total.order.length,
              "delivered_orders": total.delivery.length,
              "undelivered_orders": total.pending.length + total.undelivered.length,
              "empty_bottle": sum
            };
            console.log(query);
            return _context10.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              query: query
            }));
          case 17:
            _context10.prev = 17;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 21:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 17]]);
  }));
  return function riderDashboard(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// rider cancel order 
exports.riderDashboard = riderDashboard;
var cancelOrder = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body8, user_id, order_id, delivery_partner_id, order_status, reason, date, cancel;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$body8 = req.body, user_id = _req$body8.user_id, order_id = _req$body8.order_id, delivery_partner_id = _req$body8.delivery_partner_id, order_status = _req$body8.order_status, reason = _req$body8.reason, date = _req$body8.date;
            if (!(!delivery_partner_id || !order_status || !date)) {
              _context11.next = 4;
              break;
            }
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context11.next = 6;
            return (0, _rider.cancel_order)(user_id, order_id, delivery_partner_id, order_status, date);
          case 6:
            cancel = _context11.sent;
            return _context11.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              data: cancel
            }));
          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            return _context11.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function cancelOrder(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

// order list 
exports.cancelOrder = cancelOrder;
var OrderList = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$body9, delivery_partner_id, status, order, query, data;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _req$body9 = req.body, delivery_partner_id = _req$body9.delivery_partner_id, status = _req$body9.status;
            _context12.next = 4;
            return (0, _rider.order_list)(delivery_partner_id, status);
          case 4:
            order = _context12.sent;
            query = {
              "tour_id": order.router[0].id,
              "tour_route": order.router[0].name,
              "total_orders": order.order.length,
              "completed_orders": order.delivery.length
            };
            data = {
              "order_id": order.order[0].id,
              "milk_variation": order.order[0].total_qty + " " + order.query3[0].unit_type,
              "addon_items": order.addon.length,
              "user_name": order.user[0].name,
              "customer_id": order.user[0].user_unique_id,
              "bottle_return": order.order1[0].total_collective_bottle,
              "order_status": order.order1[0].status
            };
            return _context12.abrupt("return", res.status(_responseCode["default"].SUCCESS).json(_defineProperty({
              status: true,
              data: query
            }, "data", data)));
          case 10:
            _context12.prev = 10;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 14:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function OrderList(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.OrderList = OrderList;
var ten = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var payload, user_name, password, checkPhoneNumber, query, userId, today;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            payload = (0, _validator.userValidator)(req.body);
            user_name = payload.user_name, password = payload.password;
            if (!payload) {
              _context13.next = 16;
              break;
            }
            _context13.next = 6;
            return loginUser(password);
          case 6:
            checkPhoneNumber = _context13.sent;
            userId = 0; // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
            // const otp = '1234'
            if (checkPhoneNumber.body.length) {
              _context13.next = 13;
              break;
            }
            today = format(new Date(), 'yyyy-MM-dd H:i:s');
            _context13.next = 12;
            return insertRider(payload);
          case 12:
            query = _context13.sent;
          case 13:
            // else {

            //   userId = checkPhoneNumber.body[0].id
            //   query = await updateUserOtp(payload, otp)
            // }

            // if (!userId) {
            //   userId = query.body.body.insertId
            // }

            if (query.status === _responseCode["default"].SUCCESS) {
              res.status(query.status).json({
                status: true,
                messages: "Failed...."
              });
            } else {
              res.status(query.status).json({
                status: false,
                message: "pls check"
              });
            }
            _context13.next = 17;
            break;
          case 16:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "error"
            });
          case 17:
            _context13.next = 23;
            break;
          case 19:
            _context13.prev = 19;
            _context13.t0 = _context13["catch"](0);
            logger.error('Whooops! This broke with error: ', _context13.t0);
            res.status(500).send('Error!');
          case 23:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 19]]);
  }));
  return function ten(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.ten = ten;