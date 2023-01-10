"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserOtp = exports.verifyOtp = exports.userDetail = exports.updateUserToken = exports.updateUserOtp = exports.updateUserLocation = exports.updateUserLanguage = exports.updateUser = exports.logoutUser = exports.loginUser = exports.insertusernumber = exports.insertUser = exports.insertRider = exports.getUserToken = exports.getUser = exports.getSinglecoupon = exports.getPromo = exports.getCities = exports.getAddress = exports.getAccountModal = exports.addUser = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _controls = require("../../constants/controls");
var _db = _interopRequireDefault(require("../../services/db.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var loginUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(mobile_number) {
    var checkPhoneNumber;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db["default"].select("id").from("users").where({
              mobile_number: mobile_number
            });
          case 2:
            checkPhoneNumber = _context.sent;
            _context.prev = 3;
            return _context.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: checkPhoneNumber
            });
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context.t0.message
            });
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 7]]);
  }));
  return function loginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.loginUser = loginUser;
var verifyOtp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(otp, userId, today) {
    var queryCheck, updateOtpQuery, query;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _db["default"].select("*").from("users").where({
              otp: otp,
              id: userId,
              first_otp_verified_at: null
            });
          case 2:
            queryCheck = _context2.sent;
            updateOtpQuery = "";
            if (!(queryCheck.body > 0)) {
              _context2.next = 10;
              break;
            }
            _context2.next = 7;
            return (0, _db["default"])("users").where({
              otp: otp,
              id: userId
            }).update({
              first_otp_verified_at: today,
              last_otp_verified_at: today
            });
          case 7:
            updateOtpQuery = _context2.sent;
            _context2.next = 13;
            break;
          case 10:
            _context2.next = 12;
            return (0, _db["default"])("users").where({
              otp: otp,
              id: userId
            }).update({
              last_otp_verified_at: today
            });
          case 12:
            updateOtpQuery = _context2.sent;
          case 13:
            _context2.next = 15;
            return _db["default"].select(["id"]).from("users").where({
              otp: otp,
              id: userId
            });
          case 15:
            query = _context2.sent;
            _context2.prev = 16;
            return _context2.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              data: query
            });
          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](16);
            return _context2.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context2.t0.message
            });
          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[16, 20]]);
  }));
  return function verifyOtp(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.verifyOtp = verifyOtp;
var updateUserLocation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(payload) {
    var updateLocationQuery, updateLocationResponse;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            updateLocationQuery = queryBuilder.update({
              latitude: payload.latitude,
              longitude: payload.longitude
            }).into("users").where({
              id: payload.userId
            }).toString();
            _context3.prev = 1;
            _context3.next = 4;
            return mysqlRequest(updateLocationQuery);
          case 4:
            updateLocationResponse = _context3.sent;
            if (!(updateLocationResponse.status === true)) {
              _context3.next = 7;
              break;
            }
            return _context3.abrupt("return", {
              status: updateLocationResponse.status
            });
          case 7:
            _context3.next = 12;
            break;
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context3.t0.message
            });
          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return function updateUserLocation(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateUserLocation = updateUserLocation;
var insertUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(payload, otp, users_length) {
    var generate_id, mobile_number, fcmToken, device, appOsFormat, appVersion, query;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            generate_id = "CUSTOMER" + users_length;
            mobile_number = payload.mobile_number, fcmToken = payload.fcmToken, device = payload.device, appOsFormat = payload.appOsFormat, appVersion = payload.appVersion;
            _context4.next = 4;
            return _db["default"].insert([{
              user_unique_id: generate_id,
              mobile_number: mobile_number,
              fcm_token: fcmToken,
              otp: otp,
              device: device,
              app_os_format: appOsFormat,
              app_version: appVersion,
              user_group_id: "3"
            }]).into("users");
          case 4:
            query = _context4.sent;
            _context4.prev = 5;
            return _context4.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](5);
            return _context4.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context4.t0.message
            });
          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 9]]);
  }));
  return function insertUser(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.insertUser = insertUser;
var insertusernumber = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(payload, otp) {
    var mobile_number, query;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mobile_number = payload.mobile_number;
            _context5.next = 3;
            return _db["default"].insert([{
              mobile_number: mobile_number,
              otp: otp
            }]).into("users");
          case 3:
            query = _context5.sent;
            _context5.prev = 4;
            return _context5.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](4);
            return _context5.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context5.t0.message
            });
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 8]]);
  }));
  return function insertusernumber(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.insertusernumber = insertusernumber;
var insertRider = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(payload, otp, today) {
    var user_query, user_length, generate_id, user_name, password, query;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _db["default"].select(["id"]).from("rider_details");
          case 2:
            user_query = _context6.sent;
            user_length = user_query.body;
            user_length += 1;
            generate_id = "MARAM" + user_length;
            user_name = payload.user_name, password = payload.password;
            _context6.next = 9;
            return _db["default"].insert([{
              user_unique_id: generate_id,
              user_name: user_name,
              password: password
              // otp: otp,
              // device:device,
              // app_os_format:appOsFormat,
              // app_version:appVersion,
              // user_group_id:'3'
              // email:email,
              // name:name
              // user_id: userGroup.USER_GROUP_ID,
              // app_version:'1.0',
              // status:'1',
            }]).into("rider_details");
          case 9:
            query = _context6.sent;
            _context6.prev = 10;
            return _context6.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](10);
            return _context6.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context6.t0.message
            });
          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[10, 14]]);
  }));
  return function insertRider(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
exports.insertRider = insertRider;
var updateUserOtp = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(payload, otp) {
    var mobile_number, query;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mobile_number = payload.mobile_number;
            _context7.next = 3;
            return (0, _db["default"])("users").where({
              mobile_number: mobile_number
            }).update({
              otp: otp,
              refresh_token: null
            });
          case 3:
            query = _context7.sent;
            _context7.prev = 4;
            return _context7.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](4);
            return _context7.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context7.t0.message
            });
          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 8]]);
  }));
  return function updateUserOtp(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateUserOtp = updateUserOtp;
var verifyUserOtp = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var today, payload, otp, userId, response, tokens;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            today = format(new Date(), "yyyy-MM-dd H:i:s");
            payload = verifyOtpValidator(req.body);
            otp = payload.otp, userId = payload.userId;
            if (!(payload.status === true)) {
              _context8.next = 23;
              break;
            }
            _context8.next = 7;
            return verifyOtp(otp, userId, today);
          case 7:
            response = _context8.sent;
            if (!response.data.body.length) {
              _context8.next = 20;
              break;
            }
            // const languageId=response.data.body[0].language_id
            tokens = createToken({
              user_id: userId,
              user_group_id: _controls.userGroup.USER_GROUP_ID
            });
            console.log(languageId);
            if (!tokens.status) {
              _context8.next = 17;
              break;
            }
            _context8.next = 14;
            return updateUserToken(tokens.refreshToken, userId);
          case 14:
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              token: tokens.token
            });
            _context8.next = 18;
            break;
          case 17:
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "Token generation failed"
            });
          case 18:
            _context8.next = 21;
            break;
          case 20:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "otp mismatch"
            });
          case 21:
            _context8.next = 24;
            break;
          case 23:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: payload.message
            });
          case 24:
            _context8.next = 30;
            break;
          case 26:
            _context8.prev = 26;
            _context8.t0 = _context8["catch"](0);
            logger.error("Whooops! This broke with error: ", _context8.t0);
            res.status(500).send("Error!");
          case 30:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 26]]);
  }));
  return function verifyUserOtp(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
exports.verifyUserOtp = verifyUserOtp;
var updateUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(payload, userId) {
    var query, updatedUserResponce;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            query = queryBuilder.update({
              name: payload.name,
              email: payload.email,
              profile_photo_path: payload.profilePhoto
              // online_status:payload.onlineStatus,
              // language_id:payload.languageId,
            }).into("users").where({
              id: userId
            }).toString();
            _context9.prev = 1;
            _context9.next = 4;
            return mysqlRequest(query);
          case 4:
            updatedUserResponce = _context9.sent;
            return _context9.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: updatedUserResponce
            });
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            return _context9.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context9.t0.message
            });
          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 8]]);
  }));
  return function updateUser(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();
exports.updateUser = updateUser;
var updateUserLanguage = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(languageId, userId) {
    var query, updatedUserResponce;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            query = queryBuilder.update({
              language_id: languageId
            }).into("users").where({
              id: userId
            }).toString();
            _context10.prev = 1;
            _context10.next = 4;
            return mysqlRequest(query);
          case 4:
            updatedUserResponce = _context10.sent;
            return _context10.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: updatedUserResponce
            });
          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](1);
            return _context10.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context10.t0.message
            });
          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 8]]);
  }));
  return function updateUserLanguage(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();
exports.updateUserLanguage = updateUserLanguage;
var updateUserToken = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(refresh_token, userId) {
    var query;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _db["default"])("users").update({
              refresh_token: refresh_token
            }).where({
              id: userId
            });
          case 2:
            query = _context11.sent;
            _context11.prev = 3;
            return _context11.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](3);
            return _context11.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context11.t0.message
            });
          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[3, 7]]);
  }));
  return function updateUserToken(_x22, _x23) {
    return _ref11.apply(this, arguments);
  };
}();
exports.updateUserToken = updateUserToken;
var getUserToken = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(userId) {
    var query, updatedUserResponce;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _db["default"].select("refresh_token").from("users").where({
              id: userId
            });
          case 2:
            query = _context12.sent;
            _context12.prev = 3;
            _context12.next = 6;
            return mysqlRequest(query);
          case 6:
            updatedUserResponce = _context12.sent;
            return _context12.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              refreshToken: updatedUserResponce.body[0].refresh_token,
              languageId: updatedUserResponce.body[0].language_id
            });
          case 10:
            _context12.prev = 10;
            _context12.t0 = _context12["catch"](3);
            return _context12.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context12.t0.message
            });
          case 13:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[3, 10]]);
  }));
  return function getUserToken(_x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getUserToken = getUserToken;
var getUser = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(userId) {
    var query;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _db["default"].select("user_id", "address_name", "address_details", "address_landmark", "address_longitude", "alternate_mobile").from("user_addresses");
          case 2:
            query = _context13.sent;
            _context13.prev = 3;
            return _context13.abrupt("return", query);
          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](3);
            return _context13.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context13.t0.message
            });
          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[3, 7]]);
  }));
  return function getUser(_x25) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getUser = getUser;
var userDetail = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(userId) {
    var query;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _db["default"].select("*").from("users").where({
              id: userId
            });
          case 2:
            query = _context14.sent;
            _context14.prev = 3;
            return _context14.abrupt("return", query);
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](3);
            return _context14.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context14.t0.message
            });
          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[3, 7]]);
  }));
  return function userDetail(_x26) {
    return _ref14.apply(this, arguments);
  };
}();
exports.userDetail = userDetail;
var getAccountModal = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(payload) {
    var userId, responce;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            userId = payload.userId;
            _context15.next = 3;
            return _db["default"].select("mobile_number").from("users").where({
              id: userId
            });
          case 3:
            responce = _context15.sent;
            _context15.prev = 4;
            if (!(responce.length !== 0)) {
              _context15.next = 9;
              break;
            }
            return _context15.abrupt("return", {
              status: _responseCode["default"].SUCCESS
            });
          case 9:
            return _context15.abrupt("return", {
              status: _responseCode["default"].FAILURE.DATA_NOT_FOUND,
              message: "User not found"
            });
          case 10:
            _context15.next = 15;
            break;
          case 12:
            _context15.prev = 12;
            _context15.t0 = _context15["catch"](4);
            return _context15.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context15.t0.message
            });
          case 15:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[4, 12]]);
  }));
  return function getAccountModal(_x27) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getAccountModal = getAccountModal;
var getAddress = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(user_id) {
    var query;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _db["default"].select("user_id", "name", "details", "landmark", "landmark", "longitude").from("user_addresses");
          case 2:
            query = _context16.sent;
            _context16.prev = 3;
            return _context16.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              response: query
            });
          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](3);
            return _context16.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context16.t0.message
            });
          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[3, 7]]);
  }));
  return function getAddress(_x28) {
    return _ref16.apply(this, arguments);
  };
}();
exports.getAddress = getAddress;
var addUser = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(payload) {
    var userAddress;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _db["default"])("user_address").insert({
              user_id: payload.user_id,
              address_details: payload.address_details,
              address_name: payload.address_name,
              address_landmark: payload.address_landmark,
              created_at: new Date().toISOString().slice(0, 19).replace("T", " ")
            });
          case 2:
            userAddress = _context17.sent;
            _context17.prev = 3;
            return _context17.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              data: userAddress
            }));
          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](3);
            console.log(_context17.t0);
            return _context17.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context17.t0.message
            });
          case 11:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[3, 7]]);
  }));
  return function addUser(_x29) {
    return _ref17.apply(this, arguments);
  };
}();
exports.addUser = addUser;
var getCities = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    var query;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _db["default"].select("*").from("cities");
          case 2:
            query = _context18.sent;
            _context18.prev = 3;
            return _context18.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              response: query
            });
          case 7:
            _context18.prev = 7;
            _context18.t0 = _context18["catch"](3);
            return _context18.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context18.t0.message
            });
          case 10:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[3, 7]]);
  }));
  return function getCities() {
    return _ref18.apply(this, arguments);
  };
}();
exports.getCities = getCities;
var getPromo = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
    var query, response;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            query = queryBuilder.select("*").from("offers").toString();
            _context19.prev = 1;
            _context19.next = 4;
            return mysqlRequest(query);
          case 4:
            response = _context19.sent;
            return _context19.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              response: response.body
            });
          case 8:
            _context19.prev = 8;
            _context19.t0 = _context19["catch"](1);
            return _context19.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context19.t0.message
            });
          case 11:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[1, 8]]);
  }));
  return function getPromo() {
    return _ref19.apply(this, arguments);
  };
}();
exports.getPromo = getPromo;
var getSinglecoupon = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
    var query, response;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return _db["default"].select("*").from("offers");
          case 2:
            query = _context20.sent;
            _context20.prev = 3;
            _context20.next = 6;
            return mysqlRequest(query);
          case 6:
            response = _context20.sent;
            return _context20.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              response: response
            });
          case 10:
            _context20.prev = 10;
            _context20.t0 = _context20["catch"](3);
            return _context20.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context20.t0.message
            });
          case 13:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[3, 10]]);
  }));
  return function getSinglecoupon() {
    return _ref20.apply(this, arguments);
  };
}();

// export const deleteUser = async (userId) => {

//   try {
//     const query= queryBuilder('users').where({id : userId}).update({status : '0'})

//     return { status: responseCode.SUCCESS, body: query }
//   } catch (error) {
//     return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
//   }
// }
exports.getSinglecoupon = getSinglecoupon;
var logoutUser = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(userId) {
    var query;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _context21.next = 3;
            return (0, _db["default"])("users").where({
              id: userId
            }).update({
              refresh_token: null
            });
          case 3:
            query = _context21.sent;
            return _context21.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 7:
            _context21.prev = 7;
            _context21.t0 = _context21["catch"](0);
            return _context21.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context21.t0.message
            });
          case 10:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 7]]);
  }));
  return function logoutUser(_x30) {
    return _ref21.apply(this, arguments);
  };
}();
exports.logoutUser = logoutUser;