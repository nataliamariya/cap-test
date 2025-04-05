import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api"; // adjust path if needed
import "./Products.css"; // Keep your styling if it's there

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-container">
      <h2>Shop</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {/* You can add image, buttons, etc. here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;