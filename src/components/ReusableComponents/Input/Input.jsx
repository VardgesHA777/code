import useForm from "hooks/useForm";
import { CssTextField } from "pages/Authentication/authShared.styles";
import { validator } from "helpers/validator/validator";
import PasswordAdornment from "components/ReusableComponents/Input/PasswordAdornment";

const Input = ({
  defaultValue,
  name,
  placeholder,
  className,
  type,
  showPassword,
  setShowPassword,
  passwordAdornment
}) => {
 
  const {
    handleInputChange,
    handleSubmit,
    handleBlur,
    state = {},
    errors,
  } = useForm({
    validator,
  });
  
  return (
    <CssTextField
      required
      type={type}
      defaultValue={state.name}
      className={className}
      onChange={handleInputChange}
      onBlur={handleBlur}
      name={name}
      placeholder={placeholder}
      variant="outlined"
      margin="normal"
      fullWidth
      error={errors.name ? true : false}
      helperText={errors.name}
      inputProps={passwordAdornment && {
        endAdornment: (
          <PasswordAdornment
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ),
      }}
    />
  );
};

export default Input;
