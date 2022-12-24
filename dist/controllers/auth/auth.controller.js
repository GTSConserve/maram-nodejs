"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile = exports.updateEmailPassword = exports.updateChangePassword = exports.sendPasswordResetEmail = exports.logoutHandler = exports.loginHandler = exports.loginForm = exports.getProfile = exports.getPasswordRecovery = exports.getChangePassword = void 0;
var _db = _interopRequireDefault(require("../../services/db.service"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _jwt = require("../../services/jwt.service");
var _login = require("../../models/super_admin/login.module");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import { transporter, getPasswordResetURL, resetPasswordTemplate } from "../../notifications/message.sender"

var updateChangePassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, currentTokenPayload, _admin_id, user, _req$body, old_password, new_password, confirm_new_password, isPassword, query, password;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.session.token;
            if (token) {
              _context.next = 5;
              break;
            }
            req.flash("error", "Need To Login First");
            return _context.abrupt("return", res.redirect("/auth/login"));
          case 5:
            currentTokenPayload = (0, _jwt.parseJwtPayload)(token.token);
            _admin_id = currentTokenPayload.user_id;
            _context.next = 9;
            return (0, _db["default"])("admin_users").select("user_group_id", "password", "is_password_change").where({
              id: _admin_id
            });
          case 9:
            user = _context.sent;
            _req$body = req.body, old_password = _req$body.old_password, new_password = _req$body.new_password, confirm_new_password = _req$body.confirm_new_password;
            _context.next = 13;
            return _bcrypt["default"].compare(old_password, user[0].password);
          case 13:
            isPassword = _context.sent;
            if (isPassword) {
              _context.next = 17;
              break;
            }
            req.flash("error", "invalid password");
            return _context.abrupt("return", res.redirect("/auth/get_change_password"));
          case 17:
            if (!(new_password.length < 8)) {
              _context.next = 20;
              break;
            }
            req.flash("error", "New password should be atleast 8 characters");
            return _context.abrupt("return", res.redirect("/auth/get_change_password"));
          case 20:
            if (!(confirm_new_password.length < 8)) {
              _context.next = 23;
              break;
            }
            req.flash("error", "Confirm password should be atleast 8 characters");
            return _context.abrupt("return", res.redirect("/auth/get_change_password"));
          case 23:
            if (!(new_password !== confirm_new_password)) {
              _context.next = 26;
              break;
            }
            req.flash("error", "Password Should Be Same");
            return _context.abrupt("return", res.redirect("/auth/get_change_password"));
          case 26:
            query = {};
            if (user[0].user_group_id == 2) {
              if (user[0].is_password_change == 0) {
                query.is_password_change = "1";
              }
            }
            _context.next = 30;
            return _bcrypt["default"].hash(new_password, 10);
          case 30:
            password = _context.sent;
            query.password = password;
            _context.next = 34;
            return (0, _db["default"])("admin_users").update(query).where({
              id: _admin_id
            });
          case 34:
            req.flash("success", "successfully password changed");
            res.redirect("/home");
            _context.next = 42;
            break;
          case 38:
            _context.prev = 38;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 38]]);
  }));
  return function updateChangePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateChangePassword = updateChangePassword;
var getChangePassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              res.render("auth/change_password");
            } catch (error) {
              console.log(error);
              res.redirect("/home");
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getChangePassword(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getChangePassword = getChangePassword;
var updateProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, currentTokenPayload, _admin_id2, _req$body2, first_name, last_name, mobile_number, alternate_mobile_number, alternate_email, update_user, image;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            token = req.session.token;
            if (token) {
              _context3.next = 5;
              break;
            }
            req.flash("error", "Need To Login First");
            return _context3.abrupt("return", res.redirect("/auth/login"));
          case 5:
            currentTokenPayload = (0, _jwt.parseJwtPayload)(token.token);
            _admin_id2 = currentTokenPayload.user_id;
            _req$body2 = req.body, first_name = _req$body2.first_name, last_name = _req$body2.last_name, mobile_number = _req$body2.mobile_number, alternate_mobile_number = _req$body2.alternate_mobile_number, alternate_email = _req$body2.alternate_email;
            if (first_name) {
              _context3.next = 11;
              break;
            }
            req.flash("error", "First Name is Missing");
            return _context3.abrupt("return", res.redirect("/auth/get_profile"));
          case 11:
            if (last_name) {
              _context3.next = 14;
              break;
            }
            req.flash("error", "Last Name is Missing");
            return _context3.abrupt("return", res.redirect("/auth/get_profile"));
          case 14:
            if (mobile_number) {
              _context3.next = 17;
              break;
            }
            req.flash("error", "Mobile Number is Missing");
            return _context3.abrupt("return", res.redirect("/auth/get_profile"));
          case 17:
            update_user = {
              first_name: first_name,
              last_name: last_name,
              mobile_number: mobile_number
            };
            if (alternate_mobile_number) {
              update_user.alternate_mobile_number = alternate_mobile_number;
            }
            if (alternate_email) {
              update_user.alternate_email = alternate_email;
            }
            if (req.file) {
              image = req.file.destination.slice(1) + "/" + req.file.filename;
              update_user.profile_photo_path = image;
            }
            _context3.next = 23;
            return (0, _db["default"])("admin_users").update(update_user).where({
              id: _admin_id2
            });
          case 23:
            req.flash("success", " Updated Successfully");
            res.redirect("/auth/get_profile");
            _context3.next = 31;
            break;
          case 27:
            _context3.prev = 27;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 27]]);
  }));
  return function updateProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateProfile = updateProfile;
var getProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _admin_id3, admin;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _admin_id3 = req.body.admin_id;
            _context4.next = 4;
            return (0, _db["default"])("admin_users").select("first_name", "last_name", "mobile_number", "alternate_mobile_number", "alternate_email", "profile_photo_path").where({
              id: _admin_id3
            });
          case 4:
            admin = _context4.sent;
            if (admin[0].profile_photo_path) {
              admin[0].profile_photo_path = "http://" + req.headers.host + admin[0].profile_photo_path;
            }
            res.render("auth/profile", {
              user: admin[0]
            });
            _context4.next = 13;
            break;
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getProfile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getProfile = getProfile;
var logoutHandler = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              req.session.destroy();
              res.redirect("/auth/login");
            } catch (error) {
              console.log(error);
              res.redirect("/auth/login");
            }
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function logoutHandler(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.logoutHandler = logoutHandler;
var loginForm = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var token;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            token = req.session.token;
            if (!token) {
              _context6.next = 4;
              break;
            }
            req.flash("error", "cannot login again");
            return _context6.abrupt("return", res.redirect("/home"));
          case 4:
            res.render("auth/login");
          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function loginForm(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.loginForm = loginForm;
var loginHandler = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var _req$body3, email, password, check_user, payload, token;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
            if (!(!email || !password)) {
              _context7.next = 5;
              break;
            }
            req.flash("error", "mandatore field are missing");
            return _context7.abrupt("return", res.redirect("/auth/login"));
          case 5:
            if (!(password.length < 5)) {
              _context7.next = 8;
              break;
            }
            req.flash("error", "Password Must Be atleast 5 Characters");
            return _context7.abrupt("return", res.redirect("/auth/login"));
          case 8:
            _context7.next = 10;
            return (0, _login.checkUser)(email, password);
          case 10:
            check_user = _context7.sent;
            if (check_user.status) {
              _context7.next = 14;
              break;
            }
            req.flash("error", check_user.message);
            return _context7.abrupt("return", res.redirect("/auth/login"));
          case 14:
            payload = {
              user_id: check_user.data.id,
              group_id: check_user.data.user_group_id
            };
            token = (0, _jwt.createToken)(payload);
            if (token.status) {
              req.session.token = token;
            }
            req.flash("error", "Successfully Login");
            return _context7.abrupt("return", res.redirect("/home"));
          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.redirect("/auth/login");
          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 21]]);
  }));
  return function loginHandler(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

// export const getForgotPassword = async(req,res) => {
//   try {
//     const {email,password} = req.body

//     if (!email) {
//       req.flash("error","manatory field is missing")
//     }
//     const password_check = await getPassword(email,password)
//     if (err) {
//       throw err;
//     }
//   } catch (error) {

//   }
// }
exports.loginHandler = loginHandler;
var sendPasswordResetEmail = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var email, transporter, password, new_password, mailOptions;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            email = req.body;
            if (!email) {
              _context8.next = 13;
              break;
            }
            console.log(email);
            transporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              host: "smtp.gmail.com",
              auth: {
                user: 'bhoobalan.gts@gmail.com',
                pass: 'ggvmpjcbdafvwjcg'
              }
            });
            console.log(transporter);
            password = Math.floor(100000000 + Math.random() * 900000000);
            _context8.next = 9;
            return (0, _db["default"])('admin_users').update({
              password: password
            });
          case 9:
            new_password = _context8.sent;
            console.log(new_password);
            mailOptions = {
              from: 'bhoobalan.gts@gmail.com',
              to: 'bhoobalan.gts@gmail.com',
              subject: 'Change Password',
              text: "Your Reset Password ".concat(password)
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          case 13:
            res.render("auth/change_password");
            res.status(200).json({
              status: true,
              message: "message send successfully"
            });
            _context8.next = 21;
            break;
          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](0);
            res.render("auth/change_password");
            res.status(500).json({
              status: false,
              error: _context8.t0
            });
          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 17]]);
  }));
  return function sendPasswordResetEmail(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var updateEmailPassword = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var user, _req$body4, new_password, confirm_new_password, query;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _db["default"])("admin_users").select("user_group_id", "password", "is_password_change").where({
              id: admin_id
            });
          case 3:
            user = _context9.sent;
            _req$body4 = req.body, new_password = _req$body4.new_password, confirm_new_password = _req$body4.confirm_new_password;
            if (!(new_password.length < 8)) {
              _context9.next = 8;
              break;
            }
            req.flash("error", "New password should be atleast 8 characters");
            return _context9.abrupt("return", res.redirect("/auth/get_change_password"));
          case 8:
            if (!(confirm_new_password.length < 8)) {
              _context9.next = 11;
              break;
            }
            req.flash("error", "Confirm password should be atleast 8 characters");
            return _context9.abrupt("return", res.redirect("/auth/get_change_password"));
          case 11:
            if (!(new_password !== confirm_new_password)) {
              _context9.next = 14;
              break;
            }
            req.flash("error", "Password Should Be Same");
            return _context9.abrupt("return", res.redirect("/auth/get_change_password"));
          case 14:
            query = {};
            if (user[0].user_group_id == 2) {
              if (user[0].is_password_change == 0) {
                query.is_password_change = "1";
              }
            }
            _context9.next = 18;
            return (0, _db["default"])("admin_users").update(query).where({
              id: admin_id
            });
          case 18:
            req.flash("success", "successfully password changed");
            res.redirect("/home");
            _context9.next = 26;
            break;
          case 22:
            _context9.prev = 22;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.redirect("/home");
          case 26:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 22]]);
  }));
  return function updateEmailPassword(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();

// export const sendMail = async (req, res, next) => {
//   try {
//     const email = req.body
//     const recovery = await knex.select('*').from('users').where('email')
//     if(error) throw error;

//     let type = "success"
//     let msg = "Email already verified"

//     if(result.length > 0){
//       let token = req.session.token;

//       if (result[0].verify == 0) {
//         let send = sendPasswordResetEmail(email,token)
//         if (send!= '0') {
//           const data = {
//             token: token
//           }
//           await knex.select('*').update('password').where('email')
//           if(error) throw error;

//           type = 'success';
//           msg = 'The verification link has been sent to your email address';
//         }
//         else {
//           type = 'error';
//           msg = 'Something goes to wrong. Please try again';
//       }
//       }
//     }
//     else {
//       console.log('2');
//       type = 'error';
//       msg = 'The Email is not registered with us';

//   }
//   req.flash(type, msg);
//         res.redirect('/home');
//   } catch (error) {

//   }
// }
exports.updateEmailPassword = updateEmailPassword;
var getPasswordRecovery = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            try {
              // console.log("hiiiii")
              res.render("auth/auth_pass_recovery");
            } catch (error) {
              console.log(error);
              res.redirect("/home");
            }
          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function getPasswordRecovery(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();

// export const getPasswordRecovery = async (req, res) => {
//   // let token = req.session.token;

//   if (token) {
//     req.flash("error", "cannot login again");
//     return res.redirect("/home");
//   }
//   res.render("auth/get_password_recovery");
// };
exports.getPasswordRecovery = getPasswordRecovery;