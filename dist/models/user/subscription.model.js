"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.single_subscription = exports.remove_subscription = exports.pause_subscriptiondate = exports.new_subscription = exports.get_subscription_product = exports.get_subcription_order = exports.change_subscriptionplan = exports.change_quantity = void 0;
var _db = _interopRequireDefault(require("../../services/db.service"));
var _moment = _interopRequireDefault(require("moment"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var new_subscription = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userId, subscription_plan_id, product_id, user_address_id, start_date, qty, customized_days) {
    var query, weekdays, store_weekdays, i, j, is_exist_address;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            query = {
              start_date: start_date,
              user_id: userId,
              product_id: product_id,
              user_address_id: user_address_id,
              quantity: qty,
              subscribe_type_id: subscription_plan_id
            };
            if (!(subscription_plan_id == 3)) {
              _context.next = 9;
              break;
            }
            _context.next = 5;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 5:
            weekdays = _context.sent;
            store_weekdays = [];
            for (i = 0; i < customized_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == customized_days[i]) {
                  store_weekdays.push(weekdays[j].id);
                }
              }
            }
            query.customized_days = JSON.stringify(store_weekdays);
          case 9:
            _context.next = 11;
            return (0, _db["default"])("user_address").select("branch_id", "router_id").whereNotNull("branch_id").where({
              user_id: userId,
              id: user_address_id
            });
          case 11:
            is_exist_address = _context.sent;
            console.log(is_exist_address);
            if (is_exist_address.length !== 0) {
              query.branch_id = is_exist_address[0].branch_id;
              query.subscription_status = "branch_pending";
              if (is_exist_address[0].router_id) {
                query.router_id = is_exist_address[0].router_id;
              }
            }

            // const branch_id = await knex("subscribed_user_details")
            //   .select("branch_id", "router_id")
            //   .where({
            //     user_id: userId,
            //     subscription_status: "subscribed",
            //     user_address_id,
            //   });
            // if (branch_id.length !== 0) {
            //   query.branch_id = branch_id[0].branch_id;
            //   query.subscription_status = "branch_pending";
            // }
            _context.next = 16;
            return (0, _db["default"])("subscribed_user_details").insert(query);
          case 16:
            return _context.abrupt("return", {
              status: true
            });
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", {
              status: false,
              message: _context.t0
            });
          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function new_subscription(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();
exports.new_subscription = new_subscription;
var get_subscription_product = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userId) {
    var products;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])("subscribed_user_details AS sub").select("sub.id as subscription_id", "products.name as product_name", "products.image", "products.price", "products.unit_value", "unit_types.value as unit_type", "subscription_type.name as subscription_name", "sub.subscription_status", "sub.quantity").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").join("subscription_type", "subscription_type.id", "=", "sub.subscribe_type_id").orderBy('subscription_id', 'desc').where({
              user_id: userId
            });
          case 3:
            products = _context2.sent;
            if (!(products.length === 0)) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", {
              status: false,
              message: "No Subscription Found"
            });
          case 6:
            return _context2.abrupt("return", {
              status: true,
              data: products
            });
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", {
              status: false,
              message: _context2.t0
            });
          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function get_subscription_product(_x8) {
    return _ref2.apply(this, arguments);
  };
}();
exports.get_subscription_product = get_subscription_product;
var single_subscription = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(userId, sub_id) {
    var products, query, this_month_item_detail;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _db["default"])("subscribed_user_details AS sub").select("sub.id as subscription_id", "sub.customized_days", "sub.subscription_start_date", "sub.subscription_status", "sub.quantity", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value as unit_type", "subscription_type.name as subscription_name", "user_address.address").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").join("subscription_type", "subscription_type.id", "=", "sub.subscribe_type_id").join("user_address", "user_address.id", "=", "sub.user_address_id").where({
              "sub.user_id": userId,
              "sub.id": sub_id
            });
          case 3:
            products = _context3.sent;
            _context3.next = 6;
            return (0, _db["default"])("subscribed_user_details AS sub").select("additional_orders.user_id as id", "additional_orders.date ", "additional_orders.quantity", "additional_orders.status", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value as unit_type").join("additional_orders", "additional_orders.user_id", "=", "sub.user_id").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "sub.user_id": userId,
              "sub.id": sub_id
            });
          case 6:
            query = _context3.sent;
            _context3.next = 9;
            return (0, _db["default"])("empty_bottle_tracking").select("one_liter_in_hand as delivered_orders", "one_liter_in_return as remaining_orders", "half_liter_in_hand as additional_delivered_orders", "one_liter_in_return as additional_remaining_orders");
          case 9:
            this_month_item_detail = _context3.sent;
            if (!(products.length === 0)) {
              _context3.next = 12;
              break;
            }
            return _context3.abrupt("return", {
              status: false,
              message: "No Subscription Found"
            });
          case 12:
            return _context3.abrupt("return", {
              status: true,
              data: products,
              query: query,
              this_month_item_detail: this_month_item_detail
            });
          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              status: false,
              message: _context3.t0
            });
          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function single_subscription(_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
exports.single_subscription = single_subscription;
var get_subcription_order = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user_id, type_id, name, product_id, value) {
    var order;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _db["default"])("orders").join("users", "users.id", "=", "orders.user_id").insert({
              user_id: user_id,
              type_id: type_id,
              name: name,
              product_id: product_id,
              value: value
            });
          case 3:
            order = _context4.sent;
            return _context4.abrupt("return", {
              status: true,
              data: order
            });
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", {
              status: false,
              message: _context4.t0
            });
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function get_subcription_order(_x11, _x12, _x13, _x14, _x15) {
    return _ref4.apply(this, arguments);
  };
}();

// remove subscription 
exports.get_subcription_order = get_subcription_order;
var remove_subscription = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id, subscription_id) {
    var remove;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "unsubscribed"
            }).where({
              user_id: user_id,
              id: subscription_id
            });
          case 3:
            remove = _context5.sent;
            return _context5.abrupt("return", {
              status: true,
              message: "SuccessFully Updated"
            });
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", {
              status: false,
              message: "Cannot Update the Subscription"
            });
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function remove_subscription(_x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();

// change quantity 
exports.remove_subscription = remove_subscription;
var change_quantity = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(userId, subscription_id, quantity) {
    var change;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _db["default"])('subscribed_user_details').update({
              quantity: quantity
            }).where({
              id: subscription_id,
              user_id: userId
            });
          case 3:
            change = _context6.sent;
            return _context6.abrupt("return", {
              status: true,
              message: "SuccessFully Updated"
            });
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", {
              status: false,
              message: "Cannot Update the Subscription"
            });
          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function change_quantity(_x18, _x19, _x20) {
    return _ref6.apply(this, arguments);
  };
}();

// change subscription plan 
exports.change_quantity = change_quantity;
var change_subscriptionplan = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(userId, subscription_id, subscription_plan_id, start_date, customized_days) {
    var query, subscription_status, previous, weekdays, store_weekdays, i, j;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            query = {
              start_date: start_date,
              user_id: userId,
              subscribe_type_id: subscription_plan_id
            };
            _context7.next = 4;
            return (0, _db["default"])('subscribed_user_details').update({
              subscription_status: "change_plan"
            }).where({
              id: subscription_id
            });
          case 4:
            subscription_status = _context7.sent;
            _context7.next = 7;
            return (0, _db["default"])('subscribed_user_details').select("subscribe_type_id").where({
              id: subscription_id
            });
          case 7:
            previous = _context7.sent;
            _context7.next = 10;
            return (0, _db["default"])("weekdays").select("id");
          case 10:
            weekdays = _context7.sent;
            store_weekdays = [];
            for (i = 0; i < customized_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == customized_days[i]) {
                  store_weekdays.push(weekdays[j].id);
                }
              }
            }
            query.customized_days = JSON.stringify(store_weekdays);

            // console.log(query.customized_days)
            // const changeplan = await knex("subscription_users_change_plan").insert({
            //   user_id:userId,
            //   subscription_id:subscription_id,
            //   previous_subscription_type_id:previous[0].subscribe_type_id,
            //   change_subscription_type_id: subscription_plan_id,
            //   start_date:start_date,
            //   customized_days:customized_days
            // })

            // console.log(changeplan)
            return _context7.abrupt("return", {
              status: true,
              message: "Successfully change subscription plan"
            });
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", {
              status: false,
              message: "cannot change plan"
            });
          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function change_subscriptionplan(_x21, _x22, _x23, _x24, _x25) {
    return _ref7.apply(this, arguments);
  };
}();

// pause subscription dates
exports.change_subscriptionplan = change_subscriptionplan;
var pause_subscriptiondate = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userId, subscription_id, dates) {
    var i, subscriptiondate;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            i = 0;
          case 2:
            if (!(i < dates.length)) {
              _context8.next = 9;
              break;
            }
            _context8.next = 5;
            return (0, _db["default"])('pause_dates').insert({
              date: dates[i].date,
              user_id: userId,
              subscription_id: subscription_id
            });
          case 5:
            subscriptiondate = _context8.sent;
          case 6:
            i++;
            _context8.next = 2;
            break;
          case 9:
            return _context8.abrupt("return", {
              status: true,
              message: "your pause dates comformed"
            });
          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", {
              status: false,
              message: "cannot pause date"
            });
          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 12]]);
  }));
  return function pause_subscriptiondate(_x26, _x27, _x28) {
    return _ref8.apply(this, arguments);
  };
}();
exports.pause_subscriptiondate = pause_subscriptiondate;