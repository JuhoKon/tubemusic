import React, { Component } from "react";
import { authenticationService } from "../functions/authenthication";
import { Form, FormGroup, Input, Container } from "reactstrap";
import "./login.css";
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
//https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      error: "",
      SignUpError: ""
    };
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
    this.login = this.login.bind(this);
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  togglePanel = () => {
    this.setState({
      active: !this.state.active
    });
  };
  async login(username, password) {
    this.setState({
      loading: true
    });
    /*await authenticationService.login(
      "juh3do.ko3sdntdiainen@hotmail.fi",
      "kidasa3sdadsdasdask"
    );*/
    await timeout(1500);
    let res = await authenticationService.login(username, password);

    this.setState({
      loading: false
    });
    if (!res) {
      //no res => all OK
      this.props.history.push("/");
    } else {
      this.setState({
        error: res
      });
    }
    //this.props.history.push("/");
  }
  async signUp(newUser) {
    this.setState({
      loading: true
    });
    await timeout(1500);
    let res = await authenticationService.signup(newUser);
    this.setState({
      loading: false
    });
    if (!res) {
      this.props.history.push("/");
    }
    if (res && res.data.error[0]) {
      let data = res.data.error[0];
      this.setState({
        SignUpError: data.name || data.email || data.password || res.data.error
      });
    }
  }
  signUpSubmit = e => {
    e.preventDefault();
    const { signUpName, signUpEmail, signUpPassword } = this.state;
    const role = "User";
    const newUser = {
      signUpName,
      signUpEmail,
      signUpPassword,
      role
    };
    this.signUp(newUser);
  };
  signInSubmit = e => {
    e.preventDefault();
    this.login(this.state.email, this.state.password);
  };
  render() {
    console.log(this.state);
    return (
      <div className={this.state.active ? "ss right-panel-active" : "ss"}>
        <h1 className="position">WELCOME TO TUBEMUSIC</h1>
        <Container id="login-container">
          <Container className="form-container sign-up-container">
            <Form onSubmit={this.signUpSubmit}>
              <h1>Create an account</h1>
              <br />
              {this.state.SignUpError ? (
                <div className="error2">{this.state.SignUpError}</div>
              ) : (
                <span className="span2">
                  Please fill in the form to create a new account!
                </span>
              )}
              <br />
              <FormGroup>
                <Input
                  name="signUpName"
                  autoComplete="username"
                  type="text"
                  placeholder="Name"
                  onChange={this.onChange}
                  required={true}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="signUpEmail"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  required={true}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="signUpPassword"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  required={true}
                />
              </FormGroup>
              <div>
                <button className={this.state.loading ? "loading" : ""}>
                  {this.state.loading ? "Loading..." : "Sign up"}
                </button>
                {this.state.loading ? <div className="spin"></div> : ""}
              </div>
            </Form>
          </Container>
          <Container className="form-container sign-in-container">
            <Form onSubmit={this.signInSubmit}>
              <h1>Sign in</h1>
              <br />
              {this.state.error ? (
                <div className="error">{this.state.error}</div>
              ) : (
                <span className="span2">
                  Please login using your email and password!
                </span>
              )}
              <br />
              <FormGroup>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  onChange={this.onChange}
                  required={true}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  required={true}
                />
              </FormGroup>
              <a href="# ">Forgot your password?</a>
              <div>
                <button className={this.state.loading ? "loading" : ""}>
                  {this.state.loading ? "Signing in..." : "Sign in"}
                </button>
                {this.state.loading ? <div className="spin"></div> : ""}
              </div>
            </Form>
          </Container>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={this.togglePanel}
                  className="ghost"
                  id="signIn"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Don't have an account yet?</h1>
                <p>
                  No worries! Enter your personal details and start listening to
                  music with us.
                </p>
                <button
                  onClick={this.togglePanel}
                  className="ghost"
                  id="signUp"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
