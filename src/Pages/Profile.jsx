import React, { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [orders, setOrders] = useState([]);

  const userId = user?.userId || user?.attributes?.sub || user?.username;
  const email = user?.signInDetails?.loginId || user?.attributes?.email || 'Not available';
  const username = user?.username || 'Not available';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`https://ndruy9xx1a.execute-api.ca-central-1.amazonaws.com/devamp/orders?userId=${userId}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("❌ Failed to load orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="profile-page" style={{ padding: '2rem' }}>
      <h2>👤 Profile</h2>
      <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>User ID:</strong> {userId}</p>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h3>📦 Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.order.total?.toFixed(2) ?? 'N/A'}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} (x{item.quantity}) - ${item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Delivery to:</strong> {order.order.deliveryDetails?.address || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
