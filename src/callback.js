import axios from "axios";

export const sendRequest = (params) => {
  axios
    .get(getCallbackUrl() + 'daktela/call/log', { params })
    .catch(error => console.error(error.message));
};

const getCallbackUrl = () => {
  let url = process.env.CALLBACK_HOST;
  return url + (url.endsWith("/") ? "" : "/");
};
