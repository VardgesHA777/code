import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import arrowOpenedWhite from "assets/icons/arrowOpenedWhite.svg";
import AdSetItem from "./AdSetItem";
import { StyledAccordion, useStyles } from "./styles";
import "./styles.scss";

const AccountItem = ({
  campaignDuplication = [],
  name,
  id,
  targetAccountName,
  dailyBudget,
  adSets,
  removeById,
}) => {
  const classes = useStyles();
  const [expandFirstItem, setExpandFirstItem] = useState(false);
  const [adSetExpandedCount, setAdSetExpandedCount] = useState(0);
  const [itemHeight, setItemHeight] = useState(
    adSets?.length < 4 ? "auto" : "240px"
  );

  useEffect(() => {
    campaignDuplication[0]?.id === id && setExpandFirstItem(true);
    //eslint-disable-next-line
  }, [campaignDuplication?.length]);

  useEffect(() => {
    if (adSets?.length >= 4)
      setItemHeight(240 + adSetExpandedCount * 55 + "px");

    //eslint-disable-next-line
  }, [adSetExpandedCount]);

  useEffect(() => {
    setItemHeight(adSets?.length < 4 ? "auto" : "240px");
  }, [adSets.length]);

  return (
    <div className="accordion-wrapper" key={id}>
      <StyledAccordion
        style={{ borderRadius: "8px" }}
        expanded={expandFirstItem}
        onChange={() => setExpandFirstItem(!expandFirstItem)}
      >
        <AccordionSummary
          expandIcon={<img src={arrowOpenedWhite} alt="arrow" />}
          aria-controls="panel1a-content"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>Account name: {targetAccountName}</Typography>
          <span
            onClick={(e) => removeById(e, id)}
            className="remove"
            style={{ marginRight: "32px", zIndex: 9 }}
          >
            Remove
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="campaign-budget-wrapper">
            <div className="campaign-name-wrapper">
              <span>Campaign name</span>
              <Tooltip
                title={name}
                arrow
                classes={{
                  arrow: classes.arrow,
                  tooltip: classes.tooltip,
                }}
                placement="left-start"
              >
                <span className="campaign-name">{name}</span>
              </Tooltip>
            </div>
            <div className="campaign-budget-wrapper">
              <span>Budget</span>
              <span>${dailyBudget}</span>
            </div>
          </div>
          <div
            className="ad-sets-container"
            style={{
              height: itemHeight,
              maxHeight: "380px",
            }}
          >
            {adSets.map(({ name, ads }) => {
              return (
                <AdSetItem
                  key={name}
                  adSetName={name}
                  ads={ads}
                  setItemHeight={setItemHeight}
                  adSetExpandedCount={adSetExpandedCount}
                  setAdSetExpandedCount={setAdSetExpandedCount}
                />
              );
            })}
          </div>
        </AccordionDetails>
      </StyledAccordion>
    </div>
  );
};

export default AccountItem;
