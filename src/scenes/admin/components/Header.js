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

class HeaderRender extends React.Component {
  render() {
    const { currentUser } = this.context;
    return (
      <div className="navbar-fixed">
        <nav css={navStyle}>
          <div className="nav-wrapper">
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down"
              css={groupStyle}
            >
              <li>
                <Link to="/" css={linkStyle}>
                  {currentUser.email}
                </Link>
              </li>
              <li>
                <img
                  src="http://www.avatarmeher.org/wp-content/uploads/2018/04/Toka-1928-head-274x300.jpg"
                  alt=""
                  css={avatarStyle}
                  className="circle responsive-img"
                />
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
