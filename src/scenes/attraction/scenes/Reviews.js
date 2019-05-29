import React from 'react';
import PropTypes from 'prop-types';
import { getProperty } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const topContainer = css`
  display: table;
  width: 100%;
`;

const reviewUserName = css`
  text-decoration: underline !important;
  margin-right: 6px;
  display: inline-block;
  color: #222;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: normal;
  font-size: 14px;
`;

const avatarContainer = css`
  vertical-align: top;
  padding-right: 12px;
  display: table-cell;
  margin: 0;
`;

const userAvatarImage = css`
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e1e3df;
  border-color: rgba(0, 0, 0, 0.05);
  margin: 0;
`;

const userContainer = css`
width: 100%;
display: table-cell;
    vertical-align: middle;
}
`;

const AttractionOverview = props => {
  const { attraction, users } = props;
  return (
    <div>
      {attraction.reviews ? (
        <ul>
          {attraction.reviews.map(rev => (
            <li>
              <div>
                <div css={topContainer}>
                  <div css={avatarContainer}>
                    {getProperty(rev.user, 'uid', 'avatar', users) ? (
                      <img
                        src={getProperty(rev.user, 'uid', 'avatar', users)}
                        css={userAvatarImage}
                      />
                    ) : (
                      'no Avatar'
                    )}
                  </div>

                  <div css={userContainer}>
                    <a css={reviewUserName}>
                      {getProperty(rev.user, 'uid', 'firstName', users)}{' '}
                      {getProperty(rev.user, 'uid', 'lastName', users)}
                    </a>
                    Jan 11, 2019
                    <div>{rev.rating}</div>
                  </div>
                </div>
                <div>{rev.description}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

AttractionOverview.propTypes = {
  attraction: PropTypes.object,
  users: PropTypes.object,
};

export default AttractionOverview;
