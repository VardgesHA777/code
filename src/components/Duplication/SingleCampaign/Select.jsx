import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { MenuProps } from "./styles";
import MenuItem from "@mui/material/MenuItem";
import { CustomSelect } from "./styles";

const DuplicationSelect = ({
  selectName,
  optionValues = [],
  handleLeadIdSelectChange,
  selectedItemsLength,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [leadId, setLeadId] = useState("");

  useEffect(() => {
    if (!selectedItemsLength) setLeadId("");
  }, [selectedItemsLength]);

  const handleChange = (event) => {
    const targetValue = event.target.value;
    setLeadId(targetValue);
    handleLeadIdSelectChange(targetValue);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <CustomSelect
        renderValue={(value) => {
          return value ? (
            <div style={{ color: "#444444" }}>{value}</div>
          ) : (
            selectName
          );
        }}
        value={leadId}
        name="select-select"
        id="select-select"
        displayEmpty
        placeholder={"Select form name and id"}
        input={
          <OutlinedInput
            sx={{
              "&:focus-visible": {
                borderColor: "transparent !important",
                borderWidth: "0 !important",
                outline: 0,
                border: 0,
              },
            }}
          />
        }
        sx={{
          color: "#B7B7B7",
          fontWeight: "300",
          fontSize: "16px",
          outline: "none",
          marginLeft: "200px",
          borderRadius: "4px",
          marginTop: "16px",
          border: leadId ? "1px solid #0F314D" : "1px solid #D9D9D9",
          width: "364px",
          padding: "0 !important",
          "& fieldset": {
            border: 0,
            padding: "0 !important",
            "&:focus-visible": {
              borderColor: "transparent !important",
              borderWidth: "0 !important",
              outline: 0,
              border: 0,
            },
          },
        }}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={handleChange}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        {optionValues?.map((optionValue) => {
          return (
            <MenuItem
              key={optionValue?.id}
              value={optionValue?.id}
              style={{
                padding: "8px 10px",
                display: "flex",
                marginBottom: "8px",
                marginLeft: optionValues?.length > 2 ? "8px" : "0",
              }}
            >
              <div
                className="option-value-wrapper"
                style={{
                  fontWeight: "400",
                  fontSize: "16px",
                  overflowX: "scroll",
                  width: optionValues?.length > 2 ? "312px" : "330px",
                }}
              >
                <div style={{ color: "#444444" }}>{optionValue?.name}</div>
                <div style={{ color: "#959595" }}>id: {optionValue?.id}</div>
              </div>
            </MenuItem>
          );
        })}
      </CustomSelect>
    </FormControl>
  );
};

export default DuplicationSelect;
