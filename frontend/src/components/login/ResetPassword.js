// // import React, { useState } from "react";

// // const ResetPassword = ({ token }) => {
// //   const [newPassword, setNewPassword] = useState("");
// //   const [confirmNewPassword, setConfirmNewPassword] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (newPassword !== confirmNewPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     // Submit new password along with token
// //     const payload = {
// //       token,
// //       newPassword,
// //     };

// //     console.log("Resetting password with:", payload);

// //     // You can replace this with an actual API call
// //     // e.g., axios.post('/auth/reset-password', payload)
// //   };

// //   return (
// //     <div className="container">
// //       <h2>Reset Password</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input type="hidden" name="token" value={token} />
// //         <div className="input-group">
// //           <label htmlFor="newPassword">New Password</label>
// //           <input
// //             type="password"
// //             id="newPassword"
// //             name="newPassword"
// //             placeholder="Enter your new password"
// //             required
// //             value={newPassword}
// //             onChange={(e) => setNewPassword(e.target.value)}
// //           />
// //         </div>
// //         <div className="input-group">
// //           <label htmlFor="confirmNewPassword">Confirm New Password</label>
// //           <input
// //             type="password"
// //             id="confirmNewPassword"
// //             name="confirmNewPassword"
// //             placeholder="Confirm your new password"
// //             required
// //             value={confirmNewPassword}
// //             onChange={(e) => setConfirmNewPassword(e.target.value)}
// //           />
// //         </div>
// //         <input type="submit" value="Reset Password" />
// //       </form>
// //     </div>
// //   );
// // };

// // export default ResetPassword;

// import React, { useState } from "react";
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [role, setRole] = useState('user');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmNewPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

   
//     const res = await fetch('http://localhost:5000/auth/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ newPassword, token, role }),
//   });

//     const data = await res.json();
//     if (data.success) {
//       alert(data.message);
//     } else {
//       alert(data.message || 'Password reset failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" name="token" value={token} />
//         <div className="input-group">
//           <label htmlFor="newPassword">New Password</label>
//           <input
//             type="password"
//             id="newPassword"
//             name="newPassword"
//             placeholder="Enter your new password"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="confirmNewPassword">Confirm New Password</label>
//           <input
//             type="password"
//             id="confirmNewPassword"
//             name="confirmNewPassword"
//             placeholder="Confirm your new password"
//             required
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             name="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             <option value="vendor">Vendor</option>
//           </select>
//         </div>
//         <input type="submit" value="Reset Password" />
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch('http://localhost:5000/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword, token, role }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.message || 'Password reset failed');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="token" value={token} />
        <div className="input-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm your new password"
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <input type="submit" value="Reset Password" />
      </form>
    </div>
  );
};

export default ResetPassword;