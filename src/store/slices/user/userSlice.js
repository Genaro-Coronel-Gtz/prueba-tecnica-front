import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    token: "",
    isLoading: false,
  },
  reducers: {
    startLoadingUser: (state /* action */) => {
      state.isLoading = true;
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.user.user;
      state.token = action.payload.user.token;
    },
  },
});

export const { startLoadingUser, setUser } = userSlice.actions;
