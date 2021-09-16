import Axios, { Method } from "axios";
import "dotenv/config";

const request = (method: Method, url: string | undefined, data: object) => {
  return Axios({
    method,
    url: process.env.REACT_APP_DEFAULT_URL + url,
    data,
  });
};

export default request;
