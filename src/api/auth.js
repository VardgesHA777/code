import axios from "axios";
import { AuthToken } from "helpers/Storage";
import { store } from "store";
import { push } from "connected-react-router";
import { setLoginFailure } from "store/authentication/authenticationSlice";
import {
  setCampaignIdValue,
  setProgressState,
} from "store/duplication/duplicationSlice";

const { REACT_APP_BACKEND_API_URL_ACCOUNTS } = process.env;

export const instance = axios.create({
  baseURL: REACT_APP_BACKEND_API_URL_ACCOUNTS,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthToken.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          if (AuthToken.get("refresh_token")) {
            const response = await axios.post(
              `${REACT_APP_BACKEND_API_URL_ACCOUNTS}token/refresh/`,
              {
                refresh: AuthToken.get("refresh_token"),
              }
            );
            AuthToken.set("access_token", response.data.access);
            return instance(originalConfig);
          }
        } catch (_error) {
          store.dispatch(push("/"));
          AuthToken.remove("access_token");
          AuthToken.remove("refresh_token");
          store.dispatch(setLoginFailure(_error.response.status));
          store.dispatch(setCampaignIdValue(""));
          store.dispatch(
            setProgressState({
              enterCampaignId: null,
              addAccounts: null,
              duplicate: null,
            })
          );
          return Promise.reject("");
        }
      }
    }
    return Promise.reject(err);
  }
);
