"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQty = exports.unsubscribeSubscription = exports.subscribeSubscription = exports.newSubscription = exports.newAddOn = exports.getusers = exports.getSingleUser = exports.getBill = exports.getAddUser = exports.editPaused = exports.editAdditional = exports.createUserBill = exports.createUser = exports.createPaused = exports.createAdditional = exports.changeUserPlan = exports.cancelAdditional = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
var _message = require("../../../notifications/message.sender");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var createUserBill = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, add_on, sub, user_id, sub_total, discount, sub_product, add_on_product, bill_no, bill;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, add_on = _req$body.add_on, sub = _req$body.sub, user_id = _req$body.user_id, sub_total = _req$body.sub_total, discount = _req$body.discount;
            sub_product = JSON.parse(sub);
            add_on_product = JSON.parse(add_on);
            bill_no = "MA" + Date.now();
            _context3.next = 6;
            return (0, _db["default"])("bill_history").insert({
              bill_no: bill_no,
              user_id: user_id,
              sub_total: sub_total,
              discount: discount ? discount : null,
              grand_total: Number(sub_total) - (discount ? Number(discount) : Number(0)),
              date: (0, _moment["default"])().format("YYYY-MM-DD")
            });
          case 6:
            bill = _context3.sent;
            if (sub_product.length !== 0) {
              sub_product.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return (0, _db["default"])("bill_history_details").insert({
                            bill_history_id: bill[0],
                            subscription_id: data.id,
                            subscription_price: data.subscription_monthly_price,
                            additional_price: data.additional_monthly_price,
                            total_price: data.total_monthly_price,
                            subscription_qty: data.subscription_delivered_quantity,
                            additional_qty: data.additional_delivered_quantity,
                            total_qty: data.total_delivered_quantity
                          });
                        case 2:
                          _context.next = 4;
                          return (0, _db["default"])("subscribed_user_details").update({
                            subscription_monthly_price: null,
                            additional_monthly_price: null,
                            total_monthly_price: null,
                            subscription_delivered_quantity: null,
                            additional_delivered_quantity: null,
                            total_delivered_quantity: null
                          }).where({
                            id: data.id
                          });
                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }
            if (add_on_product.length !== 0) {
              add_on_product.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return (0, _db["default"])("bill_history_details").insert({
                            bill_history_id: bill[0],
                            add_on_order_id: data.id,
                            total_price: data.sub_total
                          });
                        case 2:
                          _context2.next = 4;
                          return (0, _db["default"])("add_on_orders").update({
                            is_bill_generated: "1"
                          }).where({
                            id: data.id
                          });
                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return function (_x4) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }

            // await  swal("Done", "New Add On Order Placed", "success");
            req.flash("success", "Bill Generated SuccessFully");
            res.redirect("/branch_admin/user/get_bill?user_id=".concat(user_id));
          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function createUserBill(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// get bill
exports.createUserBill = createUserBill;
var getBill = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var admin_id, user_id, searchKeyword, loading, data_length, get_subscription_price, get_add_on_price, sub_total, search_data_length, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            admin_id = req.body.admin_id;
            user_id = req.query.user_id;
            searchKeyword = req.query.searchKeyword;
            loading = false;
            data_length = []; // get generate bill details
            _context4.next = 8;
            return (0, _db["default"])("subscribed_user_details").select("total_monthly_price", "subscription_monthly_price", "additional_monthly_price", "id", "subscription_delivered_quantity", "additional_delivered_quantity", "total_delivered_quantity").where({
              user_id: user_id
            }).whereNot({
              total_monthly_price: null
            });
          case 8:
            get_subscription_price = _context4.sent;
            _context4.next = 11;
            return (0, _db["default"])("add_on_orders").select("sub_total", "id").where({
              user_id: user_id,
              status: "delivered",
              is_bill_generated: "0"
            });
          case 11:
            get_add_on_price = _context4.sent;
            sub_total = 0;
            if (get_subscription_price.length !== 0) {
              get_subscription_price.map(function (data) {
                sub_total += Number(data.total_monthly_price);
              });
            }
            if (get_add_on_price.length !== 0) {
              get_add_on_price.map(function (data) {
                sub_total += Number(data.sub_total);
              });
            }
            if (!searchKeyword) {
              _context4.next = 27;
              break;
            }
            _context4.next = 18;
            return _db["default"].raw("SELECT id,bill_no FROM bill_history WHERE user_id = ".concat(user_id, " AND bill_no LIKE '%").concat(searchKeyword, "%'"));
          case 18:
            search_data_length = _context4.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context4.next = 25;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Bill  Found");
            return _context4.abrupt("return", res.redirect("/branch_admin/user/get_bill"));
          case 25:
            _context4.next = 30;
            break;
          case 27:
            _context4.next = 29;
            return (0, _db["default"])("bill_history").select("id").where({
              user_id: user_id
            });
          case 29:
            data_length = _context4.sent;
          case 30:
            if (!(data_length.length === 0)) {
              _context4.next = 33;
              break;
            }
            loading = false;
            return _context4.abrupt("return", res.render("branch_admin/users/get_bill", {
              data: data_length,
              searchKeyword: searchKeyword,
              sub_total: sub_total,
              get_subscription_price: get_subscription_price,
              get_add_on_price: get_add_on_price,
              user_id: user_id
            }));
          case 33:
            _context4.next = 35;
            return (0, _helper.getPageNumber)(req, res, data_length, "user/get_bill");
          case 35:
            _yield$getPageNumber = _context4.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context4.next = 50;
              break;
            }
            _context4.next = 46;
            return _db["default"].raw("SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ".concat(user_id, " AND bill_no LIKE '%").concat(searchKeyword, "%' \n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 46:
            results = _context4.sent;
            is_search = true;
            _context4.next = 53;
            break;
          case 50:
            _context4.next = 52;
            return _db["default"].raw("SELECT bill_no,user_id,sub_total,discount,grand_total,date,payment_status FROM bill_history WHERE user_id = ".concat(user_id, "\n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 52:
            results = _context4.sent;
          case 53:
            data = results[0];
            loading = false;
            data.map(function (d) {
              d.date = (0, _moment["default"])(d.date).format("DD-MM-YYYY");
            });
            res.render("branch_admin/users/get_bill", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              sub_total: sub_total,
              get_subscription_price: get_subscription_price,
              get_add_on_price: get_add_on_price,
              user_id: user_id
            });
            _context4.next = 63;
            break;
          case 59:
            _context4.prev = 59;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 63:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 59]]);
  }));
  return function getBill(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getBill = getBill;
var getusers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var admin_id, loading, searchKeyword, data_length, search_data_length, routes, _yield$getPageNumber2, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            admin_id = req.body.admin_id;
            loading = true;
            searchKeyword = req.query.searchKeyword;
            data_length = [];
            if (!searchKeyword) {
              _context5.next = 17;
              break;
            }
            _context5.next = 8;
            return _db["default"].raw("SELECT  users.name,users.user_unique_id  FROM  user_address\n        JOIN users ON users.id = user_address.user_id\n        WHERE user_address.branch_id= ".concat(admin_id, " AND users.name LIKE '%").concat(searchKeyword, "%' \n        OR users.mobile_number LIKE '%").concat(searchKeyword, "%'"));
          case 8:
            search_data_length = _context5.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context5.next = 15;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No User  Found");
            return _context5.abrupt("return", res.redirect("/branch_admin/user/branch_user"));
          case 15:
            _context5.next = 20;
            break;
          case 17:
            _context5.next = 19;
            return (0, _db["default"])("user_address").select("id").where({
              branch_id: admin_id
            });
          case 19:
            data_length = _context5.sent;
          case 20:
            _context5.next = 22;
            return (0, _db["default"])("users").select("name", "id").where({
              status: "1"
            });
          case 22:
            routes = _context5.sent;
            if (!(data_length.length === 0)) {
              _context5.next = 26;
              break;
            }
            loading = false;
            return _context5.abrupt("return", res.render("branch_admin/user/branch_user", {
              data: data_length,
              searchKeyword: searchKeyword,
              routes: routes
            }));
          case 26:
            _context5.next = 28;
            return (0, _helper.getPageNumber)(req, res, data_length, "user/branch_user");
          case 28:
            _yield$getPageNumber2 = _context5.sent;
            startingLimit = _yield$getPageNumber2.startingLimit;
            page = _yield$getPageNumber2.page;
            resultsPerPage = _yield$getPageNumber2.resultsPerPage;
            numberOfPages = _yield$getPageNumber2.numberOfPages;
            iterator = _yield$getPageNumber2.iterator;
            endingLink = _yield$getPageNumber2.endingLink;
            console.log(data_length);
            is_search = false;
            if (!searchKeyword) {
              _context5.next = 44;
              break;
            }
            _context5.next = 40;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.branch_id = ".concat(admin_id, " AND users.name LIKE '%").concat(searchKeyword, "%' \n      OR users.mobile_number LIKE '%").concat(searchKeyword, "%' \n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 40:
            results = _context5.sent;
            is_search = true;
            _context5.next = 47;
            break;
          case 44:
            _context5.next = 46;
            return _db["default"].raw("SELECT user_address.id as user_address_id ,user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.branch_id = ".concat(admin_id, " \n      LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 46:
            results = _context5.sent;
          case 47:
            data = results[0];
            loading = false;
            res.render("branch_admin/users/users", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              routes: routes
            });
            _context5.next = 56;
            break;
          case 52:
            _context5.prev = 52;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.redirect("/home");
          case 56:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 52]]);
  }));
  return function getusers(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getusers = getusers;
var getSingleUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var user_address_id, admin_id, get_user_query, user, get_subscription_products, current_month, get_additional_orders, subscription_ids, is_subscription_active, i, pause_dates, pause_orders_query, k, additional_orders_parent_id, additional_orders, additional_orders_query, orders, dates, is_active, _i, add_on_order_query, add_on, is_add_on_active, get_user_products_query, _i2, j, get_plan, sub_product_id, _i3, add_subscription_products, add_on_products;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            user_address_id = req.query.user_address_id;
            admin_id = req.body.admin_id;
            _context6.next = 5;
            return _db["default"].raw("SELECT user_address.id as user_address_id,\n      user_address.address,user_address.user_id as user_id, \n      users.name as user_name,users.user_unique_id,users.mobile_number,\n      routes.name as route_name\n      FROM user_address \n      JOIN users ON users.id = user_address.user_id \n      LEFT JOIN routes ON routes.id = user_address.router_id\n      WHERE user_address.id = ".concat(user_address_id, " AND user_address.branch_id = ").concat(admin_id));
          case 5:
            get_user_query = _context6.sent;
            if (!(get_user_query[0].length === 0)) {
              _context6.next = 9;
              break;
            }
            req.flash("error", "User Not Found");
            return _context6.abrupt("return", res.redirect("/home"));
          case 9:
            user = get_user_query[0][0];
            _context6.next = 12;
            return (0, _db["default"])("subscribed_user_details as sub").select("sub.id as sub_id", "sub.user_id", "sub.start_date", "sub.customized_days", "sub.quantity", "sub.subscription_status", "products.name as product_name", "products.unit_value", "products.id as product_id", "products.price", "unit_types.value", "subscription_type.name as sub_name").join("products", "products.id", "=", "sub.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").join("subscription_type", "subscription_type.id", "=", "sub.subscribe_type_id").where({
              "sub.user_id": user.user_id,
              "sub.user_address_id": user_address_id
            });
          case 12:
            get_subscription_products = _context6.sent;
            current_month = (0, _moment["default"])().format("M");
            get_additional_orders = [];
            subscription_ids = [];
            is_subscription_active = 0;
            if (!(get_subscription_products.length !== 0)) {
              _context6.next = 41;
              break;
            }
            i = 0;
          case 19:
            if (!(i < get_subscription_products.length)) {
              _context6.next = 41;
              break;
            }
            subscription_ids.push(get_subscription_products[i].sub_id);

            /////////////////////////////////////////////////////////////////////////////// pause
            pause_dates = [];
            _context6.next = 24;
            return (0, _db["default"])("pause_dates").select("date", "id").where({
              subscription_id: get_subscription_products[i].sub_id
            });
          case 24:
            pause_orders_query = _context6.sent;
            if (pause_orders_query.length !== 0) {
              for (k = 0; k < pause_orders_query.length; k++) {
                pause_dates.push((0, _moment["default"])(pause_orders_query[k].date).format("YYYY-MM-DD"));
              }
            }
            get_subscription_products[i].pause_dates = pause_dates;
            pause_dates = [];

            /////////////////////////////////////////////////////////////////////////////// additional
            _context6.next = 30;
            return (0, _db["default"])("additional_orders_parent").select("id").where({
              subscription_id: get_subscription_products[i].sub_id
              // month: current_month,
            });
          case 30:
            additional_orders_parent_id = _context6.sent;
            // if (additional_orders_parent_id.length !== 0) {
            additional_orders = {};
            _context6.next = 34;
            return (0, _db["default"])("additional_orders").select("date", "status", "quantity").where({
              subscription_id: get_subscription_products[i].sub_id,
              is_cancelled: "0"
            });
          case 34:
            additional_orders_query = _context6.sent;
            // .where({
            //   additional_orders_parent_id: additional_orders_parent_id[0].id,
            // });

            if (additional_orders_query.length !== 0) {
              // additional_orders.additional_orders_parent_id =
              //   additional_orders_parent_id[0].id;
              additional_orders.qty = additional_orders_query[0].quantity;
              orders = [];
              dates = [];
              is_active = false;
              for (_i = 0; _i < additional_orders_query.length; _i++) {
                if (additional_orders_query[_i].status == "pending") {
                  is_active = true;
                }
                orders.push({
                  date: (0, _moment["default"])(additional_orders_query[_i].date).format("DD-MM-YYYY"),
                  qty: additional_orders_query[_i].quantity,
                  status: additional_orders_query[_i].status
                });
                dates.push((0, _moment["default"])(additional_orders_query[_i].date).format("YYYY-MM-DD"));
              }
              additional_orders.dates = dates;
              additional_orders.order_details = orders;
              additional_orders.sub_id = get_subscription_products[i].sub_id;
              additional_orders.is_active = is_active;
              orders = [];

              // additional_orders

              get_subscription_products[i].additional_orders = additional_orders;
              get_additional_orders.push(additional_orders);
              // }
            }

            if (get_subscription_products[i].subscription_status == "subscribed") {
              is_subscription_active = 1;
            }
            get_subscription_products[i].start_date = (0, _moment["default"])(get_subscription_products[i].start_date).format("DD-MM-YYYY");
          case 38:
            i++;
            _context6.next = 19;
            break;
          case 41:
            _context6.next = 43;
            return _db["default"].raw("SELECT adds.id,adds.user_id ,adds.delivery_date,adds.sub_total,adds.status\n      FROM add_on_orders as adds \n      WHERE adds.user_id = ".concat(user.user_id, " AND adds.address_id = ").concat(user_address_id));
          case 43:
            add_on_order_query = _context6.sent;
            // console.log(add_on_order_query[0]);
            add_on = add_on_order_query[0];
            is_add_on_active = 0;
            if (!(add_on.length !== 0)) {
              _context6.next = 59;
              break;
            }
            _i2 = 0;
          case 48:
            if (!(_i2 < add_on.length)) {
              _context6.next = 59;
              break;
            }
            if (add_on[_i2].status == "pending" || add_on[_i2].status == "new_order" || add_on[_i2].status == "order_placed") {
              is_add_on_active = 1;
            }
            _context6.next = 52;
            return (0, _db["default"])("add_on_order_items as adds").select("adds.add_on_order_id", "adds.quantity", "adds.price", "adds.total_price", "adds.status", "products.name as product_name", "products.image", "products.unit_value", "unit_types.value").join("products", "products.id", "=", "adds.product_id").join("unit_types", "unit_types.id", "=", "products.unit_type_id").where({
              "adds.add_on_order_id": add_on[_i2].id
            });
          case 52:
            get_user_products_query = _context6.sent;
            for (j = 0; j < get_user_products_query.length; j++) {
              get_user_products_query[j].image = process.env.BASE_URL + get_user_products_query[j].image;
            }
            add_on[_i2].add_on_products = get_user_products_query;
            add_on[_i2].delivery_date = (0, _moment["default"])(add_on[_i2].delivery_date).format("DD-MM-YYYY");
          case 56:
            _i2++;
            _context6.next = 48;
            break;
          case 59:
            _context6.next = 61;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 61:
            get_plan = _context6.sent;
            sub_product_id = [];
            if (get_subscription_products.length !== 0) {
              for (_i3 = 0; _i3 < get_subscription_products.length; _i3++) {
                sub_product_id.push(get_subscription_products[_i3].product_id);
              }
            }
            _context6.next = 66;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            }).whereNotIn("products.id", sub_product_id);
          case 66:
            add_subscription_products = _context6.sent;
            _context6.next = 69;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 69:
            add_on_products = _context6.sent;
            // console.log(get_additional_orders , "check")
            // console.log(get_subscription_products[0]);
            // console.log(get_subscription_products[0].pause_dates);

            res.render("branch_admin/users/user_detail", {
              user: user,
              sub_products: get_subscription_products,
              add_on: add_on,
              is_add_on_active: is_add_on_active,
              is_subscription_active: is_subscription_active,
              get_plan: get_plan,
              get_subscription_products: add_subscription_products,
              add_on_products: add_on_products,
              get_additional_orders: get_additional_orders
            });
            _context6.next = 77;
            break;
          case 73:
            _context6.prev = 73;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.redirect("/home"));
          case 77:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 73]]);
  }));
  return function getSingleUser(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getSingleUser = getSingleUser;
var getAddUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var admin_id, get_routes, get_subscription_products, add_on_products, get_plan;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            admin_id = req.body.admin_id;
            _context7.next = 4;
            return (0, _db["default"])("routes").select("id", "name").where({
              status: "1",
              branch_id: admin_id
            });
          case 4:
            get_routes = _context7.sent;
            _context7.next = 7;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 1,
              "products.status": "1"
            });
          case 7:
            get_subscription_products = _context7.sent;
            _context7.next = 10;
            return (0, _db["default"])("products").join("unit_types", "unit_types.id", "=", "products.unit_type_id").select("products.id", "products.name", "products.unit_value", "unit_types.value as unit_type", "products.price").where({
              "products.product_type_id": 2,
              "products.status": "1"
            });
          case 10:
            add_on_products = _context7.sent;
            _context7.next = 13;
            return (0, _db["default"])("subscription_type").select("name", "id").where({
              status: "1"
            });
          case 13:
            get_plan = _context7.sent;
            res.render("branch_admin/users/add_user", {
              get_subscription_products: get_subscription_products,
              add_on_products: add_on_products,
              get_plan: get_plan,
              get_routes: get_routes
            });
            _context7.next = 21;
            break;
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            res.redirect("/home");
          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function getAddUser(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getAddUser = getAddUser;
var createUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body2, data, admin_id, user_query, get_all_users, users_length, user, address, sub_product_query, weekdays, store_weekdays, i, j, order, order_id, sub_total, _i4, product_price, users, arr_users, get_users;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body2 = req.body, data = _req$body2.data, admin_id = _req$body2.admin_id;
            console.log(req.body);
            user_query = {};
            user_query.mobile_number = data.mobile_number;
            user_query.name = data.user_name;
            _context8.next = 8;
            return _db["default"].select("id").from("users");
          case 8:
            get_all_users = _context8.sent;
            users_length = get_all_users.length + 1;
            user_query.user_unique_id = "CUSTOMER" + users_length;
            if (data.email) {
              user_query.email = data.email;
            }
            _context8.next = 14;
            return (0, _db["default"])("users").insert(user_query);
          case 14:
            user = _context8.sent;
            _context8.next = 17;
            return (0, _db["default"])("user_address").insert({
              user_id: user[0],
              branch_id: admin_id,
              title: data.address_title,
              address: data.address,
              landmark: data.address_landmark ? data.address_landmark : null,
              latitude: data.latitude,
              longitude: data.longitude,
              alternate_mobile: data.alternate_mobile_number ? data.alternate_mobile_number : null,
              router_id: data.router_id ? data.router_id : null
            });
          case 17:
            address = _context8.sent;
            if (!data.sub_product) {
              _context8.next = 30;
              break;
            }
            sub_product_query = {
              start_date: data.sub_start_date,
              user_id: user[0],
              product_id: data.sub_product,
              user_address_id: address[0],
              quantity: data.sub_qty,
              subscribe_type_id: data.your_plan,
              branch_id: admin_id,
              date: data.sub_start_date,
              subscription_start_date: data.sub_start_date,
              subscription_status: "subscribed"
            };
            if (data.router_id) {
              sub_product_query.router_id = data.router_id;
            }
            if (!(data.your_plan == 3)) {
              _context8.next = 28;
              break;
            }
            _context8.next = 24;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 24:
            weekdays = _context8.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            sub_product_query.customized_days = JSON.stringify(store_weekdays);
          case 28:
            _context8.next = 30;
            return (0, _db["default"])("subscribed_user_details").insert(sub_product_query);
          case 30:
            if (!(data.add_on.length !== 0)) {
              _context8.next = 49;
              break;
            }
            _context8.next = 33;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user[0],
              delivery_date: data.delivery_date,
              address_id: address[0],
              branch_id: admin_id,
              status: "new_order"
            });
          case 33:
            order = _context8.sent;
            order_id = order[0];
            sub_total = 0;
            _i4 = 0;
          case 37:
            if (!(_i4 < data.add_on.length)) {
              _context8.next = 47;
              break;
            }
            _context8.next = 40;
            return (0, _db["default"])("products").select("price").where({
              id: data.add_on[_i4].product_id
            });
          case 40:
            product_price = _context8.sent;
            _context8.next = 43;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user[0],
              product_id: data.add_on[_i4].product_id,
              quantity: data.add_on[_i4].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * data.add_on[_i4].qty
            });
          case 43:
            sub_total = sub_total + product_price[0].price * data.add_on[_i4].qty;
          case 44:
            _i4++;
            _context8.next = 37;
            break;
          case 47:
            _context8.next = 49;
            return (0, _db["default"])("add_on_orders").update({
              sub_total: sub_total
            }).where({
              id: order_id
            });
          case 49:
            if (!data.router_id) {
              _context8.next = 65;
              break;
            }
            _context8.next = 52;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: data.router_id
            });
          case 52:
            users = _context8.sent;
            if (!(users.length === 0 || users[0].user_mapping === null)) {
              _context8.next = 59;
              break;
            }
            arr_users = [Number(address[0])];
            _context8.next = 57;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(arr_users)
            }).where({
              id: data.router_id
            });
          case 57:
            _context8.next = 65;
            break;
          case 59:
            _context8.next = 61;
            return (0, _db["default"])("routes").select("user_mapping").where({
              id: data.router_id
            });
          case 61:
            get_users = _context8.sent;
            get_users[0].user_mapping.push(Number(address[0]));
            _context8.next = 65;
            return (0, _db["default"])("routes").update({
              user_mapping: JSON.stringify(get_users[0].user_mapping)
            }).where({
              id: data.router_id
            });
          case 65:
            req.flash("success", "Success Fully Added");
            res.redirect("/home?is_user_added=2");
            // return { status: true };
            _context8.next = 73;
            break;
          case 69:
            _context8.prev = 69;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            res.redirect("/home?is_user_added=1");
          case 73:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 69]]);
  }));
  return function createUser(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
exports.createUser = createUser;
var newSubscription = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body3, data, user_address_id, user_query, user, sub_product_query, weekdays, store_weekdays, i, j, sub_id;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$body3 = req.body, data = _req$body3.data, user_address_id = _req$body3.user_address_id;
            _context9.next = 4;
            return (0, _db["default"])("user_address").select("user_id", "branch_id", "router_id").where({
              id: user_address_id
            });
          case 4:
            user_query = _context9.sent;
            user = user_query[0];
            sub_product_query = {
              start_date: data.sub_start_date,
              user_id: user.user_id,
              product_id: data.sub_product,
              user_address_id: user_address_id,
              quantity: data.sub_qty,
              subscribe_type_id: data.your_plan,
              branch_id: user.branch_id,
              date: data.sub_start_date,
              subscription_start_date: data.sub_start_date,
              subscription_status: "subscribed"
            };
            if (user.router_id) {
              sub_product_query.router_id = user.router_id;
            }
            if (!(data.your_plan == 3)) {
              _context9.next = 15;
              break;
            }
            _context9.next = 11;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 11:
            weekdays = _context9.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            sub_product_query.customized_days = JSON.stringify(store_weekdays);
          case 15:
            _context9.next = 17;
            return (0, _db["default"])("subscribed_user_details").insert(sub_product_query);
          case 17:
            sub_id = _context9.sent;
            _context9.next = 20;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user.user_id.toString()],
              contents: {
                en: "New Subsciption Was Placed By Maram Admin, Your Susbcription Start From ".concat((0, _moment["default"])(data.sub_start_date).format("DD-MM-YYYY"))
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Appoinment Request",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: sub_id[0],
                bill_id: 0
              }
            });
          case 20:
            return _context9.abrupt("return", res.status(200).json({
              status: true
            }));
          case 23:
            _context9.prev = 23;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.redirect("/home"));
          case 27:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 23]]);
  }));
  return function newSubscription(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
exports.newSubscription = newSubscription;
var newAddOn = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body4, data, user_address_id, user_query, user, order, order_id, sub_total, i, product_price;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body4 = req.body, data = _req$body4.data, user_address_id = _req$body4.user_address_id;
            _context10.next = 4;
            return (0, _db["default"])("user_address").select("user_id", "branch_id", "router_id").where({
              id: user_address_id
            });
          case 4:
            user_query = _context10.sent;
            user = user_query[0];
            _context10.next = 8;
            return (0, _db["default"])("add_on_orders").insert({
              user_id: user.user_id,
              delivery_date: data.delivery_date,
              address_id: user_address_id,
              branch_id: user.branch_id,
              status: "new_order"
            });
          case 8:
            order = _context10.sent;
            order_id = order[0];
            sub_total = 0;
            i = 0;
          case 12:
            if (!(i < data.add_on.length)) {
              _context10.next = 22;
              break;
            }
            _context10.next = 15;
            return (0, _db["default"])("products").select("price").where({
              id: data.add_on[i].product_id
            });
          case 15:
            product_price = _context10.sent;
            _context10.next = 18;
            return (0, _db["default"])("add_on_order_items").insert({
              add_on_order_id: order_id,
              user_id: user.user_id,
              product_id: data.add_on[i].product_id,
              quantity: data.add_on[i].qty,
              price: product_price[0].price,
              total_price: product_price[0].price * data.add_on[i].qty
            });
          case 18:
            sub_total = sub_total + product_price[0].price * data.add_on[i].qty;
          case 19:
            i++;
            _context10.next = 12;
            break;
          case 22:
            _context10.next = 24;
            return (0, _db["default"])("add_on_orders").update({
              sub_total: sub_total
            }).where({
              id: order_id
            });
          case 24:
            _context10.next = 26;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user.user_id.toString()],
              contents: {
                en: "New Add on Order Was Placed By Maram Admin, Your Add On Will be delivered On ".concat((0, _moment["default"])(data.delivery_date).format("DD-MM-YYYY"))
              },
              headings: {
                en: "Add On Notification"
              },
              name: "New Add On ",
              data: {
                subscription_status: 0,
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: 0,
                bill_id: 0
              }
            });
          case 26:
            return _context10.abrupt("return", res.status(200).json({
              status: true
            }));
          case 29:
            _context10.prev = 29;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.redirect("/home"));
          case 33:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 29]]);
  }));
  return function newAddOn(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

// additional
exports.newAddOn = newAddOn;
var createAdditional = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var data, i;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            data = req.body.data;
            i = 0;
          case 3:
            if (!(i < data.dates.length)) {
              _context11.next = 9;
              break;
            }
            _context11.next = 6;
            return (0, _db["default"])("additional_orders").insert({
              subscription_id: data.sub_id,
              user_id: data.user_id,
              quantity: data.qty,
              date: data.dates[i]
            });
          case 6:
            i++;
            _context11.next = 3;
            break;
          case 9:
            _context11.next = 11;
            return (0, _message.sendNotification)({
              include_external_user_ids: [data.user_id.toString()],
              contents: {
                en: "Additional Order was Placed for Your Subscription"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: data.sub_id,
                bill_id: 0
              }
            });
          case 11:
            return _context11.abrupt("return", res.status(200).json({
              status: true
            }));
          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            res.redirect("/home");
          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function createAdditional(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();
exports.createAdditional = createAdditional;
var editAdditional = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var data, i;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            data = req.body.data;
            _context12.next = 4;
            return (0, _db["default"])("additional_orders").where({
              subscription_id: data.sub_id,
              user_id: data.user_id,
              status: "pending"
            }).del();
          case 4:
            i = 0;
          case 5:
            if (!(i < data.dates.length)) {
              _context12.next = 11;
              break;
            }
            _context12.next = 8;
            return (0, _db["default"])("additional_orders").insert({
              subscription_id: data.sub_id,
              user_id: data.user_id,
              quantity: data.qty,
              date: data.dates[i]
            });
          case 8:
            i++;
            _context12.next = 5;
            break;
          case 11:
            _context12.next = 13;
            return (0, _message.sendNotification)({
              include_external_user_ids: [data.user_id.toString()],
              contents: {
                en: "Additional Order was Updated for Your Subscription"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: data.sub_id,
                bill_id: 0
              }
            });
          case 13:
            return _context12.abrupt("return", res.status(200).json({
              status: true
            }));
          case 16:
            _context12.prev = 16;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            res.redirect("/home");
          case 20:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 16]]);
  }));
  return function editAdditional(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();
exports.editAdditional = editAdditional;
var cancelAdditional = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body5, sub_id, user_id, user_address_id;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _req$body5 = req.body, sub_id = _req$body5.sub_id, user_id = _req$body5.user_id, user_address_id = _req$body5.user_address_id;
            _context13.next = 4;
            return (0, _db["default"])("additional_orders").update({
              status: "cancelled",
              is_cancelled: "1"
            }).where({
              subscription_id: sub_id,
              user_id: user_id
            });
          case 4:
            _context13.next = 6;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user_id.toString()],
              contents: {
                en: "Additional Order was Cancelled for Your Subscription"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: sub_id,
                bill_id: 0
              }
            });
          case 6:
            req.flash("success", "SuccessFully Additional Orders Cancelled");
            res.redirect("/branch_admin/user/single_user?user_address_id=".concat(user_address_id));
            _context13.next = 14;
            break;
          case 10:
            _context13.prev = 10;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            res.redirect("/home");
          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 10]]);
  }));
  return function cancelAdditional(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

// subscribe
exports.cancelAdditional = cancelAdditional;
var unsubscribeSubscription = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$body6, sub_id, user_id, user_address_id;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body6 = req.body, sub_id = _req$body6.sub_id, user_id = _req$body6.user_id, user_address_id = _req$body6.user_address_id;
            _context14.next = 4;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "unsubscribed"
            }).where({
              id: sub_id,
              user_id: user_id
            });
          case 4:
            _context14.next = 6;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user_id.toString()],
              contents: {
                en: "Your Subscription Was UnSubscribed"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: sub_id,
                bill_id: 0
              }
            });
          case 6:
            req.flash("success", "UnSubscribed SuccessFully");
            res.redirect("/branch_admin/user/single_user?user_address_id=".concat(user_address_id));
            _context14.next = 14;
            break;
          case 10:
            _context14.prev = 10;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            res.redirect("/home");
          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function unsubscribeSubscription(_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}();
exports.unsubscribeSubscription = unsubscribeSubscription;
var subscribeSubscription = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body7, sub_id, user_id, user_address_id;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _req$body7 = req.body, sub_id = _req$body7.sub_id, user_id = _req$body7.user_id, user_address_id = _req$body7.user_address_id;
            _context15.next = 4;
            return (0, _db["default"])("subscribed_user_details").update({
              subscription_status: "subscribed"
            }).where({
              id: sub_id,
              user_id: user_id
            });
          case 4:
            _context15.next = 6;
            return (0, _message.sendNotification)({
              include_external_user_ids: [user_id.toString()],
              contents: {
                en: "Your Subscription Was Re Subscribed SuccessFully"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: sub_id,
                bill_id: 0
              }
            });
          case 6:
            req.flash("success", "Subscribed SuccessFully");
            res.redirect("/branch_admin/user/single_user?user_address_id=".concat(user_address_id));
            _context15.next = 14;
            break;
          case 10:
            _context15.prev = 10;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);
            res.redirect("/home");
          case 14:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return function subscribeSubscription(_x27, _x28) {
    return _ref15.apply(this, arguments);
  };
}();

// paused
exports.subscribeSubscription = subscribeSubscription;
var createPaused = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var data, i;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            data = req.body.data;
            console.log("hitting");
            console.log(data);
            i = 0;
          case 5:
            if (!(i < data.dates.length)) {
              _context16.next = 11;
              break;
            }
            _context16.next = 8;
            return (0, _db["default"])("pause_dates").insert({
              subscription_id: data.sub_id,
              user_id: data.user_id,
              date: data.dates[i]
            });
          case 8:
            i++;
            _context16.next = 5;
            break;
          case 11:
            _context16.next = 13;
            return (0, _message.sendNotification)({
              include_external_user_ids: [data.user_id.toString()],
              contents: {
                en: "Paused Dates Created for Your Subscription"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: data.sub_id,
                bill_id: 0
              }
            });
          case 13:
            return _context16.abrupt("return", res.status(200).json({
              status: true
            }));
          case 16:
            _context16.prev = 16;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0);
            res.redirect("/home");
          case 20:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 16]]);
  }));
  return function createPaused(_x29, _x30) {
    return _ref16.apply(this, arguments);
  };
}();
exports.createPaused = createPaused;
var editPaused = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var data, i;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            data = req.body.data;
            _context17.next = 4;
            return (0, _db["default"])("pause_dates").where({
              subscription_id: data.sub_id,
              user_id: data.user_id
            }).del();
          case 4:
            if (!(data.dates[0] != "")) {
              _context17.next = 12;
              break;
            }
            i = 0;
          case 6:
            if (!(i < data.dates.length)) {
              _context17.next = 12;
              break;
            }
            _context17.next = 9;
            return (0, _db["default"])("pause_dates").insert({
              subscription_id: data.sub_id,
              user_id: data.user_id,
              date: data.dates[i]
            });
          case 9:
            i++;
            _context17.next = 6;
            break;
          case 12:
            _context17.next = 14;
            return (0, _message.sendNotification)({
              include_external_user_ids: [data.user_id.toString()],
              contents: {
                en: "Paused Dates Updated for Your Subscription"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: data.sub_id,
                bill_id: 0
              }
            });
          case 14:
            return _context17.abrupt("return", res.status(200).json({
              status: true
            }));
          case 17:
            _context17.prev = 17;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);
            res.redirect("/home");
          case 21:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 17]]);
  }));
  return function editPaused(_x31, _x32) {
    return _ref17.apply(this, arguments);
  };
}();

// change user plan
exports.editPaused = editPaused;
var changeUserPlan = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var data, sub_details, query, change_plan_query, weekdays, store_weekdays, i, j, change_plan_create;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            data = req.body.data;
            console.log(data);
            _context18.next = 5;
            return (0, _db["default"])("subscribed_user_details").select("subscribe_type_id", "user_id").where({
              id: data.sub_id
            });
          case 5:
            sub_details = _context18.sent;
            query = {
              subscribe_type_id: data.your_plan,
              date: (0, _moment["default"])(data.sub_start_date).format("YYYY-MM-DD"),
              change_start_date: (0, _moment["default"])(data.sub_start_date).format("YYYY-MM-DD")
            };
            change_plan_query = {
              user_id: sub_details[0].user_id,
              previous_subscription_type_id: sub_details[0].subscribe_type_id,
              change_subscription_type_id: data.your_plan,
              start_date: (0, _moment["default"])(data.sub_start_date).format("YYYY-MM-DD")
            };
            if (!(data.your_plan == 3)) {
              _context18.next = 16;
              break;
            }
            _context18.next = 11;
            return (0, _db["default"])("weekdays").select("id", "name");
          case 11:
            weekdays = _context18.sent;
            store_weekdays = [];
            for (i = 0; i < data.custom_days.length; i++) {
              for (j = 0; j < weekdays.length; j++) {
                if (weekdays[j].id == data.custom_days[i]) {
                  store_weekdays.push(weekdays[j].name);
                }
              }
            }
            query.customized_days = JSON.stringify(store_weekdays);
            change_plan_query.customized_days = JSON.stringify(store_weekdays);
          case 16:
            _context18.next = 18;
            return (0, _db["default"])("subscription_users_change_plan").insert(change_plan_query);
          case 18:
            change_plan_create = _context18.sent;
            query.change_plan_id = change_plan_create[0];
            _context18.next = 22;
            return (0, _db["default"])("subscribed_user_details").update(query).where({
              id: data.sub_id
            });
          case 22:
            res.status(200).json({
              status: true
            });
            _context18.next = 29;
            break;
          case 25:
            _context18.prev = 25;
            _context18.t0 = _context18["catch"](0);
            console.log(_context18.t0);
            res.redirect("/home");
          case 29:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 25]]);
  }));
  return function changeUserPlan(_x33, _x34) {
    return _ref18.apply(this, arguments);
  };
}();
exports.changeUserPlan = changeUserPlan;
var updateQty = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            data = req.body.data;
            console.log(data);
            _context19.next = 5;
            return (0, _db["default"])("subscribed_user_details").update({
              quantity: data.qty
            }).where({
              user_id: data.user_id,
              id: data.sub_id
            });
          case 5:
            _context19.next = 7;
            return (0, _message.sendNotification)({
              include_external_user_ids: [data.user_id.toString()],
              contents: {
                en: "Subscription Quantity Updated"
              },
              headings: {
                en: "Subscription Notification"
              },
              name: "Subscription Updated",
              data: {
                subscription_status: "subscribed",
                category_id: 0,
                product_type_id: 0,
                type: 2,
                subscription_id: data.sub_id,
                bill_id: 0
              }
            });
          case 7:
            return _context19.abrupt("return", res.status(200).json({
              status: true
            }));
          case 10:
            _context19.prev = 10;
            _context19.t0 = _context19["catch"](0);
            console.log(_context19.t0);
            res.redirect("/home");
          case 14:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 10]]);
  }));
  return function updateQty(_x35, _x36) {
    return _ref19.apply(this, arguments);
  };
}();
exports.updateQty = updateQty;