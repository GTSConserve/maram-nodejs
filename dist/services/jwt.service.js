"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.parseJwtPayload = exports.createToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var createToken = function createToken(payload) {
  try {
    var token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1y'
    });
    var refreshToken = _jsonwebtoken["default"].sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1y'
    });
    return {
      status: true,
      token: token,
      refreshToken: refreshToken
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: 'Token generation failed'
    };
  }
};
exports.createToken = createToken;
var verifyToken = function verifyToken(token, secret) {
  return new Promise(function (resolve, reject) {
    try {
      _jsonwebtoken["default"].verify(token, secret, function (err, user) {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject({
              status: false,
              isExpired: true,
              message: 'Bad token'
            });
          } else {
            reject({
              status: false,
              isExpired: false,
              message: 'Bad token'
            });
          }
        }
        // console.log(err)
        resolve({
          status: true,
          token: token,
          user: user
        });
      });
    } catch (error) {
      reject({
        status: false,
        isExpired: false,
        message: 'Bad token'
      });
    }
  });
};
exports.verifyToken = verifyToken;
var parseJwtPayload = function parseJwtPayload(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};
exports.parseJwtPayload = parseJwtPayload;