"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _fs = _interopRequireDefault(require("fs"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _db = _interopRequireDefault(require("./services/db.service"));
var _jwt = require("./services/jwt.service");
var _bodyParser2 = _interopRequireDefault(require("./middlewares/bodyParser.middleware"));
var _authToken = require("./middlewares/authToken.middleware");
var _user_main = _interopRequireDefault(require("./routes/user_main.route"));
var _super_admin_main = _interopRequireDefault(require("./routes/super_admin_main.route"));
var _branch_admin_main = _interopRequireDefault(require("./routes/branch_admin_main.route"));
var _rider_main = _interopRequireDefault(require("./routes/rider_main.route"));
var _auth_main = _interopRequireDefault(require("./routes/auth_main.route"));
var _create_table = require("./table/create_table");
var _insert_data = require("./table/insert_data");
var _about = require("./controllers/about/about.controller");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require("dotenv").config();
var path = require("path");
var app = (0, _express["default"])();
var cors = require("cors");
var ejsMate = require("ejs-mate");
var methodOverride = require("method-override");

// const MySQLStore = require('connect-mysql')(session) // mysql session store
// const options = {
//   config: {
//     user: 'root', 
//     password: 'root',
//     database: 'maram' 
//   }
// }

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));
app.use("/uploads", _express["default"]["static"]("./uploads"));
// console.log(__dirname +  "/public")
app.use((0, _connectFlash["default"])());
app.use(_express["default"]["static"]("public"));
// app.use(express.static(__dirname +  "/public"));

app.use(cors());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

// create upload folder
_fs["default"].access("./uploads", function (error) {
  // To check if the given directory
  // already exists or not
  if (error) {
    // If current directory does not exist
    // then create it
    _fs["default"].mkdir("./uploads", function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("New Directory created successfully !!");
      }
    });
  }
});
var dirname = 'D:/maram-api/public/';
app.get('/', function (req, res) {
  res.json({
    'message': 'ok'
  });
});
app.use('/api', _bodyParser2["default"], _user_main["default"]);
var secret = "thisissecret";

//https://github.com/nlf/connect-mysql
// for future we need to store the session in mysql to keep the sessions data

var sessionConfig = {
  name: "token",
  // secure:true,
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    HttpOnly: true,
    // this is default was true
    // secure:true, // note we only can give this on deployment mode not in localhost . if we give in localhost it will break things, eg: we can't login
    // expires: new Date().setDate(new Date().getDate() + 1),
    // maxAge: new Date().setDate(new Date().getDate() + 1),
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
    //    miliseconds * seconds * minutes * hours * days = 1 week in miliseconds
  }
  // store: new MySQLStore(options)
};

app.use((0, _expressSession["default"])(sessionConfig));
dotenv.config();
app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var token, currentTokenPayload, user, is_super_admin;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.locals.host_name = req.headers.host;
            res.locals.success = req.flash("success");
            res.locals.error = req.flash("error");
            token = req.session.token;
            if (!token) {
              _context.next = 18;
              break;
            }
            currentTokenPayload = (0, _jwt.parseJwtPayload)(token.token);
            if (currentTokenPayload.group_id) {
              _context.next = 9;
              break;
            }
            req.flash("error", "Need To Login First");
            return _context.abrupt("return", res.redirect("/auth/login"));
          case 9:
            _context.next = 11;
            return (0, _db["default"])("admin_users").select("first_name", "profile_photo_path").where({
              id: currentTokenPayload.user_id
            });
          case 11:
            user = _context.sent;
            if (user[0].profile_photo_path) {
              user[0].profile_photo_path = "http://" + req.headers.host + user[0].profile_photo_path;
            }
            res.locals.admin_id = currentTokenPayload.user_id;
            res.locals.user = user[0];
            is_super_admin = false;
            if (currentTokenPayload.group_id == 1) {
              is_super_admin = true;
            }
            res.locals.is_super_admin = is_super_admin;
          case 18:
            // need to check token and navbar set profile and name

            // res.locals.currentUser = req.user;
            // res.locals.success = req.flash("success");
            // res.locals.error = req.flash("error");
            // const user = await User.find({});
            // const owner = user[0];
            // console.log(owner)
            // res.locals.owner = owner;
            // if(!['/login', '/','/cart','/cart/:id'].includes(req.originalUrl)) {
            //     req.session.previousReturnTo = req.session.returnTo; // store the previous url
            //     req.session.returnTo = req.originalUrl; // assign a new url
            //     // console.log('req.session.previousReturnTo', req.session.previousReturnTo)
            //     // console.log('req.session.returnTo', req.session.returnTo);
            //  }

            next();
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.get("/", function (req, res) {
  res.json({
    message: "ok",
    expire: req.session.cookie.expires
  });
});
app.get("/home", _authToken.authenticateJWTSession, function (req, res) {
  var is_super_admin = req.body.is_super_admin;
  var is_user_added = req.query.is_user_added;
  if (!is_super_admin && is_user_added == 1) {
    req.flash("error", "User Already Found");
    return res.render("super_admin/home/home");
  }
  if (!is_super_admin && is_user_added == 2) {
    req.flash("success", "User Created SuccessFully");
    return res.render("super_admin/home/home");
  }
  if (is_super_admin && is_user_added == 1) {
    req.flash("error", "User Already Found");
    return res.render("super_admin/home/home");
  }
  if (is_super_admin && is_user_added == 2) {
    req.flash("success", "User Created SuccessFully");
    return res.render("super_admin/home/home");
  }
  if (is_super_admin) {
    res.render("super_admin/home/home");
  } else {
    res.render("branch_admin/home/home");
  }
});
app.get("/about_us", function (req, res) {
  res.render("static/about_us");
});
app.get("/privacy_policy", function (req, res) {
  res.render("static/privacy_policy");
});
app.get("/refund_policy", function (req, res) {
  res.render("static/refund_policy");
});
app.get("/terms_and_conditions", function (req, res) {
  res.render("static/terms_and_conditions");
});
app.use("/auth", _bodyParser2["default"], _auth_main["default"]);
app.get("/insert_data", _insert_data.insertData);
app.get("/create_table", _create_table.createTable);
// app.get("/gethtml",html);
app.use(function (err, req, res, next) {
  // because err.status is undefined 
  res.status(400).json({
    error: {
      message: err.message
    }
  });
});
app.use("/super_admin", _bodyParser2["default"], _authToken.authenticateJWTSession, _super_admin_main["default"]);
app.use("/branch_admin", _bodyParser2["default"], _authToken.authenticateJWTSession, _branch_admin_main["default"]);
app.use("/api", _bodyParser2["default"], _user_main["default"]);
app.use("/rider_api", _bodyParser2["default"], _rider_main["default"]);
var _default = app;
exports["default"] = _default;