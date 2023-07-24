import axios from "axios";
import { instance } from "api/auth";
import {
  setInvitedUserEmail,
  setUserInvitationInfo,
  setUserSignUpInfo,
  setInvitedUserEmailInfo,
} from "./userInvitationSlice";

const { REACT_APP_BACKEND_API_URL_ACCOUNTS } = process.env;

export const inviteUserByEmail = (email) => async (dispatch) => {
  try {
    await instance.post(
      `${REACT_APP_BACKEND_API_URL_ACCOUNTS}users/invitations/`,
      {
        email,
      }
    );
    dispatch(
      setUserInvitationInfo({
        isSent: true,
        message: "",
      })
    );
  } catch (e) {
    const {
      response: { data },
    } = e;

    dispatch(
      setUserInvitationInfo({
        isSent: false,
        message: data?.email[0],
      })
    );
  }
};

export const getInvitedUserEmail = (token) => async (dispatch) => {
  try {
    const {
      data: { email },
    } = await instance.get(
      `${REACT_APP_BACKEND_API_URL_ACCOUNTS}users/invitations/${token}`
    );
    dispatch(setInvitedUserEmail(email));
    dispatch(
      setInvitedUserEmailInfo({
        emailGet: true,
        message: "",
      })
    );
  } catch (e) {
    dispatch(
      setInvitedUserEmailInfo({
        emailGet: false,
        message: "Token is invalid or expired",
      })
    );
  }
};

export const signUpUser = (payload) => async (dispatch) => {
  try {
    await axios.post(
      `${REACT_APP_BACKEND_API_URL_ACCOUNTS}users/invitations/accept/`,
      payload
    );
    dispatch(setUserSignUpInfo({ isSent: true, message: "" }));
  } catch (e) {
    dispatch(
      setUserSignUpInfo({
        isSent: false,
        message: "User with this email already exists",
      })
    );
  }
};
