import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication/authenticationSlice";
import userInvitationSlice from "./userInvitation/userInvitationSlice";
import passwordResetSlice from "./passwordReset/passwordResetSlice";
import duplicationSlice from "./duplication/duplicationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    userInvitation: userInvitationSlice,
    passwordReset: passwordResetSlice,
    duplication: duplicationSlice,
  },
});