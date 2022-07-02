import { fracttalApi } from "api/fracttalApi";
import { setUser, startLoadingUser } from "./userSlice";

export const loginUser = (payload) => {
  return async (dispatch) => {
    dispatch(startLoadingUser());

    const { data } = await fracttalApi.post(`/login`, payload);

    dispatch(setUser({ user: data }));
  };
};

export const signUpUser = (payload) => {
  return async (dispatch) => {
    dispatch(startLoadingUser());

    const { data } = await fracttalApi.post(`/users`, payload);

    dispatch(setUser({ user: data }));
  };
};
