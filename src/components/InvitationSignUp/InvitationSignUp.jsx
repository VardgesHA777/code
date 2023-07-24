import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";

import {
  BootstrapButton,
  CssTextField,
} from "../../pages/Authentication/authShared.styles";
import AuthenticationLayout from "layout/Authentication/AuthenticationLayout";
import useForm from "hooks/useForm";
import { validator } from "helpers/validator/validator";
import { EyeIconPassword } from "assets/components/EyeIconPassword";

const InvitationSignUp = () => {
  const initState = {
    email: "",
    password: "",
  };

  const submitForm = () => {
    console.log("Submited");
  };

  const { handleInputChange, handleSubmit, handleBlur, state, errors } =
    useForm({
      initState,
      callback: submitForm,
      validator,
    });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  const [signInInfo, setSignInInfo] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setSignInInfo({ ...signInInfo, showPassword: !signInInfo.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthenticationLayout title="Sign up">
      <form
        validate="true"
        onSubmit={handleSubmit}
      >
        <CssTextField
          required
          type="text"
          defaultValue={state.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="first-name"
          placeholder="First name"
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
        />
        <CssTextField
          required
          type="text"
          defaultValue={state.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="first-name"
          placeholder="First name"
          variant="outlined"
          margin="normal"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email}
        />
        <CssTextField
          required
          type="text"
          defaultValue={state.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled="true"
          name="first-name"
          placeholder="First name"
          variant="outlined"
          margin="normal"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email}
        />
        <CssTextField
          required
          error={errors.password ? true : false}
          helperText={errors.password}
          name="password"
          defaultValue={state.password}
          placeholder="Confirm password"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleInputChange}
          onBlur={handleBlur}
          type={signInInfo.showPassword ? "text" : "password"}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <EyeIconPassword />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <BootstrapButton
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          // className={classes.submit}
          disabled={!isValidForm}
          // onClick={() => logInWithEmailAndPassword(state.email, state.password)}
        >
          Sign up
        </BootstrapButton>
      </form>
    </AuthenticationLayout>
  );
};

export default InvitationSignUp;
