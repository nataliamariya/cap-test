import React, { useEffect, useState, useContext } from 'react';
import './Products.css';
import { CartContext } from '../../Contexts/CartContext';
import { toast } from 'react-toastify';

const Products = ({ category }) => {
  const [filtered, setFiltered] = useState([]);
  const { addItem } = useContext(CartContext); // ✅ use your existing addItem

  useEffect(() => {
    fetch("https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/products")
      .then(res => res.json())
      .then(data => {
        const mapping = {
          desktops: "desktop",
          laptops: "laptop",
          "pc-components": "pc component"
        };

        const mappedCategory = category
          ? mapping[category.toLowerCase()] || category.toLowerCase()
          : null;

        if (mappedCategory) {
          const filteredItems = data.filter(
            (p) => p.category.toLowerCase() === mappedCategory
          );
          setFiltered(filteredItems);
        } else {
          setFiltered(data);
        }
      })
      .catch(err => console.error("Error loading products:", err));
  }, [category]);

  if (filtered.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="products-container">
      {filtered.map(({ id, name, image, price, category }) => (
        <div key={id} className="product-card">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>${price}</p>
          <p className="category">{category}</p>
          <button
            onClick={() => {
              addItem({ id, name, image, price, category });
              toast.success(`${name} added to cart!`);
            }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
