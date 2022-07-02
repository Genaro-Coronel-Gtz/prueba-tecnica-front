import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    people: [],
    isLoading: false,
  },
  reducers: {
    startLoadingPeople: (state /* action */) => {
      state.isLoading = true;
    },
    setPeople: (state, action) => {
      state.isLoading = false;
      state.people = action.payload.people;
    },
  },
});

export const { startLoadingPeople, setPeople } = personSlice.actions;
