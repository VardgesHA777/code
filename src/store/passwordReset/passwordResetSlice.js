import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailForResetWasSent: {
    sent: null,
    message: "",
  },
  confirmPasswordReset: {
    sent: null,
    message: ""
  }
};

export const passwordResetSlice = createSlice({
  name: "PasswordReset",
  initialState,
  reducers: {
    setEmailForResetWasSent: (state, action) => {
      state.emailForResetWasSent = action.payload;
    },
    setConfirmResetPassword: (state, action) => {
      state.confirmPasswordReset = action.payload;
    },
  },
});

export const { setEmailForResetWasSent, setConfirmResetPassword } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
