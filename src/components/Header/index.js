/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
    /*
    const { context } = this.props;
    const { currentUser, users } = context;
    let user;
    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }
    */
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper container" style={{ width: '75%' }}>
            <NavLink to="/" className="brand-logo center">
              <img className="logo-image" src="/img/logo_pr.png" alt="logo" />
            </NavLink>
            <ul id="nav-mobile" className="left">
              <li>
                <a
                  href="#"
                  data-target="slide-out"
                  className="sidenav-trigger sidebar-trigger btn z-depth-0 nav-links bold-text "
                >
                  <i className="material-icons nav-sidebar-button">menu</i>
                </a>
              </li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li className="li-nav" style={{ color: '#4c1971' }}>
                <form>
                  <div
                    className="input-field"
                    style={{ backgroundColor: '#f8f8f8' }}
                  >
                    <input
                      id="search"
                      className="search-field"
                      type="search"
                      placeholder="Zoeken"
                    />
                    <label className="label-icon" htmlFor="search">
                      <i
                        className="material-icons label-icon"
                        style={{ color: '#4c1971' }}
                      >
                        search
                      </i>
                    </label>
                    <i className="material-icons label-icon">close</i>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>
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
