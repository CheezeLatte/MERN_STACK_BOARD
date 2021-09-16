import {
  createStore,
  MiddlewareAPI,
  Dispatch,
  AnyAction,
  applyMiddleware,
  compose,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistedReducer from "./_reducers";
import { promiseMiddleWare } from "./_middlewares/promiseMiddleware";

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
};

const firstMiddleWare =
  (store: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    next(action);
  };

const thunkMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }
    return next(action);
  };

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(
        applyMiddleware(firstMiddleWare, thunkMiddleware, promiseMiddleWare)
      )
    : composeWithDevTools(
        applyMiddleware(firstMiddleWare, thunkMiddleware, promiseMiddleWare)
      );

const store: any = createStore(persistedReducer, initialState, enhancer);

export default store;
