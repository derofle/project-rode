import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

const categoryDivStyle = css`
  cursor: pointer;
  box-shadow: 0 7px 9px -7px rgba(0, 0, 0, 1);
  margin: 10px;
  height: 56px;
  z-index: 10;
  &:hover {
    opacity: 0.7 !important;
  }
`;

const iconStyle = css`
  width: 36px !important;
`;

const findColor = category => {
  switch (category) {
    case 'roller-coaster':
      return 'crimson';
    case 'water-ride':
      return 'darkcyan';
    case 'dark-ride':
      return 'dimgray';
    case 'exhibition':
      return 'goldenrod';
    default:
      return '';
  }
};

const Category = ({ categoryIds }) => (
  <div>
    {categoryIds &&
      categoryIds.map(category => (
        <div
          className="category-icon"
          css={categoryDivStyle}
          style={{ backgroundColor: findColor(category) }}
          key={category}
        >
          <Link to={`/categorie/${category}`}>
            <img
              src={`/img/category-icons/${category}.svg`}
              alt="category-icon"
              css={iconStyle}
            />
          </Link>
        </div>
      ))}
  </div>
);

export default Category;
