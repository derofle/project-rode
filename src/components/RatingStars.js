/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const ratingIcon = css`
  font-size: 18px;
  line-height: 1.6;
`;

const ratingContainer = css`
  font-size: 0;
  display: inline-block;
  position: relative;
  vertical-align: baseline;
  bottom: 2px;
  color: #222 !important;
`;

export const RatingStars = ({ rating }) => {
  if (rating === undefined) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 0) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 1) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star_half
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 2) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 3) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_half
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 4) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 5) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_half
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 6) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 7) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_half
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 8) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_border
        </i>
      </span>
    );
  }
  if (rating === 9) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star_half
        </i>
      </span>
    );
  }
  if (rating === 10) {
    return (
      <span css={ratingContainer}>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
        <i css={ratingIcon} className="material-icons">
          star
        </i>
      </span>
    );
  }
  return null;
};

export default RatingStars;
