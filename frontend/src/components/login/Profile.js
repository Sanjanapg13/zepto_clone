


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://43.204.188.173:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser({
            profile: {
              phone: data.user.contactNumber,
              name: `${data.user.firstName} ${data.user.lastName}`,
            },
            role: data.role,
          });
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <ProfileSidebar user={user} handleLogout={handleLogout} />
      <div className="main-content">
        <div className="no-orders">
          <div className="zepto-logo">Z</div>
          <span className="no-orders-text">No orders yet</span>
          <button
            className="browse-products-btn"
            onClick={() => navigate('/')}
          >
            Browse products
          </button>
        </div>
      </div>
      <style>
        {`
          .profile-container {
            display: flex;
            height: 100vh;
            background-color: #f5f6f8;
            font-family: 'Arial', sans-serif;
          }

          .main-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f5f6f8;
          }

          .no-orders {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .zepto-logo {
            width: 60px;
            height: 60px;
            background-color: #6B46C1;
            color: #fff;
            font-size: 36px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          }

          .no-orders-text {
            font-size: 18px;
            font-weight: 500;
            color: #333;
          }

          .browse-products-btn {
            background-color: transparent;
            color: #6B46C1;
            border: 1px solid #6B46C1;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
          }

          .browse-products-btn:hover {
            background-color: #6B46C1;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

export default Profile;
