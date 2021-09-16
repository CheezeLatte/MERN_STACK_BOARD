import { produce } from "immer";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LogInRequestAction,
  LogInSuccessAction,
  LogInFailureAction,
  SignUpRequestAction,
} from "../_actions/user";

export interface UserState {
  isLoggingIn: boolean;
  data: {
    name: string;
  } | null;
}

const initialState: UserState = {
  isLoggingIn: false,
  data: null,
};

type UserReducerActions =
  | SignUpRequestAction
  | LogInRequestAction
  | LogInSuccessAction
  | LogInFailureAction;

const userReducer = (prevState = initialState, action: UserReducerActions) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.isLoggingIn = false;
        draft.data = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLoggingIn = true;
        draft.data = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.isLoggingIn = false;
        break;
      default:
        break;
    }
  });
};

export default userReducer;
