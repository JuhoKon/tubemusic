import React, { Component } from "react";
import "./navbar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import { authenticationService } from "../functions/authenthication";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    // https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    };
  }

  state = {
    isOpen: false
  };

  render() {
    const currentUser = authenticationService.currentUserValue;
    //console.log(currentUser.user.role);
    const toggle = () =>
      this.setState({
        isOpen: !this.state.isOpen
      });
    return (
      <div>
        <Navbar
          className="navbar navbar-dark navbar-expand-lg"
          expand="md"
          id="navbar"
        >
          <NavbarBrand href="/">TubeMusic</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/spotify">Spotify</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/playlists">Playlists</NavLink>
              </NavItem>
              {currentUser && currentUser.user.role === "Admin" ? (
                <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
              ) : (
                ""
              )}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              Hello, {currentUser && currentUser.user.name}
            </NavbarText>
            <Nav className="navbar-nav" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.props.logout}>
                  Sign out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
