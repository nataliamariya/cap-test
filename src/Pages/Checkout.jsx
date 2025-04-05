import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process delivery details here
    console.log('Delivery details submitted:', deliveryDetails);
    alert('Delivery details submitted!');
    navigate('/home');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Checkout</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={deliveryDetails.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={deliveryDetails.address}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={deliveryDetails.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={deliveryDetails.phone}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', cursor: 'pointer', width: '100%' }}
        >
          Submit Delivery Details
        </button>
      </form>
    </div>
  );
};

export default Checkout;
