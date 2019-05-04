import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  // dont need to use this.toggle.bind(this) due to arrow function
  // and do not need constuctor to control state
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        {/* sm to create hamburger for small devices */}
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/" data-test="navbar-brand">
              Shopping List
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" data-test="navlink-main">
                    Demo
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;
