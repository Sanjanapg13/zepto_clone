// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function ProfileSidebar({ user, handleLogout, onClose, showHeader = true }) {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (onClose) onClose(); // Close dropdown if used in Navbar
//   };

//   return (
//     <div className="profile-sidebar">
//       {showHeader && (
//         <div className="header">
//           <div className="back-arrow" onClick={onClose}>←</div>
//           <h2
//             className="settings-title"
//             onClick={() => handleNavigation('/settings')}
//             style={{ cursor: 'pointer' }}
//           >
//             Settings
//           </h2>
//         </div>
//       )}
//       <div className="user-info">
//         <div className="user-icon">
//           <i className="bi bi-person-fill" style={{ color: '#fff', fontSize: '20px' }}></i>
//         </div>
//         <div className="user-details">
//           <span className="user-name">{user.profile.name || 'N/A'}</span>
//           <span className="user-phone">{user.profile.phone}</span>
//         </div>
//       </div>
//       <div className="zepto-cash-section">
//         <div className="section-title">
//           <i className="bi bi-credit-card-fill" style={{ color: '#6B46C1', marginRight: '5px', fontSize: '14px' }}></i>
//           Zepto Cash & Gift Card
//         </div>
//         <div className="balance-row">
//           <span className="balance-label">Available Balance: ₹0</span>
//           <button className="add-balance-btn">Add Balance</button>
//         </div>
//       </div>
//       <div className="free-cash-section">
//         <span className="section-title">FREE CASH <i className="bi bi-info-circle-fill" style={{ fontSize: '12px' }}></i></span>
//         <span className="free-cash-amount">₹50</span>
//       </div>
//       <div className="nav-items">
//         <div className="nav-item" onClick={() => handleNavigation('/orders')}>
//           <span className="nav-icon"><i className="bi bi-bag-fill"></i></span>
//           <span className="nav-text">Orders</span>
//         </div>
//         <div className="nav-item" onClick={() => handleNavigation('/support')}>
//           <span className="nav-icon"><i className="bi bi-chat-fill"></i></span>
//           <span className="nav-text">Customer Support</span>
//         </div>
//         <div className="nav-item" onClick={() => handleNavigation('/referrals')}>
//           <span className="nav-icon"><i className="bi bi-heart-fill"></i></span>
//           <span className="nav-text">Manage Referrals</span>
//         </div>
//         <div className="nav-item" onClick={() => handleNavigation('/addresses')}>
//           <span className="nav-icon"><i className="bi bi-geo-alt-fill"></i></span>
//           <span className="nav-text">Addresses</span>
//         </div>
//         <div className="nav-item" onClick={() => handleNavigation('/profile')}>
//           <span className="nav-icon"><i className="bi bi-person-fill"></i></span>
//           <span className="nav-text">Profile</span>
//         </div>
//         <div
//           className="nav-item logout"
//           onClick={() => {
//             handleLogout();
//             if (onClose) onClose();
//           }}
//         >
//           <span className="nav-text">Log Out</span>
//         </div>
//       </div>
//       <style>
//         {`
//           .profile-sidebar {
//             width: 280px;
//             background-color: #fff;
//             padding: 15px;
//             display: flex;
//             flex-direction: column;
//             gap: 15px;
//             font-family: 'Arial', sans-serif;
//           }

//           .header {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             margin-bottom: 10px;
//           }

//           .back-arrow {
//             font-size: 20px;
//             color: #333;
//             cursor: pointer;
//           }

//           .settings-title {
//             font-size: 18px;
//             font-weight: 600;
//             background: linear-gradient(90deg, #6B46C1, #D53F8C);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }

//           .user-info {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             margin-bottom: 15px;
//           }

//           .user-icon {
//             width: 40px;
//             height: 40px;
//             background-color: #6B46C1;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .user-details {
//             display: flex;
//             flex-direction: column;
//           }

//           .user-name {
//             font-size: 16px;
//             font-weight: 700;
//             color: #000;
//           }

//           .user-phone {
//             font-size: 12px;
//             color: #666;
//           }

//           .zepto-cash-section {
//             border-bottom: 1px solid #e0e0e0;
//             padding-bottom: 10px;
//             margin-bottom: 10px;
//           }

//           .section-title {
//             font-size: 14px;
//             font-weight: 600;
//             color: #333;
//             display: flex;
//             align-items: center;
//           }

//           .balance-row {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-top: 5px;
//           }

//           .balance-label {
//             font-size: 12px;
//             color: #666;
//           }

//           .add-balance-btn {
//             background-color: #000;
//             color: #fff;
//             border: none;
//             border-radius: 15px;
//             padding: 5px 15px;
//             font-size: 12px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: background-color 0.3s;
//           }

//           .add-balance-btn:hover {
//             background-color: #333;
//           }

//           .free-cash-section {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             background-color: #f5e9ff;
//             padding: 8px 12px;
//             border-radius: 8px;
//             margin-bottom: 15px;
//           }

//           .free-cash-amount {
//             font-size: 16px;
//             font-weight: 700;
//             color: #6B46C1;
//           }

//           .nav-items {
//             display: flex;
//             flex-direction: column;
//             gap: 5px;
//           }

//           .nav-item {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             cursor: pointer;
//             padding: 8px 10px;
//             border-radius: 5px;
//             transition: background-color 0.3s;
//           }

//           .nav-item:hover {
//             background-color: #f5f6f8;
//           }

//           .nav-icon {
//             font-size: 16px;
//             color: #000;
//           }

//           .nav-text {
//             font-size: 14px;
//             font-weight: 500;
//             color: #000;
//           }

//           .logout .nav-text {
//             font-weight: 700;
//             color: #000;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default ProfileSidebar;


import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSidebar({ user, handleLogout, onClose, showHeader = true }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close dropdown if used in Navbar
  };

  return (
    <div className="profile-sidebar">
      {showHeader && (
        <div className="header">
          <div className="back-arrow" onClick={onClose}>←</div>
          <h2
            className="settings-title"
            onClick={() => handleNavigation('/settings')}
            style={{ cursor: 'pointer' }}
          >
            Settings
          </h2>
        </div>
      )}
      <div className="user-info">
        <div className="user-icon">
          <i className="bi bi-person-fill" style={{ color: '#fff', fontSize: '20px' }}></i>
        </div>
        <div className="user-details">
          <span className="user-name">{user.profile.name || 'N/A'}</span>
          <span className="user-phone">{user.profile.phone}</span>
        </div>
      </div>
      <div className="zepto-cash-section">
        <div className="section-title">
          <i className="bi bi-credit-card-fill" style={{ color: '#6B46C1', marginRight: '5px', fontSize: '14px' }}></i>
          Zepto Cash & Gift Card
        </div>
        <div className="balance-row">
          <span className="balance-label">Available Balance: ₹0</span>
          <button className="add-balance-btn">Add Balance</button>
        </div>
      </div>
      <div className="free-cash-section">
        <span className="section-title">FREE CASH <i className="bi bi-info-circle-fill" style={{ fontSize: '12px' }}></i></span>
        <span className="free-cash-amount">₹50</span>
      </div>
      <div className="nav-items">
        <div className="nav-item" onClick={() => handleNavigation('/orders')}>
          <span className="nav-icon"><i className="bi bi-bag-fill"></i></span>
          <span className="nav-text">Orders</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigation('/support')}>
          <span className="nav-icon"><i className="bi bi-chat-fill"></i></span>
          <span className="nav-text">Customer Support</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigation('/referrals')}>
          <span className="nav-icon"><i className="bi bi-heart-fill"></i></span>
          <span className="nav-text">Manage Referrals</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigation('/addresses')}>
          <span className="nav-icon"><i className="bi bi-geo-alt-fill"></i></span>
          <span className="nav-text">Addresses</span>
        </div>
        <div className="nav-item" onClick={() => handleNavigation('/profile')}>
          <span className="nav-icon"><i className="bi bi-person-fill"></i></span>
          <span className="nav-text">Profile</span>
        </div>
        <div
          className="nav-item logout"
          onClick={() => {
            handleLogout();
            if (onClose) onClose();
          }}
        >
          <span className="nav-text">Log Out</span>
        </div>
      </div>
      <style>
        {`
          .profile-sidebar {
            width: 280px;
            background-color: #fff;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            font-family: 'Arial', sans-serif;
          }

          .header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          .back-arrow {
            font-size: 20px;
            color: #333;
            cursor: pointer;
          }

          .settings-title {
            font-size: 18px;
            font-weight: 600;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
          }

          .user-icon {
            width: 40px;
            height: 40px;
            background-color: #6B46C1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .user-details {
            display: flex;
            flex-direction: column;
          }

          .user-name {
            font-size: 16px;
            font-weight: 700;
            color: #000;
          }

          .user-phone {
            font-size: 12px;
            color: #666;
          }

          .zepto-cash-section {
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          .section-title {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            display: flex;
            align-items: center;
          }

          .balance-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
          }

          .balance-label {
            font-size: 12px;
            color: #666;
          }

          .add-balance-btn {
            background-color: #000;
            color: #fff;
            border: none;
            border-radius: 15px;
            padding: 5px 15px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .add-balance-btn:hover {
            background-color: #333;
          }

          .free-cash-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5e9ff;
            padding: 8px 12px;
            border-radius: 8px;
            margin-bottom: 15px;
          }

          .free-cash-amount {
            font-size: 16px;
            font-weight: 700;
            color: #6B46C1;
          }

          .nav-items {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 8px 10px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .nav-item:hover {
            background-color: #f5f6f8;
          }

          .nav-icon {
            font-size: 16px;
            color: #000;
          }

          .nav-text {
            font-size: 14px;
            font-weight: 500;
            color: #000;
          }

          .logout .nav-text {
            font-weight: 700;
            color: #000;
          }
        `}
      </style>
    </div>
  );
}

export default ProfileSidebar;