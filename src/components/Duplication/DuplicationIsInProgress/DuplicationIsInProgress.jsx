import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ROUTES from "constants/routes";
import {
  setPrepareDuplication,
  setCampaignIdValue,
  setProgressState,
} from "store/duplication/duplicationSlice";

import duplicationIsInProgress from "assets/icons/duplicationIsInProgress.png";

import "./DuplicationIsInProgress.scss";
import "../DuplicationIsConfirmed/DuplicationIsConfirmed.scss";

const DuplicationIsInProgress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProgressState({ enterCampaignId: false, duplicate: false }));
    //eslint-disable-next-line
  }, []);

  const goBackToDuplication = () => {
    dispatch(setPrepareDuplication({}));
    dispatch(setCampaignIdValue(""));
  };

  return (
    <div className="info-about-process">
      <div>
        <img src={duplicationIsInProgress} alt="duplication in progress" />
      </div>
      <div>
        <h1>Duplication is in progress!</h1>
        <p>
          You will receive an email with a link to the FranchiseRamp preview{" "}
          <br /> page to confirm the duplication.
        </p>
        <button
          className="auth-button"
          style={{ width: "unset" }}
          onClick={() => {
            goBackToDuplication();
            dispatch(
              setProgressState({ enterCampaignId: false, duplicate: false })
            );
          }}
          to={ROUTES.DUPLICATION}
        >
          Back to duplication
        </button>
      </div>
    </div>
  );
};

export default DuplicationIsInProgress;
