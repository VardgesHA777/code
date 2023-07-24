import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedCampaigns: [],
  searchingCampaignLoading: false,
  progressState: {
    enterCampaignId: null,
    addAccounts: null,
    duplicate: null,
  },
  errorMessageCampaignIdSearch: "",
  checkedCampaings: {},
  checkedCampaingsLength: 0,
  campaignIdValue: "",
  checked: null,
  selectedItemsLength: 0,
  prepareDuplication: {},
  disableEnterBtn: false,
  confirmedDuplications: [],
  allDuplications: [],
  getAllDuplicationsLoading: false,
  getAllDuplicationsSuccess: false,
  getAllDuplicationsError: false,
  disableSearchHistory: false,
};

export const duplicationSlice = createSlice({
  name: "allDuplications",
  initialState,
  reducers: {
    setSearchedCampaigns: (state, action) => {
      state.searchedCampaigns = action.payload;
    },
    setSearchingCampaignLoading: (state, action) => {
      state.searchingCampaignLoading = action.payload;
    },
    setProgressState: (state, action) => {
      state.progressState = { ...state.progressState, ...action.payload };
    },
    setErrorMessageCampaignIdSearch: (state, action) => {
      state.errorMessageCampaignIdSearch = action.payload;
    },
    setCheckedCampaigns: (state, action) => {
      state.checkedCampaings = action.payload;
      state.selectedItemsLength = Object.values(state.checkedCampaings).filter(
        (campaign) => campaign?.checked
      ).length;
      state.checkedCampaingsLength = Object.values(
        state.checkedCampaings
      ).filter(
        (item) => item.checked && item.percentage && item.lead_gen_form_id
      ).length;
    },

    setCampaignIdValue: (state, action) => {
      state.campaignIdValue = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setPrepareDuplication: (state, action) => {
      state.prepareDuplication = action.payload;
    },
    setDisableEnterBtn: (state, action) => {
      state.disableEnterBtn = action.payload;
    },
    setRequestedCampaignsData: (state, action) => {
      state.requestedCampaignsData = action.payload;
    },
    setRequestedCampaignsDataStatus: (state, action) => {
      state.requestedCampaignsDataStatus = action.payload;
    },
    setCampaignResults: (state, action) => {
      state.campaignResults = [...state.campaignResults, ...action.payload];
    },
    setRemoveFromRequestedCampaignsData: (state, action) => {
      state.campaignResults = action.payload;
    },
    setConfirmedDuplication: (state, action) => {
      state.confirmedDuplications = action.payload;
    },
    setAllDuplications: (state, action) => {
      state.allDuplications = action.payload;
    },
    setDisableSearchHistory: (state, action) => {
      state.disableSearchHistory = action.payload;
    },
  },
});

export const {
  setSearchedCampaigns,
  setSearchingCampaignLoading,
  setProgressState,
  setErrorMessageCampaignIdSearch,
  setCheckedCampaigns,
  setCampaignIdValue,
  setChecked,
  setUncheckedCampaigns,
  setSelectedItems,
  setPrepareDuplication,
  setDisableEnterBtn,
  setConfirmedDuplication,
  setRequestedCampaignsDataStatus,
  setAllDuplicationsData,
  setAllDuplications,
  setDisableSearchHistory,
  setGetAllDuplicationsLoading,
} = duplicationSlice.actions;

export default duplicationSlice.reducer;
