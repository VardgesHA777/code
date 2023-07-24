import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ROUTES from "constants/routes";
import { confirmDuplication } from "store/duplication/actions";
import AccountItem from "./AccountItem";
import "./styles.scss";

const CampaignsDataForDuplication = ({
  requestId,
  campaignDuplication,
  handleCampaignDuplicationConfirmRequest,
  next,
  removeById,
}) => {
  const dispatch = useDispatch();
  const [disableConfirm, setDisabelConfirm] = useState(false);

  const [campaignIds, setCampaignIds] = useState([]);

  useEffect(
    () => {
      setCampaignIds(
        campaignDuplication.map(({ id }) => {
          return id;
        })
      );
    },
    //eslint-disable-next-line
    [campaignDuplication?.length]
  );

  return (
    <div className="confirm-campaign-duplication-wrapper">
      <div className="title-wrapper">
        <h1 className="header-title">Confirm campaign duplication</h1>
        <p className="header-description">
          Please review the duplicated accounts info and confirm the
          duplication.
        </p>
        <span>Check your email if there are missing duplications.</span>
      </div>
      <div>
        <InfiniteScroll
          dataLength={campaignDuplication?.length}
          next={() => {
            next && handleCampaignDuplicationConfirmRequest();
          }}
          hasMore={next}
        >
          {campaignDuplication.map(
            (
              { name, target_account_name, daily_budget, ad_sets, id },
              index
            ) => {
              return (
                <AccountItem
                  campaignDuplication={campaignDuplication}
                  name={name}
                  id={id}
                  targetAccountName={target_account_name}
                  dailyBudget={daily_budget}
                  adSets={ad_sets}
                  key={index}
                  removeById={removeById}
                />
              );
            }
          )}
        </InfiniteScroll>
      </div>
      {!!campaignDuplication.length && (
        <div className="duplication-btn-wrapper">
          <Link
            className="auth-button"
            style={{
              width: "unset",
              marginTop: 0,
              backgroundColor: "#fff",
              color: "#0f314d",
              marginRight: "32px",
              boxShadow: "0px 4px 20px rgba(116, 116, 116, 0.15)",
            }}
            to={ROUTES.DUPLICATION}
          >
            Cancel
          </Link>
          <button
            className="auth-button"
            style={{ width: "unset", marginTop: 0 }}
            disabled={disableConfirm}
            onClick={() => {
              setDisabelConfirm(true);
              dispatch(confirmDuplication(requestId, campaignIds));
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignsDataForDuplication;
