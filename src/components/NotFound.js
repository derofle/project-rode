import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const notFoundContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const notFoundContent = css`
  text-align: center;
  margin-top: 100px;
`;

const NotFound = () => (
  <div css={notFoundContainer}>
    <div css={notFoundContent}>
      <h1 style={{ margin: 0 }}>Error 404</h1>
      <p style={{ margin: 0 }}>Page not found</p>
    </div>
  </div>
);

export default NotFound;
