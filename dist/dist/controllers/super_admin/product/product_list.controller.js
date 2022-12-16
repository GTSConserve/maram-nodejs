"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductStatus = exports.updateProduct = exports.getProductList = exports.createProduct = void 0;
var _db = _interopRequireDefault(require("../../../services/db.service"));
var _helper = require("../../../utils/helper.util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var updateProductStatus = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, status, id;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, status = _req$body.status, id = _req$body.id;
            if (!(status == "1")) {
              _context.next = 7;
              break;
            }
            _context.next = 5;
            return (0, _db["default"])("products").update({
              status: "0"
            }).where({
              id: id
            });
          case 5:
            _context.next = 9;
            break;
          case 7:
            _context.next = 9;
            return (0, _db["default"])("products").update({
              status: "1"
            }).where({
              id: id
            });
          case 9:
            console.log("hell");
            req.flash("success", "Updated SuccessFully");
            return _context.abrupt("return", res.redirect("/super_admin/product/get_category"));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.redirect("/home");
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function updateProductStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.updateProductStatus = updateProductStatus;
var updateProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, product_name, id, unit_type_id, category_id, product_type_id, description, price, unit_value, file, query, image;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, product_name = _req$body2.product_name, id = _req$body2.id, unit_type_id = _req$body2.unit_type_id, category_id = _req$body2.category_id, product_type_id = _req$body2.product_type_id, description = _req$body2.description, price = _req$body2.price, unit_value = _req$body2.unit_value;
            file = req.file;
            if (product_name) {
              _context2.next = 6;
              break;
            }
            req.flash("error", "Product name is missing");
            return _context2.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 6:
            if (description) {
              _context2.next = 9;
              break;
            }
            req.flash("error", "Description is missing");
            return _context2.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 9:
            if (price) {
              _context2.next = 12;
              break;
            }
            req.flash("error", "Price is missing");
            return _context2.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 12:
            if (unit_value) {
              _context2.next = 15;
              break;
            }
            req.flash("error", "unit Value is missing");
            return _context2.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 15:
            query = {};
            console.log(description);
            query.name = product_name;
            query.description = description;
            query.price = price;
            query.unit_value = unit_value;
            if (file) {
              image = req.file.destination.slice(1) + "/" + req.file.filename;
              query.image = image;
            }
            if (product_type_id) {
              query.product_type_id = product_type_id;
            }
            if (unit_type_id) {
              query.unit_type_id = unit_type_id;
            }
            if (category_id) {
              query.category_id = category_id;
            }
            _context2.next = 27;
            return (0, _db["default"])("products").update(query).where({
              id: id
            });
          case 27:
            req.flash("success", "Updated SuccessFully");
            res.redirect("/super_admin/product/get_product_list");
            _context2.next = 35;
            break;
          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.redirect("/home");
          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 31]]);
  }));
  return function updateProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateProduct = updateProduct;
var getProductList = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var loading, searchKeyword, data_length, search_data_length, productType, categories, unit_types, _yield$getPageNumber, startingLimit, page, resultsPerPage, numberOfPages, iterator, endingLink, results, is_search, data, i;
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
            return _db["default"].raw("SELECT products.name FROM products WHERE products.name LIKE '%".concat(searchKeyword, "%'"));
          case 7:
            search_data_length = _context3.sent;
            data_length = search_data_length[0];
            if (!(data_length.length === 0)) {
              _context3.next = 14;
              break;
            }
            loading = false;
            req.query.searchKeyword = "";
            req.flash("error", "No Category Found");
            return _context3.abrupt("return", res.redirect("/super_admin/product/get_category"));
          case 14:
            _context3.next = 19;
            break;
          case 16:
            _context3.next = 18;
            return (0, _db["default"])("products").select("id");
          case 18:
            data_length = _context3.sent;
          case 19:
            _context3.next = 21;
            return (0, _db["default"])("product_type").select("name", "id").where({
              status: "1"
            });
          case 21:
            productType = _context3.sent;
            _context3.next = 24;
            return (0, _db["default"])("categories").select("name", "id").where({
              status: "1"
            });
          case 24:
            categories = _context3.sent;
            _context3.next = 27;
            return (0, _db["default"])("unit_types").select("value", "id").where({
              status: "1"
            });
          case 27:
            unit_types = _context3.sent;
            if (!(data_length.length === 0)) {
              _context3.next = 30;
              break;
            }
            return _context3.abrupt("return", res.render("super_admin/product/product", {
              data: data_length,
              searchKeyword: searchKeyword,
              productType: productType,
              categories: categories,
              unit_types: unit_types
            }));
          case 30:
            _context3.next = 32;
            return (0, _helper.getPageNumber)(req, res, data_length, "product/get_product_list");
          case 32:
            _yield$getPageNumber = _context3.sent;
            startingLimit = _yield$getPageNumber.startingLimit;
            page = _yield$getPageNumber.page;
            resultsPerPage = _yield$getPageNumber.resultsPerPage;
            numberOfPages = _yield$getPageNumber.numberOfPages;
            iterator = _yield$getPageNumber.iterator;
            endingLink = _yield$getPageNumber.endingLink;
            is_search = false;
            if (!searchKeyword) {
              _context3.next = 47;
              break;
            }
            _context3.next = 43;
            return _db["default"].raw("SELECT  products.id,products.name as product_name,products.image,products.description,products.status,products.price,products.unit_value,\n        product_type.name as product_type_name,categories.name as category_name, unit_types.value FROM products\n        JOIN product_type ON products.product_type_id = product_type.id \n        JOIN categories ON products.category_id = categories.id \n        JOIN unit_types ON products.unit_type_id = unit_types.id\n         WHERE products.name LIKE '%".concat(searchKeyword, "%' LIMIT ").concat(startingLimit, ",").concat(resultsPerPage));
          case 43:
            results = _context3.sent;
            is_search = true;
            _context3.next = 50;
            break;
          case 47:
            _context3.next = 49;
            return _db["default"].raw("SELECT  products.id,products.name as product_name,products.image,products.description,products.status,products.price,products.unit_value,\n         product_type.name as product_type_name,categories.name as category_name, unit_types.value FROM products\n         JOIN product_type ON products.product_type_id = product_type.id \n         JOIN categories ON products.category_id = categories.id \n         JOIN unit_types ON products.unit_type_id = unit_types.id \n         LIMIT ".concat(startingLimit, ",").concat(resultsPerPage));
          case 49:
            results = _context3.sent;
          case 50:
            data = results[0];
            for (i = 0; i < data.length; i++) {
              data[i].image = process.env.BASE_URL + data[i].image;
            }
            loading = false;
            res.render("super_admin/product/product", {
              data: data,
              page: page,
              iterator: iterator,
              endingLink: endingLink,
              numberOfPages: numberOfPages,
              is_search: is_search,
              searchKeyword: searchKeyword,
              loading: loading,
              productType: productType,
              categories: categories,
              unit_types: unit_types
            });
            _context3.next = 60;
            break;
          case 56:
            _context3.prev = 56;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.redirect("/home");
          case 60:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 56]]);
  }));
  return function getProductList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getProductList = getProductList;
var createProduct = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, name, description, category_id, unit_value, unit_type_id, price, product_type_id, image;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body3 = req.body, name = _req$body3.name, description = _req$body3.description, category_id = _req$body3.category_id, unit_value = _req$body3.unit_value, unit_type_id = _req$body3.unit_type_id, price = _req$body3.price, product_type_id = _req$body3.product_type_id;
            if (name) {
              _context4.next = 5;
              break;
            }
            req.flash("error", "Name is missing");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 5:
            if (product_type_id) {
              _context4.next = 8;
              break;
            }
            req.flash("error", "Please Choose a Product Type");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 8:
            if (description) {
              _context4.next = 11;
              break;
            }
            req.flash("error", "Description is Missing");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 11:
            if (category_id) {
              _context4.next = 14;
              break;
            }
            req.flash("error", "Please Choose a Category");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 14:
            if (unit_value) {
              _context4.next = 17;
              break;
            }
            req.flash("error", "Please Give a Unit Value");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 17:
            if (unit_type_id) {
              _context4.next = 20;
              break;
            }
            req.flash("error", "Please Choose a Unit");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 20:
            if (price) {
              _context4.next = 23;
              break;
            }
            req.flash("error", "Please Give a Price");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 23:
            if (req.file) {
              _context4.next = 26;
              break;
            }
            req.flash("error", "Please Choose a image");
            return _context4.abrupt("return", res.redirect("/super_admin/product/get_product_list"));
          case 26:
            image = req.file.destination.slice(1) + "/" + req.file.filename;
            _context4.next = 29;
            return (0, _db["default"])("products").insert({
              category_id: category_id,
              unit_type_id: unit_type_id,
              product_type_id: product_type_id,
              name: name,
              unit_value: unit_value,
              price: price,
              image: image,
              description: description
            });
          case 29:
            req.flash("success", "Successfully Created");
            res.redirect("/super_admin/product/get_product_list");
            _context4.next = 37;
            break;
          case 33:
            _context4.prev = 33;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.redirect("/home");
          case 37:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 33]]);
  }));
  return function createProduct(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createProduct = createProduct;