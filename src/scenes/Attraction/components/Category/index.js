import React from 'react';
import './style/style.css';

const Category = ({ categoryId }) => (
  <div
    className="category-icon"
    style={{
      position: 'absolute',
      height: '50px',
      zIndex: 10,
      bottom: '-10%',
      right: '5%',
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
