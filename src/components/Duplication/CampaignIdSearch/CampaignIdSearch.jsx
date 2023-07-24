import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { errorTexts } from "constants/errorTexts";
import close from "assets/icons/close.svg";
import enterWhite from "assets/icons/enterWhite.svg";
import search from "assets/icons/search.svg";
import { getSearchedCampaigns } from "store/duplication/actions";
import {
  setProgressState,
  setErrorMessageCampaignIdSearch,
  setSearchedCampaigns,
  setCampaignIdValue,
  setCheckedCampaigns,
} from "store/duplication/duplicationSlice";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import "./styles.scss";

const CampaignIdSearch = () => {
  const dispatch = useDispatch();
  const [inputIsActive, setInputIsActive] = useState(null);

  const {
    duplication: {
      errorMessageCampaignIdSearch,
      campaignIdValue,
      checkedCampaings,
      disableEnterBtn,
    },
  } = useSelector((state) => state);

  const onlyNumbersRegEx = /^[0-9]*$/;
  const checkOnlyNumbers = onlyNumbersRegEx.test(campaignIdValue);

  const inputSearchStyle = {
    backgroundImage:
      inputIsActive || campaignIdValue ? "none" : `url(${search})`,
    border: !checkOnlyNumbers && "1px solid rgb(179, 38, 30)",
    borderRight: !checkOnlyNumbers && "none",
    padding:
      inputIsActive || campaignIdValue ? "19px 32px" : "19px 16px 19px 70px",
  };

  const handleSearchChange = (e) => {
    dispatch(setCampaignIdValue(e.target.value));
    setInputIsActive(true);
    dispatch(setErrorMessageCampaignIdSearch(""));
  };

  const errorMessageGenerator = () => {
    if (!checkOnlyNumbers) {
      return <ErrorMessage text={errorTexts.campaignId} margin="8px 4px" />;
    }
    if (errorMessageCampaignIdSearch) {
      return (
        <ErrorMessage text={errorMessageCampaignIdSearch} margin="8px 4px" />
      );
    }
  };

  const uncheckCampaigns = () => {
    for (const value in checkedCampaings) {
      dispatch(
        setCheckedCampaigns({
          [value]: {
            checked: false,
            percentage: "",
            lead_gen_form_id: "",
          },
        })
      );
    }
  };

  const handleResetSearch = () => {
    dispatch(setCampaignIdValue(""));
    dispatch(getSearchedCampaigns());
    uncheckCampaigns();
  };
  const handleSearch = () => {
    !disableEnterBtn && searchCampaignsById()
  }
  const handleKeyDown = (e) => {
    if (e.key==="Enter") {
      handleSearch(e);
    }
  }

  const searchCampaignsById = () => {
    if (checkOnlyNumbers) {
      dispatch(getSearchedCampaigns(campaignIdValue));
      dispatch(setErrorMessageCampaignIdSearch(""));
      dispatch(setProgressState({ enterCampaignId: true }));
    } else {
      dispatch(setProgressState({ enterCampaignId: false }));
    }
    uncheckCampaigns();
  };

  useEffect(() => {
    if (!campaignIdValue) {
      dispatch(setSearchedCampaigns([]));
      dispatch(setProgressState({ enterCampaignId: false, duplicate: false }));
    }

    //eslint-disable-next-line
  }, [campaignIdValue]);

  return (
    <div className="search-campaign-wrapper">
      <div className="input-wrapper">
        <div className="input-container">
          <input
            name="campaignId"
            placeholder="Enter campaign id"
            value={campaignIdValue}
            onChange={handleSearchChange}
            onBlur={() => {
              setInputIsActive(false);
            }}
            onFocus={() => {
              setInputIsActive(true);
            }}
            onKeyDown={handleKeyDown}
            style={inputSearchStyle}
          />
          {campaignIdValue && (
            <IconButton className="close-btn" onClick={handleResetSearch}>
              <img src={close} alt="close" />
            </IconButton>
          )}
        </div>
        {errorMessageGenerator()}
      </div>
      <button
        className="auth-button enter"
        onClick={handleSearch}
      >
        <img src={enterWhite} alt="enter" />
      </button>
    </div>
  );
};

export default CampaignIdSearch;
