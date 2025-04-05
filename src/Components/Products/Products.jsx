import React from 'react';
import './Products.css';
import all_products from '../Assets/all_products'; // Adjust if needed
import Items from '../Items/Items';

const Products = ({ category }) => {
  let filteredProducts = all_products;

  if (category) {
    // Map the route category (plural) to the product category (singular)
    const mapping = {
      desktops: 'desktop',
      laptops: 'laptop',
      'pc components': 'pc component'
    };

    const targetCategory = mapping[category.toLowerCase()] || category.toLowerCase();
    filteredProducts = all_products.filter(
      (item) => item.category.toLowerCase() === targetCategory
    );
  }

  return (
    <div className="products">
      <h1>
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'LIST OF PRODUCTS'}
      </h1>
      <hr />
      <div className="product-items">
        {filteredProducts.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
