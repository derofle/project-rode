import React from 'react';
import './style/style.css';

const Category = ({ categoryId }) => (
  <div
    className="category-icon z-depth-2"
    style={{
      position: 'absolute',
      height: '50px',
      zIndex: 10,
      bottom: '0%',
      right: '10%',
    }}
  >
    <img
      src={`/img/category-icons/${categoryId}.svg`}
      alt="coaster-category"
      className="category-img"
    />
  </div>
);

export default Category;
