import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import ROUTES from "constants/routes";
import { errorTexts } from "constants/errorTexts";
import close from "assets/icons/close.svg";
import enterWhite from "assets/icons/enterWhite.svg";
import { setCampaignIdValue } from "store/duplication/duplicationSlice";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import search from "assets/icons/search.svg";
import "./styles.scss";
import { useEffect } from "react";

const AllDuplicationsSearch = ({
  searchHistoryDuplicationsById,
  allDuplications,
  setDuplicationsToRender,
}) => {
  const [inputIsActive, setInputIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    duplication: {
      campaignIdValue,
      errorMessageCampaignIdSearch,
      disableSearchHistory,
    },
  } = useSelector((state) => state);

  const onlyNumbersRegEx = /^[0-9]*$/;
  const checkOnlyNumbers = onlyNumbersRegEx.test(campaignIdValue);

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

  const handleSearch = () => {
    !disableSearchHistory &&
      checkOnlyNumbers &&
      searchHistoryDuplicationsById();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const inputSearchStyle = {
    backgroundImage:
      inputIsActive || campaignIdValue ? "none" : `url(${search})`,
    border: !checkOnlyNumbers && "1px solid rgb(179, 38, 30)",
    borderRight: !checkOnlyNumbers && "none",
    padding:
      inputIsActive || campaignIdValue ? "19px 32px" : "19px 16px 19px 70px",
  };

  useEffect(() => {
    return () => {
      dispatch(setCampaignIdValue(""));
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "18px",
      }}
    >
      <div className="all-duplications">
        <span>All duplications</span>
      </div>
      <div
        className="search-campaign-wrapper"
        style={{ marginLeft: "0", marginRight: "32px", maxWidth: "900px" }}
      >
        <div className="input-wrapper">
          <div className="input-container">
            <input
              name="campaignId"
              value={campaignIdValue}
              placeholder="Search by source campaign id"
              onBlur={() => {
                setInputIsActive(false);
              }}
              onFocus={() => {
                setInputIsActive(true);
              }}
              onChange={(e) => dispatch(setCampaignIdValue(e.target.value))}
              onKeyDown={ handleKeyDown}
              style={inputSearchStyle}
            />
            {campaignIdValue && (
              <IconButton
                className="close-btn"
                onClick={() => {
                  dispatch(setCampaignIdValue(""));
                  setDuplicationsToRender(allDuplications);
                }}
              >
                <img src={close} alt="close" />
              </IconButton>
            )}
            <div className="error-message">{errorMessageGenerator()}</div>
          </div>
        </div>
        <button
          className="auth-button enter"
          onClick={handleSearch}
        >
          <img src={enterWhite} alt="enter" />
        </button>
      </div>
      <div className="auth-button-container">
        <button
          className="auth-button"
          style={{
            width: "unset",
            margin: 0,
            height: "59px",
            padding: "20px 24px",
          }}
          onClick={() => navigate(ROUTES.DUPLICATION)}
        >
          Start duplication
        </button>
      </div>
    </div>
  );
};

export default AllDuplicationsSearch;
