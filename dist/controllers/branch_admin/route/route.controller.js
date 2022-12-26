"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateViewMapping = exports.updateRouteStatus = exports.updateRoute = exports.tommorowRouteMapping = exports.getViewMapping = exports.getUserMapping = exports.getRoute = exports.createRoute = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var updateViewMapping = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var values, router_id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            values = req.body.values;
            router_id = req.query.router_id;
            _context.next = 5;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(values)
            }).where({
              id: router_id
            });
          case 5:
            req.flash("success", "Updated Successfully");
            return _context.abrupt("return", res.redirect("/branch_admin/route/user_mapping?route_id" + router_id));
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.redirect("/home"));
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function updateViewMapping(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateViewMapping = updateViewMapping;
var tommorowRouteMapping = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var admin_id, loading, _req$query, searchKeyword, route_id, users, get_user_details, i, user, tommorow_date, daily_orders, address, _i, _i2;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            _req$query = req.query, searchKeyword = _req$query.searchKeyword, route_id = _req$query.route_id;
            _context2.next = 6;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: route_id
            });
          case 6:
            users = _context2.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context2.next = 11;
              break;
            }
            loading = false;
            req.flash("error", "No User Found");
            return _context2.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 11:
            get_user_details = [];
            i = 0;
          case 13:
            if (!(i < users[0].user_mapping.length)) {
              _context2.next = 21;
              break;
            }
            _context2.next = 16;
            return (0, _db["default"])("user_address").select("user_address.id", "users.name as user_name", "user_address.address", "user_address.landmark", "users.user_unique_id").join("users", "users.id", "=", "user_address.user_id").where({
              "user_address.id": users[0].user_mapping[i]
            });
          case 16:
            user = _context2.sent;
            get_user_details.push(user[0]);
          case 18:
            i++;
            _context2.next = 13;
            break;
          case 21:
            tommorow_date = (0, _moment["default"])(new Date(), "YYYY-MM-DD").add(1, "days");
            console.log(tommorow_date.format("YYYY-MM-DD"));
            _context2.next = 25;
            return (0, _db["default"])("daily_orders").select("user_address_id").where({
              router_id: route_id,
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 25:
            daily_orders = _context2.sent;
            if (!(daily_orders.length == 0)) {
              _context2.next = 29;
              break;
            }
            req.flash("error", "No User Found");
            return _context2.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 29:
            address = [];
            for (_i = 0; _i < daily_orders.length; _i++) {
              address.push(daily_orders[_i].user_address_id);
            }
            console.log(address);
            for (_i2 = 0; _i2 < get_user_details.length; _i2++) {
              console.log(get_user_details[_i2].id);
              if (!address.includes(get_user_details[_i2].id)) {
                get_user_details.splice([_i2], 1);
              }
            }
            loading = false;
            console.log(get_user_details);
            res.render("branch_admin/route/tommorrow_mapping", {
              data: get_user_details,
              loading: loading,
              router_id: route_id
            });
            _context2.next = 42;
            break;
          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.redirect("/home");
          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 38]]);
  }));
  return function tommorowRouteMapping(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.tommorowRouteMapping = tommorowRouteMapping;
var getViewMapping = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var admin_id, loading, _req$query2, searchKeyword, route_id, users, get_user_details, i, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            _req$query2 = req.query, searchKeyword = _req$query2.searchKeyword, route_id = _req$query2.route_id;
            _context3.next = 6;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: route_id
            });
          case 6:
            users = _context3.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context3.next = 11;
              break;
            }
            loading = false;
            req.flash("error", "No User Found");
            return _context3.abrupt("return", res.render("branch_admin/route/view_mapping", {
              data: [],
              loading: loading,
              router_id: route_id
            }));
          case 11:
            get_user_details = [];
            i = 0;
          case 13:
            if (!(i < users[0].user_mapping.length)) {
              _context3.next = 21;
              break;
            }
            _context3.next = 16;
            return (0, _db["default"])("user_address").select("user_address.id", "users.name as user_name", "user_address.address", "user_address.landmark", "users.user_unique_id").join("users", "users.id", "=", "user_address.user_id").where({
              "user_address.id": users[0].user_mapping[i]
            });
          case 16:
            user = _context3.sent;
            get_user_details.push(user[0]);
          case 18:
            i++;
            _context3.next = 13;
            break;
          case 21:
            loading = false;
            console.log(get_user_details);
            res.render("branch_admin/route/view_mapping", {
              data: get_user_details,
              loading: loading,
              router_id: route_id
            });
            _context3.next = 30;
            break;
          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 26]]);
  }));
  return function getViewMapping(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getViewMapping = getViewMapping;
var updateRoute = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, name, city_id, rider_id, id, query;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, name = _req$body.name, city_id = _req$body.city_id, rider_id = _req$body.rider_id, id = _req$body.id;
            if (name) {
              _context4.next = 5;
              break;
            }
            req.flash("error", "Route Name is missing");
            return _context4.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 5:
            query = {};
            query.name = name;

            // if (city_id) {
            //   query.city_id = city_id;
            // }
            if (rider_id) {
              query.rider_id = rider_id;
            }
            _context4.next = 10;
            return (0, _db["default"])("routes").update(query).where({
              id: id
            });
          case 10:
            req.flash("success", "Updated SuccessFully");
            res.redirect("/branch_admin/route/get_route");
            _context4.next = 18;
            break;
          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function updateRoute(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateRoute = updateRoute;
var updateRouteStatus = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, status, id;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, status = _req$body2.status, id = _req$body2.id;
            if (!(status == "1")) {
              _context5.next = 7;
              break;
            }
            _context5.next = 5;
            return (0, _db["default"])("routes").update({
              status: "0"
            }).where({
              id: id
            });
          case 5:
            _context5.next = 9;
            break;
          case 7:
            _context5.next = 9;
            return (0, _db["default"])("routes").update({
              status: "1"
            }).where({
              id: id
            });
          case 9:
            req.flash("success", "Updated SuccessFully");
            res.redirect("/branch_admin/route/get_route");
            _context5.next = 17;
            break;
          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.redirect("/home");
          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));
  return function updateRouteStatus(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateRouteStatus = updateRouteStatus;
var createRoute = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, name, admin_id, city_id, rider_id, query;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body3 = req.body, name = _req$body3.name, admin_id = _req$body3.admin_id, city_id = _req$body3.city_id, rider_id = _req$body3.rider_id;
            if (name) {
              _context6.next = 5;
              break;
            }
            req.flash("error", "Route Name is missing");
            return _context6.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 5:
            // if (!city_id) {
            //   req.flash("error", "City  is missing");
            //   return res.redirect("/branch_admin/route/get_route");
            // }
            query = {};
            if (rider_id) {
              query.rider_id = rider_id;
            }
            query.name = name;

            // query.city_id = city_id
            query.branch_id = admin_id;
            _context6.next = 11;
            return (0, _db["default"])("routes").insert(query);
          case 11:
            req.flash("success", "Successfully Created");
            res.redirect("/branch_admin/route/get_route");
            _context6.next = 19;
            break;
          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.redirect("/home");
          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function createRoute(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.createRoute = createRoute;
var getRoute = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var admin_id, loading, searchKeyword, data_length, search_data_length, cities, is_rider, riders, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context7.next = 17;
              break;
            }
            _context7.next = 8;
            return _db["default"].raw("SELECT id,rider_id FROM routes WHERE branch_id = ".concat(admin_id, " AND name LIKE '%").concat(searchKeyword, "%'"));
          case 8:
            search_data_length = _context7.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context7.next = 15;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Route Found");
            return _context7.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 15:
            _context7.next = 20;
            break;
          case 17:
            _context7.next = 19;
            return (0, _db["default"])("routes").select("id", "rider_id").where({
              branch_id: admin_id
            });
          case 19:
            data_length = _context7.sent;
          case 20:
            _context7.next = 22;
            return (0, _db["default"])("cities").select("id", "name").where({
              status: "1"
            });
          case 22:
            cities = _context7.sent;
            is_rider = [];
            if (data_length.length !== 0) {
              data_length.map(function (data) {
                if (data.rider_id) {
                  is_rider.push(data.rider_id);
                }
              });
            }
            _context7.next = 27;
            return (0, _db["default"])("rider_details").select("id", "name").where({
              status: "1",
              branch_id: admin_id
            }).whereNotIn("id", is_rider);
          case 27:
            riders = _context7.sent;
            if (!(data_length.length === 0)) {
              _context7.next = 31;
              break;
            }
            loading = false;
            return _context7.abrupt("return", res.render("branch_admin/route/get_route", {
              data: data_length,
              searchKeyword: searchKeyword,
              cities: cities,
              riders: riders
            }));
          case 31:
            _context7.next = 33;
            return (0, _helper.getPageNumber)(req, res, data_length, "route/get_route");
          case 33:
            _yield$getPageNumber = _context7.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context7.next = 48;
              break;
            }
            _context7.next = 44;
            return _db["default"].raw("SELECT routes.id,routes.name as route_name,routes.status,routes.rider_id,\n        rider_details.id as rider_id,\n        rider_details.name as rider_name FROM routes \n        LEFT JOIN rider_details ON rider_details.id = routes.rider_id\n        \n        WHERE routes.branch_id = ".concat(admin_id, " \n        AND routes.starting_point LIKE '%").concat(searchKeyword, "%' OR routes.ending_point LIKE '%").concat(searchKeyword, "%' \n        LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 44:
            results = _context7.sent;
            is_search = true;
            _context7.next = 51;
            break;
          case 48:
            _context7.next = 50;
            return _db["default"].raw("SELECT routes.id,routes.name as route_name,routes.status,routes.rider_id,\n        rider_details.id as rider_id,\n        rider_details.name as rider_name FROM routes \n        LEFT JOIN rider_details ON rider_details.id = routes.rider_id\n        \n        WHERE routes.branch_id = ".concat(admin_id, "  LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 50:
            results = _context7.sent;
          case 51:
            data = results[0];
            loading = false;
            res.render("branch_admin/route/get_route", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              cities: cities,
              riders: riders
            });
            _context7.next = 60;
            break;
          case 56:
            _context7.prev = 56;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.redirect("/home");
          case 60:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 56]]);
  }));
  return function getRoute(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getRoute = getRoute;
var getUserMapping = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var admin_id, loading, _req$query3, searchKeyword, _req$query3$route_id, route_id, check_users_id, routes, _yield$getPageNumber2, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, data, is_search;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            _req$query3 = req.query, searchKeyword = _req$query3.searchKeyword, _req$query3$route_id = _req$query3.route_id, route_id = _req$query3$route_id === void 0 ? 1 : _req$query3$route_id;
            check_users_id = [];
            _context8.next = 7;
            return _db["default"].raw("SELECT user_address.user_id,users.name,users.user_unique_id,user_address.address \n      FROM user_address \n      JOIN users ON users.id = user_address.user_id\n      WHERE router_id IS NULL AND branch_id = ".concat(admin_id));
          case 7:
            check_users_id = _context8.sent;
            console.log("asdasdad", check_users_id[0]);
            if (!(check_users_id[0].length === 0)) {
              _context8.next = 12;
              break;
            }
            req.flash("error", "No Users found");
            return _context8.abrupt("return", res.redirect("/branch_admin/route/get_route"));
          case 12:
            _context8.next = 14;
            return (0, _db["default"])("routes").select("name", "id").where({
              id: route_id
            });
          case 14:
            routes = _context8.sent;
            _context8.next = 17;
            return (0, _helper.getPageNumber)(req, res, check_users_id[0], "route/user_mapping");
          case 17:
            _yield$getPageNumber2 = _context8.sent;
            startingLimit = _yield$getPageNumber2.startingLimit;
            page = _yield$getPageNumber2.page;
            resultsPerPage = _yield$getPageNumber2.resultsPerPage;
            numberOfPages = _yield$getPageNumber2.numberOfPages;
            iterator = _yield$getPageNumber2.iterator;
            endingLink = _yield$getPageNumber2.endingLink;
            _context8.next = 26;
            return _db["default"].raw("SELECT user_address.user_id,users.name,users.user_unique_id,user_address.address ,user_address.id as address_id\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id\n      WHERE router_id IS NULL AND branch_id = ".concat(admin_id, " LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 26:
            data = _context8.sent;
            is_search = false;
            loading = false;
            res.render("branch_admin/route/user_mapping", {
              data: data[0],
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes[0],
              router_id: route_id
            });
            _context8.next = 36;
            break;
          case 32:
            _context8.prev = 32;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            res.redirect("/home");
          case 36:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 32]]);
  }));
  return function getUserMapping(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
// export const getUserMapping = async (req, res) => {
//   try {
//     const { admin_id } = req.body;
//     let loading = true;
//     const { searchKeyword, route_id = 1 } = req.query;

//     let data_length = [];

//     const check_users_id = await knex("routes")
//       .select("user_mapping")
//       .where({ id: route_id });

//     if (
//       check_users_id.length === 0 ||
//       check_users_id[0].user_mapping === null
//     ) {
//       loading = false;
//       return res.render("branch_admin/route/user_mapping", {
//         data: data_length,
//         searchKeyword,
//         router_id: route_id,
//       });
//     }

//     let address_ids = check_users_id[0].user_mapping;

//     if (searchKeyword) {
//       const search_data_length = await knex.raw(
//         `SELECT id FROM user_address
//         WHERE id IN ${address_ids}
//         AND user_unique_id LIKE '%${searchKeyword}%'`
//       );
//       // const search_data_length = await knex.raw(
//       //   `SELECT sub.id FROM subscribed_user_details as sub
//       //   JOIN users ON users.id = sub.user_id
//       //   WHERE sub.router_id = ${route_id} AND sub.subscription_status = "subscribed"
//       //   AND users.user_unique_id LIKE '%${searchKeyword}%'`
//       // );

//       data_length = search_data_length[0];

//       if (data_length.length === 0) {
//         loading = false;
//         req.query.searchKeyword = "";
//         req.flash("error", "No User Found");
//         return res.redirect("/branch_admin/route/user_mapping");
//       }
//     } else {
//       data_length = await knex("user_address")
//         .select("id")
//         // .join("users", "users.id", "=", "sub.user_id")
//         .whereIn("id", address_ids);
//     }

//     if (data_length.length === 0) {
//       loading = false;
//       return res.render("branch_admin/route/user_mapping", {
//         data: data_length,
//         searchKeyword,
//         router_id: route_id,
//       });
//     }

//     let {
//       startingLimit,
//       page,
//       resultsPerPage,
//       numberOfPages,
//       iterator,
//       endingLink,
//     } = await getPageNumber(req, res, data_length, "route/user_mapping");

//     let results;
//     let users = [];
//     let is_search = false;
//     if (searchKeyword) {
//       results = await knex.raw(
//         `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//         JOIN users ON users.id = sub.user_id
//         JOIN products on products.id = sub.product_id
//         JOIN unit_types ON unit_types.id = products.unit_type_id
//         JOIN user_address ON user_address.id = sub.user_address_id
//         JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//         WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed" AND
//         users.user_unique_id  LIKE '%${searchKeyword}%'
//         LIMIT ${startingLimit},${resultsPerPage}`
//       );
//       is_search = true;
//     } else {
//       for (let i = 0; i < address_ids.length; i++) {
//         let user = await knex("user_address")
//           .select(
//             "users.id",
//             "users.mobile_number",
//             "users.name as user_name",
//             "user_address.address",
//             "user_address.landmark",
//             "users.user_unique_id"
//           )
//           .join("users", "users.id", "=", "user_address.user_id")
//           .where({ "user_address.id": address_ids[i] });

//         users.push(user[0]);
//         // get_user_details.push(user[0]);
//       }

//       // results = await knex.raw(
//       //   `SELECT users.id as user_id  LIMIT ${startingLimit},${resultsPerPage}`
//       // );
//     }
//     // if (searchKeyword) {
//     //   results = await knex.raw(
//     //     `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//     //     JOIN users ON users.id = sub.user_id
//     //     JOIN products on products.id = sub.product_id
//     //     JOIN unit_types ON unit_types.id = products.unit_type_id
//     //     JOIN user_address ON user_address.id = sub.user_address_id
//     //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//     //     WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed" AND
//     //     users.user_unique_id  LIKE '%${searchKeyword}%'
//     //     LIMIT ${startingLimit},${resultsPerPage}`
//     //   );
//     //   is_search = true;
//     // } else {
//     //   results = await knex.raw(
//     //     `SELECT sub.id,users.name as user_name,user_address.address,user_address.landmark, users.user_unique_id,users.mobile_number,products.name as product_name,products.unit_value,products.price,sub.quantity,unit_types.value,sub.subscription_start_date,sub.customized_days,subscription_type.name as sub_name FROM subscribed_user_details as sub
//     //     JOIN users ON users.id = sub.user_id
//     //     JOIN products on products.id = sub.product_id
//     //     JOIN unit_types ON unit_types.id = products.unit_type_id
//     //     JOIN user_address ON user_address.id = sub.user_address_id
//     //     JOIN subscription_type ON subscription_type.id = sub.subscribe_type_id
//     //     WHERE sub.router_id = ${route_id} AND sub.subscription_status =  "subscribed"  LIMIT ${startingLimit},${resultsPerPage}`
//     //   );
//     // }

//     const data = users;

//     // for (let i = 0; i < data.length; i++) {
//     //   if (data[i].subscription_start_date) {
//     //     data[i].subscription_start_date = data[i].subscription_start_date
//     //       .toString()
//     //       .slice(4, 16);
//     //   }
//     // }

//     loading = false;
//     res.render("branch_admin/route/user_mapping", {
//       data,
//       page,
//       iterator,
//       endingLink,
//       numberOfPages,
//       is_search,
//       searchKeyword,
//       loading,
//       router_id: route_id,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };
exports.getUserMapping = getUserMapping;