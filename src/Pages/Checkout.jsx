import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { CartContext } from '../Contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);
  const { cartItems } = useContext(CartContext);

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({
      ...deliveryDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧑 Authenticated user in checkout:", user);
    const userId = user?.userId || user?.username || null;
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    const orderPayload = {
      order: {
        deliveryDetails,
        items: cartItems
      }
    };

    try {
      const res = await fetch(`https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/orders?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      console.log("✅ Order submitted:", data);
      alert("Order submitted!");
      navigate('/home');
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("Order submission failed");
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Checkout</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
      >
        {["name", "address", "email", "phone"].map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              name={field}
              value={deliveryDetails[field]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', width: '100%' }}>
          Submit Delivery Details
        </button>
      </form>
    </div>
  );
};

export default Checkout;
