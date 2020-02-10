import React, { Component } from "react";
import { authenticationService } from "../functions/authenthication";
import "./login.css";
import { Button } from "reactstrap";
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
    this.login = this.login.bind(this);
  }

  async login() {
    this.setState({
      loading: true
    });
    await authenticationService.login(
      "juh3do.ko3sdntdiainen@hotmail.fi",
      "kidasa3sdadsdasdask"
    );
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="ss">
        <Button onClick={this.login}>d</Button>
      </div>
    );
  }
}
