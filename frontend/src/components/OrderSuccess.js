import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const clearCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token available');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:5000/api/cart/clear',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Cart cleared successfully:', response.data);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    };

    clearCart();
  }, []);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="order-success">
      <div className="success-container">
        <div className="checkmark-circle">
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle className="checkmark-circle-fill" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <button className="continue-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
      <style>
        {`
          .order-success {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            overflow: hidden;
          }

          .success-container {
            text-align: center;
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            animation: fadeIn 0.8s ease-out;
          }

          .checkmark-circle {
            width: 100px;
            height: 100px;
            margin: 0 auto 20px;
          }

          .checkmark {
            width: 100%;
            height: 100%;
          }

          .checkmark-circle-fill {
            stroke: #00cc44;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          }

          .checkmark-check {
            stroke: #00cc44;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
          }

          h1 {
            font-size: 28px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 16px;
            animation: slideIn 0.5s ease-out 0.3s forwards;
            opacity: 0;
          }

          p {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 24px;
            animation: slideIn 0.5s ease-out 0.5s forwards;
            opacity: 0;
          }

          .continue-button {
            padding: 12px 24px;
            background: #00cc44;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            animation: slideIn 0.5s ease-out 0.7s forwards;
            opacity: 0;
          }

          .continue-button:hover {
            background: #00b33c;
            transform: translateY(-2px);
          }

          .continue-button:active {
            transform: translateY(0);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes stroke {
            100% {
              stroke-dashoffset: 0;
            }
          }

          @media (max-width: 640px) {
            .success-container {
              padding: 24px;
            }

            h1 {
              font-size: 24px;
            }

            p {
              font-size: 14px;
            }

            .continue-button {
              font-size: 14px;
              padding: 10px 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default OrderSuccess;