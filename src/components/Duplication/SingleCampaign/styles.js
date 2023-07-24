import { Accordion } from "@mui/material";
import { withStyles } from "@mui/styles";
// import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import Select from "@mui/material/Select";

export const StyledAccountAccordion = withStyles({
  root: {
    "& .MuiAccordionSummary-content.Mui-expanded ": {
      margin: "12px 0 !important",
      "& .MuiPaper-root-MuiAccordion-root:before": {
        backgroundColor: "transparent",
        content: "unset",
      },
    },
    "& .MuiList-root-MuiMenu-list": {
      padding: "8px",
    },
    "& .MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
      background: "rgba(15, 49, 77, 0.05) !important",
      borderRadius: "4px !important",
    },
    "& .MuiAccordionSummary-content": {
      justifyContent: "space-between",
    },
  },
})(Accordion);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      boxShadow: "0px 2px 16px rgba(174, 174, 174, 0.25)",
      marginTop: "14px",
      marginLeft: 0,
      borderRadius: "4px",
      padding: "8px",
      border: "1px solid #D9D9D9",
    },
  },
};

export const selectInputStyles = {
  color: "#B7B7B7",
  fontWeight: "300",
  fontSize: "16px",
  outline: "none",
  marginLeft: "200px",
  width: "364px",
  border: "1px solid #D9D9D9",
  borderRadius: "4px",
  marginTop: "16px",
  "& fieldset": {
    border: 0,
    padding: "8px 16px !important",
    "&:focus-visible": {
      borderColor: "transparent !important",
      borderWidth: "0 !important",
      outline: 0,
      border: 0,
    },
  },
};

export const CustomSelect = styled(Select)(() => ({
  width: 300,
  "& .MuiSelect-select": {
    padding: "8px 16px !important",
  },
  "&.MuiOutlinedInput-root": {
    "&.Mui-focused": {
      borderColor: "#0F314D !important",
      "&:hover ": {
        borderColor: "#0F314D !important",
      },
    },
  },
}));
