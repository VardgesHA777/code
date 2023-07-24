import { instance } from "api/auth";
import {
  setEmailForResetWasSent,
  setConfirmResetPassword,
} from "./passwordResetSlice";
const { REACT_APP_BACKEND_API_URL_ACCOUNTS } = process.env;

export const sendEmailForeResetPassword = (email) => async (dispatch) => {
  try {
    await instance.post(`${REACT_APP_BACKEND_API_URL_ACCOUNTS}reset-password/`, {
      email,
    });

    dispatch(setEmailForResetWasSent({ sent: true, message: "" }));
  } catch (e) {
    console.log(e);
    dispatch(
      setEmailForResetWasSent({ sent: false, message: "User does not exist." })
    );
  }
};

export const confirmResetPassword = (payload) => async (dispatch) => {
  try {
    await instance.post(
      `${REACT_APP_BACKEND_API_URL_ACCOUNTS}reset-password-confirm/`,
      payload
    );
    dispatch(setConfirmResetPassword({ sent: true, message: "" }));
  } catch (e) {
    console.log(e.message);
    dispatch(
      setConfirmResetPassword({
        sent: false,
        message: "Token is invalid or expired",
      })
    );
  }
};
