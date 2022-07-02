import axios from "axios";

export const fracttalApi = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "http://ec2-54-90-130-2.compute-1.amazonaws.com:5000",
});

export const apiConfiguration = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
  };
  return config;
};
