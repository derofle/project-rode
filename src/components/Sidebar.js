import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { NavLink, Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import 'materialize-css/dist/css/materialize.min.css';

class Sidebar extends Component {
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
    return (
      <div>
        <ul id="slide-out" className="sidenav">
          <li />
          <li>
            <NavLink
              to="/attracties"
              hash="/#"
              className="waves-effect waves-light btn z-depth-0 bold-text"
            >
              <div className="marketing-icon">
                <img src="/img/attractions.svg" alt="attractions-icon" />
              </div>
              <p className="marketing-text">Attracties</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shows"
              hash="/#"
              className="waves-effect waves-light btn z-depth-0 bold-text"
            >
              <div className="marketing-icon">
                <img src="/img/shows.svg" alt="shows-icon" />
              </div>
              <p className="marketing-text">Shows</p>
            </NavLink>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <a className="subheader">Subheader</a>
          </li>
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
        </ul>
      </div>
    );
  }
}

export default Sidebar;
