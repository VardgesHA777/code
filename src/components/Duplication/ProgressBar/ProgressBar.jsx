import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import campaignFillBlue from "assets/icons/campaignFillBlue.svg";
import campaignFillWhite from "assets/icons/campaignFillWhite.svg";
import "./styles.scss";

const ProgressBar = ({ checkedCampaignsWithEmptyBudgetLength }) => {
  const {
    duplication: {
      campaignIdValue,
      errorMessageCampaignIdSearch,
      progressState: { enterCampaignId, duplicate },
      checkedCampaingsLength,
    },
  } = useSelector((state) => state);

  const [campaignIdFill, setCampaignIdFill] = useState({
    bgColor: "#fff",
    icon: campaignFillBlue,
  });

  const [addAccountsFill, setSddAccountsFill] = useState({
    bgColor: "#fff",
    icon: campaignFillBlue,
  });

  const [startDuplicationFill, setStartDuplicationFill] = useState({
    bgColor: "#fff",
    icon: campaignFillBlue,
  });

  const campaignIdFillCheck =
    enterCampaignId && !errorMessageCampaignIdSearch && campaignIdValue;

  useEffect(() => {
    if (campaignIdFillCheck) {
      setCampaignIdFill({ bgColor: "#0F314D", icon: campaignFillWhite });
    } else {
      setCampaignIdFill({ bgColor: "#fff", icon: campaignFillBlue });
    }
    //eslint-disable-next-line
  }, [enterCampaignId, errorMessageCampaignIdSearch, campaignIdValue]);

  useEffect(() => {
    if (
      campaignIdFillCheck &&
      checkedCampaingsLength &&
      !checkedCampaignsWithEmptyBudgetLength
    ) {
      setSddAccountsFill({ bgColor: "#0F314D", icon: campaignFillWhite });
    } else {
      setSddAccountsFill({ bgColor: "#fff", icon: campaignFillBlue });
    }
    //eslint-disable-next-line
  }, [
    checkedCampaingsLength,
    campaignIdFillCheck,
    checkedCampaignsWithEmptyBudgetLength,
  ]);

  useEffect(() => {
    if (duplicate) {
      setStartDuplicationFill({ bgColor: "#0F314D", icon: campaignFillWhite });
    }
    //eslint-disable-next-line
  }, [duplicate]);

  return (
    <div className="progress-bar-container">
      <h1>Campaign duplication</h1>
      <div className="progress-wrapper">
        <div className="porgress-item">
          <div
            className="progress-circle circle-border"
            style={{
              backgroundColor: campaignIdFill.bgColor,
            }}
          >
            <img src={campaignIdFill.icon} alt="checked default" />
          </div>
          <span>Enter campaign id</span>
        </div>
        <div className="porgress-item">
          <div
            className="progress-circle circle-border"
            style={{
              backgroundColor: addAccountsFill?.bgColor,
            }}
          >
            <img src={addAccountsFill?.icon} alt="checked default" />
          </div>
          <span>Add accounts</span>
        </div>
        <div className="porgress-item">
          <div
            className="progress-circle"
            style={{
              backgroundColor: startDuplicationFill?.bgColor,
            }}
          >
            <img src={startDuplicationFill?.icon} alt="checked default" />
          </div>
          <span>Start duplication</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
