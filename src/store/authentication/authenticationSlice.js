import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  loginFailure: null,
  loginFailureStatus: '',
  redirectionUrl: "",
  loginLoading: null,
};

export const authenticationSlice = createSlice({
  name: "AuthenticationSlice",
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLoginFailure: (state, action) => {
      state.loginFailure = action.payload;
    },
    setLoginFailureStatus: (state, action) => {
      state.loginFailureStatus = action.payload;
    },
    setRedirectionURL: (state, action) => {
      state.redirectionUrl = action.payload;
    },
    setSignInInfo: (state, action) => {
      state.signInInfo = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
  },
});

export const {
  setLoginSuccess,
  setLoginFailure,
  setRedirectionURL,
  setSignInInfo,
  setLoginLoading,
  setLoginFailureStatus
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
