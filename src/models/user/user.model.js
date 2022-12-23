import responseCode from "../../constants/responseCode";
import { userGroup } from "../../constants/controls";
import knex from "../../services/db.service";

export const loginUser = async (mobile_number) => {
  const checkPhoneNumber = await knex
    .select("id")
    .from("users")
    .where({ mobile_number });

  try {
    return { status: responseCode.SUCCESS, body: checkPhoneNumber };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const verifyOtp = async (otp, userId, today) => {
  const queryCheck = await knex.select("*").from("users").where({
    otp: otp,
    id: userId,
    first_otp_verified_at: null,
  });

  let updateOtpQuery = "";
  if (queryCheck.body > 0) {
    updateOtpQuery = await knex("users")
      .where({
        otp: otp,
        id: userId,
      })
      .update({
        first_otp_verified_at: today,
        last_otp_verified_at: today,
      });
  } else {
    updateOtpQuery = await knex("users")
      .where({
        otp: otp,
        id: userId,
      })
      .update({
        last_otp_verified_at: today,
      });
  }

  const query = await knex.select(["id"]).from("users").where({
    otp: otp,
    id: userId,
  });
  try {
    return { status: responseCode.SUCCESS, data: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const updateUserLocation = async (payload) => {
  const updateLocationQuery = queryBuilder
    .update({
      latitude: payload.latitude,
      longitude: payload.longitude,
    })
    .into("users")
    .where({
      id: payload.userId,
    })
    .toString();
  try {
    const updateLocationResponse = await mysqlRequest(updateLocationQuery);
    if (updateLocationResponse.status === true) {
      return { status: updateLocationResponse.status };
    }
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const insertUser = async (payload, otp) => {

  const { mobile_number, fcmToken, device, appOsFormat, appVersion } = payload;
  const query = await knex
    .insert([
      {
        // user_unique_id: generate_id,
        mobile_number,
        fcm_token: fcmToken,
        otp,
        device,
        app_os_format: appOsFormat,
        app_version: appVersion,
        user_group_id: "3",
      },
    ])
    .into("users");
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const insertusernumber = async (payload, otp) => {

  const { mobile_number } = payload;
  const query = await knex
    .insert([
      {
        
        mobile_number,
        otp,
        
      },
    ])
    .into("users");
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const insertRider = async (payload, otp, today) => {
  const user_query = await knex.select(["id"]).from("rider_details");

  let user_length = user_query.body;

  user_length += 1;

  const generate_id = "MARAM" + user_length;

  const { user_name, password } = payload;
  const query = await knex
    .insert([
      {
        user_unique_id: generate_id,
        user_name: user_name,
        password: password,
        // otp: otp,
        // device:device,
        // app_os_format:appOsFormat,
        // app_version:appVersion,
        // user_group_id:'3'
        // email:email,
        // name:name
        // user_id: userGroup.USER_GROUP_ID,
        // app_version:'1.0',
        // status:'1',
      },
    ])
    .into("rider_details");
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const updateUserOtp = async (payload, otp) => {
  const { mobile_number } = payload;
  const query = await knex("users")
    .where({
      mobile_number
    })
    .update({
      otp,
      refresh_token: null,
    });
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
export const verifyUserOtp = async (req, res) => {
  try {
    const today = format(new Date(), "yyyy-MM-dd H:i:s");

    const payload = verifyOtpValidator(req.body);
    const { otp, userId } = payload;

    if (payload.status === true) {
      const response = await verifyOtp(otp, userId, today);
      if (response.data.body.length) {
        // const languageId=response.data.body[0].language_id
        const tokens = createToken({
          user_id: userId,
          user_group_id: userGroup.USER_GROUP_ID,
        });
        console.log(languageId);
        if (tokens.status) {
          await updateUserToken(tokens.refreshToken, userId);
          res
            .status(responseCode.SUCCESS)
            .json({ status: true, token: tokens.token });
        } else {
          res
            .status(responseCode.FAILURE.INTERNAL_SERVER_ERROR)
            .json({ status: false, message: "Token generation failed" });
        }
      } else {
        res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: "otp mismatch" });
      }
    } else {
      res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: payload.message });
    }
  } catch (error) {
    logger.error("Whooops! This broke with error: ", error);
    res.status(500).send("Error!");
  }
};
export const updateUser = async (payload, userId) => {
  const query = queryBuilder
    .update({
      name: payload.name,
      email: payload.email,
      profile_photo_path: payload.profilePhoto,
      // online_status:payload.onlineStatus,
      // language_id:payload.languageId,
    })
    .into("users")
    .where({
      id: userId,
    })
    .toString();
  try {
    const updatedUserResponce = await mysqlRequest(query);
    return { status: responseCode.SUCCESS, body: updatedUserResponce };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
export const updateUserLanguage = async (languageId, userId) => {
  const query = queryBuilder
    .update({
      language_id: languageId,
    })
    .into("users")
    .where({
      id: userId,
    })
    .toString();
  try {
    const updatedUserResponce = await mysqlRequest(query);
    return { status: responseCode.SUCCESS, body: updatedUserResponce };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
export const updateUserToken = async (refresh_token, userId) => {
  const query = await knex("users")
    .update({ refresh_token: refresh_token })
    .where({ id: userId });
  try {
    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
export const getUserToken = async (userId) => {
  const query = await knex.select("refresh_token").from("users").where({
    id: userId,
  });
  try {
    const updatedUserResponce = await mysqlRequest(query);

    return {
      status: responseCode.SUCCESS,
      refreshToken: updatedUserResponce.body[0].refresh_token,
      languageId: updatedUserResponce.body[0].language_id,
    };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
export const getUser = async (userId) => {
  const query = await knex
    .select(
      "user_id",
      "address_name",
      "address_details",
      "address_landmark",
      "address_longitude",
      "alternate_mobile"
    )
    .from("user_addresses");
  // .where({id:userId})

  try {
    return query;
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const userDetail = async (userId) => {
  const query = await knex.select("*").from("users").where({ id: userId });

  try {
    return query;
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getAccountModal = async (payload) => {
  const { userId } = payload;
  const responce = await knex.select("mobile_number").from("users").where({
    id: userId,
  });

  try {

    if (responce.length !== 0) {
      // const { mobile_number } = responce.body[0];

      return { status: responseCode.SUCCESS, };
    } else {
      return {
        status: responseCode.FAILURE.DATA_NOT_FOUND,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getAddress = async (user_id) => {
  const query = await knex
    .select("user_id", "name", "details", "landmark", "landmark", "longitude")
    .from("user_addresses");

  try {
    return { status: responseCode.SUCCESS, response: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const addUser = async (payload) => {
  const userAddress = await knex("user_address").insert({
    user_id: payload.user_id,
    address_details: payload.address_details,
    address_name: payload.address_name,
    address_landmark: payload.address_landmark,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  // console.log(userAddress)
  try {
    return res
      .status(responseCode.SUCCESS)
      .json({ status: true, data: userAddress });
  } catch (error) {
    console.log(error);
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getCities = async () => {
  const query = await knex.select("*").from("cities");

  try {
    return { status: responseCode.SUCCESS, response: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getPromo = async () => {
  const query = queryBuilder.select("*").from("offers").toString();
  try {
    const response = await mysqlRequest(query);

    return { status: responseCode.SUCCESS, response: response.body };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getSinglecoupon = async () => {
  const query = await knex.select("*").from("offers");
  try {
    const response = await mysqlRequest(query);

    return { status: responseCode.SUCCESS, response: response };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

// export const deleteUser = async (userId) => {

//   try {
//     const query= queryBuilder('users').where({id : userId}).update({status : '0'})

//     return { status: responseCode.SUCCESS, body: query }
//   } catch (error) {
//     return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
//   }
// }

export const logoutUser = async (userId) => {
  try {
    const query = await knex("users")
      .where({ id: userId })
      .update({ refresh_token: null });

    return { status: responseCode.SUCCESS, body: query };
  } catch (error) {
    return {
      status: responseCode.FAILURE.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
