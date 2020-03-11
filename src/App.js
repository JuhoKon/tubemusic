import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/navbar-component";
import "./App.css";
import HomePage from "./components/homepage/homepage-component";
import Login from "./components/login/login-component";
import Spotify from "./components/spotify/spotify-component";
import { authenticationService } from "./components/functions/authenthication";
import { tokenConfig } from "./components/functions/functions";
import { PrivateRoute } from "./components/functions/PrivateRoute";
import PublicPlaylists from "./components/playlistGrabber/publicPlaylists";
import { history } from "./components/History";
import Admin from "./components/admin/Admin";

const NoMatchPage = () => {
  return <h3>404 - Not found</h3>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: null,
      isAuth: false
    };
    this.loadUser = this.loadUser.bind(this);
    this.logout = this.logout.bind(this);
  }
  async loadUser(token) {
    let res2 = await authenticationService.loadUser(token);
    if (res2 !== null) {
      this.setState({
        currentUserInfo: res2,
        isAuth: true
      });
    } else {
      this.setState({
        currentUserInfo: null,
        isAuth: false,
        token: null
      });
    }
  }
  componentDidMount() {
    //console.log("I mount");

    authenticationService.currentUser.subscribe(x => {
      //when change happens, this gets called
      if (x) {
        this.setState({
          token: x.token
        });
        this.loadUser();
      }
    });
    //for checking if we need to renew token
    tokenConfig();
    this.interval = setInterval(() => {
      tokenConfig(); //check token
    }, 900000); //check token every 15 mins //needs tweaking
  }
  componentWillUnmount() {
    clearInterval(this.interval); //clear the made interval
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
    this.setState({
      token: null
    });
  }
  render() {
    const { currentUserInfo, token, isAuth } = this.state;
    //console.log(currentUserInfo);

    return (
      <div className="App wrapper">
        <Router history={history}>
          {token && <Navbar logout={this.logout} />}
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/"
              data={currentUserInfo}
              loadUser={this.loadUser}
              exact
              component={HomePage}
            />
            <PrivateRoute
              path="/spotify"
              data={currentUserInfo}
              component={Spotify}
            />
            <PrivateRoute
              path="/playlists"
              data={currentUserInfo}
              component={PublicPlaylists}
              loadUser={this.loadUser}
            />
            <PrivateRoute
              path="/admin"
              data={currentUserInfo}
              roles={["Admin"]}
              component={Admin}
            />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
