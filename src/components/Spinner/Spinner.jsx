import loadingCampaign from "assets/icons/loadingCampaign.svg";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <img
        className="loading-campaign"
        src={loadingCampaign}
        alt="loadingCampaign"
      />
    </div>
  );
};

export default Spinner;
