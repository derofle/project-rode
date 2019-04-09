import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Consumer } from '../services/context';

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

class CategoryRender extends React.Component {
  findColor = category => {
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

  render() {
    const { attractionsInfo } = this.context;
    const { attractionCategories } = attractionsInfo;
    const { categoryIds } = this.props;
    return (
      <div>
        {categoryIds &&
          categoryIds.map(category => {
            const categoryInfo =
              attractionCategories &&
              attractionCategories.find(cat => category === cat.id);
            return (
              <div
                className="category-icon"
                css={categoryDivStyle}
                style={{ backgroundColor: this.findColor(category) }}
                key={category}
              >
                <Link to={`/categorie/${categoryInfo.slug}`}>
                  <img
                    src={`/img/category-icons/${category}.svg`}
                    alt="category-icon"
                    css={iconStyle}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

CategoryRender.contextType = Consumer;
const Category = props => (
  <Consumer>{() => <CategoryRender {...props} />}</Consumer>
);

export default Category;
