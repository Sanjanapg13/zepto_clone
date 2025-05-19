

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [registrationId, setRegistrationId] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      contactNumber: form.contactNumber.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      role: form.role.value,
    };

    // Validate Contact Number: Must be 10 digits and start with 6, 7, 8, or 9
    const contactNumberPattern = /^[6-9]\d{9}$/;
    if (!contactNumberPattern.test(data.contactNumber)) {
      alert('Contact number must be 10 digits and start with 6, 7, 8, or 9');
      return;
    }

    // Validate Email: Must follow standard email pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      alert('Please enter a valid email address (e.g., user@domain.com)');
      return;
    }

    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const data1 = await res.json();
    console.log("Registration Data:", data1);

    if (data1?.success) {
      setRegistrationId(data1.registrationId);
      setShowOTP(true);
      // Display OTP as an alert
      alert(`Your OTP is: ${data1.otp}`);
    } else {
      alert(data1.message || 'Registration failed');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId, otp }),
    });

    const dataress = await res.json();
    if (dataress.success) {
      alert(dataress.message);
      navigate('/login');
    } else {
      alert(dataress.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #e9e3f7 0%, #f8f4f1 100%)' }}>
      <div className="form-container">
        <h2 className="form-title">{showOTP ? 'Verify OTP' : 'Register'}</h2>
        {!showOTP ? (
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber" className="form-label">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter your contact number"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                required
                className="form-input"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            <button
              type="submit"
              className="form-button"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter the OTP sent to your phone"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="form-button"
            >
              Verify OTP
            </button>
          </form>
        )}
        <div className="form-footer">
          Already have an account?{" "}
          <a href="/login" className="form-link">
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
    margin:auto;
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

export default Register;