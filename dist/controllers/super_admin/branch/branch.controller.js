"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChangePassword = exports.updateBranchStatus = exports.updateBranch = exports.getZones = exports.getReceivedBill = exports.getPendingBill = exports.getCompletedBill = exports.getBranchAdmin = exports.createGenerateBill = exports.createBranchAdmin = exports.approveBill = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _jwt = require("../../../services/jwt.service");
var _helper = require("../../../utils/helper.util");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var approveBill = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var bill_id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bill_id = req.body.bill_id;
            _context.next = 4;
            return (0, _db["default"])("branch_bills").update({
              payment_status: "completed",
              completed_date: (0, _moment["default"])().format("YYYY-MM-DD")
            }).where({
              id: bill_id
            });
          case 4:
            req.flash("success", "Approved SuccessFully");
            res.redirect("/super_admin/branch/get_received_bill");
            _context.next = 12;
            break;
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function approveBill(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.approveBill = approveBill;
var createGenerateBill = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var branch_id, get_bills, total_amount, j;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            branch_id = req.body.branch_id;
            _context2.next = 4;
            return (0, _db["default"])("branch_purchase_order").select("grand_total", "is_bill_generated").where({
              branch_id: branch_id,
              is_bill_generated: "0"
            });
          case 4:
            get_bills = _context2.sent;
            total_amount = 0;
            for (j = 0; j < get_bills.length; j++) {
              total_amount += Number(get_bills[j].grand_total);
            }
            _context2.next = 9;
            return (0, _db["default"])("branch_purchase_order").update({
              is_bill_generated: "1"
            }).where({
              branch_id: branch_id
            });
          case 9:
            _context2.next = 11;
            return (0, _db["default"])("branch_bills").insert({
              branch_id: branch_id,
              generated_date: (0, _moment["default"])().format("YYYY-MM-DD"),
              grand_total: total_amount
            });
          case 11:
            req.flash("success", "Bill Generated SuccessFully");
            res.redirect("/super_admin/branch/get_branch_admin");
            _context2.next = 19;
            break;
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.redirect("/home");
          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function createGenerateBill(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createGenerateBill = createGenerateBill;
var getPendingBill = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var loading, searchKeyword, data_length, search_data_length, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, i;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context3.next = 16;
              break;
            }
            _context3.next = 7;
            return _db["default"].raw("SELECT branch_bills.id FROM branch_bills\n            JOIN admin_users ON admin_users.id = branch_bills.branch_id\n          WHERE branch_bills.payment_status = \"pending\" AND  admin_users.first_name LIKE '%".concat(searchKeyword, "%'"));
          case 7:
            search_data_length = _context3.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context3.next = 14;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Branch Found");
            return _context3.abrupt("return", res.redirect("/super_admin/branch/get_pending_bill"));
          case 14:
            _context3.next = 19;
            break;
          case 16:
            _context3.next = 18;
            return (0, _db["default"])("branch_bills").select("id").where({
              "payment_status": "pending"
            });
          case 18:
            data_length = _context3.sent;
          case 19:
            if (!(data_length.length === 0)) {
              _context3.next = 22;
              break;
            }
            loading = false;
            return _context3.abrupt("return", res.render("super_admin/bills/pending_bills", {
              data: data_length,
              searchKeyword: searchKeyword
            }));
          case 22:
            _context3.next = 24;
            return (0, _helper.getPageNumber)(req, res, data_length, "branch/get_pending_bill");
          case 24:
            _yield$getPageNumber = _context3.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context3.next = 39;
              break;
            }
            _context3.next = 35;
            return _db["default"].raw("SELECT branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name\n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"pending\" AND\n          admin_users.first_name LIKE '%".concat(searchKeyword, "%' LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 35:
            results = _context3.sent;
            is_search = true;
            _context3.next = 42;
            break;
          case 39:
            _context3.next = 41;
            return _db["default"].raw("SELECT branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name \n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"pending\"\n          LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 41:
            results = _context3.sent;
          case 42:
            data = results[0];
            for (i = 0; i < data.length; i++) {
              data[i].generated_date = (0, _moment["default"])(data[i].generated_date).format("DD-MM-YYYY");
            }
            console.log(data);
            loading = false;
            res.render("super_admin/bills/pending_bills", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading
            });
            _context3.next = 53;
            break;
          case 49:
            _context3.prev = 49;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 53:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 49]]);
  }));
  return function getPendingBill(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getPendingBill = getPendingBill;
var getReceivedBill = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var loading, searchKeyword, data_length, search_data_length, _yield$getPageNumber2, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, i;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context4.next = 16;
              break;
            }
            _context4.next = 7;
            return _db["default"].raw("SELECT branch_bills.id FROM branch_bills\n            JOIN admin_users ON admin_users.id = branch_bills.branch_id\n          WHERE branch_bills.payment_status = \"payed\" AND  admin_users.first_name LIKE '%".concat(searchKeyword, "%'"));
          case 7:
            search_data_length = _context4.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context4.next = 14;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Branch Found");
            return _context4.abrupt("return", res.redirect("/super_admin/branch/get_received_bill"));
          case 14:
            _context4.next = 19;
            break;
          case 16:
            _context4.next = 18;
            return (0, _db["default"])("branch_bills").select("id").where({
              "payment_status": "payed"
            });
          case 18:
            data_length = _context4.sent;
          case 19:
            if (!(data_length.length === 0)) {
              _context4.next = 22;
              break;
            }
            loading = false;
            return _context4.abrupt("return", res.render("super_admin/bills/received_bills", {
              data: data_length,
              searchKeyword: searchKeyword
            }));
          case 22:
            _context4.next = 24;
            return (0, _helper.getPageNumber)(req, res, data_length, "branch/get_received_bill");
          case 24:
            _yield$getPageNumber2 = _context4.sent;
            startingLimit = _yield$getPageNumber2.startingLimit;
            page = _yield$getPageNumber2.page;
            resultsPerPage = _yield$getPageNumber2.resultsPerPage;
            numberOfPages = _yield$getPageNumber2.numberOfPages;
            iterator = _yield$getPageNumber2.iterator;
            endingLink = _yield$getPageNumber2.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context4.next = 39;
              break;
            }
            _context4.next = 35;
            return _db["default"].raw("SELECT branch_bills.id, branch_bills.generated_date, branch_bills.payed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name\n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"payed\" AND\n          admin_users.first_name LIKE '%".concat(searchKeyword, "%' LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 35:
            results = _context4.sent;
            is_search = true;
            _context4.next = 42;
            break;
          case 39:
            _context4.next = 41;
            return _db["default"].raw("SELECT  branch_bills.id, branch_bills.generated_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name \n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"payed\"\n          LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 41:
            results = _context4.sent;
          case 42:
            data = results[0];
            for (i = 0; i < data.length; i++) {
              data[i].generated_date = (0, _moment["default"])(data[i].generated_date).format("DD-MM-YYYY");
              data[i].payed_date = (0, _moment["default"])(data[i].payed_date).format("DD-MM-YYYY");
            }
            console.log(data);
            loading = false;
            res.render("super_admin/bills/received_bills", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading
            });
            _context4.next = 53;
            break;
          case 49:
            _context4.prev = 49;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 53:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 49]]);
  }));
  return function getReceivedBill(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getReceivedBill = getReceivedBill;
var getCompletedBill = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var loading, searchKeyword, data_length, search_data_length, _yield$getPageNumber3, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, i;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context5.next = 16;
              break;
            }
            _context5.next = 7;
            return _db["default"].raw("SELECT branch_bills.id FROM branch_bills\n            JOIN admin_users ON admin_users.id = branch_bills.branch_id\n          WHERE branch_bills.payment_status = \"completed\" AND  admin_users.first_name LIKE '%".concat(searchKeyword, "%'"));
          case 7:
            search_data_length = _context5.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context5.next = 14;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Branch Found");
            return _context5.abrupt("return", res.redirect("/super_admin/branch/get_completed_bill"));
          case 14:
            _context5.next = 19;
            break;
          case 16:
            _context5.next = 18;
            return (0, _db["default"])("branch_bills").select("id").where({
              "payment_status": "completed"
            });
          case 18:
            data_length = _context5.sent;
          case 19:
            if (!(data_length.length === 0)) {
              _context5.next = 22;
              break;
            }
            loading = false;
            return _context5.abrupt("return", res.render("super_admin/bills/completed_bills", {
              data: data_length,
              searchKeyword: searchKeyword
            }));
          case 22:
            _context5.next = 24;
            return (0, _helper.getPageNumber)(req, res, data_length, "branch/get_completed_bill");
          case 24:
            _yield$getPageNumber3 = _context5.sent;
            startingLimit = _yield$getPageNumber3.startingLimit;
            page = _yield$getPageNumber3.page;
            resultsPerPage = _yield$getPageNumber3.resultsPerPage;
            numberOfPages = _yield$getPageNumber3.numberOfPages;
            iterator = _yield$getPageNumber3.iterator;
            endingLink = _yield$getPageNumber3.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context5.next = 39;
              break;
            }
            _context5.next = 35;
            return _db["default"].raw("SELECT branch_bills.generated_date, branch_bills.payed_date,branch_bills.completed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name\n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"completed\" AND\n          admin_users.first_name LIKE '%".concat(searchKeyword, "%' LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 35:
            results = _context5.sent;
            is_search = true;
            _context5.next = 42;
            break;
          case 39:
            _context5.next = 41;
            return _db["default"].raw("SELECT branch_bills.generated_date,branch_bills.completed_date,branch_bills.payment_status,branch_bills.grand_total,branch_bills.branch_id,\n          admin_users.first_name as branch_name \n          FROM branch_bills\n          JOIN admin_users ON admin_users.id = branch_bills.branch_id \n          WHERE branch_bills.payment_status = \"completed\"\n          LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 41:
            results = _context5.sent;
          case 42:
            data = results[0];
            for (i = 0; i < data.length; i++) {
              data[i].generated_date = (0, _moment["default"])(data[i].generated_date).format("DD-MM-YYYY");
              data[i].payed_date = (0, _moment["default"])(data[i].payed_date).format("DD-MM-YYYY");
              data[i].completed_date = (0, _moment["default"])(data[i].completed_date).format("DD-MM-YYYY");
            }
            console.log(data);
            loading = false;
            res.render("super_admin/bills/completed_bills", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading
            });
            _context5.next = 53;
            break;
          case 49:
            _context5.prev = 49;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.redirect("/home");
          case 53:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 49]]);
  }));
  return function getCompletedBill(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getCompletedBill = getCompletedBill;
var updateBranch = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body, zone_id, id, mobile_number, city_id, incharge_name, query;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body = req.body, zone_id = _req$body.zone_id, id = _req$body.id, mobile_number = _req$body.mobile_number, city_id = _req$body.city_id, incharge_name = _req$body.incharge_name;
            console.log(req.body, "some");
            if (zone_id) {
              _context6.next = 6;
              break;
            }
            req.flash("error", "Zone is missing");
            return _context6.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 6:
            if (mobile_number) {
              _context6.next = 9;
              break;
            }
            req.flash("error", "mobile number is missing");
            return _context6.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 9:
            query = {}; // if (city_id) {
            //   query.city_id = city_id;
            // }
            query.incharge_name = incharge_name;
            query.zone_id = zone_id;
            query.mobile_number = mobile_number;
            _context6.next = 15;
            return (0, _db["default"])("admin_users").update(query).where({
              id: id
            });
          case 15:
            req.flash("success", "Updated SuccessFully");
            res.redirect("/super_admin/branch/get_branch_admin");
            _context6.next = 23;
            break;
          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            res.redirect("/home");
          case 23:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 19]]);
  }));
  return function updateBranch(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateBranch = updateBranch;
var updateBranchStatus = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, status, id;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body2 = req.body, status = _req$body2.status, id = _req$body2.id;
            if (!(status == "1")) {
              _context7.next = 7;
              break;
            }
            _context7.next = 5;
            return (0, _db["default"])("admin_users").update({
              status: "0"
            }).where({
              id: id
            });
          case 5:
            _context7.next = 9;
            break;
          case 7:
            _context7.next = 9;
            return (0, _db["default"])("admin_users").update({
              status: "1"
            }).where({
              id: id
            });
          case 9:
            req.flash("success", "Updated SuccessFully");
            res.redirect("/super_admin/branch/get_branch_admin");
            _context7.next = 17;
            break;
          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.redirect("/home");
          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function updateBranchStatus(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateBranchStatus = updateBranchStatus;
var createBranchAdmin = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body3, name, email, password, location, mobile_number, zone_id, incharge_name, hash_password;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, password = _req$body3.password, location = _req$body3.location, mobile_number = _req$body3.mobile_number, zone_id = _req$body3.zone_id, incharge_name = _req$body3.incharge_name;
            if (name) {
              _context8.next = 5;
              break;
            }
            req.flash("error", "Name is missing");
            return _context8.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 5:
            if (email) {
              _context8.next = 8;
              break;
            }
            req.flash("error", "email is missing");
            return _context8.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 8:
            if (password) {
              _context8.next = 11;
              break;
            }
            req.flash("error", "password is missing");
            return _context8.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 11:
            if (mobile_number) {
              _context8.next = 14;
              break;
            }
            req.flash("error", "mobile number is missing");
            return _context8.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 14:
            if (!(password.length < 8)) {
              _context8.next = 17;
              break;
            }
            req.flash("error", "password Should be atleast 8 characters");
            return _context8.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 17:
            _context8.next = 19;
            return _bcrypt["default"].hash(password, 10);
          case 19:
            hash_password = _context8.sent;
            _context8.next = 22;
            return (0, _db["default"])("admin_users").insert({
              user_group_id: "2",
              first_name: name,
              password: hash_password,
              // location,
              mobile_number: mobile_number,
              email: email,
              zone_id: zone_id,
              incharge_name: incharge_name
            });
          case 22:
            req.flash("success", "Successfully Created");
            res.redirect("/super_admin/branch/get_branch_admin");
            _context8.next = 30;
            break;
          case 26:
            _context8.prev = 26;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            res.redirect("/home");
          case 30:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 26]]);
  }));
  return function createBranchAdmin(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.createBranchAdmin = createBranchAdmin;
var getBranchAdmin = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var loading, searchKeyword, data_length, search_data_length, zones, cities, _yield$getPageNumber4, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, total_amount, i, get_bills, j;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context9.next = 16;
              break;
            }
            _context9.next = 7;
            return _db["default"].raw("SELECT id FROM admin_users WHERE user_group_id = \"2\" AND  first_name LIKE '%".concat(searchKeyword, "%'"));
          case 7:
            search_data_length = _context9.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context9.next = 14;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User Found");
            return _context9.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 14:
            _context9.next = 19;
            break;
          case 16:
            _context9.next = 18;
            return (0, _db["default"])("admin_users").select("id").where({
              user_group_id: "2"
            });
          case 18:
            data_length = _context9.sent;
          case 19:
            _context9.next = 21;
            return (0, _db["default"])("zones").select("id", "name", "city_id").where({
              status: "1"
            });
          case 21:
            zones = _context9.sent;
            _context9.next = 24;
            return (0, _db["default"])("cities").select("id", "name").where({
              status: "1"
            });
          case 24:
            cities = _context9.sent;
            if (!(data_length.length === 0)) {
              _context9.next = 28;
              break;
            }
            loading = false;
            return _context9.abrupt("return", res.render("super_admin/branch/branch", {
              data: data_length,
              searchKeyword: searchKeyword,
              zones: zones,
              cities: cities
            }));
          case 28:
            _context9.next = 30;
            return (0, _helper.getPageNumber)(req, res, data_length, "branch/branch");
          case 30:
            _yield$getPageNumber4 = _context9.sent;
            startingLimit = _yield$getPageNumber4.startingLimit;
            page = _yield$getPageNumber4.page;
            resultsPerPage = _yield$getPageNumber4.resultsPerPage;
            numberOfPages = _yield$getPageNumber4.numberOfPages;
            iterator = _yield$getPageNumber4.iterator;
            endingLink = _yield$getPageNumber4.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context9.next = 45;
              break;
            }
            _context9.next = 41;
            return _db["default"].raw("SELECT admin_users.id,admin_users.first_name,admin_users.location,admin_users.mobile_number,admin_users.email,admin_users.status,admin_users.password,admin_users.is_password_change,zones.name as zone_name,zones.id as zone_id,zones.city_id as zone_city_id, cities.id as city_id,cities.name as city_name, admin_users.incharge_name FROM admin_users \n        JOIN zones ON zones.id = admin_users.zone_id \n        JOIN cities ON cities.id = zones.city_id\n        WHERE admin_users.user_group_id = \"2\" AND admin_users.first_name LIKE '%".concat(searchKeyword, "%' LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 41:
            results = _context9.sent;
            is_search = true;
            _context9.next = 48;
            break;
          case 45:
            _context9.next = 47;
            return _db["default"].raw("SELECT admin_users.id,admin_users.first_name,admin_users.location,admin_users.mobile_number,admin_users.email,admin_users.status,admin_users.password,admin_users.is_password_change,zones.name as zone_name,zones.id as zone_id,zones.city_id as zone_city_id,cities.id as city_id,cities.name as city_name,admin_users.incharge_name FROM admin_users \n        JOIN zones ON zones.id = admin_users.zone_id\n        JOIN cities ON cities.id = zones.city_id\n         WHERE admin_users.user_group_id = \"2\" LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 47:
            results = _context9.sent;
          case 48:
            data = results[0]; // for (let i = 0; i < data.length; i++) {
            //   data[i].password = process.env.BASE_URL + data[i].password;
            // }
            total_amount = 0; // console.log(data);
            i = 0;
          case 51:
            if (!(i < data.length)) {
              _context9.next = 64;
              break;
            }
            _context9.next = 54;
            return (0, _db["default"])("branch_purchase_order").select("grand_total").where({
              branch_id: data[i].id,
              is_bill_generated: "0"
            });
          case 54:
            get_bills = _context9.sent;
            if (!(get_bills.length == 0)) {
              _context9.next = 58;
              break;
            }
            data[i].sub_total = 0;
            return _context9.abrupt("continue", 61);
          case 58:
            for (j = 0; j < get_bills.length; j++) {
              total_amount += Number(get_bills[j].grand_total);
            }

            // await knex("branch_bills").insert({
            //   branch_bills: data[i].id,
            //   generated_date: moment().format("YYYY-MM-DD"),
            //   grand_total: total_amount,
            // });

            data[i].sub_total = total_amount;
            total_amount = 0;
          case 61:
            i++;
            _context9.next = 51;
            break;
          case 64:
            // console.log(data);

            loading = false;
            res.render("super_admin/branch/branch", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              zones: zones,
              cities: cities
            });
            _context9.next = 72;
            break;
          case 68:
            _context9.prev = 68;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            res.redirect("/home");
          case 72:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 68]]);
  }));
  return function getBranchAdmin(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getBranchAdmin = getBranchAdmin;
var updateChangePassword = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var token, currentTokenPayload, admin_id, user, _req$body4, new_password, confirm_new_password, query, password;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            token = req.session.token;
            if (token) {
              _context10.next = 5;
              break;
            }
            req.flash("error", "Need To Login First");
            return _context10.abrupt("return", res.redirect("/auth/login"));
          case 5:
            currentTokenPayload = (0, _jwt.parseJwtPayload)(token.token);
            admin_id = currentTokenPayload.user_id;
            _context10.next = 9;
            return (0, _db["default"])("admin_users").select("user_group_id", "password", "is_password_change").where({
              id: admin_id
            });
          case 9:
            user = _context10.sent;
            _req$body4 = req.body, new_password = _req$body4.new_password, confirm_new_password = _req$body4.confirm_new_password; // const isPassword = await bcrypt.compare(confirm_new_password, user[0].password);
            // if (!isPassword) {
            //   req.flash("error", "invalid password");
            //   return res.redirect("/super_admin/branch/get_branch_admin");
            // }
            if (!(new_password.length < 8)) {
              _context10.next = 14;
              break;
            }
            req.flash("error", "New password should be atleast 8 characters");
            return _context10.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 14:
            if (!(confirm_new_password.length < 8)) {
              _context10.next = 17;
              break;
            }
            req.flash("error", "Confirm password should be atleast 8 characters");
            return _context10.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 17:
            if (!(new_password !== confirm_new_password)) {
              _context10.next = 20;
              break;
            }
            req.flash("error", "Password Should Be Same");
            return _context10.abrupt("return", res.redirect("/super_admin/branch/get_branch_admin"));
          case 20:
            query = {};
            if (user[0].user_group_id == 2) {
              if (user[0].is_password_change == 0) {
                query.is_password_change = "1";
              }
            }
            _context10.next = 24;
            return _bcrypt["default"].hash(confirm_new_password, 10);
          case 24:
            password = _context10.sent;
            console.log(password);
            query.password = password;
            _context10.next = 29;
            return (0, _db["default"])("admin_users").update(query).where({
              user_group_id: "2"
            });
          case 29:
            req.flash("success", "successfully password changed");
            res.redirect("/home");
            _context10.next = 37;
            break;
          case 33:
            _context10.prev = 33;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            res.redirect("/home");
          case 37:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 33]]);
  }));
  return function updateChangePassword(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.updateChangePassword = updateChangePassword;
var getZones = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var city_id, zones;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            city_id = req.body.city_id;
            _context11.next = 4;
            return (0, _db["default"])("zones").select("id", "name").where({
              city_id: city_id
            });
          case 4:
            zones = _context11.sent;
            console.log(city_id);
            console.log(zones);
            return _context11.abrupt("return", res.status(200).json({
              data: zones
            }));
          case 10:
            _context11.prev = 10;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            res.redirect("/home");
          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function getZones(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

// export const getChangePassword = async (req, res) => {
//   try {
//     res.render("super_admin/branch/change_password");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

// export const updateChangePassword = async (req, res) => {
//   // console.log(req)
//   try {
//     const { new_password, confirm_new_password } = req.body;
//     console.log(new_password, confirm_new_password)

//     if (new_password !== confirm_new_password) {
//       req.flash("error", "Password Should Be Same");
//       return res.redirect("/super_admin/branch/get_branch_admin");
//     }

//     let hash_password = await bcrypt.hash(new_password, 10);
//     console.log(hash_password)

//     let query = {};
//     if (user[0].user_group_id == 2) {
//       if (user[0].is_password_change == 0) {
//         query.is_password_change = "1";
//       }
//     }

//     await knex("admin_users").update({
//       query
//     }).where({id: admin_id})

//     req.flash("success", "Successfully Created");
//     res.redirect("/home");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };
exports.getZones = getZones;