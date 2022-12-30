"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = exports.update_starttour = exports.update_riderstatus = exports.update_location = exports.update_endtour = exports.updateRiderToken = exports.statusupdate = exports.order_list = exports.logout_rider = exports.locationcheck = exports.insertUser = exports.home_delivery = exports.getsingleorder = exports.get_riderdetails = exports.get_Appcontrol = exports.dashboard = exports.checkPassword = void 0;
var _db = _interopRequireDefault(require("../../services/db.service"));
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var updateRiderToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(refresh_token, user_name) {
    var query;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _db["default"])("rider_details").update({
              refresh_token: refresh_token
            }).where({
              user_name: user_name
            });
          case 2:
            query = _context.sent;
            _context.prev = 3;
            return _context.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
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
  return function updateRiderToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateRiderToken = updateRiderToken;
var checkPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user_name, password) {
    var get_user, isPassword;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])("rider_details").select("password").where({
              user_name: user_name,
              status: "1"
            });
          case 3:
            get_user = _context2.sent;
            console.log(get_user);
            if (!(get_user.length === 0)) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", {
              status: false,
              message: "User Not Found"
            });
          case 7:
            console.log(get_user);

            // const isPassword = '12345678'
            _context2.next = 10;
            return _bcrypt["default"].compare(password, get_user[0].password);
          case 10:
            isPassword = _context2.sent;
            console.log(isPassword);
            if (isPassword) {
              _context2.next = 14;
              break;
            }
            return _context2.abrupt("return", {
              status: false,
              message: "Invalid Password"
            });
          case 14:
            return _context2.abrupt("return", {
              status: true,
              data: get_user[0]
            });
          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              status: false,
              message: "Error at getting user details"
            });
          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return function checkPassword(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.checkPassword = checkPassword;
var userLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(password) {
    var checkPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db["default"].select('*').from('rider_details').where({
              'password': password
            });
          case 2:
            checkPassword = _context3.sent;
            _context3.prev = 3;
            return _context3.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: checkPassword
            });
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context3.t0.message
            });
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 7]]);
  }));
  return function userLogin(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.userLogin = userLogin;
var insertUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(payload, otp, today) {
    var user_query, user_length, generate_id, user_name, password, query;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db["default"].select(['id']).from('rider_details');
          case 2:
            user_query = _context4.sent;
            user_length = user_query.body;
            user_length += 1;
            generate_id = 'MARAM' + user_length;
            user_name = payload.user_name, password = payload.password;
            _context4.next = 9;
            return _db["default"].insert([{
              user_unique_id: generate_id,
              password: password,
              user_name: user_name
              // name:name
              // user_id: userGroup.USER_GROUP_ID,
              // app_version:'1.0',
              // status:'1',
            }]).into('rider_details');
          case 9:
            query = _context4.sent;
            _context4.prev = 10;
            return _context4.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](10);
            return _context4.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context4.t0.message
            });
          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[10, 14]]);
  }));
  return function insertUser(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// get rider app controls 
exports.insertUser = insertUser;
var get_Appcontrol = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var appSetting;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _db["default"].select('key', 'value').from('app_settings');
          case 2:
            appSetting = _context5.sent;
            _context5.prev = 3;
            return _context5.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: appSetting
            });
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](3);
            return _context5.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context5.t0
            });
          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 7]]);
  }));
  return function get_Appcontrol() {
    return _ref5.apply(this, arguments);
  };
}();

// get single rider details 
exports.get_Appcontrol = get_Appcontrol;
var get_riderdetails = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(delivery_partner_id) {
    var getcategories;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _db["default"].select("rider.id as delivery_partner_id", "routes.name as router_name", "rider.address as address", "rider.online_status as online_status", "rider.status as status").from("rider_details as rider").join("routes", "routes.rider_id", "=", "rider.id").where({
              "rider.id": delivery_partner_id
            });
          case 3:
            getcategories = _context6.sent;
            console.log(getcategories);
            return _context6.abrupt("return", {
              status: true,
              body: getcategories
            });
          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              status: _responseCode["default"].FAILURE.DATA_NOT_FOUND,
              message: _context6.t0.message
            });
          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function get_riderdetails(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

// update rider status
exports.get_riderdetails = get_riderdetails;
var update_riderstatus = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(delivery_partner_id, status) {
    var update;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            console.log(status);
            if (!status) {
              _context7.next = 9;
              break;
            }
            _context7.next = 5;
            return (0, _db["default"])("rider_details").update({
              status: status
            }).where({
              id: delivery_partner_id
            });
          case 5:
            update = _context7.sent;
            return _context7.abrupt("return", {
              status: true,
              message: "SuccessFully Updated"
            });
          case 9:
            return _context7.abrupt("return", {
              status: false,
              message: "cannot updated"
            });
          case 10:
            _context7.next = 16;
            break;
          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              status: false,
              message: "Cannot Update the status"
            });
          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function update_riderstatus(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

// update rider location 
exports.update_riderstatus = update_riderstatus;
var update_location = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(delivery_partner_id, latitude, longitude) {
    var riderlocation;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _db["default"])('rider_details').update({
              latitude: latitude,
              longitude: longitude
            }).where({
              id: delivery_partner_id
            });
          case 3:
            riderlocation = _context8.sent;
            return _context8.abrupt("return", {
              status: true,
              data: riderlocation
            });
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context8.t0.message
            });
          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function update_location(_x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

// update start tour 
exports.update_location = update_location;
var update_starttour = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(delivery_partner_id, tour_id, tour_status) {
    var updatetour;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (!(tour_status == 1)) {
              _context9.next = 8;
              break;
            }
            _context9.next = 4;
            return (0, _db["default"])('rider_details').update({
              status: '1'
            }).where({
              id: delivery_partner_id
            });
          case 4:
            updatetour = _context9.sent;
            return _context9.abrupt("return", {
              status: true,
              message: "successfully updated"
            });
          case 8:
            return _context9.abrupt("return", {
              status: false,
              message: "cannot updated"
            });
          case 9:
            _context9.next = 15;
            break;
          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", {
              status: false,
              message: "Cannot Update the status"
            });
          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 11]]);
  }));
  return function update_starttour(_x15, _x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

//  update endtour 
exports.update_starttour = update_starttour;
var update_endtour = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(delivery_partner_id, tour_id, tour_status) {
    var updatetour;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!(tour_status == 2)) {
              _context10.next = 8;
              break;
            }
            _context10.next = 4;
            return (0, _db["default"])('rider_details').update({
              status: '2'
            }).where({
              id: delivery_partner_id
            });
          case 4:
            updatetour = _context10.sent;
            return _context10.abrupt("return", {
              status: true,
              message: "successfully updated"
            });
          case 8:
            return _context10.abrupt("return", {
              status: false,
              message: "cannot updated"
            });
          case 9:
            _context10.next = 15;
            break;
          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            return _context10.abrupt("return", {
              status: false,
              message: "Cannot Update the status"
            });
          case 15:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function update_endtour(_x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// get single order
exports.update_endtour = update_endtour;
var getsingleorder = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(order_id, delivery_partner_id, order_status, router_id) {
    var daily, query1, query2, query3, query4, query5, query6;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return (0, _db["default"])('daily_orders').select('id', 'router_id', 'status', 'total_collective_bottle', 'add_on_order_id', 'user_id', 'subscription_id', 'additional_order_id', "total_qty").where({
              status: order_status,
              id: order_id
            });
          case 3:
            daily = _context11.sent;
            _context11.next = 6;
            return (0, _db["default"])("daily_orders").select("id", "tour_status", "status "
            // "daily_orders.task_name",
            ).where({
              "daily_orders.id": daily[0].id
            });
          case 6:
            query1 = _context11.sent;
            _context11.next = 9;
            return (0, _db["default"])("users").join("user_address", "user_address.user_id", "=", "users.id").select("users.id as user_id", "users.name as user_name", "users.user_unique_id as customer_id", "users.mobile_number as user_mobile", "user_address.address as user_address", "user_address.landmark as landmark", "user_address.latitude as user_latitude", "user_address.longitude as user_longitude").where({
              "users.id": daily[0].user_id
            });
          case 9:
            query2 = _context11.sent;
            _context11.next = 12;
            return (0, _db["default"])('daily_orders').join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id").join("products", "products.id", "=", "subscribed_user_details.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id as product_id", "products.name as product_name", "subscribed_user_details.quantity as quantity", "products.unit_value as unit_value", "unit_types.value as unit_type", "products.price as price", "subscribed_user_details.id as id", "subscribed_user_details.status as status", "daily_orders.id").where({
              "subscribed_user_details.id": daily[0].subscription_id,
              "daily_orders.id": order_id
            });
          case 12:
            query3 = _context11.sent;
            console.log(query3.length);
            _context11.next = 16;
            return (0, _db["default"])('daily_orders').join("additional_orders", "additional_orders.id", "=", "daily_orders.additional_order_id").join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id").join("products", "products.id", "=", "subscribed_user_details.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id as product_id", "products.name as product_name", "additional_orders.quantity as quantity", "products.unit_value", "unit_types.value as unit_type", "products.price", "additional_orders.id as add_id", "additional_orders.status as status", "daily_orders.id").where({
              "additional_orders.id": daily[0].additional_order_id,
              "daily_orders.id": order_id
            });
          case 16:
            query4 = _context11.sent;
            _context11.next = 19;
            return (0, _db["default"])('daily_orders').join("add_on_orders", "add_on_orders.id", "=", "daily_orders.add_on_order_id").join("add_on_order_items", "add_on_order_items.add_on_order_id", "=", "add_on_orders.id").join("products", "products.id", "=", "add_on_order_items.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id as product_id", "products.name as product_name", "add_on_order_items.quantity as quantity", "products.unit_value as unit_value", "unit_types.value as unit_type", "products.price", "add_on_orders.id as order_id", "add_on_orders.id as addon_id", "add_on_order_items.status as status", "daily_orders.id").where({
              "add_on_orders.id": daily[0].add_on_order_id,
              "daily_orders.id": order_id
            });
          case 19:
            query5 = _context11.sent;
            console.log(query5);
            _context11.next = 23;
            return (0, _db["default"])('add_on_order_items').select('id', 'add_on_order_id').where({
              "add_on_order_items.add_on_order_id": daily[0].add_on_order_id,
              status: "delivered"
            });
          case 23:
            query6 = _context11.sent;
            return _context11.abrupt("return", {
              status: true,
              daily: daily,
              query1: query1,
              query2: query2,
              query3: query3,
              query4: query4,
              query5: query5,
              query6: query6,
              data: query5.length
            });
          case 27:
            _context11.prev = 27;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            return _context11.abrupt("return", {
              status: false,
              message: "Cannot get single orders"
            });
          case 31:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 27]]);
  }));
  return function getsingleorder(_x21, _x22, _x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();

// oder status update
exports.getsingleorder = getsingleorder;
var statusupdate = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(user_id, delivery_partner_id, one_liter_count, half_liter_count, order_id, order_status, product, addons, additional_orders) {
    var update, bottle_entry, bottle_entry1, i, subscription, one, j, entry, total_one_liter, sum_total, sum, return1, given_bottle, sum1, _entry, total_half_liter1, _sum_total, _sum, _return, _given_bottle, _sum2, _j, additional_order, one1, _j2, _entry2, _total_one_liter, _sum_total2, _sum3, _return2, _given_bottle2, _sum4, _entry3, _total_half_liter, _sum_total3, _sum5, _return3, _given_bottle3, _sum6, _i, add_on_orders, _i2, add_on_order_items;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return (0, _db["default"])('daily_orders').update({
              status: order_status
            }).where({
              user_id: user_id,
              id: order_id
            });
          case 3:
            update = _context12.sent;
            bottle_entry = [];
            bottle_entry1 = [];
            if (!product) {
              _context12.next = 151;
              break;
            }
            i = 0;
          case 8:
            if (!(i < product.length)) {
              _context12.next = 19;
              break;
            }
            _context12.next = 11;
            return (0, _db["default"])('subscribed_user_details').update({
              subscription_status: order_status
            }).where({
              id: product[i].subscription_id
            });
          case 11:
            subscription = _context12.sent;
            _context12.next = 14;
            return (0, _db["default"])('subscribed_user_details').select("subscribed_user_details.id", "products.unit_value ", "subscribed_user_details.quantity").join("products", "products.id", "=", "subscribed_user_details.product_id").where({
              "subscribed_user_details.id": product[i].subscription_id
            });
          case 14:
            one = _context12.sent;
            bottle_entry.push(one[0]);
          case 16:
            i++;
            _context12.next = 8;
            break;
          case 19:
            j = 0;
          case 20:
            if (!(j < bottle_entry.length)) {
              _context12.next = 67;
              break;
            }
            if (!(bottle_entry[j].unit_value == 1000)) {
              _context12.next = 44;
              break;
            }
            _context12.next = 24;
            return (0, _db["default"])('users').update({
              today_one_liter: bottle_entry[j].quantity
            }).where({
              id: user_id
            });
          case 24:
            entry = _context12.sent;
            _context12.next = 27;
            return (0, _db["default"])('users').select('total_one_liter').where({
              id: user_id
            });
          case 27:
            total_one_liter = _context12.sent;
            console.log(total_one_liter);
            sum_total = 0;
            sum_total += Number(total_one_liter[0].total_one_liter + bottle_entry[j].quantity);
            _context12.next = 33;
            return (0, _db["default"])('users').update({
              total_one_liter: sum_total
            }).where({
              id: user_id
            });
          case 33:
            sum = _context12.sent;
            _context12.next = 36;
            return (0, _db["default"])('users').select('total_one_liter').where({
              id: user_id
            });
          case 36:
            return1 = _context12.sent;
            given_bottle = return1[0].total_one_liter - one_liter_count;
            _context12.next = 40;
            return (0, _db["default"])('users').update({
              one_liter_in_hand: given_bottle
            }).where({
              id: user_id
            });
          case 40:
            sum1 = _context12.sent;
            console.log(given_bottle);
            _context12.next = 64;
            break;
          case 44:
            if (!(bottle_entry[j].unit_value == 500)) {
              _context12.next = 64;
              break;
            }
            _context12.next = 47;
            return (0, _db["default"])('users').update({
              today_half_liter: bottle_entry[j].quantity
            }).where({
              id: user_id
            });
          case 47:
            _entry = _context12.sent;
            _context12.next = 50;
            return (0, _db["default"])('users').select('total_half_liter').where({
              id: user_id
            });
          case 50:
            total_half_liter1 = _context12.sent;
            // console.log(total_one_liter);
            _sum_total = 0;
            _sum_total += Number(total_half_liter1[0].total_half_liter + bottle_entry[j].quantity);
            _context12.next = 55;
            return (0, _db["default"])('users').update({
              total_half_liter: _sum_total
            }).where({
              id: user_id
            });
          case 55:
            _sum = _context12.sent;
            _context12.next = 58;
            return (0, _db["default"])('users').select('total_half_liter').where({
              id: user_id
            });
          case 58:
            _return = _context12.sent;
            _given_bottle = _return[0].total_half_liter - half_liter_count;
            _context12.next = 62;
            return (0, _db["default"])('users').update({
              half_liter_in_hand: _given_bottle
            }).where({
              id: user_id
            });
          case 62:
            _sum2 = _context12.sent;
            console.log(_given_bottle);
          case 64:
            j++;
            _context12.next = 20;
            break;
          case 67:
            if (!(additional_orders.length !== 0)) {
              _context12.next = 150;
              break;
            }
            _j = 0;
          case 69:
            if (!(_j < additional_orders.length)) {
              _context12.next = 80;
              break;
            }
            _context12.next = 72;
            return (0, _db["default"])('additional_orders').update({
              status: order_status
            }).where({
              id: additional_orders[_j].additional_order_id,
              subscription_id: additional_orders[_j].subscription_id
            });
          case 72:
            additional_order = _context12.sent;
            _context12.next = 75;
            return (0, _db["default"])('subscribed_user_details').select("products.unit_value ", "additional_orders.quantity", "subscribed_user_details.id").join("additional_orders", "additional_orders.subscription_id", "=", "subscribed_user_details.id").join("products", "products.id", "=", "subscribed_user_details.product_id").where({
              "additional_orders.id": additional_orders[_j].additional_order_id,
              "subscribed_user_details.id": additional_orders[_j].subscription_id
            });
          case 75:
            one1 = _context12.sent;
            bottle_entry1.push(one1[0]);
          case 77:
            _j++;
            _context12.next = 69;
            break;
          case 80:
            console.log(bottle_entry1);
            _j2 = 0;
          case 82:
            if (!(_j2 < bottle_entry1.length)) {
              _context12.next = 150;
              break;
            }
            if (!(bottle_entry1[_j2].unit_value == 1000)) {
              _context12.next = 107;
              break;
            }
            _context12.next = 86;
            return (0, _db["default"])('users').update({
              today_one_liter: bottle_entry1[_j2].quantity
            }).where({
              id: user_id
            });
          case 86:
            _entry2 = _context12.sent;
            _context12.next = 89;
            return (0, _db["default"])('users').select('total_one_liter').where({
              id: user_id
            });
          case 89:
            _total_one_liter = _context12.sent;
            console.log(_total_one_liter);
            _sum_total2 = 0;
            _sum_total2 += Number(_total_one_liter[0].total_one_liter) + Number(bottle_entry1[_j2].quantity);
            console.log(_sum_total2);
            _context12.next = 96;
            return (0, _db["default"])('users').update({
              total_one_liter: _sum_total2
            }).where({
              id: user_id
            });
          case 96:
            _sum3 = _context12.sent;
            _context12.next = 99;
            return (0, _db["default"])('users').select('total_one_liter').where({
              id: user_id
            });
          case 99:
            _return2 = _context12.sent;
            _given_bottle2 = _return2[0].total_one_liter - one_liter_count;
            _context12.next = 103;
            return (0, _db["default"])('users').update({
              one_liter_in_hand: _given_bottle2
            }).where({
              id: user_id
            });
          case 103:
            _sum4 = _context12.sent;
            console.log(_given_bottle2);
            _context12.next = 130;
            break;
          case 107:
            if (!(bottle_entry1[_j2].unit_value == 500)) {
              _context12.next = 129;
              break;
            }
            _context12.next = 110;
            return (0, _db["default"])('users').update({
              today_half_liter: bottle_entry1[_j2].quantity
            }).where({
              id: user_id
            });
          case 110:
            _entry3 = _context12.sent;
            _context12.next = 113;
            return (0, _db["default"])('users').select('total_half_liter').where({
              id: user_id
            });
          case 113:
            _total_half_liter = _context12.sent;
            // console.log(total_one_liter);
            _sum_total3 = 0;
            _sum_total3 += Number(_total_half_liter[0].total_half_liter + bottle_entry[_j2].quantity);
            _context12.next = 118;
            return (0, _db["default"])('users').update({
              total_half_liter: _sum_total3
            }).where({
              id: user_id
            });
          case 118:
            _sum5 = _context12.sent;
            _context12.next = 121;
            return (0, _db["default"])('users').select('total_half_liter').where({
              id: user_id
            });
          case 121:
            _return3 = _context12.sent;
            _given_bottle3 = _return3[0].total_half_liter - half_liter_count;
            _context12.next = 125;
            return (0, _db["default"])('users').update({
              half_liter_in_hand: _given_bottle3
            }).where({
              id: user_id
            });
          case 125:
            _sum6 = _context12.sent;
            console.log(_given_bottle3);
            _context12.next = 130;
            break;
          case 129:
            return _context12.abrupt("return", {
              status: false,
              message: "no additional_orders product"
            });
          case 130:
            if (!addons) {
              _context12.next = 147;
              break;
            }
            _i = 0;
          case 132:
            if (!(_i < addons.length)) {
              _context12.next = 139;
              break;
            }
            _context12.next = 135;
            return (0, _db["default"])('add_on_orders').update({
              status: order_status
            }).where({
              id: addons[_i].id
            });
          case 135:
            add_on_orders = _context12.sent;
          case 136:
            _i++;
            _context12.next = 132;
            break;
          case 139:
            _i2 = 0;
          case 140:
            if (!(_i2 < addons.length)) {
              _context12.next = 147;
              break;
            }
            _context12.next = 143;
            return (0, _db["default"])('add_on_order_items').update({
              status: order_status
            }).where({
              add_on_order_id: addons[_i2].id
            });
          case 143:
            add_on_order_items = _context12.sent;
          case 144:
            _i2++;
            _context12.next = 140;
            break;
          case 147:
            _j2++;
            _context12.next = 82;
            break;
          case 150:
            return _context12.abrupt("return", {
              status: true
            });
          case 151:
            _context12.next = 157;
            break;
          case 153:
            _context12.prev = 153;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", {
              status: false,
              message: "No data found"
            });
          case 157:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 153]]);
  }));
  return function statusupdate(_x25, _x26, _x27, _x28, _x29, _x30, _x31, _x32, _x33) {
    return _ref12.apply(this, arguments);
  };
}();

// /

// dashboard
exports.statusupdate = statusupdate;
var dashboard = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(delivery_partner_id, date) {
    var route, order, delivery, pending, undelivered;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return (0, _db["default"])('routes').select('id').where({
              rider_id: delivery_partner_id
            });
          case 3:
            route = _context13.sent;
            _context13.next = 6;
            return (0, _db["default"])('daily_orders').select('id').where({
              router_id: route[0].id,
              date: date
            });
          case 6:
            order = _context13.sent;
            _context13.next = 9;
            return (0, _db["default"])('daily_orders').select('id').where({
              router_id: route[0].id,
              date: date,
              status: "delivered"
            });
          case 9:
            delivery = _context13.sent;
            _context13.next = 12;
            return (0, _db["default"])('daily_orders').select('id').where({
              router_id: route[0].id,
              date: date,
              status: "pending"
            });
          case 12:
            pending = _context13.sent;
            _context13.next = 15;
            return (0, _db["default"])('daily_orders').select('id').where({
              router_id: route[0].id,
              date: date,
              status: "undelivered"
            });
          case 15:
            undelivered = _context13.sent;
            return _context13.abrupt("return", {
              status: true,
              data: route[0].id,
              order: order,
              delivery: delivery,
              pending: pending,
              undelivered: undelivered
            });
          case 19:
            _context13.prev = 19;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            return _context13.abrupt("return", {
              status: false,
              message: "No data found"
            });
          case 23:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 19]]);
  }));
  return function dashboard(_x34, _x35) {
    return _ref13.apply(this, arguments);
  };
}();
exports.dashboard = dashboard;
var home_delivery = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(delivery_partner_id) {
    var router, order, delivery, sum, sum1, sum2, sum3, i, delivery1, sum4, _i3;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return (0, _db["default"])('routes').select('id', 'name').where({
              rider_id: delivery_partner_id
            });
          case 3:
            router = _context14.sent;
            _context14.next = 6;
            return (0, _db["default"])('daily_orders').select('id', 'total_collective_bottle', 'status', 'add_on_order_id', 'user_id', 'total_qty').where({
              router_id: router[0].id
            });
          case 6:
            order = _context14.sent;
            _context14.next = 9;
            return (0, _db["default"])('daily_orders').join("users", "users.id", "=", "daily_orders.user_id").select("today_one_liter", "today_half_liter", "one_liter_in_return", "half_liter_in_return").where({
              router_id: router[0].id
            });
          case 9:
            delivery = _context14.sent;
            sum = 0;
            sum1 = 0;
            sum2 = 0;
            sum3 = 0;
            for (i = 0; i < delivery.length; i++) {
              sum += delivery[i].today_one_liter;
              sum1 += delivery[i].today_half_liter;
              sum2 += delivery[i].one_liter_in_return;
              sum2 += delivery[i].half_liter_in_return;
            }
            console.log(sum, sum1);
            _context14.next = 18;
            return (0, _db["default"])('daily_orders').join("add_on_order_items", "add_on_order_items.add_on_order_id", "=", "daily_orders.add_on_order_id").select("quantity").where({
              router_id: router[0].id
            });
          case 18:
            delivery1 = _context14.sent;
            sum4 = 0;
            for (_i3 = 0; _i3 < delivery1.length; _i3++) {
              sum4 += Number(delivery1[_i3].quantity);
            }
            console.log(delivery1);
            return _context14.abrupt("return", {
              status: true,
              router: router,
              order: order,
              delivery: delivery,
              sum: sum,
              sum1: sum1,
              sum2: sum2,
              sum3: sum3,
              sum4: sum4
            });
          case 25:
            _context14.prev = 25;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            return _context14.abrupt("return", {
              status: false,
              message: "No data found"
            });
          case 29:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 25]]);
  }));
  return function home_delivery(_x36) {
    return _ref14.apply(this, arguments);
  };
}();

// order list 
exports.home_delivery = home_delivery;
var order_list = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(delivery_partner_id, status) {
    var router, query3, order, delivery, order1, data, i, _addon, _bottle, _addon2, _user;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return (0, _db["default"])('routes').select('id', 'name').where({
              rider_id: delivery_partner_id
            });
          case 3:
            router = _context15.sent;
            _context15.next = 6;
            return (0, _db["default"])('daily_orders').join("subscribed_user_details", "subscribed_user_details.id", "=", "daily_orders.subscription_id").join("products", "products.id", "=", "subscribed_user_details.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("daily_orders.router_id", "products.unit_value as unit_value", "unit_types.value as unit_type").where({
              "daily_orders.router_id": router[0].id
            });
          case 6:
            query3 = _context15.sent;
            _context15.next = 9;
            return (0, _db["default"])('daily_orders').select('id', 'total_collective_bottle', 'status', 'add_on_order_id', 'user_id', 'total_qty', 'tour_status').where({
              router_id: router[0].id
            });
          case 9:
            order = _context15.sent;
            _context15.next = 12;
            return (0, _db["default"])('daily_orders').select('id').where({
              router_id: router[0].id,
              status: status
            });
          case 12:
            delivery = _context15.sent;
            _context15.next = 15;
            return (0, _db["default"])('daily_orders').select('id', 'total_collective_bottle', 'status', 'add_on_order_id', 'user_id', 'total_qty', 'tour_status').where({
              router_id: router[0].id,
              status: status
            });
          case 15:
            order1 = _context15.sent;
            console.log(order1);
            data = [];
            i = 0;
          case 19:
            if (!(i < order1.length)) {
              _context15.next = 36;
              break;
            }
            _context15.next = 22;
            return (0, _db["default"])('add_on_order_items').select('id').where({
              add_on_order_id: order[0].add_on_order_id,
              status: "delivered"
            });
          case 22:
            _addon = _context15.sent;
            _context15.next = 25;
            return (0, _db["default"])('empty_bottle_tracking').select('status');
          case 25:
            _bottle = _context15.sent;
            _context15.next = 28;
            return (0, _db["default"])('add_on_order_items').select('id').where({
              add_on_order_id: order[0].add_on_order_id,
              status: "undelivered"
            });
          case 28:
            _addon2 = _context15.sent;
            _context15.next = 31;
            return (0, _db["default"])('users').select('name', 'user_unique_id').where({
              id: order[0].user_id
            });
          case 31:
            _user = _context15.sent;
            data.push({
              "order_id": order1[i].id,
              "order_string": "Task " + order1[i].user_id,
              "milk_variation": order1[i].total_qty + " " + query3[0].unit_type,
              "addon_items_delivered": _addon.length,
              "addon_items_undelivered": _addon2.length,
              "user_name": _user[0].name,
              "customer_id": _user[0].user_unique_id,
              "bottle_return": _bottle[0].status,
              "order_status": order[0].status
            });
          case 33:
            i++;
            _context15.next = 19;
            break;
          case 36:
            console.log(data);
            // console.log(router,router1,order,delivery,addon)
            return _context15.abrupt("return", {
              status: true,
              router: router,
              order: order,
              delivery: delivery,
              addon: addon,
              addon1: addon1,
              user: user,
              query3: query3,
              bottle: bottle
            });
          case 40:
            _context15.prev = 40;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);
            return _context15.abrupt("return", {
              status: false,
              message: "No data found"
            });
          case 44:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 40]]);
  }));
  return function order_list(_x37, _x38) {
    return _ref15.apply(this, arguments);
  };
}();

// location check 
exports.order_list = order_list;
var locationcheck = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(delivery_partner_id, order_id) {
    var check, address;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return (0, _db["default"])('rider_details').select('latitude', 'longitude').where({
              id: delivery_partner_id
            });
          case 3:
            check = _context16.sent;
            _context16.next = 6;
            return (0, _db["default"])('daily_orders').join("user_address", "user_address.user_id", "=", "daily_orders.user_id").select('user_address.latitude', 'user_address.longitude').where({
              'daily_orders.id': order_id
            });
          case 6:
            address = _context16.sent;
            console.log(address);
            return _context16.abrupt("return", {
              status: true,
              check: check,
              address: address
            });
          case 11:
            _context16.prev = 11;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0);
            return _context16.abrupt("return", {
              status: false,
              message: "No data found"
            });
          case 15:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 11]]);
  }));
  return function locationcheck(_x39, _x40) {
    return _ref16.apply(this, arguments);
  };
}();

// home delivery details 
// export const home_delivery = async (delivery_partner_id) => {
//   try {
//     const router = await knex('routes').select('id','name').where({rider_id:delivery_partner_id});

//     const order = await knex('daily_orders').select(
//       'id',
//       'total_collective_bottle',
//       'status','add_on_order_id',
//       'user_id','total_qty')
//       .where({router_id:router[0].id});

//     const delivery = await knex('daily_orders')
//     .select('id')
//     .where({router_id:router[0].id});

//   } catch (error) {
//     console.log(error)
//     return{ status: false, message: "No data found" };  
//   }
// }

// rider logout
exports.locationcheck = locationcheck;
var logout_rider = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(delivery_partner_id) {
    var query;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return (0, _db["default"])("rider_details").update({
              status: "0"
            }).where({
              id: delivery_partner_id
            });
          case 3:
            query = _context17.sent;
            return _context17.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: query
            });
          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](0);
            return _context17.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context17.t0.message
            });
          case 10:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 7]]);
  }));
  return function logout_rider(_x41) {
    return _ref17.apply(this, arguments);
  };
}();
exports.logout_rider = logout_rider;