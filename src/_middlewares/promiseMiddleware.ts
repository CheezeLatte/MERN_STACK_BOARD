import axios from "axios";
import { MiddlewareAPI, Dispatch, AnyAction } from "redux";

export const promiseMiddleWare =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    const { promise, type, ...rest } = action;
    next({ ...rest, type: `${type}_REQUEST` });
    return axios({
      method: promise?.method,
      url: process.env.REACT_APP_DEFAULT_URL + promise?.url,
      data: promise?.data,
    })
      .then((result) => {
        if (result.data.success === true) {
          localStorage.setItem("accessToken", result.data.data.accessToken);
          localStorage.setItem("refreshToken", result.data.data.refreshToken);
          axios.defaults.headers.common["x-access-token"] =
            result.data.data.accessToken;
          next({ ...rest, result, type: `${type}_SUCCESS` });
          alert("로그인에 성공하셨습니다");
        } else alert("아이디 혹은 비밀번호가 일치하지 않습니다");
      })
      .catch((error) => {
        next({ ...rest, error, type: `${type}_FAILURE` });
      });
  };
