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
  width: auto;
  margin-right: 20px;
  height: 80px;
  box-sizing: border-box;
`;

const logoImage = css`
  height: 56px;
  margin-top: 12px;
`;

const mobileButton = css`
  @media screen and (min-width: 900px) {
    display: none !important;
  }
  text-decoration: none !important;
  display: block !important;
  height: 80px;
  float: left;
  bottom: 1px;
  position: relative;
  text-align: left;
  color: #222222;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 0;
  padding-left: 6px !important;
  padding-right: 4px !important;
`;
const searchDiv = css`
  margin: 0;
  box-sizing: border-box;
  @media screen and (max-width: 900px) {
    position: relative;
    display: block;
    clear: left;
    top: 0;
    padding: 0 18px;
    margin: 0 -12px;
    border-top: 2px solid #e2e2e2;
  }
`;

const searchForm = css`
  position: relative;
  float: left;
  width: 35%;
  height: 80px;
  margin: 0;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 60px;
  }
`;

const searchWrapper = css`
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  position: absolute;
  display: table;
  width: 100%;
  top: 50%;
  margin-top: -17px;
  height: 34px;
`;

const inputWrapper = css`
  z-index: 9;
  white-space: nowrap;
  display: table-cell;
  vertical-align: top;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  text-align: left;
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
`;

const inputField = css`
  z-index: 9;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  top: 50%;
  border: 1px solid #cfcbc8;
  background: #f9f9f8;
  padding: 6px 10px;
  margin-left: 0;
  height: 34px;
  font-size: 14px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 2px #e9e9e8, 0 0 0 1000px #fbfbfa inset;
  border-radius: 3px;
  overflow: hidden;
  outline-color: transparent;
  outline-style: none;
  &:active {
    border: 1px solid rgba(0, 0, 0, 0.8);
    background: #fff !important;
    box-shadow: 0 0 0 1000px #fff inset;
  }
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.8);
    background: #fff !important;
    box-shadow: 0 0 0 1000px #fff inset;
  }
`;

const searchButtonWrapper = css`
  z-index: 10;
  white-space: nowrap;
  display: table-cell;
  vertical-align: top;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  text-align: left;
`;

const searchButton = css`
  z-index: 10;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  background-color: #222222;
  background-color: #222222;
  border-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  text-transform: none;
  margin: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  line-height: 17px;
  height: 34px;
  padding: 7px 15px 8px;
  margin-left: -2px;
  cursor: pointer;
  &:hover {
    background-color: #3c3c3c;
  }
`;

const accountNav = css`
  float: right;
  margin: 0;
  padding-left: 0;
  height: 80px;
  list-style-position: outside;
  @media screen and (max-width: 900px) {
    position: absolute;
    top: 0;
    right: 24px;
  }
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

const catContainer = css`
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans',
    'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  box-sizing: border-box;
  margin: 0;
  background-color: #fff;
  border-bottom: 2px solid rgba(34, 34, 34, 0.15);
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: rgba(34, 34, 34, 0.15);
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const catContent = css`
  z-index: 10;
  position: relative;
  background-color: #fff;
  font-family: 'Graphik Webfont', -apple-system, BlinkMacSystemFont, 'Roboto',
    'Droid Sans', 'Segoe UI', 'Helvetica', Arial, sans-serif;
  font-weight: 300;
  font-size: 13px;
  line-height: 18px;
  max-width: 1400px;
  padding-left: 18px;
  padding: right: 18px;
  margin: 0 auto;
  line-height: 18px;
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

const catUnlist = css`
  max-width: 1400px;
  justify-content: space-between !important;
  display: flex !important;
  margin: 0 auto;
  float: left;
  list-style-position: outside;
  box-sizing: border-box;
  line-height: 18px;
`;

const catLisItem = css`
  cursor: pointer;
  padding-bottom: 12px;
  padding-left: 9px;
  padding-right: 9px;
  margin-right: 12px;
  align-items: center !important;
  display: flex !important;
  box-sizing: border-box;
  list-style-position: outside;
  list-style-type: disc;
  line-height: 18px;
  transition: box-shadow 0.1s ease-in-out;
  &:hover {
    box-shadow: 0 2px 0 #222222;
  }
`;

const catLink = css`
  text-decoration: none !important;
  color: #222;
  background: transparent;
  box-sizing: border-box;
  margin: 0;
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
          <React.Fragment>
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
                  <button css={mobileButton}>
                    <i className="material-icons">menu</i>
                  </button>
                  <div css={searchDiv}>
                    <form css={searchForm}>
                      <div css={searchWrapper}>
                        <div css={inputWrapper}>
                          <input
                            id="search-query"
                            type="text"
                            className="browser-default"
                            css={inputField}
                            placeholder="Zoek naar parken of attracties"
                          />
                        </div>
                        <div css={searchButtonWrapper}>
                          <button css={searchButton} type="submit">
                            Zoeken
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <ul css={accountNav}>
                    {currentUser && currentUser.uid ? null : (
                      <React.Fragment>
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
                      </React.Fragment>
                    )}
                    {currentUser && currentUser.uid ? (
                      <>
                        <li css={accountListItem}>
                          <a
                            onClick={this.handleLogout}
                            css={accountNormalLink}
                          >
                            Log out
                          </a>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              </header>
            </div>
            <div css={catContainer}>
              <div css={catContent}>
                <ul css={catUnlist}>
                  <li css={catLisItem}>
                    <NavLink to="/" css={catLink}>
                      <span>Parken</span>
                    </NavLink>
                  </li>
                  <li css={catLisItem}>
                    <NavLink to="/" css={catLink}>
                      <span>Attracties</span>
                    </NavLink>
                  </li>
                  <li css={catLisItem}>
                    <NavLink to="/" css={catLink}>
                      <span>Shows</span>
                    </NavLink>
                  </li>
                  <li css={catLisItem}>
                    <NavLink to="/" css={catLink}>
                      <span>Attracties</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}

Header.propTypes = {
  context: PropTypes.object,
};

export default Header;
