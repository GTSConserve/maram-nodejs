"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTable = void 0;
var _db = _interopRequireDefault(require("../services/db.service"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var createTable = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].schema.hasTable("countries").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("countries", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.string("phone_code", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 3:
            _context.next = 5;
            return _db["default"].schema.hasTable("zones").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("zones", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 5:
            _context.next = 7;
            return _db["default"].schema.hasTable("countries").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("countries", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.string("phone_code", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 7:
            _context.next = 9;
            return _db["default"].schema.hasTable("zones").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("zones", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                });
              }
            });
          case 9:
            _context.next = 11;
            return _db["default"].schema.hasTable("cities").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("cities", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.integer("zone_id").unsigned().notNullable();
                  t.foreign("zone_id").references("id").inTable("zones");
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                  t.string("latitude", 255).nullable();
                  t.string("longitude", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 11:
            _context.next = 13;
            return _db["default"].schema.hasTable("cities").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("cities", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.integer("zone_id").unsigned().notNullable();
                  t.foreign("zone_id").references("id").inTable("zones");
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                  t.string("latitude", 255).nullable();
                  t.string("longitude", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 13:
            _context.next = 15;
            return _db["default"].schema.hasTable("postcodes").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("postcodes", function (t) {
                  t.increments("id").primary();
                  t.string("code", 255).nullable();
                  t.integer("zone_id").unsigned().notNullable();
                  t.foreign("zone_id").references("id").inTable("zones");
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                  t.integer("city_id").unsigned().notNullable();
                  t.foreign("city_id").references("id").inTable("cities");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 15:
            _context.next = 17;
            return _db["default"].schema.hasTable("postcodes").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("postcodes", function (t) {
                  t.increments("id").primary();
                  t.string("code", 255).nullable();
                  t.integer("zone_id").unsigned().notNullable();
                  t.foreign("zone_id").references("id").inTable("zones");
                  t.integer("country_id").unsigned().notNullable();
                  t.foreign("country_id").references("id").inTable("countries");
                  t.integer("city_id").unsigned().notNullable();
                  t.foreign("city_id").references("id").inTable("cities");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 17:
            _context.next = 19;
            return _db["default"].schema.hasTable("user_groups").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("user_groups", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255);
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 19:
            _context.next = 21;
            return _db["default"].schema.hasTable("admin_users").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("admin_users", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.integer("user_group_id").unsigned().notNullable();
                  t.foreign("user_group_id").references("id").inTable("user_groups");
                  t.string("first_name", 255).notNullable();
                  t.string("last_name", 255).nullable();
                  t.integer("city_id").unsigned().nullable();
                  t.foreign("city_id").references("id").inTable("cities");
                  t.string("location", 255).nullable();
                  t.string("mobile_number", 255).nullable();
                  t.string("alternate_mobile_number", 255).nullable();
                  t.string("email", 255).unique().notNullable();
                  t.string("alternate_email", 255).unique().nullable();
                  t.datetime("email_verified_at").nullable();
                  t.string("password", 255).notNullable();
                  t.text("two_factor_secret").nullable();
                  t.text("two_factor_recovery_codes").nullable();
                  t.datetime("two_factor_confirmed_at").nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.enu("is_password_change", ["0", "1"]).defaultTo("0");
                  t.string("remember_token", 100).nullable();
                  t.bigint("current_team_id").nullable();
                  t.string("profile_photo_path", 2048).nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 21:
            _context.next = 23;
            return _db["default"].schema.hasTable("users").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("users", function (t) {
                  t.increments("id").primary();
                  t.integer("user_group_id");
                  // t.foreign("user_group_id").references("id").inTable("user_groups");
                  t.string("name", 255);
                  t.string("user_unique_id", 255);
                  t.string("mobile_number", 255);
                  t.string("user_name", 255);
                  t.string("password", 255);
                  t.integer("otp", 10);
                  t.string("refresh_token", 255);
                  t.string("email", 255);
                  t.timestamp("email_verified_at").nullable();
                  t.timestamp("registration_date").defaultTo(_db["default"].fn.now());
                  t.enu("online_status", ["online", "offline", "squeeze"]).defaultTo("online");
                  t.string("device", 255).nullable();
                  t.string("longitude", 255).nullable();
                  t.string("latitude", 255).nullable();
                  t.string("fcm_token", 255).nullable();
                  t.string("app_version", 255).nullable();
                  t.enu("app_os_format", ["android", "ios", "website"]).defaultTo("android");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.string("remember_token", 100).nullable();
                  t.string("image", 2048).nullable();
                  t.timestamp("first_otp_verified_at").nullable();
                  t.timestamp("last_otp_verified_at").nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 23:
            _context.next = 25;
            return _db["default"].schema.hasTable("user_address").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("user_address", function (t) {
                  t.increments("id").primary();
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.string("title", 255).nullable();
                  t.string("address", 255).nullable();
                  t.string("landmark", 255).nullable();
                  // t.string("name", 255).nullable();
                  t.string("type", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 25:
            _context.next = 27;
            return _db["default"].schema.hasTable("app_settings").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("app_settings", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("name", 255).nullable();
                  t.string("key", 255).unique().notNullable();
                  t.string("value", 255).unique().notNullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 27:
            _context.next = 29;
            return _db["default"].schema.hasTable("coupons").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("coupons", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("name", 255).nullable();
                  t.string("coupon_code", 255).nullable();
                  t.string("image", 255).nullable();
                  // t.string("promo_string", 255).nullable();
                  t.integer("admin_id").unsigned().notNullable();
                  t.foreign("admin_id").references("id").inTable("admin_users");
                  t.integer("discount").nullable();
                  t.integer("minimum_amount").nullable();
                  t.integer("maximum_discount_amount").nullable();
                  t.integer("minimum_billing_amount").nullable();
                  t.enu("discount_type", ["percentage", "flat"]).defaultTo("percentage");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 29:
            _context.next = 31;
            return _db["default"].schema.hasTable("banners").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("banners", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("image", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 31:
            _context.next = 33;
            return _db["default"].schema.hasTable("tax_types").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("tax_types", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("name", 255).nullable();
                  t.integer("tax_rate").nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 33:
            _context.next = 35;
            return _db["default"].schema.hasTable("product_type").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("product_type", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("name", 255).nullable();
                  t.string("image", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 35:
            _context.next = 37;
            return _db["default"].schema.hasTable("categories").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("categories", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255);
                  t.string("image", 255);
                  t.integer("product_type_id").unsigned().notNullable();
                  t.foreign("product_type_id").references("id").inTable("product_type");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 37:
            _context.next = 39;
            return _db["default"].schema.hasTable("unit_types").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("unit_types", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("value", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 39:
            _context.next = 41;
            return _db["default"].schema.hasTable("subscription_type").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("subscription_type", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 41:
            _context.next = 43;
            return _db["default"].schema.hasTable("products").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("products", function (t) {
                  t.increments("id").primary();
                  t.integer("category_id").unsigned().notNullable();
                  t.foreign("category_id").references("id").inTable("categories");
                  t.integer("unit_type_id").unsigned().notNullable();
                  t.foreign("unit_type_id").references("id").inTable("unit_types");
                  t.integer("product_type_id").unsigned().notNullable();
                  t.foreign("product_type_id").references("id").inTable("product_type");
                  t.integer("unit_value").notNullable();
                  t.integer("price").notNullable();
                  // t.integer("subscription_type_id").unsigned().notNullable();
                  // t.foreign("subscription_type_id")
                  //   .references("id")
                  //   .inTable("subscription_type");

                  t.string("name", 255).nullable();
                  t.text("description").nullable();
                  t.text("image").nullable();
                  t.text("thumbnail_image").nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 43:
            _context.next = 45;
            return _db["default"].schema.hasTable("weekdays").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("weekdays", function (t) {
                  t.increments("id").primary();
                  t.string("name", 255).nullable();
                  t.string("code", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 45:
            _context.next = 47;
            return _db["default"].schema.hasTable("feedbacks").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("feedbacks", function (t) {
                  t.increments("id").primary();
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.string("comments", 255).nullable();
                  t.integer("message_id").unsigned().notNullable();
                  t.foreign("message_id").references("id").inTable("feedback_message");
                  t.timestamps(true, true);
                });
              }
            });
          case 47:
            _context.next = 49;
            return _db["default"].schema.hasTable("rider_details").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("rider_details", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("name", 255).notNullable();
                  t.string("user_name", 255).notNullable();
                  t.string("mobile_number", 255).nullable();
                  t.integer("branch_id").unsigned().notNullable();
                  t.foreign("branch_id").references("id").inTable("admin_users");
                  t.string("password", 255).notNullable();
                  t.string("address", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 49:
            _context.next = 51;
            return _db["default"].schema.hasTable("routes").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("routes", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.integer("rider_id").unsigned().nullable();
                  t.foreign("rider_id").references("id").inTable("rider_details");
                  t.integer("city_id").unsigned().notNullable();
                  t.foreign("city_id").references("id").inTable("cities");
                  t.string("starting_point", 255).nullable();
                  t.string("ending_point", 255).nullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 51:
            _context.next = 53;
            return _db["default"].schema.hasTable("subscribed_user_details").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("subscribed_user_details", function (t) {
                  t.increments("id").primary();
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("subscribe_type_id").unsigned().notNullable();
                  t.foreign("subscribe_type_id").references("id").inTable("subscription_type");
                  t.integer("branch_id").unsigned().nullable();
                  t.foreign("branch_id").references("id").inTable("admin_users");
                  t.integer("router_id").unsigned().nullable();
                  t.foreign("router_id").references("id").inTable("routes");
                  t.date("date").nullable();
                  t.date("start_date").notNullable();
                  t.date("assigned_date").nullable();
                  t.date("subscription_start_date").nullable();
                  t.json("customized_days").nullable();
                  t.integer("user_address_id").unsigned().notNullable();
                  t.foreign("user_address_id").references("id").inTable("user_address");
                  t.integer("product_id").unsigned().notNullable();
                  t.foreign("product_id").references("id").inTable("products");
                  t.integer("quantity").notNullable();
                  t.enu("subscription_status", ["pending", "assigned", "cancelled", "subscribed", "unsubscribed", "branch_cancelled", "change_date", "change_qty", "change_address"]).defaultTo("pending");
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 53:
            _context.next = 55;
            return _db["default"].schema.hasTable("daily_orders").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("daily_orders", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.integer("branch_id").unsigned().notNullable();
                  t.foreign("branch_id").references("id").inTable("admin_users");
                  t.integer("user_id").unsigned().nullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.date("date").nullable();
                  t.integer("subscription_id").unsigned().nullable();
                  t.foreign("subscription_id").references("id").inTable("subscribed_user_details");
                  t.integer("product_id").unsigned().nullable();
                  t.foreign("product_id").references("id").inTable("products");
                  t.integer("router_id").unsigned().nullable();
                  t.foreign("router_id").references("id").inTable("routes");
                  t.integer("rider_id").unsigned().nullable();
                  t.foreign("rider_id").references("id").inTable("rider_details");
                  t.integer("user_address_id").unsigned().nullable();
                  t.foreign("user_address_id").references("id").inTable("user_address");
                  t.integer("qty").nullable();
                  t.enu("status", ["pending", "delivered", "undelivered"]).defaultTo("pending");
                  t.timestamps(true, true);
                });
              }
            });
          case 55:
            _context.next = 57;
            return _db["default"].schema.hasTable("bill_history").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("bill_history", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.string("bill_no", 255);
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("items").unsigned().notNullable();
                  t.integer("subscribe_type_id").unsigned().notNullable();
                  t.foreign("subscribe_type_id").references("id").inTable("subscription_type");
                  t.integer("product_type_id").unsigned().notNullable();
                  t.foreign("product_type_id").references("id").inTable("product_type");
                  t.integer("product_id", 255).unsigned().notNullable();
                  t.foreign("product_id").references("id").inTable("products");
                  t.integer("total_amount").unsigned().notNullable();
                  t.date("date").notNullable();
                  t.integer("bill_value", 255).unsigned().notNullable();
                  t.enu("status", ["0", "1"]).defaultTo("1");
                  t.timestamps(true, true);
                });
              }
            });
          case 57:
            _context.next = 59;
            return _db["default"].schema.hasTable("pause_dates").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("pause_dates", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.integer("user_id").unsigned().nullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("subscription_id").unsigned().nullable();
                  t.foreign("subscription_id").references("id").inTable("subscribed_user_details");
                  t.date("date").nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 59:
            _context.next = 61;
            return _db["default"].schema.hasTable("monthly_paused_dates").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("monthly_paused_dates", function (t) {
                  t.increments("id").primary().unsigned().notNullable();
                  t.integer("user_id").unsigned().nullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("subscription_id").unsigned().nullable();
                  t.foreign("subscription_id").references("id").inTable("subscribed_user_details");
                  t.json("date").nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 61:
            _context.next = 63;
            return _db["default"].schema.hasTable("add_on_orders").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("add_on_orders", function (t) {
                  t.increments("id").primary();
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("address_id").unsigned().notNullable();
                  t.foreign("address_id").references("id").inTable("user_address");
                  t.date("delivery_date").nullable();
                  t.enu("status", ["pending", "delivery", "not delivery"]).defaultTo("pending");
                  t.integer("tip_amount").nullable();
                  t.integer("grand_total").nullable();
                  t.integer("sub_total").nullable();
                  t.integer("coupon_id").nullable();
                  t.string("coupon_code").nullable();
                  t.integer("coupon_amount").nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 63:
            _context.next = 65;
            return _db["default"].schema.hasTable("add_on_order_items").then(function (exists) {
              if (!exists) {
                return _db["default"].schema.createTable("add_on_order_items", function (t) {
                  t.increments("id").primary();
                  t.integer("add_on_order_id").Nullable();
                  t.foreign("add_on_order_id").references("id").inTable("add_on_orders");
                  t.integer("user_id").unsigned().notNullable();
                  t.foreign("user_id").references("id").inTable("users");
                  t.integer("product_id").unsigned().notNullable();
                  t.foreign("product_id").references("id").inTable("products");
                  t.enu("status", ["pending", "delivery", "not delivery"]).defaultTo("pending");
                  t.string("quantity", 255).nullable();
                  t.integer("tax_price").nullable();
                  t.integer("price").nullable();
                  t.integer("total_price").nullable();
                  t.integer("tax_id").nullable();
                  t.timestamps(true, true);
                });
              }
            });
          case 65:
            return _context.abrupt("return", res.status(200).json({
              status: true,
              message: "table successfully created"
            }));
          case 68:
            _context.prev = 68;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              status: false,
              message: "Error at creating tables",
              error: _context.t0
            }));
          case 72:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 68]]);
  }));
  return function createTable(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createTable = createTable;