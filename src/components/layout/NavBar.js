/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { Consumer } from '../../context/AppProvider';

const NavBarRender = props => {
  const handleLogout = () => {
    const { destroySession } = props.context;
    auth.signOut();
    destroySession();
  };

  const { context } = props;
  const { currentUser, users } = context;
  let user;
  if (currentUser && currentUser.uid) {
    user = users.find(obj => obj.uid === currentUser.uid);
  }

  return (
    <div>
      <nav className="nav-extended">
        <div
          className="nav-wrapper z-depth-1"
          style={{ backgroundColor: '#596a79' }}
        >
          <div className="container">
            <a href="/" className="brand-logo">
              <img
                className="brand-logo"
                src="https://firebasestorage.googleapis.com/v0/b/project-rode.appspot.com/o/logo_pr.png?alt=media&token=f4a574bc-15fe-41c5-8040-51055886b76d"
                style={{ height: '44px', marginTop: '12px' }}
              />
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {user && user.uid ? null : (
                <li>
                  <Link
                    to="/login"
                    className="waves-effect waves-light btn"
                    style={{ backgroundColor: '#76899a' }}
                  >
                    INLOGGEN
                  </Link>
                </li>
              )}
              {user && user.uid ? null : (
                <li>
                  <Link
                    to="/aanmelden"
                    className="waves-effect waves-light btn"
                    style={{ backgroundColor: '#76899a' }}
                  >
                    AANMELDEN
                  </Link>
                </li>
              )}
              {user && user.uid ? (
                <li>
                  <Link
                    to={window.location.pathname}
                    hash="/#"
                    className="waves-effect waves-light btn"
                    style={{ backgroundColor: '#76899a' }}
                    onClick={handleLogout}
                  >
                    UITLOGGEN
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div style={{ backgroundColor: '#f2f2f2' }}>
          <div className="nav-content container">
            <ul className="tabs tabs-transparent">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <li className="tab">
                  <NavLink to="/parken" style={{ color: '#62676a' }}>
                    Parken
                  </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/attracties" style={{ color: '#62676a' }}>
                    Attracties
                  </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/shows" style={{ color: '#62676a' }}>
                    Shows
                  </NavLink>
                </li>
                <li className="tab">
                  <NavLink to="/fabrikanten" style={{ color: '#62676a' }}>
                    Fabrikanten
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">JavaScript</a>
        </li>
      </ul>
    </div>
  );
};

NavBarRender.propTypes = {
  context: PropTypes.object,
};

const NavBar = props => (
  <Consumer>
    {context => <NavBarRender {...props} context={context} />}
  </Consumer>
);

export default NavBar;
