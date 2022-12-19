"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updeteRiderLocation = exports.updateStartTour = exports.updateRiderstatus = exports.updateEndtour = exports.ten = exports.login = exports.getRiderdetails = exports.getAppControls = void 0;
var _express = _interopRequireDefault(require("express"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _rider = require("../../models/rider/rider.model");
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _db = _interopRequireDefault(require("../../services/db.service"));
var _validator = require("../../services/validator.service");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
    var payload, user_name, password, checkPassword, query, userId, users, users_length;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log("hi");
            payload = (0, _validator.userValidator)(req.body);
            user_name = payload.user_name, password = payload.password;
            console.log(payload);
            if (!payload.status) {
              _context2.next = 28;
              break;
            }
            console.log("hi");
            // const checkPhoneNumber = await userLogin(password)

            // const checkPhoneNumber = await loginUser(mobile_number)
            _context2.next = 9;
            return _db["default"].select("id").from("rider_details").where({
              password: password
            });
          case 9:
            checkPassword = _context2.sent;
            userId = 0; // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
            // const otp = "1234";
            _context2.next = 13;
            return _db["default"].select("id").from("rider_details");
          case 13:
            users = _context2.sent;
            users_length = users.length + 1;
            console.log(checkPassword);
            if (!(checkPassword.length === 0)) {
              _context2.next = 21;
              break;
            }
            _context2.next = 19;
            return insertUser(payload, users_length);
          case 19:
            query = _context2.sent;
            userId = users_length;
          case 21:
            if (!(query.status === _responseCode["default"].SUCCESS)) {
              _context2.next = 25;
              break;
            }
            return _context2.abrupt("return", res.status(query.status).json({
              status: true,
              user_id: userId,
              message: messageCode.LOGINMESSAGE.OTP_SENT
            }));
          case 25:
            res.status(query.status).json({
              status: false,
              message: query.message
            });
          case 26:
            _context2.next = 29;
            break;
          case 28:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: payload.message
            });
          case 29:
            _context2.next = 35;
            break;
          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](0);
            console.error('Whooops! This broke with error: ', _context2.t0);
            res.status(500).send('Error!');
          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 31]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//  get single rider details
exports.login = login;
var getRiderdetails = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var delivary_partner_id, delivary_partner;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            delivary_partner_id = req.body.delivary_partner_id;
            if (delivary_partner_id) {
              _context3.next = 4;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "delivary_partner_id Is Missing"
            }));
          case 4:
            _context3.next = 6;
            return (0, _rider.get_riderdetails)(delivary_partner_id);
          case 6:
            delivary_partner = _context3.sent;
            return _context3.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              data: delivary_partner.body,
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
    var _req$body, delivary_partner_id, status, riderstatus;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, delivary_partner_id = _req$body.delivary_partner_id, status = _req$body.status;
            if (!(!delivary_partner_id || !status)) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context4.next = 6;
            return (0, _rider.update_riderstatus)(delivary_partner_id, status);
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
    var _req$body2, delivary_partner_id, latitude, longitude, location;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, delivary_partner_id = _req$body2.delivary_partner_id, latitude = _req$body2.latitude, longitude = _req$body2.longitude;
            if (!(!delivary_partner_id || !latitude || !longitude)) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context5.next = 6;
            return (0, _rider.update_location)(delivary_partner_id, latitude, longitude);
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
    var _req$body3, delivary_partner_id, tour_id, tour_status, starttour;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, delivary_partner_id = _req$body3.delivary_partner_id, tour_id = _req$body3.tour_id, tour_status = _req$body3.tour_status;
            if (!(!delivary_partner_id || !tour_id || !tour_status)) {
              _context6.next = 4;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context6.next = 6;
            return (0, _rider.update_starttour)(delivary_partner_id, tour_id, tour_status);
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
    var _req$body4, delivary_partner_id, tour_id, tour_status, endtour;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body4 = req.body, delivary_partner_id = _req$body4.delivary_partner_id, tour_id = _req$body4.tour_id, tour_status = _req$body4.tour_status;
            if (!(!delivary_partner_id || !tour_id || !tour_status)) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Mandatory field Is Missing"
            }));
          case 4:
            _context7.next = 6;
            return (0, _rider.update_endtour)(delivary_partner_id, tour_id, tour_status);
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
exports.updateEndtour = updateEndtour;
var ten = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var payload, user_name, password, checkPhoneNumber, query, userId, today;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            payload = (0, _validator.userValidator)(req.body);
            user_name = payload.user_name, password = payload.password;
            if (!payload) {
              _context8.next = 16;
              break;
            }
            _context8.next = 6;
            return loginUser(password);
          case 6:
            checkPhoneNumber = _context8.sent;
            userId = 0; // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
            // const otp = '1234'
            if (checkPhoneNumber.body.length) {
              _context8.next = 13;
              break;
            }
            today = format(new Date(), 'yyyy-MM-dd H:i:s');
            _context8.next = 12;
            return insertRider(payload);
          case 12:
            query = _context8.sent;
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
            _context8.next = 17;
            break;
          case 16:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "error"
            });
          case 17:
            _context8.next = 23;
            break;
          case 19:
            _context8.prev = 19;
            _context8.t0 = _context8["catch"](0);
            logger.error('Whooops! This broke with error: ', _context8.t0);
            res.status(500).send('Error!');
          case 23:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 19]]);
  }));
  return function ten(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.ten = ten;