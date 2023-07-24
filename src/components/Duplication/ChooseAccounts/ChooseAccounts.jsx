import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";
import {
  setCheckedCampaigns,
  setProgressState,
} from "store/duplication/duplicationSlice";
import { startCampaignDuplication } from "store/duplication/actions";
import SingleCampaign from "components/Duplication/SingleCampaign/SingleCampaign";
import "simplebar-react/dist/simplebar.min.css";
import "./styles.scss";

const ChooseAccounts = ({ checkedCampaignsWithEmptyBudgetLength }) => {
  const dispatch = useDispatch();
  const [disableStartDuplication, setDisableStartDuplication] = useState(false);
  const {
    duplication: {
      searchedCampaigns,
      checkedCampaingsLength,
      checkedCampaings = [],
      selectedItemsLength,
      campaignIdValue,
    },
  } = useSelector((state) => state);

  const uncheckCampaigns = () => {
    dispatch(setCheckedCampaigns({}));
    // for (const value in checkedCampaings) {
    //   dispatch(
    //     setCheckedCampaigns({
    //       [value]: {
    //         checked: false,
    //         percentage: "",
    //         lead_gen_form_id: "",
    //       },
    //     })
    //   );
    // }
  };

  const prepareDataForDuplication = () => {
    setDisableStartDuplication(true);
    dispatch(setProgressState({ duplicate: true }));

    const filteredByCheckedAndPercentage = Object.fromEntries(
      Object.entries(checkedCampaings)?.filter(
        ([key, value]) =>
          value.checked && value.percentage >= 1 && value.lead_gen_form_id
      )
    );

    const prepareDataForDuplication = Object.keys(
      filteredByCheckedAndPercentage
    ).map((key) => {
      return {
        ad_account_id: key,
        percentage: +checkedCampaings[key]?.percentage,
        lead_gen_form_id: checkedCampaings[key]?.lead_gen_form_id,
      };
    });

    dispatch(
      startCampaignDuplication(campaignIdValue, prepareDataForDuplication)
    );
  };

  return (
    <div className="choose-accounts-wrapper">
      <h2 className="title">Choose accounts</h2>
      <div className="header">
        <span>Selected items ({selectedItemsLength})</span>
        {!!selectedItemsLength && (
          <span
            className="cancel-choose-campaigns"
            onClick={() => uncheckCampaigns()}
          >
            Cancel
          </span>
        )}
      </div>

      <SimpleBar style={{ height: "309px" }} autoHide={false}>
        {searchedCampaigns.map((campaign) => {
          return (
            <SingleCampaign
              key={campaign?.fb_account_id + campaign?.account_name}
              accountName={campaign?.account_name}
              clientApprovalRequirement={campaign?.is_client_approval_required}
              fbAccountId={campaign?.fb_account_id}
              status={campaign?.status}
              currentMonthBudget={campaign?.current_month_budget}
              checked={checkedCampaings[campaign?.fb_account_id]?.checked}
              percentage={checkedCampaings[campaign?.fb_account_id]?.percentage}
              selectedItemsLength={selectedItemsLength}
              leadGenForms={campaign?.lead_gen_forms}
            />
          );
        })}
      </SimpleBar>
      <button
        className="auth-button start-duplication"
        onClick={() => prepareDataForDuplication()}
        disabled={
          checkedCampaignsWithEmptyBudgetLength ||
          !checkedCampaingsLength ||
          disableStartDuplication
        }
      >
        Start duplication
      </button>
    </div>
  );
};

export default ChooseAccounts;
