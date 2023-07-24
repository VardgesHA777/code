import {
  setLoginSuccess,
  setRedirectionURL,
  setSignInInfo,
  setLoginFailure,
  setLoginLoading,
  setLoginFailureStatus,
} from "./authenticationSlice";
import { AuthToken } from "helpers/Storage";
import { instance } from "api/auth";
import { getSearchedCampaigns } from "store/duplication/actions";
import { setCampaignIdValue } from "store/duplication/duplicationSlice";

const { REACT_APP_BACKEND_API_URL_ACCOUNTS } = process.env;

export const login = (email, password) => {
  return instance.post(`${REACT_APP_BACKEND_API_URL_ACCOUNTS}token/`, {
    email,
    password,
  });
};

export const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setLoginLoading(true));
      const response = await login(email, password);
      const {
        data: { access, refresh },
      } = response;

      AuthToken.set("access_token", access);
      AuthToken.set("refresh_token", refresh);
      dispatch(setRedirectionURL("/duplication"));
      dispatch(setLoginSuccess(true));
      dispatch(setLoginFailure(false));
      dispatch(setLoginLoading(false));
    } catch (e) {
      dispatch(setLoginFailureStatus(e?.response.status));
      dispatch(setLoginFailure(true));
      dispatch(setLoginLoading(false));
    }
  };
};

export const logout = () => async (dispatch) => {
  const refreshToken = AuthToken.get("refresh_token");
  const { status } = await instance.post(
    `${REACT_APP_BACKEND_API_URL_ACCOUNTS}logout/`,
    {
      refresh: refreshToken,
    }
  );
  AuthToken.remove("access_token");
  AuthToken.remove("refresh_token");

  status === 205 && dispatch(setLoginSuccess(false));
  dispatch(getSearchedCampaigns());
  dispatch(setLoginFailure(null));
  dispatch(setCampaignIdValue(""));
};

export const getSignInInfo = (payload) => (dispatch) => {
  dispatch(setSignInInfo(payload));
};
