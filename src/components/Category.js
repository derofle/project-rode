import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Consumer } from '../services/context';

const categoryDivStyle = css`
  cursor: pointer;
  box-shadow: 0 7px 9px -7px rgba(0, 0, 0, 1);
  margin: 10px;
  z-index: 10;
  &:hover {
    opacity: 0.7 !important;
  }
`;

class CategoryRender extends React.Component {
  render() {
    const { attractionsInfo } = this.context;
    const { attractionCategories } = attractionsInfo;
    const { category, height, margin } = this.props;
    return (
      <div>
        {category &&
          category.map(cat => {
            const categoryInfo =
              attractionCategories &&
              attractionCategories.find(obj => cat === obj.uid);
            return (
              <div
                className="category-icon"
                css={categoryDivStyle}
                style={{
                  backgroundColor: categoryInfo.color,
                  height,
                  margin,
                  marginRight: '6px',
                }}
                key={cat}
              >
                <Link to={`/categorie/${categoryInfo.slug}`}>
                  <img
                    src={categoryInfo.icon}
                    alt="category-icon"
                    style={{ width: height - 20 }}
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
