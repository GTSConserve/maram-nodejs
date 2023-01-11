"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVerifyPaymentMethod = exports.getRazorpayMethod = exports.getPaymentStatusUpdate = exports.getPaymentReminder = exports.getPaymentMethod = void 0;
var _responseCode = _interopRequireDefault(require("../../constants/responseCode"));
var _messages = _interopRequireDefault(require("../../constants/messages"));
var _message = require("../../notifications/message.sender");
var _payment = require("../../models/user/payment.model");
var _crypto = _interopRequireWildcard(require("crypto"));
var _db = _interopRequireDefault(require("../../services/db.service"));
var _razorpay = _interopRequireDefault(require("razorpay"));
var _nodeSchedule = _interopRequireDefault(require("node-schedule"));
var _shortid = _interopRequireDefault(require("shortid"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getPaymentReminder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var rule, job, reminder;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            rule = new _nodeSchedule["default"].RecurrenceRule();
            rule.dayOfWeek = [0, new _nodeSchedule["default"].Range(4, 6)];
            rule.hour = 17;
            rule.minute = 0;
            job = _nodeSchedule["default"].scheduleJob(rule, function () {
              console.log('Please Pay Your Bill Amount....!');
            });
            _context.next = 8;
            return (0, _db["default"])('bill_history').select('user_id').where({
              payment_status: "success"
            });
          case 8:
            reminder = _context.sent;
            job.cancel();
            _context.next = 12;
            return (0, _message.sendNotification)({
              include_external_user_ids: [reminder.user_id].toString(),
              contents: {
                en: "Your Payment Reminder"
              },
              headings: {
                en: "Your Payment Reminder"
              },
              name: "Your Payment Reminder",
              data: {
                status: "pending",
                category_id: 0,
                product_type_id: 0,
                type: 3,
                messages: job,
                reminder_id: reminder.user_id
                //   amount: options.amount,
              }
            });
          case 12:
            res.status(200).json({
              status: true,
              message: "Ok"
            });

            // res.status(200).json({ status: true,data: settings.body }) 
            _context.next = 19;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              status: false,
              error: _context.t0
            });
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function getPaymentReminder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPaymentReminder = getPaymentReminder;
var getPaymentMethod = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var payment_method;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _db["default"])('payment_gateways').select('payment_gateways.id as payment_method_id', 'payment_gateways.gatewayname as payment_method_name', 'payment_gateways.status as payment_method_status');
          case 3:
            payment_method = _context2.sent;
            console.log(payment_method);
            res.status(200).json({
              status: true,
              data: payment_method
            });
            _context2.next = 12;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).json({
              status: false,
              error: _context2.t0
            });
          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getPaymentMethod(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getPaymentMethod = getPaymentMethod;
var getPaymentStatusUpdate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, userId, order_id, payment_status, payment_type, payment_method_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, token, response, type;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, userId = _req$body.userId, order_id = _req$body.order_id, payment_status = _req$body.payment_status, payment_type = _req$body.payment_type, payment_method_id = _req$body.payment_method_id, razorpay_order_id = _req$body.razorpay_order_id, razorpay_payment_id = _req$body.razorpay_payment_id, razorpay_signature = _req$body.razorpay_signature, token = _req$body.token;
            console.log(req.body);
            if (!(!order_id && !payment_type && !payment_status && !razorpay_signature && !payment_method_id && !razorpay_order_id && !razorpay_payment_id)) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 5:
            _context3.next = 7;
            return (0, _db["default"])('bill_history').update({
              payment_status: payment_status
            }).where({
              user_id: userId
            });
          case 7:
            response = _context3.sent;
            _context3.next = 10;
            return (0, _db["default"])('payment_gateways').update({
              gatewayname: payment_type
            }).where({
              user_id: userId
            });
          case 10:
            type = _context3.sent;
            res.status(200).json({
              status: true,
              message: "Ok"
            });
            _context3.next = 18;
            break;
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(500).json({
              status: false,
              error: _context3.t0
            });
          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function getPaymentStatusUpdate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getPaymentStatusUpdate = getPaymentStatusUpdate;
var getRazorpayMethod = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, amount, order_id, userId, pay, razorpay, options, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, amount = _req$body2.amount, order_id = _req$body2.order_id, userId = _req$body2.userId; // console.log(userId)
            _context4.next = 4;
            return (0, _payment.getPayment)(amount, order_id, userId);
          case 4:
            pay = _context4.sent;
            if (!(!amount && !order_id)) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 7:
            //console.log(pay);
            razorpay = new _razorpay["default"]({
              key_id: process.env.RAZORPAY_KEY_ID,
              key_secret: process.env.RAZORPAY_KEY_SECRET
            });
            if (razorpay) {
              _context4.next = 10;
              break;
            }
            return _context4.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: "please check razorpay id"
            }));
          case 10:
            options = {
              amount: amount,
              currency: "INR",
              receipt: order_id
            }; // const signature = await knex('users').select('id')
            // .insert({
            //     razorpay_payment_id: options.id
            // }) .where({"users.id":userId})
            // console.log(options[0].id)
            _context4.next = 13;
            return razorpay.orders.create(options);
          case 13:
            response = _context4.sent;
            _context4.next = 16;
            return (0, _message.sendNotification)({
              include_external_user_ids: [order_id.toString()],
              contents: {
                en: "Your Razorpay Placed SuccessFully"
              },
              headings: {
                en: "Razorpay Notification"
              },
              name: "Razorpay Notification",
              data: {
                status: "pending",
                category_id: 0,
                product_type_id: 0,
                type: 3,
                receipt: options.receipt,
                amount: options.amount
              }
            });
          case 16:
            res.status(200).json({
              status: true,
              data: response
            });
            _context4.next = 23;
            break;
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(500).json({
              status: false,
              message: "Razorpay method failed..."
            });
          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return function getRazorpayMethod(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getRazorpayMethod = getRazorpayMethod;
var getVerifyPaymentMethod = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, order_id, payment_id, secret, shasum, digest;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body3 = req.body, order_id = _req$body3.order_id, payment_id = _req$body3.payment_id;
            if (!(!order_id && !payment_id)) {
              _context5.next = 4;
              break;
            }
            return _context5.abrupt("return", res.status(_responseCode["default"].FAILURE.DATA_NOT_FOUND).json({
              status: false,
              message: _messages["default"].MANDATORY_ERROR
            }));
          case 4:
            secret = "razorpaysecret";
            shasum = _crypto["default"].createHmac("sha256", secret);
            shasum.update(order_id + "|" + payment_id);
            digest = shasum.digest('hex');
            console.log(digest, req.headers["x-razorpay-signature"]);
            if (digest === req.headers["x-razorpay-signature"]) {
              console.log("request is properly");
              res.status(200).json({
                message: "Payment has been verified"
              });
            } else {
              res.status(403).json({
                message: "Payment verification failed"
              });
            }
            _context5.next = 16;
            break;
          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            res.status(500).json({
              status: false,
              error: _context5.t0
            });
          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function getVerifyPaymentMethod(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getVerifyPaymentMethod = getVerifyPaymentMethod;