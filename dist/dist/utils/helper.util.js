"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phoneNumberValidator = exports.multerStorage = exports.isNumberValidator = exports.integerValidator = exports.getPageNumber = exports["default"] = exports.customizedDay = exports.GetProduct = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _fs = _interopRequireDefault(require("fs"));
var _db = _interopRequireDefault(require("../services/db.service"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var customizedDay = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(date, user_days) {
    var current_day, day, i, customized_date;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_day = (0, _moment["default"])(date).format("dddd");
            i = 0;
          case 2:
            if (!(i < user_days.length)) {
              _context.next = 13;
              break;
            }
            if (!(user_days[i] == current_day && i + 1 == user_days.length)) {
              _context.next = 7;
              break;
            }
            day = user_days[0];
            _context.next = 10;
            break;
          case 7:
            if (!(user_days[i] == current_day)) {
              _context.next = 10;
              break;
            }
            day = user_days[i + 1];
            return _context.abrupt("break", 13);
          case 10:
            i++;
            _context.next = 2;
            break;
          case 13:
            if (day == "Sunday") {
              customized_date = (0, _moment["default"])().day(7);
            } else if (day == "Monday") {
              customized_date = (0, _moment["default"])().day(8);
            } else if (day == "Tuesday") {
              customized_date = (0, _moment["default"])().day(9);
            } else if (day == "Wednesday") {
              customized_date = (0, _moment["default"])().day(10);
            } else if (day == "Thursday") {
              customized_date = (0, _moment["default"])().day(11);
            } else if (day == "Friday") {
              customized_date = (0, _moment["default"])().day(12);
            } else if (day == "Saturday") {
              customized_date = (0, _moment["default"])().day(13);
            }
            return _context.abrupt("return", customized_date);
          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function customizedDay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.customizedDay = customizedDay;
var GetProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product, userId) {
    var sub_product, i, j, _i;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sub_product = [];
            if (!userId) {
              _context2.next = 5;
              break;
            }
            _context2.next = 4;
            return (0, _db["default"])("subscribed_user_details").select("product_id").where({
              user_id: userId,
              subscription_status: "pending"
            }).orWhere({
              user_id: userId,
              subscription_status: "approved"
            });
          case 4:
            sub_product = _context2.sent;
          case 5:
            if (!(product.length === 0)) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", {
              status: false,
              message: "No Product Found"
            });
          case 7:
            if (sub_product.length !== 0) {
              for (i = 0; i < product.length; i++) {
                for (j = 0; j < sub_product.length; j++) {
                  if (product[i].id == sub_product[j].product_id) {
                    product[i].is_subscribed = "1";
                  } else {
                    product[i].is_subscribed = "0";
                  }
                }
              }
            }
            for (_i = 0; _i < product.length; _i++) {
              product[_i].image = process.env.BASE_URL + product[_i].image;
              if (!userId || sub_product.length == 0) {
                product[_i].is_subscribed = "0";
              }
            }
            return _context2.abrupt("return", {
              status: true,
              data: product
            });
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function GetProduct(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.GetProduct = GetProduct;
var getPageNumber = function getPageNumber(req, res, data, url) {
  var is_super_admin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var adminUrl = is_super_admin ? "super_admin" : "branch_admin";
  var resultsPerPage = process.env.RESULT_PER_PAGE;
  var numOfResults = data.length;
  var numberOfPages = Math.ceil(numOfResults / resultsPerPage);
  var page = req.query.page ? Number(req.query.page) : 1;
  if (page > numberOfPages) {
    return res.redirect("/".concat(adminUrl, "/").concat(url, "?page=") + encodeURIComponent(numberOfPages));
  } else if (page < 1) {
    return res.redirect("/".concat(adminUrl, "/").concat(url, "?page=") + encodeURIComponent("1"));
  }
  //Determine the SQL LIMIT starting number
  var startingLimit = (page - 1) * resultsPerPage;
  //Get the relevant number of POSTS for this starting page

  var iterator = page - 5 < 1 ? 1 : page - 5;
  var endingLink = iterator + 4 <= numberOfPages ? iterator + 4 : page + (numberOfPages - page);
  if (endingLink < page + 1) {
    iterator -= page + 1 - numberOfPages;
  }
  return {
    startingLimit: startingLimit,
    page: page,
    resultsPerPage: resultsPerPage,
    numberOfPages: numberOfPages,
    iterator: iterator,
    endingLink: endingLink
  };
};
exports.getPageNumber = getPageNumber;
var multerStorage = function multerStorage(path) {
  // console.log("hittihn");
  _fs["default"].access(path, function (error) {
    // To check if the given directory
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      _fs["default"].mkdir(path, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    }
  });
  var storage = _multer["default"].diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, path);
    },
    filename: function filename(req, file, cb) {
      // console.log(req.headers.authorization)
      var index = file.mimetype.indexOf("/") + 1;
      cb(null, Date.now() + "." + file.mimetype.slice(index));
    }
  });
  return storage;
};

// export const uploadImg = multer({ storage: storage }).single("image");
exports.multerStorage = multerStorage;
var phoneNumberValidator = function phoneNumberValidator(phoneNumber) {
  //  console.log(phoneNumber)
  if (!phoneNumber) {
    return false;
  }
  // if (typeof phoneNumber !== 'number') {
  //     console.log('p')

  //     return false
  // }
  if (phoneNumber.toString().length != 10) {
    console.log("c");
    return false;
  }
  return true;
};
exports.phoneNumberValidator = phoneNumberValidator;
var integerValidator = function integerValidator(value) {
  if (!value) return false;
  return isNumberValidator(value);
};
exports.integerValidator = integerValidator;
var isNumberValidator = function isNumberValidator(value) {
  if (typeof value !== "number") return false;
  return true;
};
exports.isNumberValidator = isNumberValidator;
function getOffset() {
  var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var listPerPage = arguments.length > 1 ? arguments[1] : undefined;
  return (currentPage - 1) * [listPerPage];
}
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
var _default = {
  getOffset: getOffset,
  emptyOrRows: emptyOrRows
};
exports["default"] = _default;