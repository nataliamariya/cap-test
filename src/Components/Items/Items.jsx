import React, { useContext } from 'react';
import './Items.css';
import { CartContext } from '../../Contexts/CartContext';

const Items = (props) => {
  const { cartItems, addItem, updateQuantity } = useContext(CartContext);
  const itemInCart = cartItems.find((i) => i.id === props.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAdd = () => {
    addItem({
      id: props.id,
      name: props.name,
      image: props.image,
      price: props.price,
    });
  };

  const handleIncrease = () => {
    if (quantity < 100) {
      updateQuantity(props.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    updateQuantity(props.id, quantity - 1);
  };

  return (
    <div className="item">
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
      <div className="item-prices">${props.price}</div>
      {quantity === 0 ? (
        <button className="add-to-cart" onClick={handleAdd}>
          Add to Cart
        </button>
      ) : (
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      )}
    </div>
  );
};

export default Items;
