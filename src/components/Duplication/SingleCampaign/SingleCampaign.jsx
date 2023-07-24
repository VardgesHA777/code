import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import classNames from "classnames";
import useForm from "hooks/useForm";
import { validator } from "helpers/validator/validator";
import { setCheckedCampaigns } from "store/duplication/duplicationSlice";
import errorIcon from "assets/icons/errorIcon.svg";
import disableInfo from "assets/icons/Disable-info.svg";
import arrowGray from "assets/icons/arrowGray.svg";
import pointerLeft from "assets/icons/pointerLeft.svg";
import { StyledAccountAccordion } from "./styles";
import OKRSelect from "./Select";
import "./styles.scss";

const SingleCampaign = ({
  accountName,
  clientApprovalRequirement,
  fbAccountId,
  status,
  currentMonthBudget,
  checked,
  selectedItemsLength,
  leadGenForms,
}) => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([]);
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [checkboxFilled, setCheckboxFilled] = useState(null);

  const disabledState =
    (!currentMonthBudget || !leadGenForms?.length) && "disabled-campaign";
  const only1To100Numbers = /^[1-9][0-9]?$|^100$/;
  const checkRegex = only1To100Numbers.test(budgetAllocation);
  const {
    duplication: { checkedCampaings },
  } = useSelector((state) => state);

  const [expandItem, setExpandItem] = useState(null);

  const statusBadge =
    status === "Sustainable"
      ? "sustainable"
      : status === "Soft Opening"
      ? "soft-opening"
      : status === "PreSale"
      ? "presale"
      : status === "Onboarding"
      ? "onboarding"
      : "";

  const initialState = {
    budgetPercentage: "",
  };

  const { handleInputChange } = useForm({
    initialState,
    validator,
  });

  const handleCheckboxChange = () => {
    setCheckboxFilled(!checkboxFilled);
    setCheckedItems([...checkedItems, { [fbAccountId]: !checkedItems }]);
    dispatch(
      setCheckedCampaigns({
        ...checkedCampaings,
        [fbAccountId]: {
          ...checkedCampaings[fbAccountId],
          checked: !checkedCampaings[fbAccountId]?.checked,
          percentage: checked ? checkedCampaings[fbAccountId]?.percentage : "",
        },
      })
    );
  };

  const handleBudgetInputChange = (e) => {
    setBudgetAllocation(e.target.value);

    handleInputChange(e);
    dispatch(
      setCheckedCampaigns({
        ...checkedCampaings,
        [fbAccountId]: {
          ...checkedCampaings[fbAccountId],
          percentage: only1To100Numbers.test(e.target.value)
            ? e.target.value
            : "",
        },
      })
    );
  };

  const handleLeadIdSelectChange = (leadId) => {
    dispatch(
      setCheckedCampaigns({
        ...checkedCampaings,
        [fbAccountId]: {
          ...checkedCampaings[fbAccountId],
          lead_gen_form_id: leadId,
        },
      })
    );
  };

  const generateDisabledTooltip = () => {
    return (
      <div
        className="tooltip-budget"
        style={{
          backgroundColor: "#fff",
          zIndex: 999,
        }}
      >
        <img src={disableInfo} alt="disable Info" />
        <span style={{ color: "#959599", lineHeight: "1.5" }}>
          The campaign cannot be duplicated. <br /> Missing budget allocation ID
          and/or form.
        </span>
      </div>
    );
  };

  const generateErrorTooltip = () => {
    return (
      <div className="tooltip-budget error-tooltip">
        <div>
          <img className="tooltip-arrow" src={pointerLeft} alt="tooltip-icon" />
        </div>
        <span style={{ color: "#444444", fontWeight: 400 }}>
          <img style={{ marginRight: "6px" }} src={errorIcon} alt="info" />
          Only numbers (1-100) are allowed.
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (!selectedItemsLength) setBudgetAllocation("");
  }, [selectedItemsLength]);

  useEffect(() => {
    if (checkboxFilled) {
      setExpandItem(true);
    } else {
      setExpandItem(false);
    }
  }, [checkboxFilled]);

  useEffect(() => {
    if (!Object.keys(checkedCampaings)?.length) {
      setExpandItem(null);
      setCheckboxFilled(null);
    }
    //eslint-disable-next-line
  }, [Object.keys(checkedCampaings)?.length]);

  useEffect(() => {
    !checkedCampaings[fbAccountId]?.checked && setBudgetAllocation("");
    //eslint-disable-next-line
  }, [checkedCampaings[fbAccountId]?.checked]);

  return !leadGenForms?.length || !currentMonthBudget ? (
    <div
      className={classNames("single-campaign-wrapper", disabledState)}
      style={{
        position: "relative",
        background: "#EAEAEA",
        boxShadow: "0px 0px 4px #E8E8E8",
        borderRadius: "4px",
        padding: "12px 32px",
        borderLeft: "6px solid #959595",
        maxWidth: "1070px",
      }}
    >
      <div className="campaign-details">
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            border: "1px solid #E1E1E1",
          }}
        ></div>
        <div className="campaign-info">
          <h3 style={{ color: "#959595", fontWeight: 400, fontSize: "18px" }}>
            {accountName}
          </h3>
          <span
            className={classNames(
              "campaign-status",
              currentMonthBudget && leadGenForms?.length
                ? statusBadge
                : "disabled-badge"
            )}
          >
            {status}
          </span>

          <div className="campaign-id">id:{fbAccountId}</div>
        </div>
      </div>
      {generateDisabledTooltip()}
    </div>
  ) : (
    <div
      className={classNames("single-campaign-wrapper")}
      style={{ position: "relative" }}
    >
      <div
        className="check-campaign"
        style={{ position: "absolute", top: "16px", zIndex: "9", left: "32px" }}
      >
        <Checkbox
          onChange={handleCheckboxChange}
          sx={{
            color: "#0F314D",
            "&.Mui-checked": {
              color: "#0F314D",
            },
          }}
          disabled={!leadGenForms?.length || !currentMonthBudget}
          checked={checked || false}
        />
      </div>

      <StyledAccountAccordion
        style={{
          width: "100%",
          borderLeft:
            !leadGenForms?.length || !currentMonthBudget
              ? "6px solid #959595"
              : "6px solid #0F314D",
        }}
        expanded={expandItem}
        onChange={() => setExpandItem(!expandItem)}
        disabled={!leadGenForms?.length || !currentMonthBudget}
      >
        <AccordionSummary
          style={{ paddingRight: "38px" }}
          expandIcon={<img src={arrowGray} alt="arrow" />}
        >
          <div className="campaign-details" style={{ marginLeft: "32px" }}>
            <div className="campaign-info">
              <h3>{accountName}</h3>
              <span
                className={classNames(
                  "campaign-status",
                  currentMonthBudget ? statusBadge : "disabled-badge"
                )}
              >
                {status}
              </span>

              <div className="campaign-id">id:{fbAccountId}</div>
            </div>
          </div>
          {!currentMonthBudget || !leadGenForms.length
            ? generateDisabledTooltip()
            : null}
        </AccordionSummary>
        <AccordionDetails style={{ borderTop: "1px solid #D9D9D9" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "68px",
            }}
          >
            Form id:
            <OKRSelect
              selectStyle={{ width: "360px" }}
              name="hello"
              selectName={"Select form name and id"}
              optionValues={leadGenForms}
              fbAccountId={fbAccountId}
              handleLeadIdSelectChange={handleLeadIdSelectChange}
              selectedItemsLength={selectedItemsLength}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "68px",
              position: "relative",
              justifyContent: "space-between",
            }}
          >
            <div className="budget-allocation">
              <span
                className="budget-allocation-title"
                style={{ marginRight: "137px" }}
              >
                Budget allocation:
              </span>
              <div
                className="budget-allocation-percentage"
                style={{
                  border:
                    !checkRegex && budgetAllocation && "1px solid #B3261E",
                  borderRadius: "4px",
                  marginRight: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  name="budgetPercentage"
                  value={budgetAllocation || ""}
                  onChange={handleBudgetInputChange}
                  placeholder="_"
                />
                <span style={{ padding: "6px 8px" }}>%</span>
              </div>
              {!checkRegex && budgetAllocation && generateErrorTooltip()}
            </div>

            {clientApprovalRequirement === "Yes" && (
              <span
                style={{
                  right: "32px",
                  bottom: "16px",
                  color: "#959595",
                  fontWeight: "300",
                  fontSize: "14px",
                }}
              >
                Needs client review
              </span>
            )}
          </div>
        </AccordionDetails>
      </StyledAccountAccordion>
    </div>
  );
};

export default SingleCampaign;
