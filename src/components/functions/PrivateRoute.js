import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationService } from "./authenthication";

var jwtDecode = require("jwt-decode");

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;

      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      if (jwtDecode(currentUser.token).exp < Date.now() / 1000) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      if (roles && roles.indexOf(currentUser.user.role) === -1) {
        // check if route is restricted by role
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }
      // authorised so return component
      return (
        <Component
          {...props}
          data={rest.data}
          darkMode={rest.darkMode}
          loadUser={rest.loadUser}
        />
      );
    }}
  />
);
