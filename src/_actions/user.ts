import request from "../Axios";
import { UserState } from "../_reducers/user";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_IN = "LOG_IN";
export const SIGN_UP_URL = "/auth/users";
export const LOG_IN_URL = "/auth/login";

export interface StoreState {
  user: UserState;
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  data: {};
}

export const SignUpRequest = (dataToSubmit: object): SignUpRequestAction => {
  const data = request("post", SIGN_UP_URL, dataToSubmit)
    .then((res) => {
      console.log(res.data);
      if (res.data.success === "true") {
        alert("회원가입에 성공하셨습니다");
      }
    })
    .catch((err) => console.log(err));
  return { type: SIGN_UP_REQUEST, data: data };
};

export interface LogInRequestAction {
  type: typeof LOG_IN_REQUEST;
  data: {
    id: string;
    password: string;
  };
}

export const LogInRequest = (data: {
  id: string;
  password: string;
}): LogInRequestAction => {
  return { type: LOG_IN_REQUEST, data };
};

export interface LogInSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: { name: string };
}

export const LogInSuccess = (data: { name: string }): LogInSuccessAction => {
  return { type: LOG_IN_SUCCESS, data };
};

export interface LogInFailureAction {
  type: typeof LOG_IN_FAILURE;
  error: Error;
}

export const LogInFailure = (error: Error): LogInFailureAction => {
  return { type: LOG_IN_FAILURE, error };
};

export interface Promise {
  method: string;
  url: string;
  data: {
    id: string;
    password: string;
  };
}
export interface LogInAction {
  type: typeof LOG_IN;
  promise: Promise;
}

export const LogIn = (id: string, password: string): LogInAction => {
  return {
    type: LOG_IN,
    promise: { method: "post", url: LOG_IN_URL, data: { id, password } },
  };
};
