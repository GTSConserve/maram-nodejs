"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _responseCode = _interopRequireDefault(require("../constants/responseCode"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var bodyParsercheck = function bodyParsercheck(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(_responseCode["default"].FAILURE.BAD_REQUEST).json({
      status: false,
      message: "Invalid json body"
    });
  }
};
var _default = bodyParsercheck;
exports["default"] = _default;