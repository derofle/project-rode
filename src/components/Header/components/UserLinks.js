import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { Context } from 'services/context';
import { auth } from 'services/firebase';

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
const handleLogout = destroySession => {
  auth.signOut();
  destroySession();
};
const UserLinks = () => (
  <Context.Consumer>
    {({ currentUser, destroySession }) => (
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
                onClick={() => handleLogout(destroySession)}
                css={accountNormalLink}
              >
                Log out
              </a>
            </li>
          </>
        ) : null}
      </ul>
    )}
  </Context.Consumer>
);

export default UserLinks;
