import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

const catContainer = css`
  color: #222;
  font-family: 'Open Sans', sans-serif;
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
  font-family: 'Open Sans', sans-serif;
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

const CatLinks = () => (
  <div css={catContainer}>
    <div css={catContent}>
      <ul css={catUnlist}>
        <li css={catLisItem}>
          <NavLink to="/parken" css={catLink}>
            <span>Parken</span>
          </NavLink>
        </li>
        <li css={catLisItem}>
          <NavLink to="/attracties" css={catLink}>
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
            <span>Fabrikanten</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default CatLinks;
