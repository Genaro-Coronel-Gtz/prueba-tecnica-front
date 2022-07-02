import { fracttalApi, apiConfiguration } from "api/fracttalApi";
import { setPeople, startLoadingPeople } from "./personSlice";

export const createPerson = (payload) => {
  return async (dispatch) => {
    dispatch(startLoadingPeople());

    const response = await fracttalApi.post(
      `/people`,
      payload,
      apiConfiguration()
    );

    return response;
  };
};

export const getPeople = () => {
  return async (dispatch) => {
    dispatch(startLoadingPeople());

    const { data } = await fracttalApi.get(`/people`, apiConfiguration());

    dispatch(setPeople({ people: data }));
  };
};

export const updatePerson = (payload) => {
  return async (dispatch) => {
    dispatch(startLoadingPeople());

    const response = await fracttalApi.put(
      `/people/${payload.id}`,
      payload,
      apiConfiguration()
    );

    return response;
  };
};

export const deletePerson = (payload) => {
  return async (dispatch) => {
    dispatch(startLoadingPeople());

    const response = await fracttalApi.delete(
      `/people/${payload.id}`,
      apiConfiguration()
    );

    return response;
  };
};
