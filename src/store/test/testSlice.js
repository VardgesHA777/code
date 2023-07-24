import { createSlice } from "@reduxjs/toolkit";

import { createLink, getLinkAttributes, getLinksList } from "../../_api/links";

const initialState = {
  linksList: null,
  linksListMeta: [],
  getLinksLoading: false,
  getLinksSuccess: false,
  getLinksError: false,
  getLinkAttributesLoading: false,
  getLinkAttributesSuccess: false,
  getLinkAttributesError: false,
  createLinkLoading: false,
  createLinkSuccess: false,
  createLinkError: false,
};

const links = createSlice({
  name: "links",
  initialState,
  reducers: {
    resetCreateLinkData: (state) => ({
      ...state,
      createLinkLoading: false,
      createLinkSuccess: false,
      createLinkError: false,
    }),
    resetLinksListData: (state) => ({
      ...state,
      linksList: [],
      getLinksLoading: false,
      getLinksSuccess: false,
      getLinksError: false,
    }),
  },
  extraReducers: {
    [getLinksList.pending]: (state) => {
      return {
        ...state,
        linksList: null,
        getLinksLoading: true,
        getLinksSuccess: false,
        getLinksError: false,
      };
    },
    [getLinksList.fulfilled]: (state, action) => {
      const { data: linksList = [], meta: linksListMeta = [] } =
        action.payload ?? {};

      return {
        ...state,
        linksList,
        linksListMeta,
        getLinksLoading: false,
        getLinksSuccess: true,
        getLinksError: false,
      };
    },
    [getLinksList.rejected]: (state) => {
      return {
        ...state,
        getLinksLoading: false,
        getLinksSuccess: false,
        getLinksError: true,
      };
    },
    [getLinkAttributes.fulfilled]: (state, action) => {
      const { data: linkAttributesList = [] } = action.payload ?? {};

      return {
        ...state,
        linkAttributesList,
        getLinkAttributesLoading: false,
        getLinkAttributesSuccess: true,
        getLinkAttributesError: false,
      };
    },
    [getLinkAttributes.rejected]: (state) => {
      return {
        ...state,
        getLinkAttributesLoading: false,
        getLinkAttributesSuccess: false,
        getLinkAttributesError: true,
      };
    },
    [createLink.fulfilled]: (state, action) => {
      const { data: newLinkData = {} } = action.payload ?? {};

      return {
        ...state,
        linksList: [...(state.linksList || []), newLinkData],
        createLinkLoading: false,
        createLinkSuccess: true,
        createLinkError: false,
      };
    },
    [createLink.rejected]: (state) => {
      return {
        ...state,
        createLinkLoading: false,
        createLinkSuccess: false,
        createLinkError: true,
      };
    },
  },
});

export const { resetCreateLinkData, resetLinksListData } = links.actions;

export default links.reducer;
