"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDailyTask = exports.getHomePage = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _moment = _interopRequireDefault(require("moment"));
var _helper = require("../../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getHomePage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            res.render("branch_admin/home/home");
            _context.next = 8;
            break;
          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.redirect("/home"));
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function getHomePage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getHomePage = getHomePage;
var updateDailyTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var admin_id, tommorow_date, tommorow_orders, tommorow_subscription_orders, tommorow_add_on_orders, j, i, _i, get_address_id, _i2, _get_address_id, tommorow_additional_orders, _i3, _j, tommorow_paused_users, paused_users, _i4, _j2, dates;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            admin_id = req.body.admin_id; // need to delete(empty) the daily order
            //   const assigned_date = moment(date).format("YYYY-MM-DD");
            tommorow_date = (0, _moment["default"])(new Date(), "YYYY-MM-DD").add(1, "days");
            tommorow_orders = []; //////////////////////////////////////////////////////////////////////////////// Subscription Orders
            _context4.next = 6;
            return (0, _db["default"])("subscribed_user_details").select("id as sub_id", "user_id", "date", "user_address_id", "quantity", "subscribe_type_id", "customized_days").where({
              date: tommorow_date.format("YYYY-MM-DD"),
              branch_id: admin_id,
              subscription_status: "subscribed"
            });
          case 6:
            tommorow_subscription_orders = _context4.sent;
            _context4.next = 9;
            return (0, _db["default"])("add_on_orders").select("user_id", "address_id", "delivery_date", "id as add_on_order_id").where({
              delivery_date: tommorow_date.format("YYYY-MM-DD"),
              status: "pending"
            }).orWhere({
              delivery_date: tommorow_date.format("YYYY-MM-DD"),
              status: "new_order"
            });
          case 9:
            tommorow_add_on_orders = _context4.sent;
            if (!(tommorow_subscription_orders.length === 0 && tommorow_add_on_orders.length === 0)) {
              _context4.next = 14;
              break;
            }
            _context4.next = 13;
            return req.flash("error", "No Customer Found For Tomorrow");
          case 13:
            return _context4.abrupt("return", res.redirect("/home"));
          case 14:
            if (tommorow_add_on_orders.length !== 0 && tommorow_subscription_orders.length !== 0) {
              for (j = 0; j < tommorow_subscription_orders.length; j++) {
                for (i = 0; i < tommorow_add_on_orders.length; i++) {
                  if (tommorow_subscription_orders[j].user_id == tommorow_add_on_orders[i].user_id && tommorow_subscription_orders[j].user_address_id == tommorow_add_on_orders[i].address_id) {
                    tommorow_subscription_orders[j].add_on_order_id = tommorow_add_on_orders[i].add_on_order_id;
                    tommorow_add_on_orders.splice([i], 1);
                  }
                }
              }
            }
            if (!(tommorow_subscription_orders.length !== 0)) {
              _context4.next = 26;
              break;
            }
            _i = 0;
          case 17:
            if (!(_i < tommorow_subscription_orders.length)) {
              _context4.next = 26;
              break;
            }
            _context4.next = 20;
            return (0, _db["default"])("user_address").select("branch_id", "router_id").where({
              id: tommorow_subscription_orders[_i].user_address_id
            });
          case 20:
            get_address_id = _context4.sent;
            console.log(get_address_id);
            tommorow_orders.push({
              branch_id: get_address_id[0].branch_id,
              user_id: tommorow_subscription_orders[_i].user_id,
              date: tommorow_date.format("YYYY-MM-DD"),
              subscription_id: tommorow_subscription_orders[_i].sub_id,
              subscribe_type_id: tommorow_subscription_orders[_i].subscribe_type_id,
              customized_days: tommorow_subscription_orders[_i].customized_days,
              add_on_order_id: tommorow_subscription_orders[_i].add_on_order_id ? tommorow_subscription_orders[_i].add_on_order_id : null,
              router_id: get_address_id[0].router_id,
              user_address_id: tommorow_subscription_orders[_i].user_address_id,
              qty: tommorow_subscription_orders[_i].quantity,
              additional_order_qty: 0,
              additional_order_id: null
            });
          case 23:
            _i++;
            _context4.next = 17;
            break;
          case 26:
            if (!(tommorow_add_on_orders.length !== 0)) {
              _context4.next = 36;
              break;
            }
            _i2 = 0;
          case 28:
            if (!(_i2 < tommorow_add_on_orders.length)) {
              _context4.next = 36;
              break;
            }
            _context4.next = 31;
            return (0, _db["default"])("user_address").select("branch_id", "router_id").where({
              id: tommorow_add_on_orders[_i2].address_id
            });
          case 31:
            _get_address_id = _context4.sent;
            tommorow_orders.push({
              branch_id: _get_address_id[0].branch_id,
              user_id: tommorow_add_on_orders[_i2].user_id,
              date: tommorow_date.format("YYYY-MM-DD"),
              subscription_id: null,
              add_on_order_id: tommorow_add_on_orders[_i2].add_on_order_id,
              router_id: _get_address_id[0].router_id,
              user_address_id: tommorow_add_on_orders[_i2].address_id
            });
          case 33:
            _i2++;
            _context4.next = 28;
            break;
          case 36:
            _context4.next = 38;
            return (0, _db["default"])("additional_orders").select("user_id", "subscription_id", "date", "id as additional_order_id", "quantity as additional_order_qty").where({
              date: tommorow_date.format("YYYY-MM-DD"),
              status: "pending"
            });
          case 38:
            tommorow_additional_orders = _context4.sent;
            if (tommorow_additional_orders.length !== 0) {
              for (_i3 = 0; _i3 < tommorow_additional_orders.length; _i3++) {
                for (_j = 0; _j < tommorow_orders.length; _j++) {
                  if (tommorow_orders[_j].subscription_id == tommorow_additional_orders[_i3].subscription_id) {
                    tommorow_orders[_j].additional_order_qty = Number(tommorow_additional_orders[_i3].additional_order_qty);
                    tommorow_orders[_j].additional_order_id = tommorow_additional_orders[_i3].additional_order_id;
                  }
                }
              }
            }

            ////////////////////////////////////////////////////////////////////////////////////////
            // get tommorow pased dates
            _context4.next = 42;
            return (0, _db["default"])("pause_dates").select("user_id", "subscription_id", "date").where({
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 42:
            tommorow_paused_users = _context4.sent;
            // store a paused user in a array because we need to update the subscribe date to next date
            paused_users = []; // need to check paused date table
            if (tommorow_paused_users.length !== 0) {
              for (_i4 = 0; _i4 < tommorow_paused_users.length; _i4++) {
                for (_j2 = 0; _j2 < tommorow_orders.length; _j2++) {
                  if (tommorow_orders[_j2].subscription_id == tommorow_paused_users[_i4].subscription_id) {
                    if (tommorow_orders[_j2].add_on_order_id == null) {
                      paused_users.push({
                        date: tommorow_orders[_j2].date,
                        subscribe_type_id: tommorow_orders[_j2].subscribe_type_id,
                        subscription_id: tommorow_orders[_j2].subscription_id,
                        customized_days: tommorow_orders[_j2].customized_days
                      });
                      tommorow_orders.splice([_j2], 1);
                    } else {
                      paused_users.push({
                        date: tommorow_orders[_j2].date,
                        subscribe_type_id: tommorow_orders[_j2].subscribe_type_id,
                        subscription_id: tommorow_orders[_j2].subscription_id,
                        customized_days: tommorow_orders[_j2].customized_days
                      });
                      tommorow_orders[_j2].subscription_id = null;
                      delete tommorow_orders[_j2].qty;
                      delete tommorow_orders[_j2].additional_order_qty;
                      delete tommorow_orders[_j2].subscribe_type_id;
                      delete tommorow_orders[_j2].customized_days;
                    }
                  }
                }
              }
            }
            if (!(tommorow_orders.length === 0)) {
              _context4.next = 49;
              break;
            }
            _context4.next = 48;
            return req.flash("error", "No Customer Found For Tomorrow");
          case 48:
            return _context4.abrupt("return", res.redirect("/home"));
          case 49:
            console.log(tommorow_orders);
            _context4.next = 52;
            return tommorow_orders.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
                var date, customized_date;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!data.subscribe_type_id) {
                          _context2.next = 16;
                          break;
                        }
                        if (!(data.subscribe_type_id == "1")) {
                          _context2.next = 5;
                          break;
                        }
                        date = (0, _moment["default"])(data.date, "YYYY-MM-DD").add(1, "days");
                        _context2.next = 14;
                        break;
                      case 5:
                        if (!(data.subscribe_type_id == "2")) {
                          _context2.next = 9;
                          break;
                        }
                        date = (0, _moment["default"])(data.date, "YYYY-MM-DD").add(2, "days");
                        _context2.next = 14;
                        break;
                      case 9:
                        if (!(data.subscribe_type_id == "3")) {
                          _context2.next = 14;
                          break;
                        }
                        _context2.next = 12;
                        return (0, _helper.customizedDay)(data.date, data.customized_days);
                      case 12:
                        customized_date = _context2.sent;
                        date = customized_date;
                      case 14:
                        _context2.next = 16;
                        return (0, _db["default"])("subscribed_user_details").update({
                          date: (0, _moment["default"])(date).format("YYYY-MM-DD HH:mm:ss")
                        }).where({
                          id: data.subscription_id
                        });
                      case 16:
                        if (!data.add_on_order_id) {
                          _context2.next = 19;
                          break;
                        }
                        _context2.next = 19;
                        return (0, _db["default"])("add_on_orders").update({
                          status: "order_placed"
                        }).where({
                          id: data.add_on_order_id
                        });
                      case 19:
                        _context2.next = 21;
                        return (0, _db["default"])("daily_orders").insert({
                          branch_id: data.branch_id,
                          user_id: data.user_id,
                          date: data.date,
                          subscription_id: data.subscription_id,
                          add_on_order_id: data.add_on_order_id,
                          additional_order_id: data.additional_order_id ? data.additional_order_id : null,
                          router_id: data.router_id,
                          user_address_id: data.user_address_id,
                          qty: data.qty ? data.qty : null,
                          additional_order_qty: data.additional_order_qty ? data.additional_order_qty : null,
                          total_qty: data.subscription_id != null ? data.qty !== null && data.additional_order_qty !== null ? Number(data.qty) + (data.additional_order_qty !== null ? Number(data.additional_order_qty) : 0) : null : null
                        });
                      case 21:
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
          case 52:
            if (!(paused_users.length !== 0)) {
              _context4.next = 55;
              break;
            }
            _context4.next = 55;
            return paused_users.map( /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
                var customized_date;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!data.subscribe_type_id) {
                          _context3.next = 16;
                          break;
                        }
                        if (!(data.subscribe_type_id == "1")) {
                          _context3.next = 5;
                          break;
                        }
                        dates = (0, _moment["default"])(data.date, "YYYY-MM-DD").add(1, "days");
                        _context3.next = 14;
                        break;
                      case 5:
                        if (!(data.subscribe_type_id == "2")) {
                          _context3.next = 9;
                          break;
                        }
                        dates = (0, _moment["default"])(data.date, "YYYY-MM-DD").add(2, "days");
                        _context3.next = 14;
                        break;
                      case 9:
                        if (!(data.subscribe_type_id == "3")) {
                          _context3.next = 14;
                          break;
                        }
                        _context3.next = 12;
                        return (0, _helper.customizedDay)(data.date, data.customized_days);
                      case 12:
                        customized_date = _context3.sent;
                        dates = customized_date;
                      case 14:
                        _context3.next = 16;
                        return (0, _db["default"])("subscribed_user_details").update({
                          date: dates.format("YYYY-MM-DD HH:mm:ss")
                        }).where({
                          id: data.subscription_id
                        });
                      case 16:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());
          case 55:
            req.flash("success", "Tomorrow Routes and PO Updated");
            res.redirect("/home");
            _context4.next = 63;
            break;
          case 59:
            _context4.prev = 59;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.redirect("/home"));
          case 63:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 59]]);
  }));
  return function updateDailyTask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// export const updateDailyTask = async (req, res) => {
//   try {
//     const { admin_id } = req.body;
//     // need to delete(empty) the daily order

//     //   const assigned_date = moment(date).format("YYYY-MM-DD");
//     const tommorow_date = moment(new Date(), "YYYY-MM-DD").add(1, "days");

//     const tommorow_subscription_orders = await knex("subscribed_user_details")
//       .select(
//         "id as sub_id",
//         "branch_id",
//         "user_id",
//         "date",
//         "product_id",
//         "router_id",
//         "user_address_id",
//         "quantity",
//         "subscribe_type_id",
//         "customized_days"
//       )
//       .where({
//         date: tommorow_date.format("YYYY-MM-DD"),
//         branch_id: admin_id,
//         subscription_status: "subscribed",
//       });

//       const tommorow_add_on_orders_check_length = await knex("add_on_orders")
//       .select("user_id", "address_id", "delivery_date", "id as add_on_order_id")
//       .where({
//         delivery_date: tommorow_date.format("YYYY-MM-DD"),
//         status: "pending",
//       }).orWhere({
//         delivery_date: tommorow_date.format("YYYY-MM-DD"),
//         status: "new_order",
//       })
//       console.log(tommorow_add_on_orders_check_length)

//     if (tommorow_subscription_orders.length === 0 && tommorow_add_on_orders_check_length.length === 0 ) {
//       console.log("No Customer Found For Tomorrow");
//       await req.flash("error", "No Customer Found For Tomorrow");
//       return res.redirect("/home");
//     }

//     ////////////////////////////////////////////////////////////////////////////////////////
//     // additionla orders
//     const tommorow_additional_orders = await knex("additional_orders")
//       .select(
//         "user_id",
//         "subscription_id",
//         "date",
//         "id",
//         "quantity as additional_qty"
//       )
//       .where({ date: tommorow_date.format("YYYY-MM-DD"), status: "pending" });

//     if (tommorow_additional_orders.length !== 0) {
//       for (let i = 0; i < tommorow_additional_orders.length; i++) {
//         for (let j = 0; j < tommorow_subscription_orders.length; j++) {
//           if (
//             tommorow_subscription_orders[j].sub_id ==
//             tommorow_additional_orders[i].subscription_id
//           ) {
//             tommorow_subscription_orders[j].additional_order_id =
//               tommorow_additional_orders[j].id;
//             tommorow_subscription_orders[j].additional_qty =
//               tommorow_additional_orders[j].additional_qty;
//           }
//         }
//       }
//     }

//     ////////////////////////////////////////////////////////////////////////////////////////
//     // get tommorow pased dates
//     const tommorow_paused_users = await knex("pause_dates")
//       .select("user_id", "subscription_id", "date")
//       .where({ date: tommorow_date.format("YYYY-MM-DD") });

//     let paused_customers = [];

//     // need to check paused date table
//     if (tommorow_paused_users.length !== 0) {
//       for (let i = 0; i < tommorow_paused_users.length; i++) {
//         for (let j = 0; j < tommorow_subscription_orders.length; j++) {
//           if (
//             tommorow_subscription_orders[j].sub_id ==
//             tommorow_paused_users[i].subscription_id
//           ) {
//             paused_customers.push(tommorow_subscription_orders[j]);

//             tommorow_subscription_orders.splice([j], 1);
//           }
//         }
//       }
//     }

//     /////////////////////////////////////////////////////////////////////////////////////////////
//     // need to add add_on_product id in daily order table
//     const tommorow_add_on_orders = await knex("add_on_orders")
//       .select("user_id", "address_id", "delivery_date", "id as add_on_order_id")
//       .where({
//         delivery_date: tommorow_date.format("YYYY-MM-DD"),
//         status: "pending",
//       });
//       console.log(tommorow_add_on_orders)

//     // checking add on orders and subscription product
//     if (tommorow_add_on_orders.length !== 0) {
//       for (let i = 0; i < tommorow_add_on_orders.length; i++) {
//         for (let j = 0; j < tommorow_subscription_orders.length; j++) {
//           if (
//             tommorow_subscription_orders[j].user_id ==
//               tommorow_add_on_orders[i].user_id &&
//             tommorow_subscription_orders[j].user_address_id ==
//               tommorow_add_on_orders[i].address_id
//           ) {
//             tommorow_subscription_orders[j].add_on_order_id =
//               tommorow_add_on_orders[i].add_on_order_id;

//             tommorow_add_on_orders.splice([i], 1);
//           }
//         }

//         const get_address_id = await knex("user_address")
//           .select("branch_id", "router_id")
//           .where({ id: tommorow_add_on_orders[i].address_id });

//         tommorow_subscription_orders.push({
//           branch_id: get_address_id[0].branch_id,
//           user_id: tommorow_add_on_orders[i].user_id,
//           user_address_id: tommorow_add_on_orders[i].address_id,
//           date: tommorow_add_on_orders[i].delivery_date,
//           add_on_order_id: tommorow_add_on_orders[i].add_on_order_id,
//           router_id: get_address_id[0].router_id,
//         });
//       }
//     }

//     // console.log("tommorow customers");
//     // console.log(tommorow_subscription_orders);
//     // console.log("paused customers");
//     // console.log(paused_customers);

//     await tommorow_subscription_orders.map(async (data) => {
//       // data.date = moment(data.date, "YYYY-MM-DD")

//       // need to get rider id based on router id
//       // let rider_id = await knex("routes")
//       //   .select("rider_id")
//       //   .where({ id: data.router_id });

//       // before update the date need to check that if next update date is availble in paused date is it availble then choose another date

//       let date;

//       // before update the date nned to check the PO is raised or not (check the previous PO if no PO raised then date should not be updated)

//       // for noraml subscription
//       if (data.subscribe_type_id) {
//         if (data.subscribe_type_id == "1") {
//           date = moment(data.date, "YYYY-MM-DD").add(1, "days");
//         } else if (data.subscribe_type_id == "2") {
//           date = moment(data.date, "YYYY-MM-DD").add(2, "days");
//         } else if (data.subscribe_type_id == "3") {
//           const customized_date = await customizedDay(
//             data.date,
//             data.customized_days
//           );

//           date = customized_date;
//         }

//         // update the date in sub user details and insert the data ro daily orders
//         await knex("subscribed_user_details")
//           .update({ date: date.format("YYYY-MM-DD HH:mm:ss") })
//           .where({ id: data.sub_id });
//       }

//       if (data.add_on_order_id) {
//         await knex("add_on_orders")
//           .update({ status: "assigned" })
//           .where({ id: data.add_on_order_id });
//       }

//       await knex("daily_orders").insert({
//         branch_id: admin_id,
//         user_id: data.user_id,
//         user_address_id: data.user_address_id,
//         date: data.date,
//         router_id: data.router_id,
//         // product_id: data.product_id && data.product_id,
//         add_on_order_id: data.add_on_order_id && data.add_on_order_id,
//         additional_order_id:
//           data.additional_order_id && data.additional_order_id,
//         subscription_id: data.sub_id && data.sub_id,
//         qty: data.quantity && data.quantity,
//         additional_order_qty: data.additional_qty && data.additional_qty,
//         total_qty:
//           data.additional_qty &&
//           Number(data.additional_qty) + Number(data.quantity),
//         //       rider_id: rider_id[0].rider_id,
//       });
//       //     rider_id = "";
//     });

//     // for paused customers need to update the date in subscribed user table
//     // if (paused_customers.length !== 0) {
//     //   let date;
//     //   paused_customers.map(async (data) => {
//     //     if (data.subscribe_type_id) {
//     //       if (data.subscribe_type_id == "1") {
//     //         date = moment(data.date, "YYYY-MM-DD").add(1, "days");
//     //       } else if (data.subscribe_type_id == "2") {
//     //         date = moment(data.date, "YYYY-MM-DD").add(2, "days");
//     //       } else if (data.subscribe_type_id == "3") {
//     //         const customized_date = await customizedDay(
//     //           data.date,
//     //           data.customized_days
//     //         );

//     //         date = customized_date;
//     //       }

//     //       // update the date in sub user details and insert the data ro daily orders
//     //       await knex("subscribed_user_details")
//     //         .update({ date: date.format("YYYY-MM-DD HH:mm:ss") })
//     //         .where({ id: data.sub_id });
//     //     }
//     //   });
//     // }
//     req.flash("success", "Tomorrow Routes and PO Updated");
//     res.redirect("/home");
//   } catch (error) {
//     console.log(error);
//     return res.redirect("/home");
//   }
// };
exports.updateDailyTask = updateDailyTask;