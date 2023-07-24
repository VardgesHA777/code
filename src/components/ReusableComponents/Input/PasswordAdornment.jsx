import { InputAdornment, IconButton } from "@mui/material";
import { EyeIconPassword } from "assets/components/EyeIconPassword";
import "./styles.scss";

const PasswordAdornment = ({ showPassword, setShowPassword }) => {
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end" className="input-adornement">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {<EyeIconPassword showPass={showPassword} />}
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordAdornment;
