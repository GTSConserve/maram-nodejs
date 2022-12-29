"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove_order = exports.get_user_bill = exports.get_user = exports.get_single_bill = exports.get_address = exports.edit_address = exports.edit = exports.delete_user_address = exports.checkAddress = exports.change_plan = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _db = _interopRequireDefault(require("../../services/db.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// export const add_address = async (req,res ) =>
//  {
//     const address = await knex('user_address').insert({user_id,title,address,landmark,type});   // insert user into user table
//          // respond back to request
// ;
//     try{
//         res.json({ success: true, message: 'ok' });
//     }
//      catch (error) {
//       return {
//         status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
//         message: error.body,
//       };
//     }
// }

var get_address = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userId) {
    var getaddress;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db["default"].select("id as address_id", "title", "address", "landmark", "type", "alternate_mobile", "latitude", "longitude").from("user_address").where({
              user_id: userId,
              status: "1"
            });
          case 2:
            getaddress = _context.sent;
            _context.prev = 3;
            return _context.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: getaddress
            });
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              message: _context.t0
            });
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 7]]);
  }));
  return function get_address(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.get_address = get_address;
var edit_address = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user_id, address_id, title, address, landmark, type, alternate_mobile, latitude, longitude) {
    var query, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = {};
            if (title) {
              query.title = title;
            }
            if (address) {
              query.address = address;
            }
            if (landmark) {
              query.landmark = landmark;
            }
            if (type) {
              query.type = type;
            }
            if (alternate_mobile) {
              query.alternate_mobile = alternate_mobile;
            }
            if (latitude) {
              query.latitude = latitude;
            }
            if (longitude) {
              query.longitude = longitude;
            }
            _context2.next = 10;
            return (0, _db["default"])("user_address").update(query).where({
              user_id: user_id,
              id: address_id
            });
          case 10:
            user = _context2.sent;
            console.log(user);
            _context2.prev = 12;
            return _context2.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: user
            });
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](12);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context2.t0
            });
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 16]]);
  }));
  return function edit_address(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();
exports.edit_address = edit_address;
var get_user = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var getuser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db["default"].select("id", "name", "image", "mobile_number", "email", "total_bill_due_Amount", "total_bill_count", "total_address_count", "total_subcription_count", 'total_delivered_product_count', 'rider_status').from("users").where({
              id: id
            });
          case 2:
            getuser = _context3.sent;
            _context3.prev = 3;
            return _context3.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: getuser
            });
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context3.t0
            });
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 7]]);
  }));
  return function get_user(_x11) {
    return _ref3.apply(this, arguments);
  };
}();
exports.get_user = get_user;
var delete_user_address = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(address_id, userId) {
    var deluser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _db["default"])("user_address").update({
              status: "0"
            }).where({
              user_id: userId,
              id: address_id
            });
          case 2:
            deluser = _context4.sent;
            _context4.prev = 3;
            return _context4.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: deluser
            });
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context4.t0
            });
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 7]]);
  }));
  return function delete_user_address(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
exports.delete_user_address = delete_user_address;
var remove_order = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id) {
    var deluser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _db["default"])("orders").where({
              user_id: user_id
            }).del();
          case 2:
            deluser = _context5.sent;
            _context5.prev = 3;
            return _context5.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: deluser
            });
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](3);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context5.t0
            });
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 7]]);
  }));
  return function remove_order(_x14) {
    return _ref5.apply(this, arguments);
  };
}();
exports.remove_order = remove_order;
var edit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, user_id, value) {
    var editorder;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _db["default"])("orders").where({
              id: id,
              user_id: user_id
            }).update({
              value: value
            });
          case 2:
            editorder = _context6.sent;
            _context6.prev = 3;
            return _context6.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: editorder
            });
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context6.t0
            });
          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 7]]);
  }));
  return function edit(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
exports.edit = edit;
var change_plan = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(subscribe_type_id, changeplan_name, start_date) {
    var change, _change, _change2, _change3, _change4, _change5;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!(subscribe_type_id == 1)) {
              _context7.next = 14;
              break;
            }
            if (!(changeplan_name == "alternate")) {
              _context7.next = 9;
              break;
            }
            console.log("hi");
            _context7.next = 6;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 2,
              start_date: start_date,
              status: "plan changed"
            });
          case 6:
            change = _context7.sent;
            _context7.next = 12;
            break;
          case 9:
            _context7.next = 11;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 3,
              start_date: start_date,
              status: "plan changed"
            });
          case 11:
            _change = _context7.sent;
          case 12:
            _context7.next = 35;
            break;
          case 14:
            if (!(subscribe_type_id == 2)) {
              _context7.next = 26;
              break;
            }
            if (!(changeplan_name == "daily")) {
              _context7.next = 21;
              break;
            }
            _context7.next = 18;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 1,
              start_date: start_date,
              status: "plan changed"
            });
          case 18:
            _change2 = _context7.sent;
            _context7.next = 24;
            break;
          case 21:
            _context7.next = 23;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 3,
              start_date: start_date,
              status: "plan changed"
            });
          case 23:
            _change3 = _context7.sent;
          case 24:
            _context7.next = 35;
            break;
          case 26:
            if (!(changeplan_name == "daily")) {
              _context7.next = 32;
              break;
            }
            _context7.next = 29;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 1,
              start_date: start_date,
              status: "plan changed"
            });
          case 29:
            _change4 = _context7.sent;
            _context7.next = 35;
            break;
          case 32:
            _context7.next = 34;
            return (0, _db["default"])("subscribed_user_details").update({
              subscribe_type_id: 2,
              start_date: start_date,
              status: "plan changed"
            });
          case 34:
            _change5 = _context7.sent;
          case 35:
            _context7.next = 41;
            break;
          case 37:
            _context7.prev = 37;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context7.t0
            });
          case 41:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 37]]);
  }));
  return function change_plan(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();
exports.change_plan = change_plan;
var checkAddress = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
    var editorder;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _db["default"])("user_address").select('latitude', 'longitude').where({
              id: id
            });
          case 2:
            editorder = _context8.sent;
            _context8.prev = 3;
            return _context8.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: editorder
            });
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](3);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context8.t0
            });
          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 7]]);
  }));
  return function checkAddress(_x21) {
    return _ref8.apply(this, arguments);
  };
}();
exports.checkAddress = checkAddress;
var get_user_bill = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(userId) {
    var getuser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _db["default"].select("id", "items", "bill_no", "bill_value", "status").from("bill_history").where({
              user_id: userId
            });
          case 2:
            getuser = _context9.sent;
            console.log(getuser);
            _context9.prev = 4;
            return _context9.abrupt("return", {
              status: _responseCode["default"].SUCCESS,
              body: getuser
            });
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](4);
            console.log(_context9.t0);
            return _context9.abrupt("return", {
              status: _responseCode["default"].FAILURE.INTERNAL_SERVER_ERROR,
              error: _context9.t0
            });
          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[4, 8]]);
  }));
  return function get_user_bill(_x22) {
    return _ref9.apply(this, arguments);
  };
}();
exports.get_user_bill = get_user_bill;
var get_single_bill = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            try {} catch (error) {}
          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function get_single_bill() {
    return _ref10.apply(this, arguments);
  };
}();
exports.get_single_bill = get_single_bill;