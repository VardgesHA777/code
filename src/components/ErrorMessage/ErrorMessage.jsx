import errorIcon from "assets/icons/errorIcon.svg";

const ErrorMessage = ({ text, width, margin }) => {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        margin:  margin || "0 0",
        color: "#B3261E",
        fontWeight: "400",
        fontSize: "11px",
        width,
        
      }}
    >
      <img
        width="15px"
        height="15px"
        style={{ marginRight: "6px" }}
        src={errorIcon}
        alt="info"
      />
      {text}
    </span>
  );
};

export default ErrorMessage;
