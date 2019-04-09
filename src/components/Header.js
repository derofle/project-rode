/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { auth } from '../services/firebase';
import { Consumer } from '../services/context';

const navStyle = css`
  padding-top: 10px;
  background-color: rgba(248, 248, 248, 1) !important;
  overflow: visible !important;
`;

const navWrapperStyle = css`
  margin: 0 auto;
  width: 75%;
`;

const brandLogoStyle = css`
  height: 8vh !important;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 72px;
  width: 25%;
  box-shadow: 0 4px 1px -3px rgba(0, 0, 0, 0.5);
`;

const navLinksStyle = css`
  background-color: transparent !important;
  transition: width 0.5s ease, background-color 0.5s ease;
  color: #4c1971 !important;
  display: inline-block;
`;

const liNavStyle = css`
  border-bottom: 5px solid transparent;
  height: 45px;
  color: #4c1971;
  &:hover {
    border-bottom: 5px solid #4c1971;
    cursor: pointer;
  }
`;

const logoImageStyle = css`
  height: 90%;
  color: #4c1971;
`;

const sidebarTriggerStyle = css`
  height: 100% !important;
  line-height: 44px !important;
  display: inline !important;
  width: 54px;
  color: #4c1971;
`;

const labelIconStyle = css`
  height: 100% !important;
  line-height: 44px !important;
  display: inline !important;
`;

const searchFieldStyle = css`
  background-color: transparent !important;
`;

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
        <nav css={navStyle}>
          <div className="nav-wrapper container" css={navWrapperStyle}>
            <NavLink to="/" className="brand-logo center" css={brandLogoStyle}>
              <img
                className="logo-image"
                src="/img/logo_pr.png"
                alt="logo"
                css={logoImageStyle}
              />
            </NavLink>
            <ul id="nav-mobile" className="left">
              <li>
                <a
                  href="#"
                  data-target="slide-out"
                  className="sidenav-trigger sidebar-trigger btn z-depth-0 nav-links bold-text "
                  css={sidebarTriggerStyle}
                >
                  <i
                    className="material-icons nav-sidebar-button"
                    css={sidebarTriggerStyle}
                  >
                    menu
                  </i>
                </a>
              </li>
            </ul>
            <ul id="nav-mobile" className="right">
              <li className="li-nav" css={liNavStyle}>
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
                      css={searchFieldStyle}
                    />
                    <label className="label-icon" htmlFor="search">
                      <i
                        className="material-icons label-icon"
                        style={{ color: '#4c1971' }}
                        css={labelIconStyle}
                      >
                        search
                      </i>
                    </label>
                    <i
                      className="material-icons label-icon"
                      css={labelIconStyle}
                    >
                      close
                    </i>
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
