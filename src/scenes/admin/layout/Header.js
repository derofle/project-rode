import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Consumer } from 'services/context';

const navStyle = css`
  height: 56px;
  line-height: 56px;
  background-color: white;
`;

const linkStyle = css`
  color: black;
`;

const avatarStyle = css`
  height: 56px !important;
  padding: 8px;
`;

const groupStyle = css`
  margin-right: 24px;
`;

const houseIcon = css`
  float: left;
  margin-right: 10px;
  line-height: 56px !important;
  @media (max-width: 600px) {
    margin-left: 48px;
  }
`;

const siteTitle = css`
  display: inline-block;
`;

const navbarRoot = css`
  z-index: 9;
`;

class HeaderRender extends React.Component {
  render() {
    const { currentUser } = this.context;
    return (
      <div className="navbar-fixed" css={navbarRoot}>
        <nav css={navStyle}>
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <Link to="/" css={linkStyle}>
                  <i className="material-icons" css={houseIcon}>
                    home
                  </i>
                  <div css={siteTitle} className="hide-on-small-and-down">
                    Project Rode
                  </div>
                </Link>
              </li>
            </ul>
            <ul className="right" css={groupStyle}>
              <li>
                <Link
                  to={`/gebruiker/${currentUser.uid}`}
                  css={linkStyle}
                  className="hide-on-small-and-down"
                >
                  {currentUser.email}
                </Link>
              </li>
              <li>
                <Link
                  to={`/gebruiker/${currentUser.uid}`}
                  style={{ height: '56px', padding: 0 }}
                >
                  <img
                    src={currentUser.profile.avatar}
                    alt=""
                    css={avatarStyle}
                    className="circle responsive-img"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

HeaderRender.contextType = Consumer;
const Header = props => (
  <Consumer>{() => <HeaderRender {...props} />}</Consumer>
);

export default Header;
