import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

import { Context } from '../../services/context';
import UserLinks from './components/UserLinks';
import SearchBar from './components/SearchBar';
import CatLinks from './components/CatLinks';

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

class Header extends React.Component {
  static contextType = Context;

  render() {
    return (
      <Context.Consumer>
        {context => (
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
                    <SearchBar />
                  </div>
                  <UserLinks />
                </div>
              </header>
            </div>
            <CatLinks />
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
