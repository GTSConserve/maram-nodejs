"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserOtp = exports.userMobileNumberChange = exports.logout = exports.login = exports.accountDelete = exports.UserverifyOtp = void 0;
var _user = require("../../models/user/user.model");
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _jwt = require("../../services/jwt.service");
var _validator = require("../../services/validator.service");
var _format = _interopRequireDefault(require("date-fns/format"));
var _controls = require("../../constants/controls");
var _logger = _interopRequireDefault(require("../../logger/logger"));
var _db = _interopRequireDefault(require("../../services/db.service"));
var _helper = require("../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var accountDelete = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var userId;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.body.userId;
            _context.next = 4;
            return (0, _db["default"])("users").update({
              status: "0"
            }).where({
              id: userId
            });
          case 4:
            return _context.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "Account Deleted Successfully"
            }));
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: _messages["default"].SERVER_ERROR
            }));
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function accountDelete(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.accountDelete = accountDelete;
var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var payload, mobile_number, fcmToken, device, appOsFormat, appVersion, checkPhoneNumber, query, userId, otp, users, users_length;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            payload = (0, _validator.loginValidator)(req.body);
            mobile_number = payload.mobile_number, fcmToken = payload.fcmToken, device = payload.device, appOsFormat = payload.appOsFormat, appVersion = payload.appVersion;
            console.log(payload);
            if (!payload.status) {
              _context2.next = 34;
              break;
            }
            _context2.next = 7;
            return _db["default"].select("id").from("users").where({
              mobile_number: mobile_number
            });
          case 7:
            checkPhoneNumber = _context2.sent;
            console.log(checkPhoneNumber);
            userId = 0; // const otp = process.env.USER_OTP || Math.floor(1000 + Math.random() * 9000)
            otp = "1234";
            _context2.next = 13;
            return _db["default"].select("id").from("users");
          case 13:
            users = _context2.sent;
            users_length = users.length + 1;
            console.log(checkPhoneNumber);
            if (!(checkPhoneNumber.length === 0)) {
              _context2.next = 23;
              break;
            }
            _context2.next = 19;
            return (0, _user.insertUser)(payload, otp, users_length);
          case 19:
            query = _context2.sent;
            userId = users_length;
            _context2.next = 27;
            break;
          case 23:
            _context2.next = 25;
            return (0, _user.updateUserOtp)(payload, otp);
          case 25:
            query = _context2.sent;
            userId = checkPhoneNumber[0].id;
          case 27:
            if (!(query.status === _responseCode["default"].SUCCESS)) {
              _context2.next = 31;
              break;
            }
            return _context2.abrupt("return", res.status(query.status).json({
              status: true,
              user_id: userId,
              message: _messages["default"].LOGINMESSAGE.OTP_SENT
            }));
          case 31:
            res.status(query.status).json({
              status: false,
              message: query.message
            });
          case 32:
            _context2.next = 35;
            break;
          case 34:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: payload.message
            });
          case 35:
            _context2.next = 41;
            break;
          case 37:
            _context2.prev = 37;
            _context2.t0 = _context2["catch"](0);
            _logger["default"].error("Whooops! This broke with error: ", _context2.t0);
            res.status(500).send("Error!");
          case 41:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 37]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.login = login;
var verifyUserOtp = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var today, payload, otp, userId, is_user, response, tokens;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            today = (0, _format["default"])(new Date(), "yyyy-MM-dd H:i:s");
            payload = (0, _validator.verifyOtpValidator)(req.body);
            console.log(payload);
            otp = payload.otp, userId = payload.userId;
            _context3.next = 7;
            return (0, _db["default"])("users").select("id", "otp").where({
              id: userId
            });
          case 7:
            is_user = _context3.sent;
            if (!(is_user.length === 0)) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "User Not Found"
            }));
          case 10:
            if (!(payload.status === true)) {
              _context3.next = 28;
              break;
            }
            _context3.next = 13;
            return (0, _user.verifyOtp)(otp, userId, today);
          case 13:
            response = _context3.sent;
            if (!(is_user[0].otp == otp)) {
              _context3.next = 25;
              break;
            }
            tokens = (0, _jwt.createToken)({
              user_id: userId
            });
            if (!tokens.status) {
              _context3.next = 22;
              break;
            }
            _context3.next = 19;
            return (0, _user.updateUserToken)(tokens.refreshToken, userId);
          case 19:
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              token: tokens.token,
              message: _messages["default"].LOGINMESSAGE.OTP_VERIFY
            });
            _context3.next = 23;
            break;
          case 22:
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "Token generation failed"
            });
          case 23:
            _context3.next = 26;
            break;
          case 25:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "otp mismatch"
            });
          case 26:
            _context3.next = 29;
            break;
          case 28:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: payload.message
            });
          case 29:
            _context3.next = 35;
            break;
          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3["catch"](0);
            _logger["default"].error("Whooops! This broke with error: ", _context3.t0);
            res.status(500).send("Error!");
          case 35:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 31]]);
  }));
  return function verifyUserOtp(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.verifyUserOtp = verifyUserOtp;
var logout = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            userId = req.body.userId;
            if (!userId) {
              _context4.next = 10;
              break;
            }
            _context4.next = 5;
            return (0, _user.logoutUser)(userId);
          case 5:
            user = _context4.sent;
            console.log(userId);
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              message: "Succesfully Logout.."
            });
            _context4.next = 11;
            break;
          case 10:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "Logout failed.."
            });
          case 11:
            _context4.next = 17;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              status: false,
              message: "Server Error"
            }));
          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function logout(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// export const userDeactive = async (req, res) => {
//   try {
//     const { userId } = req.body
//     const user = await deleteUser(userId)
//     return res.status(responseCode.SUCCESS).json({ status: true, message: "Account Deleted SuccessFully" })

//   } catch (error) {
//     return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Server Error" })
//   }
// }
exports.logout = logout;
var userMobileNumberChange = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, userId, mobile_number, otp;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body = req.body, userId = _req$body.userId, mobile_number = _req$body.mobile_number;
            otp = "1234";
            _context5.next = 5;
            return (0, _db["default"])("users").update({
              mobile_number: mobile_number,
              otp: otp
            }).where({
              id: userId
            });
          case 5:
            return _context5.abrupt("return", res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              user_id: userId,
              message: "OTP sended to your registered phone number"
            }));
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.INVALID).json({
              status: false,
              message: "Please check mobile number"
            }));
          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function userMobileNumberChange(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.userMobileNumberChange = userMobileNumberChange;
var UserverifyOtp = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var today, payload, otp, userId, is_user, response, tokens;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            today = (0, _format["default"])(new Date(), "yyyy-MM-dd H:i:s");
            payload = (0, _validator.verifyOtpValidator)(req.body);
            console.log(payload);
            otp = payload.otp, userId = payload.userId;
            _context6.next = 7;
            return (0, _db["default"])("users").select("id", "otp").where({
              id: userId
            });
          case 7:
            is_user = _context6.sent;
            if (!(is_user.length === 0)) {
              _context6.next = 10;
              break;
            }
            return _context6.abrupt("return", res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "User Not Found"
            }));
          case 10:
            if (!(payload.status === true)) {
              _context6.next = 28;
              break;
            }
            _context6.next = 13;
            return (0, _user.verifyOtp)(otp, userId, today);
          case 13:
            response = _context6.sent;
            if (!(is_user[0].otp == otp)) {
              _context6.next = 25;
              break;
            }
            tokens = (0, _jwt.createToken)({
              user_id: userId
            });
            if (!tokens.status) {
              _context6.next = 22;
              break;
            }
            _context6.next = 19;
            return (0, _user.updateUserToken)(tokens.refreshToken, userId);
          case 19:
            res.status(_responseCode["default"].SUCCESS).json({
              status: true,
              token: tokens.token,
              message: _messages["default"].LOGINMESSAGE.OTP_VERIFY
            });
            _context6.next = 23;
            break;
          case 22:
            res.status(_responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR).json({
              status: false,
              message: "Token generation failed"
            });
          case 23:
            _context6.next = 26;
            break;
          case 25:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: "otp mismatch"
            });
          case 26:
            _context6.next = 29;
            break;
          case 28:
            res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
              status: false,
              message: payload.message
            });
          case 29:
            _context6.next = 35;
            break;
          case 31:
            _context6.prev = 31;
            _context6.t0 = _context6["catch"](0);
            _logger["default"].error("Whooops! This broke with error: ", _context6.t0);
            res.status(500).send("Error!");
          case 35:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 31]]);
  }));
  return function UserverifyOtp(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.UserverifyOtp = UserverifyOtp;