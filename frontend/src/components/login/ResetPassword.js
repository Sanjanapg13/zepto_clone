

import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { role, email } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!role || !email) {
      alert("Missing role or email. Please try the forgot password process again.");
      return;
    }

    const res = await fetch('http://43.204.188.173:5000/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword, token, role }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      navigate('/loginpage');
    } else {
      alert(data.message || 'Password reset failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email || ''}
              readOnly
              className="form-input bg-gray-100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={role || ''}
              readOnly
              className="form-input bg-gray-100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="form-button"
          />
        </form>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 1rem;
        }
        .form-container {
          background: linear-gradient(to right, #a100ff, #ff4d94);
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          margin: auto;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .form-group {
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 1rem;
          font-weight: 600;
          color: #fce4ff;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 2px solid #ffffff60;
          border-radius: 10px;
          font-size: 1rem;
          background: #fff;
          color: #333;
          transition: border-color 0.3s, box-shadow 0.3s;
          width: 100%;
        }

        .form-input:focus {
          outline: none;
          border-color: #ff4d94;
          box-shadow: 0 0 10px rgba(255, 77, 148, 0.5);
        }

        .form-input.bg-gray-100 {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }

        .form-button {
          background: #ff4d94;
          color: #fff;
          padding: 0.75rem;
          border: none;
          border-radius: 10px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          width: 100%;
        }

        .form-button:hover {
          background: #ff1e88;
          transform: scale(1.02);
        }

        .form-button:active {
          transform: scale(0.98);
        }

        @media (max-width: 640px) {
          .form-container {
            padding: 1.5rem;
            max-width: 90%;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-input {
            padding: 0.5rem;
            font-size: 0.95rem;
          }

          .form-button {
            padding: 0.6rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
