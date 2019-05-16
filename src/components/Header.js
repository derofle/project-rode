import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { auth } from '../services/firebase';
import { Context } from '../services/context';

const globalNav = css`
  z-index: 10;
  position: relative;
  padding: 0;
  margin: 0;
  min-width: 1000px;
  @media screen and (max-width: 1050px) {
    min-width: 0;
  }
`;

const headerNav = css`
  width: auto;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  height: 80px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
`;

const headerContent = css`
  width: 100%;
  padding-left: 18px;
  padding-right: 18px;
  margin: 0;
  float: left;
  box-sizing: border-box;
`;

const logoStyle = css`
  position: relative;
  float: left;
  width: 80px;
  margin-right: 20px;
  height: 80px;
  box-sizing: border-box;
`;

const logoImage = css`
  height: 56px;
  margin-top: 12px;
`;

const searchDiv = css`
  margin: 0;
  box-sizing: border-box;
`;

const accountNav = css`
  float: right;
  margin: 0;
  padding-left: 0;
  height: 80px;
  list-style-position: outside;
`;

const accountListItem = css`
  float: left;
  position: relative;
  list-style: none;
  border: 0 none;
  margin: 0;
  padding: 0;
`;

const accountNormalLink = css`
  text-decoration: none;
  height: auto;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid transparent;
  margin-top: 24px;
  display: block;
  float: left;
  line-height: 16px;
  font-size: 14px;
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(34, 34, 34);
  cursor: pointer;
  &:hover {
    color: #595959 !important;
    text-decoration: underline !important;
  }
`;

const accountSignInLink = css`
  color: #222222 !important;
  text-decoration: none;
  height: auto;
  padding: 8px;
  margin-right: 18px;
  border: 1px solid;
  margin-top: 24px;
  display: block;
  float: left;
  line-height: 16px;
  font-size: 14px;
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(34, 34, 34);
  &:hover {
    background-color: #3c3c3c !important;
    color: #fff !important;
    border-color: #222222;
  }
`;

class Header extends React.Component {
  static contextType = Context;

  componentDidMount() {
    console.log('Context:', this.context);
  }

  handleLogout = () => {
    const { destroySession } = this.context;
    auth.signOut();
    destroySession();
  };

  render() {
    return (
      <Context.Consumer>
        {({ currentUser }) => (
          <div css={globalNav}>
            <header css={headerNav}>
              <div css={headerContent}>
                <div css={logoStyle}>
                  <NavLink to="/">
                    <img
                      className="logo-image"
                      src="/img/logo_pr.png"
                      alt="logo"
                      css={logoImage}
                    />
                  </NavLink>
                </div>
                <div css={searchDiv} />
                <ul css={accountNav}>
                  {currentUser && currentUser.uid ? null : (
                    <>
                      <li css={accountListItem}>
                        <NavLink to="/signup" css={accountNormalLink}>
                          Register
                        </NavLink>
                      </li>
                      <li css={accountListItem}>
                        <NavLink to="/login" css={accountSignInLink}>
                          Log in
                        </NavLink>
                      </li>
                    </>
                  )}
                  {currentUser && currentUser.uid ? (
                    <>
                      <li css={accountListItem}>
                        <a onClick={this.handleLogout} css={accountNormalLink}>
                          Log out
                        </a>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            </header>
          </div>
        )}
      </Context.Consumer>
    );
  }
}

Header.propTypes = {
  context: PropTypes.object,
};

export default Header;
