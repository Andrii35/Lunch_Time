import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationItem from './shared/navigation/navigation-item';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        link: '/restaurants', name: 'Restaurants', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/events', name: 'Events', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/map', name: 'Map', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/about', name: 'About', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/contact', name: 'Contact', isUnAuthenticatedSee: true, isAuthenticatedSee: true,
      },
      {
        link: '/login', name: 'Login', isUnAuthenticatedSee: true, isAuthenticatedSee: false,
      },
      {
        link: '/registration', name: 'Registration', isUnAuthenticatedSee: true, isAuthenticatedSee: false,
      },
      {
        link: '/profile', name: 'Profile', isUnAuthenticatedSee: false, isAuthenticatedSee: true,
      },
      {
        link: '/', name: 'Logout', isUnAuthenticatedSee: false, isAuthenticatedSee: true,
      },
    ];
  }

  render() {
    const { isAuthenticated } = this.props;
    const className = 'mr-3';

    return (
      <Navbar expand="lg" bg="light">
        <Navbar.Brand>
          <img
            alt=""
            src="/img/logo.jpg"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          {' '}
          <Link to="/">Lunch Time</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" bg="dark">
            {this.links
              .filter((link) => {
                if (isAuthenticated) {
                  return link.isAuthenticatedSee === true;
                }
                return link.isUnAuthenticatedSee === true;
              })
              .map((e) => (
                <NavigationItem
                  className={className}
                  link={e.link}
                  name={e.name}
                  key={e.link}
                />
              ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavigationBar;
