import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const getLinksList = createAsyncThunk(
  "links/getLinksList",
  async ({ currentPage = 0 }, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { domainID = "" },
      } = getState();
      const response = await axiosInstance.get(
        `/${domainID}/links?page=${++currentPage}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLinkAttributes = createAsyncThunk(
  "links/getLinkAttributes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/attributes");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async ({ linkData = {} }, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { domainID = "" },
      } = getState();
      const response = await axiosInstance.post(`/${domainID}/links`, linkData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
