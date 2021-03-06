import { configureStore } from "@reduxjs/toolkit";
import { logSlice } from "./slices/log/logSlice";
import { personSlice } from "./slices/person";
import { userSlice } from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    people: personSlice.reducer,
    user: userSlice.reducer,
    logs: logSlice.reducer,
  },
});
