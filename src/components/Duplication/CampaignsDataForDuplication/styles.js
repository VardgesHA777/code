import { Accordion } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";

export const StyledAccordion = withStyles({
  root: {
    overflow: "hidden",
    color: "#fff",
    "& .MuiAccordionSummary-content": {
      margin: "0 !important",
    },
    "& .MuiPaper-root.MuiPaper-elevation": {
      boxShadow: "none",
    },
    "& .MuiAccordionSummary-root": {
      background: "#0f314d",
      color: "#ffffff",
      fontWeight: "300",
      fontSize: "18px",
      height: "59px",
      padding: "0 32px",
    },
    "& .MuiAccordionDetails-root": {
      padding: 0,
    },
  },
})(Accordion);

export const StyledChildAccordion = withStyles({
  root: {
    boxShadow: "unset !important",
    overflow: "hidden",
    color: "#fff",
    "& .MuiPaper-root": {
      borderBottom: "1px solid #F4F4F4",
      boxShadow: "unset !important",
      marginBottom: "0 !important",
    },
    "& .MuiPaper-elevation": {
      position: "relative",
    },
    "& .MuiAccordionSummary-root": {
      background: "#fff",
      color: "#444",
      fontWeight: "300",
      fontSize: "18px",
      padding: "0 32px",
      justifyContent: "flex-start",
      position: "relative",

      "& .MuiAccordionSummary-expandIconWrapper": {
        marginLeft: "18px",
        height: "6px",
      },
    },
    "& .MuiAccordionSummary-content": {
      flexGrow: "unset",
    },
    "& .MuiAccordion-root": {
      boxShadow: 0,
    },
  },
})(Accordion);

export const useStyles = makeStyles(() => ({
  arrow: {
    "&:before": {
      border: "1px solid #FFF !important",
      backgroundColor: "#fff !important",
    },
    color: "#fff",
  },
  tooltip: {
    display: "block",
    backgroundColor: "#fff !important",
    color: "#444444 !important",
    fontWeight: "300",
    fontSize: "18px",
    padding: "16px",
    boxShadow: "0px 4px 20px rgba(95, 95, 95, 0.15)",
    borderRadius: "8px",
    transition: "none",
    lineHeight: "27px",
    marginRight: "0 !important",
  },
}));
