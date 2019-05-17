import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { NavLink, Link } from 'react-router-dom';
import { Consumer, Context } from 'services/context';
import { auth } from '../services/firebase';
import 'materialize-css/dist/css/materialize.min.css';

class SidebarRender extends Component {
  componentDidMount() {
    const elem = document.querySelector('.sidenav');
    M.Sidenav.init(elem, {
      edge: 'left',
      inDuration: 250,
    });
  }

  handleLogout = () => {
    const { destroySession } = this.context;
    auth.signOut();
    destroySession();
  };

  render() {
    const { currentUser } = this.context;
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <li />
          <li>
            <NavLink to="/parken" hash="/#" className="bold-text">
              Parken
            </NavLink>
          </li>
          <li>
            <NavLink to="/attracties" hash="/#" className="bold-text">
              Attracties
            </NavLink>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li />
          {currentUser && currentUser.uid ? (
            <li>
              <Link
                to={window.location.pathname}
                hash="/#"
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
              <Link to="/login" hash="/#">
                <i className="material-icons left">person</i>
                INLOGGEN
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

SidebarRender.contextType = Context;
const Sidebar = props => (
  <Consumer>{() => <SidebarRender {...props} />}</Consumer>
);

export default Sidebar;
