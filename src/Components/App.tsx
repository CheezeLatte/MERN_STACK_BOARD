import * as React from "react";
import { Component } from "react";
import Routers from "./Router";
import GlobalStyles from "./GlobalStyles";
import * as dotenv from "dotenv";
dotenv.config();

class App extends Component {
  render() {
    return (
      <>
        <Routers />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
