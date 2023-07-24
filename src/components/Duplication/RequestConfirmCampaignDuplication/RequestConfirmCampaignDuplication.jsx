import confirmCampaignDuplication from "assets/icons/confirmCampaignDuplication.png";
import "./RequestConfirmCampaignDuplication.scss";

const RequestConfirmCampaignDuplication = () => {
  return (
    <div className="request-confirm-campaign-duplication-wrapper">
      <h1 className="header-title">Confirm campaign duplication</h1>
      <div className="request-confirm-campaign-duplication-description">
        <img
          src={confirmCampaignDuplication}
          alt="Confirm campaign duplication"
        />
        <p>Looks like you don't have any duplicated campaigns</p>
        <p>Check your email if there are missed duplications</p>
      </div>
    </div>
  );
};
export default RequestConfirmCampaignDuplication;
