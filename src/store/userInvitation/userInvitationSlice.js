import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInvitationSuccess: false,
  userInvitationInfo: {
    isSent: null,
    message: "",
  },
  userSignUpInfo: {
    isSent: null,
    message: "",
  },
  invitedUserEmail: "",
  userSignUpMessage: "",
  userSignUpFailure: false,
  invitedUserEmailInfo: {
    emailGet: null,
    message: "",
  },
  userInvitationValue: "",
};

export const userInvitationSlice = createSlice({
  name: "UserInvitationSlice",
  initialState,
  reducers: {
    setUserInvitationSuccess: (state, action) => {
      state.userInvitationSuccess = action.payload;
    },
    setInvitedUserEmail: (state, action) => {
      state.invitedUserEmail = action.payload;
    },
    setUserSignUpMessage: (state, action) => {
      state.userSignUpMessage = action.payload;
    },
    setUserInvitationInfo: (state, action) => {
      state.userInvitationInfo = action.payload;
    },
    setUserSignUpInfo: (state, action) => {
      state.userSignUpInfo = action.payload;
    },
    setInvitedUserEmailInfo: (state, action) => {
      state.invitedUserEmailInfo = action.payload;
    },
    setUserInvitationValue: (state, action) => {
      state.userInvitationValue = action.payload;
    },
  },
});

export const {
  setUserInvitationSuccess,
  setInvitedUserEmail,
  setUserSignUpMessage,
  setUserInvitationInfo,
  setUserSignUpInfo,
  setInvitedUserEmailInfo,
  setUserInvitationPage,
  setUserInvitationValue,
} = userInvitationSlice.actions;

export default userInvitationSlice.reducer;
