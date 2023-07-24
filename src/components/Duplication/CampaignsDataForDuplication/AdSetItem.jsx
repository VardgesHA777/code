import Tooltip from "@mui/material/Tooltip";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import arrowOpenedGray from "assets/icons/arrowOpenedGray.svg";
import { StyledChildAccordion, useStyles } from "./styles";
import "./styles.scss";

const AdSetItem = ({
  adSetName,
  ads,
  adSetExpandedCount,
  setAdSetExpandedCount,
}) => {
  const classes = useStyles();
  const expandItemHeight = (expanded) => {
    setAdSetExpandedCount(
      expanded ? adSetExpandedCount + 1 : adSetExpandedCount - 1
    );
  };

  return (
    <StyledChildAccordion
      key={adSetName}
      onChange={(e, expanded) => expandItemHeight(expanded)}
    >
      <AccordionSummary
        expandIcon={<img src={arrowOpenedGray} alt="arrow" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="ad-set-name-wrapper">
          <span>Ad set name </span>
          <Tooltip
            title={adSetName}
            arrow
            classes={{
              arrow: classes.arrow,
              tooltip: classes.tooltip,
            }}
            placement={"left"}
            leaveTouchDelay="500"
          >
            <span
              style={{
                position: "absolute",
                right: "32px",
                width: "254px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {adSetName}
            </span>
          </Tooltip>
        </div>
      </AccordionSummary>
      {ads?.map(({ name }) => (
        <AccordionDetails key={name}>
          <div className="ad-name-wrapper">
            <span>Ad Name</span>
            {name?.length > 27 ? (
              <Tooltip
                title={name}
                arrow
                classes={{
                  arrow: classes.arrow,
                  tooltip: classes.tooltip,
                }}
                placement={"left"}
                leaveTouchDelay="500"
              >
                <span
                  style={{
                    position: "absolute",
                    right: "48px",
                    width: "243px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {name}
                </span>
              </Tooltip>
            ) : (
              <span>{name}</span>
            )}
          </div>
        </AccordionDetails>
      ))}
    </StyledChildAccordion>
  );
};

export default AdSetItem;
