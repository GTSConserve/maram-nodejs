"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleApprovePO = exports.getPoFormPending = exports.getPoForm = exports.getApprovePO = exports.createPoForm = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _po = require("../../../models/branch_admin/po.controller");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getPoForm = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var admin_id, tommorow_date, check_already_po_generated, daily_orders, _yield$getBothProduct, add_on_products, subscription_products;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            admin_id = req.body.admin_id;
            tommorow_date = (0, _moment["default"])(new Date(), "YYYY-MM-DD").add(1, "days");
            console.log(tommorow_date.format("YYYY-MM-DD"));
            _context.next = 6;
            return (0, _db["default"])("branch_purchase_order").select("id").where({
              branch_id: admin_id,
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 6:
            check_already_po_generated = _context.sent;
            if (!(check_already_po_generated.length !== 0)) {
              _context.next = 10;
              break;
            }
            req.flash("error", "Cannot Send  Again PO For Today");
            return _context.abrupt("return", res.redirect("/home"));
          case 10:
            _context.next = 12;
            return (0, _db["default"])("daily_orders").select("subscription_id", "add_on_order_id").where({
              branch_id: admin_id,
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 12:
            daily_orders = _context.sent;
            _context.next = 15;
            return (0, _po.getBothProducts)(daily_orders);
          case 15:
            _yield$getBothProduct = _context.sent;
            add_on_products = _yield$getBothProduct.add_on_products;
            subscription_products = _yield$getBothProduct.subscription_products;
            // console.log(add_on_products)
            // console.log(subscription_products)
            res.render("branch_admin/po/po_form", {
              add_on_products: add_on_products,
              subscription_products: subscription_products
            });
            _context.next = 25;
            break;
          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));
  return function getPoForm(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPoForm = getPoForm;
var createPoForm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var admin_id, tommorow_date, daily_orders, _yield$getBothProduct2, add_on_products, subscription_products, po_id, add_on_total, sub_total, i, _i;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            admin_id = req.body.admin_id;
            tommorow_date = (0, _moment["default"])(new Date(), "YYYY-MM-DD").add(1, "days");
            console.log(tommorow_date.format("YYYY-MM-DD"));
            _context2.next = 5;
            return (0, _db["default"])("daily_orders").select("subscription_id", "add_on_order_id").where({
              branch_id: admin_id,
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 5:
            daily_orders = _context2.sent;
            _context2.next = 8;
            return (0, _po.getBothProducts)(daily_orders);
          case 8:
            _yield$getBothProduct2 = _context2.sent;
            add_on_products = _yield$getBothProduct2.add_on_products;
            subscription_products = _yield$getBothProduct2.subscription_products;
            _context2.next = 13;
            return (0, _db["default"])("branch_purchase_order").insert({
              branch_id: admin_id,
              date: tommorow_date.format("YYYY-MM-DD")
            });
          case 13:
            po_id = _context2.sent;
            add_on_total = 0;
            sub_total = 0;
            i = 0;
          case 17:
            if (!(i < add_on_products.length)) {
              _context2.next = 24;
              break;
            }
            add_on_total = add_on_total + add_on_products[i].total_qty * add_on_products[i].price;
            _context2.next = 21;
            return (0, _db["default"])("branch_purchase_order_items").insert({
              branch_purchase_order_id: po_id[0],
              branch_id: admin_id,
              product_id: add_on_products[i].id,
              price: add_on_products[i].price,
              qty: add_on_products[i].total_qty,
              unit_value: add_on_products[i].value,
              total_price: add_on_products[i].total_qty * add_on_products[i].price,
              product_type_id: 2
            });
          case 21:
            i++;
            _context2.next = 17;
            break;
          case 24:
            _i = 0;
          case 25:
            if (!(_i < subscription_products.length)) {
              _context2.next = 32;
              break;
            }
            sub_total = sub_total + subscription_products[_i].total_qty * subscription_products[_i].price;
            _context2.next = 29;
            return (0, _db["default"])("branch_purchase_order_items").insert({
              branch_purchase_order_id: po_id[0],
              branch_id: admin_id,
              product_id: subscription_products[_i].id,
              price: subscription_products[_i].price,
              qty: subscription_products[_i].total_qty,
              unit_value: subscription_products[_i].value,
              total_price: subscription_products[_i].total_qty * subscription_products[_i].price,
              product_type_id: 1
            });
          case 29:
            _i++;
            _context2.next = 25;
            break;
          case 32:
            _context2.next = 34;
            return (0, _db["default"])("branch_purchase_order").update({
              grand_total: add_on_total + sub_total
            }).where({
              id: po_id[0]
            });
          case 34:
            // res.redirect("/branch_admin/po/get_po_form")
            res.redirect("/home");
          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function createPoForm(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createPoForm = createPoForm;
var getPoFormPending = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var admin_id, get_products, subscription_products, add_on_products;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            admin_id = req.body.admin_id;
            _context3.next = 4;
            return (0, _db["default"])("branch_purchase_order").select("id").where({
              branch_id: admin_id,
              status: "pending"
            });
          case 4:
            get_products = _context3.sent;
            console.log(get_products);
            if (!(get_products.length === 0)) {
              _context3.next = 9;
              break;
            }
            req.flash("error", "No Pending PO found");
            return _context3.abrupt("return", res.redirect("/home"));
          case 9:
            _context3.next = 11;
            return (0, _db["default"])("branch_purchase_order_items as branch").select("branch.product_type_id", "branch.qty as total_qty", "branch.excess_qty", "branch.unit_value as value", "branch.price", "products.name").join("products", "products.id", "=", "branch.product_id").where({
              "branch.branch_purchase_order_id": get_products[0].id,
              "branch.product_type_id": 1
            });
          case 11:
            subscription_products = _context3.sent;
            _context3.next = 14;
            return (0, _db["default"])("branch_purchase_order_items as branch").select("branch.product_type_id", "branch.qty as total_qty", "branch.excess_qty", "branch.unit_value as value", "branch.price", "products.name").join("products", "products.id", "=", "branch.product_id").where({
              "branch.branch_purchase_order_id": get_products[0].id,
              "branch.product_type_id": 2
            });
          case 14:
            add_on_products = _context3.sent;
            console.log(subscription_products);
            console.log(add_on_products);
            res.render("branch_admin/po/po_pending", {
              subscription_products: subscription_products,
              add_on_products: add_on_products
            });
            _context3.next = 24;
            break;
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function getPoFormPending(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getPoFormPending = getPoFormPending;
var getApprovePO = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var admin_id, getPo, i;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            admin_id = req.body.admin_id;
            _context4.next = 4;
            return (0, _db["default"])("branch_purchase_order as po").select("po.branch_id", "po.id", "po.date", "admin_users.first_name", "zones.name as zone_name").join("admin_users", "admin_users.id", "=", "po.branch_id").join("zones", "zones.id", "=", "admin_users.zone_id").where({
              "po.status": "approved",
              "po.branch_id": admin_id
            });
          case 4:
            getPo = _context4.sent;
            for (i = 0; i < getPo.length; i++) {
              getPo[i].date = (0, _moment["default"])(getPo[i].date).format("YYYY-MM-DD");
            }
            res.render("branch_admin/po/get_po_approved", {
              data: getPo
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
  return function getApprovePO(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getApprovePO = getApprovePO;
var getSingleApprovePO = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var po_id, subscription_products, add_on_products;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            po_id = req.query.po_id;
            _context5.next = 4;
            return (0, _db["default"])("branch_purchase_order_items as branch").select("branch.product_type_id", "branch.qty as total_qty", "branch.excess_qty", "branch.unit_value as value", "branch.price", "products.name").join("products", "products.id", "=", "branch.product_id").where({
              "branch.branch_purchase_order_id": po_id,
              "branch.product_type_id": 1
            });
          case 4:
            subscription_products = _context5.sent;
            _context5.next = 7;
            return (0, _db["default"])("branch_purchase_order_items as branch").select("branch.product_type_id", "branch.qty as total_qty", "branch.excess_qty", "branch.unit_value as value", "branch.price", "products.name").join("products", "products.id", "=", "branch.product_id").where({
              "branch.branch_purchase_order_id": po_id,
              "branch.product_type_id": 2
            });
          case 7:
            add_on_products = _context5.sent;
            res.render("branch_admin/po/get_single_po_approved", {
              subscription_products: subscription_products,
              add_on_products: add_on_products,
              po_id: po_id
            });
            _context5.next = 15;
            break;
          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.redirect("/home"));
          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getSingleApprovePO(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getSingleApprovePO = getSingleApprovePO;