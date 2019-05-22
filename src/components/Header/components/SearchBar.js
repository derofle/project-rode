import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

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

const SearchBar = () => (
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
);

export default SearchBar;
