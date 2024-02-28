import axios from "axios";

export const sendRequest = (params) => {
  axios
    .get(getCallbackUrl() + 'daktela/call/log', { params })
    .catch(error => console.error(error.message));
};

const getCallbackUrl = () => {
  let url = process.env.CALLBACK_HOST;
  if (!url) {
    throw new Error("CALLBACK_HOST is not set");
  }
  return url + (url.endsWith("/") ? "" : "/");
};
