import React, { Component } from "react";
import { authenticationService } from "../functions/authenthication";
import "./login.css";
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
  }
  render() {
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
    return <div className="ss">005</div>;
  }
}
