

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // If token exists, fetch user profile to verify
        const fetchProfile = async () => {
          try {
            const res = await fetch('http://localhost:5000/auth/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
              setUser({
                token,
                profile: {
                  phone: data.user.contactNumber,
                  name: `${data.user.firstName} ${data.user.lastName}`,
                },
                role: data.role,
                id: data.user.id,
              });
              // Navigate based on role
              if (data.role === 'vendor') {
                navigate('/vendor-dashboard', { replace: true });
              } else if (data.role === 'admin') {
                navigate('/admin-dashboard', { replace: true });
              } else {
                navigate('/', { replace: true });
              }
            } else {
              localStorage.removeItem('token');
            }
          } catch (err) {
            console.error('Profile Fetch Error:', err);
            localStorage.removeItem('token');
          }
        };
        fetchProfile();
      }
    }, [navigate, setUser]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                // Update app state with user info
                setUser({
                  token: data.token,
                  profile: {
                    name: data.user.name,
                    phone: data.user.contactNumber || '', // Fallback if not present
                  },
                  role: data.user.role,
                  id: data.user.id,
                });
                // Redirect based on role
                if (data.user.role === 'vendor') {
                    navigate('/vendor-dashboard', { replace: true });
                } else if (data.user.role === 'admin') {
                    navigate('/admin-dashboard', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                alert(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login Error:', err);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleLogin} className="form-content">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <button
                        type="submit"
                        className="form-button"
                    >
                        Login
                    </button>
                </form>
                <div className="form-footer">
                    <a href="/forgot-password" className="form-link">
                        Forgot Password?
                    </a>
                    <span className="divider">|</span>
                    <a href="/register" className="form-link">
                        Create an Account
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

export default LoginForm;