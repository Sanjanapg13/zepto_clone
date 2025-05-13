


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = ({ user, setUser }) => {
//   const [vendors, setVendors] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]); // New state for orders
//   const navigate = useNavigate();

//   // Fetch vendors, products, and orders on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user || !user.token) {
//         console.log('No user or token, redirecting to login');
//         navigate('/login');
//         return;
//       }

//       console.log('User in AdminDashboard:', user);

//       try {
//         // Fetch vendors
//         const vendorResponse = await axios.get('http://localhost:5000/api/vendors', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         console.log('Vendor API Response:', vendorResponse);
//         console.log('Vendor Data:', vendorResponse.data);
//         const fetchedVendors = vendorResponse.data.vendors || [];
//         console.log('Set vendors:', fetchedVendors);
//         setVendors(fetchedVendors);

//         // Fetch products
//         const productResponse = await axios.get('http://localhost:5000/api/products', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         console.log('Product API Response:', productResponse);
//         console.log('Product Data:', productResponse.data);
//         setProducts(productResponse.data.products || []);

//         // Fetch orders
//         const orderResponse = await axios.get('http://localhost:5000/api/orders', {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         console.log('Order API Response:', orderResponse);
//         console.log('Order Data:', orderResponse.data);
//         setOrders(orderResponse.data.orders || []);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         if (error.response) {
//           console.log('Error Response Status:', error.response.status);
//           console.log('Error Response Data:', error.response.data);
//         }
//         if (error.response?.status === 401) {
//           setUser(null);
//           navigate('/login');
//         } else {
//           alert('Failed to fetch data: ' + (error.response?.data?.message || error.message));
//         }
//       }
//     };
//     fetchData();
//   }, [user, setUser, navigate]);

//   // Function to get products listed by a specific vendor
//   const getVendorProducts = (vendorId) => {
//     return products.filter((product) => product.vendorId === vendorId.toString());
//   };

//   // Function to delete a vendor
//   const handleDeleteVendor = async (vendorId) => {
//     if (!window.confirm('Are you sure you want to delete this vendor and their products?')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/vendors/${vendorId}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
//       setProducts(products.filter((product) => product.vendorId !== vendorId.toString()));
//       alert('Vendor and their products deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting vendor:', error);
//       if (error.response?.status === 401) {
//         setUser(null);
//         navigate('/login');
//       } else {
//         alert('Failed to delete vendor: ' + (error.response?.data?.message || error.message));
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <h1 className="dashboard-title">Admin Dashboard</h1>

//       {/* Vendors Section */}
//       <h2 className="section-title">Manage Vendors</h2>
//       {vendors.length === 0 ? (
//         <p className="no-vendors-message">No vendors found.</p>
//       ) : (
//         <div className="vendors-table-container">
//           <table className="vendors-table">
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Contact Number</th>
//                 <th>Listed Products</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendors.map((vendor) => {
//                 const vendorProducts = getVendorProducts(vendor._id);
//                 return (
//                   <tr key={vendor._id}>
//                     <td>{vendor.firstName}</td>
//                     <td>{vendor.lastName}</td>
//                     <td>{vendor.email}</td>
//                     <td>{vendor.contactNumber}</td>
//                     <td>
//                       {vendorProducts.length > 0 ? (
//                         <ul className="product-list">
//                           {vendorProducts.map((product) => (
//                             <li key={product._id} className="product-item">
//                               {product.name} (₹{product.sellingPrice})
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         'No products listed'
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         className="delete-button"
//                         onClick={() => handleDeleteVendor(vendor._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Orders Section */}
//       <h2 className="section-title">Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p className="no-orders-message">No orders found.</p>
//       ) : (
//         <div className="orders-table-container">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>User ID</th>
//                 <th>Items</th>
//                 <th>Total Amount</th>
//                 <th>Status</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order._id}</td>
//                   <td>{order.userId}</td>
//                   <td>
//                     <ul className="order-items-list">
//                       {order.items.map((item, index) => (
//                         <li key={index} className="order-item">
//                           {item.productId?.name || 'Product N/A'} (Qty: {item.quantity})
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>₹{order.totalAmount}</td>
//                   <td>{order.status}</td>
//                   <td>{new Date(order.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <style>
//         {`
//           .admin-dashboard-container {
//             max-width: 1280px;
//             margin: 0 auto;
//             padding: 2rem;
//             background: #f8f9fa;
//             min-height: 100vh;
//           }

//           .dashboard-title {
//             font-size: 24px;
//             font-weight: 700;
//             color: #1A202C;
//             margin-bottom: 2rem;
//             text-align: center;
//             background: linear-gradient(90deg, #6B46C1, #D53F8C);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }

//           .section-title {
//             font-size: 20px;
//             font-weight: 600;
//             color: #1A202C;
//             margin-top: 3rem;
//             margin-bottom: 1.5rem;
//             text-align: left;
//             background: linear-gradient(90deg, #6B46C1, #D53F8C);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }

//           .no-vendors-message,
//           .no-orders-message {
//             text-align: center;
//             font-size: 18px;
//             color: #718096;
//             font-weight: 500;
//             margin-top: 2rem;
//           }

//           .vendors-table-container,
//           .orders-table-container {
//             background: #ffffff;
//             border-radius: 12px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             overflow-x: auto;
//             margin-bottom: 2rem;
//           }

//           .vendors-table,
//           .orders-table {
//             width: 100%;
//             border-collapse: collapse;
//           }

//           .vendors-table th,
//           .vendors-table td,
//           .orders-table th,
//           .orders-table td {
//             padding: 12px 16px;
//             text-align: left;
//             font-size: 14px;
//             color: #1A202C;
//           }

//           .vendors-table th,
//           .orders-table th {
//             background: linear-gradient(90deg, #6B46C1, #D53F8C);
//             color: #ffffff;
//             font-weight: 600;
//             text-transform: uppercase;
//           }

//           .vendors-table td,
//           .orders-table td {
//             border-bottom: 1px solid #E2E8F0;
//           }

//           .vendors-table tr:hover,
//           .orders-table tr:hover {
//             background: #f7e9f5;
//           }

//           .product-list,
//           .order-items-list {
//             list-style-type: disc;
//             padding-left: 20px;
//             margin: 0;
//           }

//           .product-item,
//           .order-item {
//             font-size: 13px;
//             color: #4A5568;
//             margin-bottom: 4px;
//           }

//           .delete-button {
//             padding: 6px 12px;
//             background: linear-gradient(90deg, #FF2E63, #D53F8C);
//             color: #ffffff;
//             font-size: 14px;
//             font-weight: 600;
//             border-radius: 8px;
//             transition: all 0.3s ease;
//             cursor: pointer;
//           }

//           .delete-button:hover {
//             background: linear-gradient(90deg, #E53E3E, #C53030);
//             transform: scale(1.05);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ user, setUser }) => {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState(null); // State to track active section
  const navigate = useNavigate();

  // Fetch vendors, products, and orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.token) {
        console.log('No user or token, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('User in AdminDashboard:', user);

      try {
        // Fetch vendors
        const vendorResponse = await axios.get('http://localhost:5000/api/vendors', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Vendor API Response:', vendorResponse);
        console.log('Vendor Data:', vendorResponse.data);
        const fetchedVendors = vendorResponse.data.vendors || [];
        console.log('Set vendors:', fetchedVendors);
        setVendors(fetchedVendors);

        // Fetch products
        const productResponse = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Product API Response:', productResponse);
        console.log('Product Data:', productResponse.data);
        setProducts(productResponse.data.products || []);

        // Fetch orders
        const orderResponse = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Order API Response:', orderResponse);
        console.log('Order Data:', orderResponse.data);
        setOrders(orderResponse.data.orders || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.log('Error Response Status:', error.response.status);
          console.log('Error Response Data:', error.response.data);
        }
        if (error.response?.status === 401) {
          setUser(null);
          navigate('/login');
        } else {
          alert('Failed to fetch data: ' + (error.response?.data?.message || error.message));
        }
      }
    };
    fetchData();
  }, [user, setUser, navigate]);

  // Function to get products listed by a specific vendor
  const getVendorProducts = (vendorId) => {
    return products.filter((product) => product.vendorId === vendorId.toString());
  };

  // Function to delete a vendor
  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm('Are you sure you want to delete this vendor and their products?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setProducts(products.filter((product) => product.vendorId !== vendorId.toString()));
      alert('Vendor and their products deleted successfully!');
    } catch (error) {
      console.error('Error deleting vendor:', error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/login');
      } else {
        alert('Failed to delete vendor: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Buttons Section */}
      <div className="dashboard-buttons">
        <button
          className={`toggle-button ${activeSection === 'manageVendors' ? 'active' : ''}`}
          onClick={() => setActiveSection(activeSection === 'manageVendors' ? null : 'manageVendors')}
        >
          Manage Vendors
        </button>
        <button
          className={`toggle-button ${activeSection === 'manageOrders' ? 'active' : ''}`}
          onClick={() => setActiveSection(activeSection === 'manageOrders' ? null : 'manageOrders')}
        >
          Manage Orders
        </button>
      </div>

      {/* Sections */}
      <div className="dashboard-content">
        {/* Manage Vendors Section */}
        {activeSection === 'manageVendors' && (
          <div className="section">
            <h2 className="section-title">Manage Vendors</h2>
            {vendors.length === 0 ? (
              <p className="no-vendors-message">No vendors found.</p>
            ) : (
              <div className="vendors-table-container">
                <table className="vendors-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Contact Number</th>
                      <th>Listed Products</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => {
                      const vendorProducts = getVendorProducts(vendor._id);
                      return (
                        <tr key={vendor._id}>
                          <td>{vendor.firstName}</td>
                          <td>{vendor.lastName}</td>
                          <td>{vendor.email}</td>
                          <td>{vendor.contactNumber}</td>
                          <td>
                            {vendorProducts.length > 0 ? (
                              <ul className="product-list">
                                {vendorProducts.map((product) => (
                                  <li key={product._id} className="product-item">
                                    {product.name} (₹{product.sellingPrice})
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              'No products listed'
                            )}
                          </td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteVendor(vendor._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Manage Orders Section */}
        {activeSection === 'manageOrders' && (
          <div className="section">
            <h2 className="section-title">Manage Orders</h2>
            {orders.length === 0 ? (
              <p className="no-orders-message">No orders found.</p>
            ) : (
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>User ID</th>
                      <th>Items</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.userId}</td>
                        <td>
                          <ul className="order-items-list">
                            {order.items.map((item, index) => (
                              <li key={index} className="order-item">
                                {item.productId?.name || 'Product N/A'} (Qty: {item.quantity})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>₹{order.totalAmount}</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <style>
        {`
          .admin-dashboard-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8f9fa;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .dashboard-title {
            font-size: 24px;
            font-weight: 700;
            color: #1A202C;
            margin-bottom: 2rem;
            text-align: center;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .dashboard-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
          }

          .toggle-button {
            padding: 10px 20px;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.1s;
            width: 250px;
            text-align: center;
          }

          .toggle-button:hover {
            background: linear-gradient(90deg, #553c9a, #b83280);
          }

          .toggle-button.active {
            background: linear-gradient(90deg, #4a327a, #9c2c6b);
            transform: scale(1.05);
          }

          .dashboard-content {
            width: 100%;
          }

          .section {
            width: 100%;
          }

          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1A202C;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            text-align: center;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .no-vendors-message,
          .no-orders-message {
            text-align: center;
            font-size: 18px;
            color: #718096;
            font-weight: 500;
            margin-top: 2rem;
          }

          .vendors-table-container,
          .orders-table-container {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow-x: auto;
            margin-bottom: 2rem;
          }

          .vendors-table,
          .orders-table {
            width: 100%;
            border-collapse: collapse;
          }

          .vendors-table th,
          .vendors-table td,
          .orders-table th,
          .orders-table td {
            padding: 12px 16px;
            text-align: left;
            font-size: 14px;
            color: #1A202C;
          }

          .vendors-table th,
          .orders-table th {
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            color: #ffffff;
            font-weight: 600;
            text-transform: uppercase;
          }

          .vendors-table td,
          .orders-table td {
            border-bottom: 1px solid #E2E8F0;
          }

          .vendors-table tr:hover,
          .orders-table tr:hover {
            background: #f7e9f5;
          }

          .product-list,
          .order-items-list {
            list-style-type: disc;
            padding-left: 20px;
            margin: 0;
          }

          .product-item,
          .order-item {
            font-size: 13px;
            color: #4A5568;
            margin-bottom: 4px;
          }

          .delete-button {
            padding: 6px 12px;
            background: linear-gradient(90deg, #FF2E63, #D53F8C);
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .delete-button:hover {
            background: linear-gradient(90deg, #E53E3E, #C53030);
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;