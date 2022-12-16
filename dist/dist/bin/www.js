"use strict";

var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("../app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_http["default"].createServer(_app["default"]).listen(process.env.PORT);