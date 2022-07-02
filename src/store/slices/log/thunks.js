import { fracttalApi, apiConfiguration } from "api/fracttalApi";
import { setLogs, startLoadingLogs } from "./logSlice";

export const getLogs = () => {
  return async (dispatch) => {
    dispatch(startLoadingLogs());

    const { data } = await fracttalApi.get(`/logs`, apiConfiguration());

    dispatch(setLogs({ logs: data }));
  };
};
