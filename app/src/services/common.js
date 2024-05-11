import axios from "axios";
import Constants from "../utils/constants";

const { REACT_APP_API_URL } = process.env;

export const Post = async ({ path, token = "", body = {} }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token;
  let result = { data: null, error: "" };
  await axios
    .post(`${REACT_APP_API_URL}/${path}`, body, { headers })
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data;
      }
    })
    .catch((err) => {
      result.error = err.response.data;
    });

  return result;
};

export const Get = async ({ path, token = "" }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token;
  let result = { data: null, error: "" };
  await axios
    .get(`${REACT_APP_API_URL}/${path}`, { headers })
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data;
      }
    })
    .catch((err) => {
      result.error = err.response.data;
    });

  return result;
};

export const Put = async ({ path, token = "", body = {} }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token;
  let result = { data: null, error: "" };
  await axios
    .put(`${REACT_APP_API_URL}/${path}`, body, { headers })
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data;
      }
    })
    .catch((err) => {
      result.error = err.response.data;
    });

  return result;
};

export const Delete = async ({ path, token = "" }) => {
  const headers = {};
  if (token) headers[Constants.TOKEN_NAME] = token;
  let result = { data: null, error: "" };
  await axios
    .delete(`${REACT_APP_API_URL}/${path}`, { headers })
    .then((resp) => {
      if (resp.status === 200) {
        result.data = resp.data;
      }
    })
    .catch((err) => {
      result.error = err.response.data;
    });

  return result;
};
