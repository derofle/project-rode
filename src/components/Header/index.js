/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { Consumer } from '../../services/context';
import './style/style.css';

class NavBarRender extends Component {
  handleLogout = () => {
    const { context } = this.props;
    const { destroySession } = context;
    auth.signOut();
    destroySession();
  };

  render() {
    const { context } = this.props;
    const { currentUser, users } = context;
    console.log(context);
    let user;

    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }
    console.log(user);
    return (
      <nav>
        <div className="nav-wrapper container" style={{ width: '80%' }}>
          <ul id="nav-mobile" className="left nav-container">
            <li style={{ height: '8vh' }}>
              <NavLink to="/" className="brand-logo">
                <img className="logo-image" src="/img/logo_pr.png" alt="logo" />
              </NavLink>
            </li>
            <li className="li-nav">
              <NavLink
                to="/parken"
                hash="/#"
                className="waves-effect waves-light btn right z-depth-0 nav-links bold-text"
              >
                <div className="marketing-icon">
                  <img src="/img/parks.svg" alt="parks-icon" />
                </div>
                <p className="marketing-text">Parken</p>
              </NavLink>
            </li>
            <li className="li-nav">
              <NavLink
                to="/attracties"
                hash="/#"
                className="waves-effect waves-light btn right z-depth-0 nav-links bold-text"
              >
                <div className="marketing-icon">
                  <img src="/img/attractions.svg" alt="attractions-icon" />
                </div>
                <p className="marketing-text">Attracties</p>
              </NavLink>
            </li>
            <li className="li-nav">
              <NavLink
                to="/shows"
                hash="/#"
                className="waves-effect waves-light btn right z-depth-0 nav-links bold-text"
              >
                <div className="marketing-icon">
                  <img src="/img/shows.svg" alt="shows-icon" />
                </div>
                <p className="marketing-text">Shows</p>
              </NavLink>
            </li>
          </ul>
          <ul id="nav-mobile" className="right nav-container">
            {user ? (
              <li>
                <Link
                  to={window.location.pathname}
                  hash="/#"
                  className="waves-effect waves-light btn-small z-depth-0 nav-button"
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  <i className="material-icons left">person</i>
                  UITLOGGEN
                </Link>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  hash="/#"
                  className="waves-effect waves-light btn-small z-depth-0 nav-button"
                >
                  <i className="material-icons left">person</i>
                  INLOGGEN
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

NavBarRender.propTypes = {
  context: PropTypes.object,
};

const NavBar = props => (
  <Consumer>
    {context => <NavBarRender {...props} context={context} />}
  </Consumer>
);

export default NavBar;
