import React from 'react';
import Products from '../Components/Products/Products';

const Category = ({ category }) => {
  return (
    <div>
      <Products category={category} />
    </div>
  );
};

export default Category;
