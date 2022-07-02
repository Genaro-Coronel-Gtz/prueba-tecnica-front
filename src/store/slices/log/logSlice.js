import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "log",
  initialState: {
    logs: [],
    isLoading: false,
  },
  reducers: {
    startLoadingLogs: (state /* action */) => {
      state.isLoading = true;
    },
    setLogs: (state, action) => {
      state.isLoading = false;
      state.logs = action.payload.logs;
    },
  },
});

export const { startLoadingLogs, setLogs } = logSlice.actions;
