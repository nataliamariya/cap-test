import React, { useContext } from 'react';
import { CartContext } from '../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    if (item.quantity < 100) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = (item) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  // Calculate total price for all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #ccc',
                  padding: '10px 0',
                  width: '100%',
                  maxWidth: '600px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: 'auto',
                    marginRight: '20px',
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h2>{item.name}</h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <button
                      onClick={() => handleDecrease(item)}
                      style={{ padding: '5px 10px' }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        margin: '0 10px',
                        minWidth: '20px',
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item)}
                      style={{ padding: '5px 10px' }}
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button
            onClick={handleCheckout}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
