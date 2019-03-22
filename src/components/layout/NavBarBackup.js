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
      <nav
        className="nav-wrapper grey lighten-1 container"
        style={{
          borderTop: '5px solid #9e9e9e',
          borderRadius: '0px 0px 6px 6px',
          height: '69px',
        }}
      >
        <div style={{ width: '90%', margin: 'auto' }}>
          <Link to="/" className="brand-logo left">
            Project Rode
          </Link>

          {currentUser && currentUser.uid ? (
            <ul className="right">
              <li>
                <button
                  className="waves-effect waves-light btn-small z-depth-1"
                  onClick={handleLogout}
                  type="button"
                >
                  Uitloggen
                </button>
              </li>
              <NavLink to="/" className="btn btn-floating grey darken-1">
                {user && user.initials}
              </NavLink>
              <li />
            </ul>
          ) : (
            <ul className="right">
              <li>
                <NavLink to="/parken">Parken</NavLink>
              </li>
              <li>
                <NavLink to="/attracties">Attracties</NavLink>
              </li>
              <li>
                <NavLink to="/">Over ons</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/aanmelden">Aanmelden</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
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
