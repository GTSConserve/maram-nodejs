import { phoneNumberValidator, integerValidator } from "../utils/helper.util"

import messages from "../constants/messages"

export const loginValidator = (payload) => {
  const mobile_number = payload.mobile_number ?? null
  const fcmToken = payload.fcm_token ?? null
  const device = payload.device ?? null
  const appOsFormat = payload.app_os_format ?? null
  const appVersion = payload.app_version ?? null
  // const email = payload.email ?? null
  if (mobile_number && fcmToken && device && appOsFormat&&appVersion) {
    if (phoneNumberValidator(mobile_number)) {
        return { status: true, mobile_number, fcmToken, device, appOsFormat }
    } else {
      return { status: false, message: "Invalid phone number" }
    }
  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}

export const userValidator = (payload) => {
  const user_name = payload.user_name ?? null
  const password = payload.password ?? null
  
  if (user_name && password) {
    if (integerValidator(password)) {
        return { status: true, user_name, password }
    } else {
      return { status: false, message: "Invalid password" }
    }
  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}

export const profileUpdateValidator = (payload) => {
  const name = payload.name ?? null
  const email = payload.email ?? null
  const profilePhoto = payload.profile_photo_path ?? null
  const onlineStatus = payload.online_status ?? null
  const languageId = payload.language_id ?? null

  if (name && email && profilePhoto && onlineStatus && languageId) {

        return { status: true, name, email, profilePhoto, onlineStatus,languageId }
   
  } else {
    return { status: false, message:messages.PROFILE_UPDATE }

   }
}

export const verifyOtpValidator = (payload) => {
  const otp = payload.otp ?? null
  const userId = payload.user_id ?? null
  if (otp && userId ) {
    if (integerValidator(otp)) {
        return { status: true, otp, userId }
    } else {
      return { status: false, message: "Invalid Otp" }
    }
  } else {
    if(!otp){
      return { status: false, message: "Please Fill the OTP" }
    }
    else{
    return { status: false, message: "Mandatory fields missing" }
    }
  }
}

export const latLongValidator = (payload) => {
	const latitude = payload.latitude ?? null
	const longitude = payload.longitude ?? null

	if(latitude && longitude){
		if(integerValidator(latitude) && integerValidator(longitude)){
			return { status: true, latitude, longitude }
		} else{
			return { status: false, message: "Invalid latitude or longitude" }
		}
	} else{
		return { status: false, message: "Mandatory fields missing" }
	}
}

export const userAddressValidator = (payload) => {
  
  const address = payload.address ?? null
  const title = payload.title ?? null
  const landmark = payload.landmark ?? null
  const type = payload.type ?? null
  const user_id = payload.user_id ?? null
  

  if (address &&  landmark && title  && user_id && type) {

    return { status: true, address, landmark, user_id, type,title }

  } else {
    return { status: false, message: "error" }

  }
}