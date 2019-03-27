/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { Consumer } from '../../services/context';
import Car from './components/Car';
import './style/style.css';

class NavBarRender extends Component {
  state = {
    offsetTab: 0,
    offsetCar: 0,
    rideMove: false,
  };

  handleLogout = () => {
    const { destroySession } = this.props.context;
    auth.signOut();
    destroySession();
  };

  getOffset = el => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
    };
  };

  moveCar = id => {
    let offsetTab;
    if (id) {
      offsetTab = this.getOffset(document.getElementById(id));
      this.setState({
        offsetTab: offsetTab.left,
      });
    } else {
      this.setState({
        offsetTab: '2000',
      });
    }

    const offsetCar = this.getOffset(document.getElementById('car'));
    this.setState({
      offsetCar: offsetCar.left,
      rideMove: true,
    });
  };

  rideMoved = () => {
    this.setState({
      rideMove: false,
    });
  };

  render() {
    const { context } = this.props;
    const { currentUser, users } = this.context;
    let user;

    if (currentUser && currentUser.uid) {
      user = users.find(obj => obj.uid === currentUser.uid);
    }

    return (
      <div>
        <nav className="nav-extended">
          <div className="nav-header">
            <div
              className="nav-content nav-top container"
              style={{ width: '80%' }}
            >
              <NavLink
                to="/"
                className="brand-logo nav-logo"
                onClick={() => this.moveCar('nav-logo')}
                id="nav-logo"
              >
                <img className="logo-image" src="/img/logo_pr.png" />
              </NavLink>
              <Link
                to={window.location.pathname}
                id="logout-button"
                hash="/#"
                className="waves-effect waves-light btn right sign-button z-depth-0 bold-text"
                style={{
                  color: '#4C1971',
                  position: 'absolute',
                  display: 'inline-block',
                  right: '0.5rem',
                  marginTop: '6px',
                }}
                onClick={() => {
                  // this.handleLogout();
                  this.moveCar('logout-button');
                }}
              >
                <i className="material-icons sign-icon left">person</i>
                UITLOGGEN
              </Link>
              <ul className="tabs tabs-transparent">
                <div className="nav-tabs">
                  <li className="tab">
                    <NavLink
                      to="/parken"
                      id="tab-1"
                      hash="/#"
                      className="waves-effect waves-light btn right sign-button z-depth-0 nav-links bold-text"
                      style={{
                        backgroundColor: '#cd283b',
                        color: '#4C1971',
                        margin: 0,
                        padding: 0,
                      }}
                      onClick={() => {
                        // this.handleLogout();
                        this.moveCar('tab-1');
                      }}
                    >
                      <div className="marketing-icon">
                        <img src="/img/parks.svg" />
                      </div>
                      <p className="marketing-text">Parken</p>
                    </NavLink>
                  </li>
                  <li className="tab" style={{ padding: '0 10px 0 10px' }}>
                    <NavLink
                      to="/attracties"
                      id="tab-2"
                      hash="/#"
                      className="waves-effect waves-light btn right sign-button z-depth-0 nav-links bold-text"
                      style={{
                        backgroundColor: '#cd283b',
                        color: '#4C1971',
                        margin: 0,
                        padding: '0',
                      }}
                      onClick={() => {
                        // this.handleLogout();
                        this.moveCar('tab-2');
                      }}
                    >
                      <div className="marketing-icon">
                        <img src="/img/attractions.svg" />
                      </div>
                      <p className="marketing-text">Attracties</p>
                    </NavLink>
                  </li>
                  <li className="tab">
                    <NavLink
                      to="/shows"
                      id="tab-3"
                      hash="/#"
                      className="waves-effect waves-light btn right sign-button z-depth-0 nav-links bold-text"
                      style={{
                        backgroundColor: '#cd283b',
                        color: '#4C1971',
                        margin: 0,
                        padding: '0',
                      }}
                      onClick={() => {
                        // this.handleLogout();
                        this.moveCar('tab-3');
                      }}
                    >
                      <div className="marketing-icon">
                        <img src="/img/shows.svg" />
                      </div>
                      <p className="marketing-text">Shows</p>
                    </NavLink>
                  </li>
                </div>
              </ul>
            </div>
            <div className="car-container">
              <Car
                offsetTab={this.state.offsetTab}
                offsetCar={this.state.offsetCar}
                rideMove={this.state.rideMove}
                rideMoved={this.rideMoved}
                moveCar={this.moveCar}
              />
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'row', zIndex: 10 }}
              className="trackdiv"
            />
            <div
              style={{ display: 'flex', flexDirection: 'row', zIndex: 0 }}
              className="skylinediv"
            />
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
