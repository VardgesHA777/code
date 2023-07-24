import { instance } from "api/auth";
import {makeHttpRequest} from "../../shared/makeHttpRequest";
import {
  setSearchedCampaigns,
  setSearchingCampaignLoading,
  setErrorMessageCampaignIdSearch,
  setPrepareDuplication,
  setDisableEnterBtn,
  setConfirmedDuplication,
  setDisableSearchHistory,
} from "./duplicationSlice";

const { REACT_APP_BACKEND_API_URL_CAMPAIGNS } = process.env;

export const getSearchedCampaigns = (campaignId) => async (dispatch) => {
  try {
    if (campaignId) {
      dispatch(setDisableEnterBtn(true));
      dispatch(setSearchingCampaignLoading(true));
      const {
        data: { brand_ad_accounts },
      } = await instance.get(
        `${REACT_APP_BACKEND_API_URL_CAMPAIGNS}${campaignId}/brand/ad-accounts/`
      );
      dispatch(setSearchedCampaigns(brand_ad_accounts));
      dispatch(setSearchingCampaignLoading(false));
      dispatch(setDisableEnterBtn(false));
      dispatch(setErrorMessageCampaignIdSearch(""));
    } else {
      dispatch(setSearchedCampaigns([]));
    }
  } catch (e) {
    dispatch(setSearchingCampaignLoading(false));
    const {
      response: {
        data: { message: errorMessage },
      },
    } = e;

    const error = errorMessage.toLowerCase();

    if (error.includes("dynamic")) {
      dispatch(
        setErrorMessageCampaignIdSearch(
          "The campaign has a Dynamic Creative and cannot be duplicated."
        )
      );
    } else {
      dispatch(setErrorMessageCampaignIdSearch("Invalid campaign ID"));
    }
    dispatch(setSearchedCampaigns([]));
    dispatch(setDisableEnterBtn(false));
  }
};

export const startCampaignDuplication =
  (campaignId, preparedDataForDuplication) => async (dispatch) => {
    console.log("preparedDataForDuplication", preparedDataForDuplication);
    try {
      const response = await instance.post(
        `${REACT_APP_BACKEND_API_URL_CAMPAIGNS}${campaignId}/data-preparation/`,
        preparedDataForDuplication
      );
      setTimeout(() => {
        dispatch(setPrepareDuplication(response));
      }, 500);
    } catch (e) {
      console.log("e", e);
    }
  };

export const duplicationRequest = (url, cb) => async (dispatch) => {
  try {
    const response = await instance.get(url);
    cb(response);
  } catch (e) {
    console.log("e", e);
  }
};

export const duplicationRequestById = (url, cb) => async (dispatch) => {
  try {
    dispatch(setSearchingCampaignLoading(true));
    dispatch(setDisableSearchHistory(true));
    const response = await instance.get(url);
    dispatch(setSearchingCampaignLoading(false));
    dispatch(setDisableSearchHistory(false));
    cb(response);
  } catch (e) {
    console.log("e", e);
  }
};

export const confirmDuplication = (requestId, payload) => async (dispatch) => {
  try {
    const response = await instance.post(
      `${REACT_APP_BACKEND_API_URL_CAMPAIGNS}duplication-request/${requestId}/confirm/`,
      payload
    );
    dispatch(setConfirmedDuplication(response));
  } catch (e) {
    console.log("e", e);
  }
};
