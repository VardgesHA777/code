import { useEffect, useState } from "react";
import moment from "moment";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import arrowOpenedWhite from "assets/icons/arrowOpenedWhite.svg";
import pointerLeft from "assets/icons/pointerLeft.svg";
// import copyIcon from "assets/icons/link.svg";
import { StyledHistoryAccordion } from "./style";
import "./styles.scss";

const AllDuplicationsDataSingleItem = ({
  campaigns,
  createdAt,
  createdBy,
  index,
}) => {
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    let copyTimer;
    if (copied) {
      copyTimer = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
    return () => {
      clearTimeout(copyTimer);
    };
  }, [copied]);

  return (
    <div className="all-duplications-data">
      <div
        className="copy-id"
        onClick={(e) => {
          e.preventDefault();
          setCopied(true);
          navigator.clipboard.writeText(campaigns[0].source_campaign_id);
        }}
      >
        {/* <img src={copyIcon} alt="copy-icon" /> */}

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2037_1465)">
            <path
              d="M14.7302 1.26739C14.726 1.26329 14.7219 1.25919 14.7176 1.25517C13.1848 -0.266135 10.7417 -0.423113 9.02818 0.89094C8.85668 1.02208 8.71848 1.14133 8.59333 1.26616C8.58972 1.26977 8.58619 1.27338 8.58267 1.27707L5.84031 4.01975C5.60009 4.25997 5.60009 4.64947 5.8404 4.88961C6.0807 5.12991 6.47019 5.12983 6.71025 4.88952L9.46278 2.13659C9.46565 2.13372 9.46843 2.13085 9.47131 2.12798C9.55521 2.04514 9.65215 1.96231 9.77599 1.86766C11.0069 0.923828 12.7623 1.03947 13.8595 2.13676C13.8631 2.14036 13.8668 2.14397 13.8705 2.1475C15.0721 3.36018 15.0688 5.32495 13.8603 6.53394L11.1079 9.28662C10.8677 9.52685 10.8677 9.91634 11.108 10.1565C11.2282 10.2766 11.3855 10.3366 11.5429 10.3366C11.7003 10.3366 11.8578 10.2766 11.9779 10.1564L14.7304 7.40371C16.4217 5.71165 16.4217 2.95888 14.7302 1.26739Z"
              fill="white"
            />
            <path
              d="M9.28666 11.1079L6.53578 13.8589C6.53036 13.8644 6.52495 13.8701 6.5197 13.8757C6.21559 14.1749 5.85874 14.4046 5.45801 14.5592C4.3102 15.0035 3.00673 14.7289 2.13794 13.8601C0.926734 12.6475 0.926734 10.6746 2.13794 9.46247L4.89013 6.71134C5.00545 6.59594 5.07032 6.43945 5.07032 6.27624V6.27518C5.07032 5.93539 4.795 5.66055 4.45521 5.66055C4.2801 5.66055 4.12206 5.73396 4.01003 5.85149L1.26784 8.59261C-0.422503 10.2844 -0.422667 13.0374 1.26767 14.7297C2.09562 15.5578 3.20554 15.9992 4.33596 15.9992C4.862 15.9991 5.39264 15.9035 5.90114 15.7067C6.46885 15.488 6.97456 15.1597 7.40416 14.7311C7.41039 14.7249 7.41646 14.7185 7.42245 14.712L10.1566 11.9779C10.3968 11.7376 10.3968 11.3482 10.1565 11.1079C9.91646 10.8678 9.52697 10.8678 9.28666 11.1079Z"
              fill="white"
            />
            <path
              d="M4.85202 11.1466C4.97217 11.2667 5.12956 11.3267 5.28703 11.3267C5.44442 11.3267 5.60189 11.2667 5.72196 11.1466L11.1484 5.72041C11.3887 5.48019 11.3887 5.0907 11.1485 4.85056C10.9083 4.61025 10.5188 4.61033 10.2787 4.85048L4.85219 10.2767C4.6118 10.5168 4.6118 10.9063 4.85202 11.1466Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2037_1465">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {copied && (
        <div
          className="tooltip-budget error-tooltip"
          style={{
            position: "absolute",
            zIndex: "999",
            left: "424px",
            background: "#fff",
            top: "11px",
            display: "flex",
            padding: "8px 16px 8px 10px",
            boxShadow: "0px 4px 20px rgba(95, 95, 95, 0.15)",
            borderRadius: "8px",
          }}
        >
          <div style={{ position: "relative", left: "-17px", top: "2px" }}>
            <img
              className="tooltip-arrow"
              src={pointerLeft}
              alt="tooltip-icon"
            />
          </div>
          <span style={{ color: "#444444", fontWeight: 400 }}>Copied</span>
        </div>
      )}

      <StyledHistoryAccordion
        defaultExpanded={index === 0}
        style={{
          borderRadius: "8px",
        }}
      >
        <AccordionSummary
          style={{ paddingRight: "38px" }}
          expandIcon={<img src={arrowOpenedWhite} alt="arrow" />}
        >
          <div className="campaign-info">
            <div className="campaign-id">
              <span>Source Campaign id: {campaigns[0].source_campaign_id}</span>
            </div>
            <div className="created-on">
              <span>
                Created on: {moment(createdAt).format("MMMM D.Y")} by{" "}
                {createdBy}
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="campaign-details-wraper">
            <div className="account-name">
              <span> Account name</span>
              <span>Task in Airtable</span>
            </div>
            <div
              style={{
                height: campaigns?.length < 4 ? "auto" : "215px",
                overflowY: "auto",
              }}
            >
              {campaigns?.map(
                ({
                  id,
                  target_account_name,
                  target_account_fb_url,
                  airtable_task_url,
                }) => (
                  <div className="campaign-name" key={id}>
                    <span>
                      <a
                        href={target_account_fb_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {target_account_name}
                      </a>
                    </span>
                    {!!airtable_task_url && (
                      <span>
                        <a
                          href={airtable_task_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
                        </a>
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </AccordionDetails>
      </StyledHistoryAccordion>
    </div>
  );
};

export default AllDuplicationsDataSingleItem;
