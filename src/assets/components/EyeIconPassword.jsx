import EyeOpened from "assets/icons/eyeOpened.svg";
import EyeClosed from "assets/icons/eyeClosed.svg";

import {
    Icon,
  } from "@mui/material";

 export const EyeIconPassword = ({showPass}) => {
    return (
      <>
      {
        showPass ? <Icon style={{ height: "25px", cursor: 'pointer'}}>
        <img src={EyeOpened} height={"auto"} width={"auto"} alt="img" />
      </Icon> : <Icon style={{ height: "25px", cursor: 'pointer' }}>
        <img src={EyeClosed} height={"auto"} width={"auto"} alt="img" />
      </Icon>
      }
      
      </>
    );
  };