"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _morganJson = _interopRequireDefault(require("morgan-json"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var format = (0, _morganJson["default"])({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
});
var httpLogger = (0, _morgan["default"])(format, {
  stream: {
    write: function write(message) {
      var _JSON$parse = JSON.parse(message),
        method = _JSON$parse.method,
        url = _JSON$parse.url,
        status = _JSON$parse.status,
        contentLength = _JSON$parse.contentLength,
        responseTime = _JSON$parse.responseTime;
      _logger["default"].info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method: method,
        url: url,
        status: Number(status),
        contentLength: contentLength,
        responseTime: Number(responseTime)
      });
    }
  }
});
var _default = httpLogger;
exports["default"] = _default;