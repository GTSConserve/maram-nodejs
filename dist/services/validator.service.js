"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOtpValidator = exports.userValidator = exports.userProfileValidator = exports.userAddressValidator = exports.profileUpdateValidator = exports.loginValidator = exports.latLongValidator = exports.NumberValidator = void 0;
var _helper = require("../utils/helper.util");
var _messages = _interopRequireDefault(require("../constants/messages"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var loginValidator = function loginValidator(payload) {
  var _payload$mobile_numbe, _payload$fcm_token, _payload$device, _payload$app_os_forma, _payload$app_version;
  var mobile_number = (_payload$mobile_numbe = payload.mobile_number) !== null && _payload$mobile_numbe !== void 0 ? _payload$mobile_numbe : null;
  var fcmToken = (_payload$fcm_token = payload.fcm_token) !== null && _payload$fcm_token !== void 0 ? _payload$fcm_token : null;
  var device = (_payload$device = payload.device) !== null && _payload$device !== void 0 ? _payload$device : null;
  var appOsFormat = (_payload$app_os_forma = payload.app_os_format) !== null && _payload$app_os_forma !== void 0 ? _payload$app_os_forma : null;
  var appVersion = (_payload$app_version = payload.app_version) !== null && _payload$app_version !== void 0 ? _payload$app_version : null;
  // const email = payload.email ?? null
  if (mobile_number && fcmToken && device && appOsFormat && appVersion) {
    if ((0, _helper.phoneNumberValidator)(mobile_number)) {
      return {
        status: true,
        mobile_number: mobile_number,
        fcmToken: fcmToken,
        device: device,
        appOsFormat: appOsFormat
      };
    } else {
      return {
        status: false,
        message: "Invalid phone number"
      };
    }
  } else {
    return {
      status: false,
      message: "Mandatory fields missing"
    };
  }
};
exports.loginValidator = loginValidator;
var NumberValidator = function NumberValidator(payload) {
  var _payload$mobile_numbe2;
  var mobile_number = (_payload$mobile_numbe2 = payload.mobile_number) !== null && _payload$mobile_numbe2 !== void 0 ? _payload$mobile_numbe2 : null;
  // const email = payload.email ?? null
  if (mobile_number) {
    if ((0, _helper.phoneNumberValidator)(mobile_number)) {
      return {
        status: true,
        mobile_number: mobile_number
      };
    } else {
      return {
        status: false,
        message: "Invalid phone number"
      };
    }
  } else {
    return {
      status: false,
      message: "Mandatory fields missing"
    };
  }
};
exports.NumberValidator = NumberValidator;
var userValidator = function userValidator(payload) {
  var _payload$user_name, _payload$password;
  var user_name = (_payload$user_name = payload.user_name) !== null && _payload$user_name !== void 0 ? _payload$user_name : null;
  var password = (_payload$password = payload.password) !== null && _payload$password !== void 0 ? _payload$password : null;
  if (user_name && password) {
    if ((0, _helper.integerValidator)(password)) {
      return {
        status: true,
        user_name: user_name,
        password: password
      };
    } else {
      return {
        status: false,
        message: "Invalid password"
      };
    }
  } else {
    return {
      status: false,
      message: "Mandatory fields missing"
    };
  }
};
exports.userValidator = userValidator;
var profileUpdateValidator = function profileUpdateValidator(payload) {
  var _payload$name, _payload$email, _payload$profile_phot, _payload$online_statu, _payload$language_id;
  var name = (_payload$name = payload.name) !== null && _payload$name !== void 0 ? _payload$name : null;
  var email = (_payload$email = payload.email) !== null && _payload$email !== void 0 ? _payload$email : null;
  var profilePhoto = (_payload$profile_phot = payload.profile_photo_path) !== null && _payload$profile_phot !== void 0 ? _payload$profile_phot : null;
  var onlineStatus = (_payload$online_statu = payload.online_status) !== null && _payload$online_statu !== void 0 ? _payload$online_statu : null;
  var languageId = (_payload$language_id = payload.language_id) !== null && _payload$language_id !== void 0 ? _payload$language_id : null;
  if (name && email && profilePhoto && onlineStatus && languageId) {
    return {
      status: true,
      name: name,
      email: email,
      profilePhoto: profilePhoto,
      onlineStatus: onlineStatus,
      languageId: languageId
    };
  } else {
    return {
      status: false,
      message: _messages["default"].PROFILE_UPDATE
    };
  }
};
exports.profileUpdateValidator = profileUpdateValidator;
var verifyOtpValidator = function verifyOtpValidator(payload) {
  var _payload$otp, _payload$user_id;
  var otp = (_payload$otp = payload.otp) !== null && _payload$otp !== void 0 ? _payload$otp : null;
  var userId = (_payload$user_id = payload.user_id) !== null && _payload$user_id !== void 0 ? _payload$user_id : null;
  if (otp && userId) {
    if ((0, _helper.integerValidator)(otp)) {
      return {
        status: true,
        otp: otp,
        userId: userId
      };
    } else {
      return {
        status: false,
        message: "Invalid Otp"
      };
    }
  } else {
    if (!otp) {
      return {
        status: false,
        message: "Please Fill the OTP"
      };
    } else {
      return {
        status: false,
        message: "Mandatory fields missing"
      };
    }
  }
};
exports.verifyOtpValidator = verifyOtpValidator;
var latLongValidator = function latLongValidator(payload) {
  var _payload$latitude, _payload$longitude;
  var latitude = (_payload$latitude = payload.latitude) !== null && _payload$latitude !== void 0 ? _payload$latitude : null;
  var longitude = (_payload$longitude = payload.longitude) !== null && _payload$longitude !== void 0 ? _payload$longitude : null;
  if (latitude && longitude) {
    if ((0, _helper.integerValidator)(latitude) && (0, _helper.integerValidator)(longitude)) {
      return {
        status: true,
        latitude: latitude,
        longitude: longitude
      };
    } else {
      return {
        status: false,
        message: "Invalid latitude or longitude"
      };
    }
  } else {
    return {
      status: false,
      message: "Mandatory fields missing"
    };
  }
};
exports.latLongValidator = latLongValidator;
var userAddressValidator = function userAddressValidator(payload) {
  var _payload$address, _payload$title, _payload$landmark, _payload$type, _payload$alternate_mo, _payload$latitude2, _payload$longitude2;
  var address = (_payload$address = payload.address) !== null && _payload$address !== void 0 ? _payload$address : null;
  var title = (_payload$title = payload.title) !== null && _payload$title !== void 0 ? _payload$title : null;
  var landmark = (_payload$landmark = payload.landmark) !== null && _payload$landmark !== void 0 ? _payload$landmark : null;
  var type = (_payload$type = payload.type) !== null && _payload$type !== void 0 ? _payload$type : null;
  var alternate_mobile = (_payload$alternate_mo = payload.alternate_mobile) !== null && _payload$alternate_mo !== void 0 ? _payload$alternate_mo : null;
  var latitude = (_payload$latitude2 = payload.latitude) !== null && _payload$latitude2 !== void 0 ? _payload$latitude2 : null;
  var longitude = (_payload$longitude2 = payload.longitude) !== null && _payload$longitude2 !== void 0 ? _payload$longitude2 : null;
  if (address && landmark && title && type && alternate_mobile && latitude && longitude) {
    return {
      status: true,
      address: address,
      landmark: landmark,
      type: type,
      title: title,
      alternate_mobile: alternate_mobile,
      latitude: latitude,
      longitude: longitude
    };
  } else {
    return {
      status: false,
      message: "error"
    };
  }
};
exports.userAddressValidator = userAddressValidator;
var userProfileValidator = function userProfileValidator(payload) {
  var _payload$name2, _payload$email2;
  var name = (_payload$name2 = payload.name) !== null && _payload$name2 !== void 0 ? _payload$name2 : null;
  var email = (_payload$email2 = payload.email) !== null && _payload$email2 !== void 0 ? _payload$email2 : null;
  if (name && email) {
    if ((0, _helper.integerValidator)(name && email)) {
      return {
        status: true,
        name: name,
        email: email
      };
    } else {
      return {
        status: false,
        message: "please set unique name and email"
      };
    }
  } else {
    return {
      status: false,
      message: "Mandatory fields missing"
    };
  }
};
exports.userProfileValidator = userProfileValidator;