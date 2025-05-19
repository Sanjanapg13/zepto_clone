

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await fetch('http://43.204.188.173:5000/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    const data = await res.json();
    if (data.success) {
      // Redirect to reset password page with token, role, and email
      navigate(`/reset-password/${data.resetToken}`, { state: { role: data.role, email: data.email } });
    } else {
      alert(data.message || 'Failed to initiate password reset');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="form-container">
        <h2 className="form-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-input"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <input
            type="submit"
            value="Submit"
            className="form-button"
          />
        </form>
        <div className="form-footer">
          Remembered your password?{" "}
          <a href="/loginpage" className="form-link">
            Login here
          </a>
        </div>
      </div>
      <style jsx>{`
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
        }

        .form-input:focus {
          outline: none;
          border-color: #ff4d94;
          box-shadow: 0 0 10px rgba(255, 77, 148, 0.5);
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
        }

        .form-button:hover {
          background: #ff1e88;
          transform: scale(1.02);
        }

        .form-button:active {
          transform: scale(0.98);
        }

        .form-footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #ffe0f4;
        }

        .form-link {
          color: #fff;
          font-weight: 600;
          text-decoration: underline;
          transition: color 0.3s;
        }

        .form-link:hover {
          color: #ffe0f4;
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

export default ForgotPassword;
