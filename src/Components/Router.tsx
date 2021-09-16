import * as React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "../Pages/Home";
import Signup from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import Board from "../Pages/Board";
import WriteBoard from "../Pages/WriteBoard";
import AuthHeader from "./AuthHeader";
import { UserState } from "../_reducers/user";
import { Component } from "react";
import { RootState } from "../_reducers";
import { connect } from "react-redux";

interface StateToProps {
  user: UserState;
}

class Routes extends Component<StateToProps, any> {
  render() {
    const { user } = this.props;
    return (
      <Router>
        <>
          {user.isLoggingIn ? <AuthHeader /> : <Header />}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Board" exact component={Board} />
            <Route path="/LogIn" exact component={LogIn} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/WriteBoard" exact component={WriteBoard} />
            <Redirect from="*" to="/" />
          </Switch>
        </>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Routes);
