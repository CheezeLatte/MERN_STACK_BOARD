import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Components/App";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
