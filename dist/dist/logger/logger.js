"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};
var logger = _winston["default"].createLogger({
  levels: _winston["default"].config.npm.levels,
  transports: [new _winston["default"].transports.File(options.file), new _winston["default"].transports.Console(options.console)],
  exitOnError: false
});
var _default = logger;
exports["default"] = _default;