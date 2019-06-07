import React from 'react';
import PropTypes from 'prop-types';
import { getProperty, addReview } from 'services/utilities';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RatingStars from 'components/RatingStars';
import { Link } from 'react-router-dom';
import { firebaseRoot } from 'services/firebase/components/firebase';
import moment from 'moment';

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

const descriptionContainer = css`
  margin-top: 6px;
  margin-left: 62px;
`;

const breakDiv = css`
  margin-bottom: 42px;
  width: 100%;
`;

const writeWrapper = css`
  width: 50%;
  float: left;
  padding: 8px;
`;

const reviewsWrapper = css`
  width: 50%;
  float: left;
  padding: 8px;
`;

class AttractionReviews extends React.Component {
  state = {
    rating: null,
    description: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitReview = e => {
    e.preventDefault();
    const { rating, description } = this.state;
    const { attraction, currentUser, updateContext } = this.props;
    const newDoc = {
      user: currentUser.uid,
      rating: Number(rating),
      description,
      timestamp: firebaseRoot.firestore.Timestamp.fromDate(new Date()),
    };

    addReview(
      newDoc,
      attraction.uid,
      attraction.reviews ? attraction.reviews : null
    );
    updateContext();
  };

  render() {
    const { attraction, users, currentUser } = this.props;
    const { rating, description } = this.state;
    return (
      <div>
        <div css={writeWrapper}>
          <div className="input-field" style={{ margin: 0 }}>
            <input
              id="rating"
              type="number"
              onChange={this.handleChange}
              required
              value={rating}
              min="1"
              max="10"
              style={{
                backgroundColor: 'hsl(0,0%,100%)',
                borderColor: 'hsl(0,0%,80%)',
                borderRadius: '4px',
                borderStyle: 'solid',
                borderWidth: '1px',
                outline: 0,
                padding: '4px 10px 4px 10px',
                fontSize: '1.5em',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div className="input-field" style={{ margin: 0 }}>
            <input
              id="description"
              type="text"
              onChange={this.handleChange}
              required
              value={description}
              style={{
                backgroundColor: 'hsl(0,0%,100%)',
                borderColor: 'hsl(0,0%,80%)',
                borderRadius: '4px',
                borderStyle: 'solid',
                borderWidth: '1px',
                outline: 0,
                padding: '4px 10px 4px 10px',
                fontSize: '1.5em',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <button onClick={this.submitReview}>Add review</button>
          </div>
        </div>
        <div css={reviewsWrapper}>
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
                            alt="avatar"
                          />
                        ) : (
                          'no Avatar'
                        )}
                      </div>

                      <div css={userContainer}>
                        <Link
                          css={reviewUserName}
                          to={`/gebruiker/${rev.user}`}
                        >
                          {getProperty(rev.user, 'uid', 'firstName', users)}{' '}
                          {getProperty(rev.user, 'uid', 'lastName', users)}
                        </Link>
                        {rev && rev.timestamp
                          ? moment
                              .unix(rev.timestamp.seconds)
                              .format('D MMM YYYY')
                          : 'Date unknown'}
                        <div>
                          <RatingStars rating={rev.rating} />
                          {rev.user === currentUser.uid ? 'Delete' : null}
                        </div>
                      </div>
                    </div>
                    <div css={descriptionContainer}>{rev.description}</div>
                  </div>
                  <div css={breakDiv} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Er zijn helaas nog geen reviews!</p>
          )}
        </div>
      </div>
    );
  }
}

AttractionReviews.propTypes = {
  attraction: PropTypes.object,
  users: PropTypes.object,
  currentUser: PropTypes.object,
};

export default AttractionReviews;
