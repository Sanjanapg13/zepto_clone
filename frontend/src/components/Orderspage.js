import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token available. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          console.log('Fetched orders:', response.data.orders);
          setOrders(response.data.orders);
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="products-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="product-item">
                        <img
                          src={item.productId.imageUrl || 'https://via.placeholder.com/50'}
                          alt={item.productId.name}
                          className="product-image"
                        />
                        <div className="product-details">
                          <p className="product-quantity">Qty: {item.quantity}</p>
                          <p className="product-price">₹{item.productId.sellingPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>
        {`
          .orders-container {
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
            font-family: 'Arial', sans-serif;
          }

          h2 {
            font-size: 24px;
            color: #1a202c;
            margin-bottom: 20px;
          }

          .error-message {
            color: #e91e63;
            margin-bottom: 20px;
          }

          .orders-table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }

          .orders-table th,
          .orders-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }

          .orders-table th {
            background: #f7fafc;
            color: #4a5568;
            font-weight: 600;
          }

          .orders-table td {
            color: #2d3748;
            vertical-align: top;
          }

          .orders-table tr:hover {
            background: #f7fafc;
          }

          .products-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .product-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .product-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 4px;
          }

          .product-details {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .product-quantity,
          .product-price {
            font-size: 14px;
            color: #2d3748;
          }

          @media (max-width: 640px) {
            .orders-table th,
            .orders-table td {
              padding: 8px;
              font-size: 14px;
            }

            h2 {
              font-size: 20px;
            }

            .product-image {
              width: 40px;
              height: 40px;
            }

            .product-quantity,
            .product-price {
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Orders;