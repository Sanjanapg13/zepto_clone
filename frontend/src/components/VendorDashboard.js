

// // import React, { useState, useEffect } from 'react';
// // import { backendCategories } from './Categories';

// // const VendorDashboard = ({ user }) => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     description: '',
// //     mrp: '',
// //     sellingPrice: '',
// //     category1: backendCategories[0].value,
// //     category2: '',
// //     category3: '',
// //     subcategory1: '',
// //     subcategory2: '',
// //     subcategory3: '',
// //     stock: '',
// //     imageUrl: '',
// //   });
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');
// //   const [vendorProducts, setVendorProducts] = useState([]);

// //   // Fetch vendor's products on component mount
// //   useEffect(() => {
// //     const fetchVendorProducts = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:5000/api/products?vendorId=${user.id}`, {
// //           headers: {
// //             'Authorization': `Bearer ${user.token}`,
// //           },
// //         });
// //         const data = await response.json();
// //         if (data.success) {
// //           setVendorProducts(data.products);
// //         } else {
// //           setError('Failed to fetch vendor products.');
// //         }
// //       } catch (err) {
// //         console.error('Fetch Vendor Products Error:', err);
// //         setError('An error occurred while fetching products.');
// //       }
// //     };

// //     fetchVendorProducts();
// //   }, [user.id, user.token]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage('');
// //     setError('');

// //     // Validate form data
// //     if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
// //       setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
// //       return;
// //     }

// //     if (!formData.category1) {
// //       setError('Please select at least one category.');
// //       return;
// //     }

// //     if (!formData.subcategory1) {
// //       setError('Please enter at least one subcategory.');
// //       return;
// //     }

// //     if (isNaN(formData.mrp) || formData.mrp <= 0) {
// //       setError('MRP must be a positive number.');
// //       return;
// //     }

// //     if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
// //       setError('Selling Price must be a positive number.');
// //       return;
// //     }

// //     if (isNaN(formData.stock) || formData.stock < 0) {
// //       setError('Stock must be a non-negative number.');
// //       return;
// //     }

// //     // Collect categories and remove duplicates
// //     const categories = [
// //       formData.category1,
// //       formData.category2,
// //       formData.category3,
// //     ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
// //     const uniqueCategories = [...new Set(categories)];
// //     if (uniqueCategories.length === 0) {
// //       setError('Please select at least one category.');
// //       return;
// //     }

// //     // Collect subcategories and remove duplicates
// //     const subcategories = [
// //       formData.subcategory1,
// //       formData.subcategory2,
// //       formData.subcategory3,
// //     ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

// //     const uniqueSubcategories = [...new Set(subcategories)];
// //     if (uniqueSubcategories.length === 0) {
// //       setError('Please enter at least one valid subcategory.');
// //       return;
// //     }

// //     // Calculate discount percentage
// //     const mrp = parseFloat(formData.mrp);
// //     const sellingPrice = parseFloat(formData.sellingPrice);
// //     const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

// //     const productData = {
// //       name: formData.name,
// //       description: formData.description,
// //       mrp: mrp,
// //       sellingPrice: sellingPrice,
// //       category: uniqueCategories,
// //       subcategory: uniqueSubcategories,
// //       stock: parseInt(formData.stock, 10),
// //       imageUrl: formData.imageUrl,
// //       vendorId: user.id,
// //       discountPercentage: parseFloat(discountPercentage.toFixed(2)),
// //     };

// //     console.log('Sending product data:', productData);

// //     try {
// //       const response = await fetch('http://localhost:5000/api/products', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${user.token}`,
// //         },
// //         body: JSON.stringify(productData),
// //       });

// //       const data = await response.json();
// //       console.log('Response from server:', data);

// //       if (data.success) {
// //         setMessage('Product added successfully!');
// //         setVendorProducts((prev) => [...prev, { ...productData, _id: data.productId }]);
// //         setFormData({
// //           name: '',
// //           description: '',
// //           mrp: '',
// //           sellingPrice: '',
// //           category1: backendCategories[0].value,
// //           category2: '',
// //           category3: '',
// //           subcategory1: '',
// //           subcategory2: '',
// //           subcategory3: '',
// //           stock: '',
// //           imageUrl: '',
// //         });
// //       } else {
// //         setError(data.message || 'Failed to add product.');
// //       }
// //     } catch (err) {
// //       console.error('Add Product Error:', err);
// //       setError('An error occurred. Please try again.');
// //     }
// //   };

// //   // Function to delete a product
// //   const handleDeleteProduct = async (productId) => {
// //     if (!window.confirm('Are you sure you want to delete this product?')) return;

// //     try {
// //       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${user.token}`,
// //         },
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setVendorProducts((prev) => prev.filter((product) => product._id !== productId));
// //         setMessage('Product deleted successfully!');
// //       } else {
// //         setError(data.message || 'Failed to delete product.');
// //       }
// //     } catch (err) {
// //       console.error('Delete Product Error:', err);
// //       setError('An error occurred while deleting the product.');
// //     }
// //   };

// //   return (
// //     <div className="vendor-dashboard">
// //       <h2>Add New Product</h2>
// //       <form onSubmit={handleSubmit} className="product-form">
// //         <div className="form-group">
// //           <label htmlFor="name">Product Name <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             placeholder="Enter product name"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="description">Description</label>
// //           <textarea
// //             id="description"
// //             name="description"
// //             value={formData.description}
// //             onChange={handleChange}
// //             placeholder="Enter product description"
// //             rows="3"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="mrp">MRP <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="mrp"
// //             name="mrp"
// //             value={formData.mrp}
// //             onChange={handleChange}
// //             placeholder="Enter MRP"
// //             step="0.01"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="sellingPrice"
// //             name="sellingPrice"
// //             value={formData.sellingPrice}
// //             onChange={handleChange}
// //             placeholder="Enter selling price"
// //             step="0.01"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="category1">Category 1 <span className="required">*</span></label>
// //           <select
// //             id="category1"
// //             name="category1"
// //             value={formData.category1}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="">Select a category</option>
// //             {backendCategories.map((cat) => (
// //               <option key={cat.value} value={cat.value}>
// //                 {cat.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="category2">Category 2</label>
// //           <select
// //             id="category2"
// //             name="category2"
// //             value={formData.category2}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select a category (optional)</option>
// //             {backendCategories.map((cat) => (
// //               <option key={cat.value} value={cat.value}>
// //                 {cat.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="category3">Category 3</label>
// //           <select
// //             id="category3"
// //             name="category3"
// //             value={formData.category3}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select a category (optional)</option>
// //             {backendCategories.map((cat) => (
// //               <option key={cat.value} value={cat.value}>
// //                 {cat.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="subcategory1"
// //             name="subcategory1"
// //             value={formData.subcategory1}
// //             onChange={handleChange}
// //             placeholder="Enter subcategory (e.g., Apples)"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="subcategory2">Subcategory 2</label>
// //           <input
// //             type="text"
// //             id="subcategory2"
// //             name="subcategory2"
// //             value={formData.subcategory2}
// //             onChange={handleChange}
// //             placeholder="Enter subcategory (optional, e.g., Oranges)"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="subcategory3">Subcategory 3</label>
// //           <input
// //             type="text"
// //             id="subcategory3"
// //             name="subcategory3"
// //             value={formData.subcategory3}
// //             onChange={handleChange}
// //             placeholder="Enter subcategory (optional, e.g., Green Apples)"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="stock">Stock <span className="required">*</span></label>
// //           <input
// //             type="number"
// //             id="stock"
// //             name="stock"
// //             value={formData.stock}
// //             onChange={handleChange}
// //             placeholder="Enter stock quantity"
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
// //           <input
// //             type="text"
// //             id="imageUrl"
// //             name="imageUrl"
// //             value={formData.imageUrl}
// //             onChange={handleChange}
// //             placeholder="Enter image URL"
// //             required
// //           />
// //         </div>
// //         {message && <p className="success-message">{message}</p>}
// //         {error && <p className="error-message">{error}</p>}
// //         <button type="submit" className="submit-button">
// //           Add Product
// //         </button>
// //       </form>

// //       {/* Vendor's Listed Products Section */}
// //       <div className="vendor-products">
// //         <h2>Your Listed Products</h2>
// //         {vendorProducts.length > 0 ? (
// //           <table className="products-table">
// //             <thead>
// //               <tr>
// //                 <th>Image</th>
// //                 <th>Name</th>
// //                 <th>Categories</th>
// //                 <th>Subcategories</th>
// //                 <th>MRP</th>
// //                 <th>Selling Price</th>
// //                 <th>Discount (%)</th>
// //                 <th>Stock</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {vendorProducts.map((product) => (
// //                 <tr key={product._id}>
// //                   <td>
// //                     <img src={product.imageUrl} alt={product.name} className="product-image" />
// //                   </td>
// //                   <td>{product.name}</td>
// //                   <td>{product.category.join(', ')}</td>
// //                   <td>{product.subcategory.join(', ')}</td>
// //                   <td>₹{product.mrp.toFixed(2)}</td>
// //                   <td>₹{product.sellingPrice.toFixed(2)}</td>
// //                   <td>{product.discountPercentage.toFixed(2)}%</td>
// //                   <td>{product.stock}</td>
// //                   <td>
// //                     <button
// //                       className="delete-button"
// //                       onClick={() => handleDeleteProduct(product._id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p className="no-products">No products listed yet.</p>
// //         )}
// //       </div>

// //       <style jsx>{`
// //         .vendor-dashboard {
// //           max-width: 1000px;
// //           margin: 40px auto;
// //           padding: 20px;
// //           background-color: #fff;
// //           border-radius: 8px;
// //           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// //         }

// //         h2 {
// //           text-align: center;
// //           margin-bottom: 20px;
// //           color: #333;
// //         }

// //         .product-form {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 15px;
// //           margin-bottom: 40px;
// //         }

// //         .form-group {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //         }

// //         label {
// //           font-weight: 500;
// //           color: #555;
// //         }

// //         .required {
// //           color: red;
// //         }

// //         input,
// //         textarea,
// //         select {
// //           padding: 8px;
// //           border: 1px solid #ddd;
// //           border-radius: 4px;
// //           font-size: 1rem;
// //           width: 100%;
// //           box-sizing: border-box;
// //         }

// //         textarea {
// //           resize: vertical;
// //         }

// //         .submit-button {
// //           padding: 10px;
// //           background-color: #6B46C1;
// //           color: white;
// //           border: none;
// //           border-radius: 4px;
// //           font-size: 1rem;
// //           cursor: pointer;
// //           transition: background-color 0.2s;
// //         }

// //         .submit-button:hover {
// //           background-color: #553c9a;
// //         }

// //         .success-message {
// //           color: green;
// //           text-align: center;
// //           margin: 10px 0;
// //         }

// //         .error-message {
// //           color: red;
// //           text-align: center;
// //           margin: 10px 0;
// //         }

// //         .vendor-products {
// //           margin-top: 40px;
// //         }

// //         .products-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           margin-top: 20px;
// //         }

// //         .products-table th,
// //         .products-table td {
// //           padding: 10px;
// //           border: 1px solid #ddd;
// //           text-align: left;
// //           font-size: 0.9rem;
// //         }

// //         .products-table th {
// //           background-color: #f5f5f5;
// //           font-weight: 600;
// //           color: #333;
// //         }

// //         .products-table td {
// //           color: #555;
// //         }

// //         .product-image {
// //           width: 50px;
// //           height: 50px;
// //           object-fit: cover;
// //           border-radius: 4px;
// //         }

// //         .no-products {
// //           text-align: center;
// //           color: #777;
// //           font-style: italic;
// //         }

// //         .delete-button {
// //           padding: 6px 12px;
// //           background-color: #dc3545;
// //           color: white;
// //           border: none;
// //           border-radius: 4px;
// //           font-size: 0.9rem;
// //           cursor: pointer;
// //           transition: background-color 0.2s;
// //         }

// //         .delete-button:hover {
// //           background-color: #c82333;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default VendorDashboard;

// import React, { useState, useEffect } from 'react';
// import { backendCategories } from './Categories';

// const VendorDashboard = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     mrp: '',
//     sellingPrice: '',
//     category1: backendCategories[0].value,
//     category2: '',
//     category3: '',
//     subcategory1: '',
//     subcategory2: '',
//     subcategory3: '',
//     stock: '',
//     imageUrl: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [vendorProducts, setVendorProducts] = useState([]);
//   const [vendorOrders, setVendorOrders] = useState([]);
//   const [ordersError, setOrdersError] = useState('');

//   // Fetch vendor's products on component mount
//   useEffect(() => {
//     const fetchVendorProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/products?vendorId=${user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//           },
//         });
//         const data = await response.json();
//         console.log('Vendor Products Response:', data);
//         if (data.success) {
//           setVendorProducts(data.products);
//         } else {
//           setError('Failed to fetch vendor products.');
//         }
//       } catch (err) {
//         console.error('Fetch Vendor Products Error:', err);
//         setError('An error occurred while fetching products.');
//       }
//     };

//     fetchVendorProducts();
//   }, [user.id, user.token]);

//   // Fetch orders for the vendor's products
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/orders/vendor', { // Updated to use /vendor route
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//           },
//         });
//         const data = await response.json();
//         console.log('Orders Response:', data);
//         if (response.ok && data.success) {
//           setVendorOrders(data.orders);
//           if (data.orders.length === 0) {
//             setOrdersError('No orders found containing your products.');
//           }
//         } else {
//           setOrdersError(data.message || 'Failed to fetch orders.');
//         }
//       } catch (err) {
//         console.error('Fetch Orders Error:', err);
//         setOrdersError('An error occurred while fetching orders.');
//       }
//     };

//     // Fetch orders only after vendor products are loaded
//     if (vendorProducts.length > 0) {
//       fetchOrders();
//     }
//   }, [vendorProducts, user.token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     // Validate form data
//     if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
//       setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
//       return;
//     }

//     if (!formData.category1) {
//       setError('Please select at least one category.');
//       return;
//     }

//     if (!formData.subcategory1) {
//       setError('Please enter at least one subcategory.');
//       return;
//     }

//     if (isNaN(formData.mrp) || formData.mrp <= 0) {
//       setError('MRP must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
//       setError('Selling Price must be a positive number.');
//       return;
//     }

//     if (isNaN(formData.stock) || formData.stock < 0) {
//       setError('Stock must be a non-negative number.');
//       return;
//     }

//     // Collect categories and remove duplicates
//     const categories = [
//       formData.category1,
//       formData.category2,
//       formData.category3,
//     ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
//     const uniqueCategories = [...new Set(categories)];
//     if (uniqueCategories.length === 0) {
//       setError('Please select at least one category.');
//       return;
//     }

//     // Collect subcategories and remove duplicates
//     const subcategories = [
//       formData.subcategory1,
//       formData.subcategory2,
//       formData.subcategory3,
//     ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

//     const uniqueSubcategories = [...new Set(subcategories)];
//     if (uniqueSubcategories.length === 0) {
//       setError('Please enter at least one valid subcategory.');
//       return;
//     }

//     // Calculate discount percentage
//     const mrp = parseFloat(formData.mrp);
//     const sellingPrice = parseFloat(formData.sellingPrice);
//     const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

//     const productData = {
//       name: formData.name,
//       description: formData.description,
//       mrp: mrp,
//       sellingPrice: sellingPrice,
//       category: uniqueCategories,
//       subcategory: uniqueSubcategories,
//       stock: parseInt(formData.stock, 10),
//       imageUrl: formData.imageUrl,
//       vendorId: user.id,
//       discountPercentage: parseFloat(discountPercentage.toFixed(2)),
//     };

//     console.log('Sending product data:', productData);

//     try {
//       const response = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();
//       console.log('Response from server:', data);

//       if (data.success) {
//         setMessage('Product added successfully!');
//         setVendorProducts((prev) => [...prev, { ...productData, _id: data.productId }]);
//         setFormData({
//           name: '',
//           description: '',
//           mrp: '',
//           sellingPrice: '',
//           category1: backendCategories[0].value,
//           category2: '',
//           category3: '',
//           subcategory1: '',
//           subcategory2: '',
//           subcategory3: '',
//           stock: '',
//           imageUrl: '',
//         });
//       } else {
//         setError(data.message || 'Failed to add product.');
//       }
//     } catch (err) {
//       console.error('Add Product Error:', err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   // Function to delete a product
//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setVendorProducts((prev) => prev.filter((product) => product._id !== productId));
//         setMessage('Product deleted successfully!');
//       } else {
//         setError(data.message || 'Failed to delete product.');
//       }
//     } catch (err) {
//       console.error('Delete Product Error:', err);
//       setError('An error occurred while deleting the product.');
//     }
//   };

//   return (
//     <div className="vendor-dashboard">
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit} className="product-form">
//         <div className="form-group">
//           <label htmlFor="name">Product Name <span className="required">*</span></label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter product name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter product description"
//             rows="3"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="mrp">MRP <span className="required">*</span></label>
//           <input
//             type="number"
//             id="mrp"
//             name="mrp"
//             value={formData.mrp}
//             onChange={handleChange}
//             placeholder="Enter MRP"
//             step="0.01"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
//           <input
//             type="number"
//             id="sellingPrice"
//             name="sellingPrice"
//             value={formData.sellingPrice}
//             onChange={handleChange}
//             placeholder="Enter selling price"
//             step="0.01"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="category1">Category 1 <span className="required">*</span></label>
//           <select
//             id="category1"
//             name="category1"
//             value={formData.category1}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select a category</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="category2">Category 2</label>
//           <select
//             id="category2"
//             name="category2"
//             value={formData.category2}
//             onChange={handleChange}
//           >
//             <option value="">Select a category (optional)</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="category3">Category 3</label>
//           <select
//             id="category3"
//             name="category3"
//             value={formData.category3}
//             onChange={handleChange}
//           >
//             <option value="">Select a category (optional)</option>
//             {backendCategories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
//           <input
//             type="text"
//             id="subcategory1"
//             name="subcategory1"
//             value={formData.subcategory1}
//             onChange={handleChange}
//             placeholder="Enter subcategory (e.g., Apples)"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory2">Subcategory 2</label>
//           <input
//             type="text"
//             id="subcategory2"
//             name="subcategory2"
//             value={formData.subcategory2}
//             onChange={handleChange}
//             placeholder="Enter subcategory (optional, e.g., Oranges)"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="subcategory3">Subcategory 3</label>
//           <input
//             type="text"
//             id="subcategory3"
//             name="subcategory3"
//             value={formData.subcategory3}
//             onChange={handleChange}
//             placeholder="Enter subcategory (optional, e.g., Green Apples)"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="stock">Stock <span className="required">*</span></label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             placeholder="Enter stock quantity"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
//           <input
//             type="text"
//             id="imageUrl"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             placeholder="Enter image URL"
//             required
//           />
//         </div>
//         {message && <p className="success-message">{message}</p>}
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="submit-button">
//           Add Product
//         </button>
//       </form>

//       {/* Vendor's Listed Products Section */}
//       <div className="vendor-products">
//         <h2>Your Listed Products</h2>
//         {vendorProducts.length > 0 ? (
//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Categories</th>
//                 <th>Subcategories</th>
//                 <th>MRP</th>
//                 <th>Selling Price</th>
//                 <th>Discount (%)</th>
//                 <th>Stock</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendorProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td>
//                     <img src={product.imageUrl} alt={product.name} className="product-image" />
//                   </td>
//                   <td>{product.name}</td>
//                   <td>{product.category.join(', ')}</td>
//                   <td>{product.subcategory.join(', ')}</td>
//                   <td>₹{product.mrp.toFixed(2)}</td>
//                   <td>₹{product.sellingPrice.toFixed(2)}</td>
//                   <td>{product.discountPercentage.toFixed(2)}%</td>
//                   <td>{product.stock}</td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteProduct(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="no-products">No products listed yet.</p>
//         )}
//       </div>

//       {/* Vendor's Orders Section */}
//       <div className="vendor-orders">
//         <h2>Orders for Your Products</h2>
//         {ordersError && <p className="error-message">{ordersError}</p>}
//         {vendorOrders.length > 0 ? (
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer ID</th>
//                 <th>Products (Your Items)</th>
//                 <th>Total Amount</th>
//                 <th>Status</th>
//                 <th>Order Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendorOrders.map((order) => {
//                 // Filter items in the order to only include this vendor's products
//                 const vendorItems = order.items.filter(item =>
//                   vendorProducts.some(product => product._id.toString() === item.productId._id.toString())
//                 );
//                 return (
//                   <tr key={order._id}>
//                     <td>{order._id}</td>
//                     <td>{order.userId}</td>
//                     <td>
//                       {vendorItems.map((item, index) => (
//                         <div key={index}>
//                           {item.productId.name} (Qty: {item.quantity})
//                         </div>
//                       ))}
//                     </td>
//                     <td>₹{order.totalAmount.toFixed(2)}</td>
//                     <td>{order.status}</td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           !ordersError && <p className="no-orders">No orders found for your products.</p>
//         )}
//       </div>

//       <style jsx>{`
//         .vendor-dashboard {
//           max-width: 1000px;
//           margin: 40px auto;
//           padding: 20px;
//           background-color: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }

//         h2 {
//           text-align: center;
//           margin-bottom: 20px;
//           color: #333;
//         }

//         .product-form {
//           display: flex;
//           flex-direction: column;
//           gap: 15px;
//           margin-bottom: 40px;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 5px;
//         }

//         label {
//           font-weight: 500;
//           color: #555;
//         }

//         .required {
//           color: red;
//         }

//         input,
//         textarea,
//         select {
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 1rem;
//           width: 100%;
//           box-sizing: border-box;
//         }

//         textarea {
//           resize: vertical;
//         }

//         .submit-button {
//           padding: 10px;
//           background-color: #6B46C1;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .submit-button:hover {
//           background-color: #553c9a;
//         }

//         .success-message {
//           color: green;
//           text-align: center;
//           margin: 10px 0;
//         }

//         .error-message {
//           color: red;
//           text-align: center;
//           margin: 10px 0;
//         }

//         .vendor-products {
//           margin-top: 40px;
//         }

//         .products-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }

//         .products-table th,
//         .products-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           text-align: left;
//           font-size: 0.9rem;
//         }

//         .products-table th {
//           background-color: #f5f5f5;
//           font-weight: 600;
//           color: #333;
//         }

//         .products-table td {
//           color: #555;
//         }

//         .product-image {
//           width: 50px;
//           height: 50px;
//           object-fit: cover;
//           border-radius: 4px;
//         }

//         .no-products {
//           text-align: center;
//           color: #777;
//           font-style: italic;
//         }

//         .delete-button {
//           padding: 6px 12px;
//           background-color: #dc3545;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           font-size: 0.9rem;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .delete-button:hover {
//           background-color: #c82333;
//         }

//         /* Styles for Vendor Orders Section */
//         .vendor-orders {
//           margin-top: 40px;
//         }

//         .orders-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-top: 20px;
//         }

//         .orders-table th,
//         .orders-table td {
//           padding: 10px;
//           border: 1px solid #ddd;
//           text-align: left;
//           font-size: 0.9rem;
//         }

//         .orders-table th {
//           background-color: #f5f5f5;
//           font-weight: 600;
//           color: #333;
//         }

//         .orders-table td {
//           color: #555;
//         }

//         .no-orders {
//           text-align: center;
//           color: #777;
//           font-style: italic;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VendorDashboard;

import React, { useState, useEffect } from 'react';
import { backendCategories } from './Categories';

const VendorDashboard = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    category1: backendCategories[0].value,
    category2: '',
    category3: '',
    subcategory1: '',
    subcategory2: '',
    subcategory3: '',
    stock: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);
  const [ordersError, setOrdersError] = useState('');
  const [activeSection, setActiveSection] = useState(null); // State to track active section

  // Fetch vendor's products on component mount
  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?vendorId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        console.log('Vendor Products Response:', data);
        if (data.success) {
          setVendorProducts(data.products);
        } else {
          setError('Failed to fetch vendor products.');
        }
      } catch (err) {
        console.error('Fetch Vendor Products Error:', err);
        setError('An error occurred while fetching products.');
      }
    };

    fetchVendorProducts();
  }, [user.id, user.token]);

  // Fetch orders for the vendor's products
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/vendor', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        console.log('Orders Response:', data);
        if (response.ok && data.success) {
          setVendorOrders(data.orders);
          if (data.orders.length === 0) {
            setOrdersError('No orders found containing your products.');
          }
        } else {
          setOrdersError(data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Fetch Orders Error:', err);
        setOrdersError('An error occurred while fetching orders.');
      }
    };

    if (vendorProducts.length > 0) {
      fetchOrders();
    }
  }, [vendorProducts, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.name || !formData.mrp || !formData.sellingPrice || !formData.stock || !formData.imageUrl) {
      setError('Please fill in all required fields (Name, MRP, Selling Price, Stock, Image URL).');
      return;
    }

    if (!formData.category1) {
      setError('Please select at least one category.');
      return;
    }

    if (!formData.subcategory1) {
      setError('Please enter at least one subcategory.');
      return;
    }

    if (isNaN(formData.mrp) || formData.mrp <= 0) {
      setError('MRP must be a positive number.');
      return;
    }

    if (isNaN(formData.sellingPrice) || formData.sellingPrice <= 0) {
      setError('Selling Price must be a positive number.');
      return;
    }

    if (isNaN(formData.stock) || formData.stock < 0) {
      setError('Stock must be a non-negative number.');
      return;
    }

    const categories = [
      formData.category1,
      formData.category2,
      formData.category3,
    ].filter((cat) => cat && cat !== '').map((cat) => cat.trim());
    
    const uniqueCategories = [...new Set(categories)];
    if (uniqueCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    const subcategories = [
      formData.subcategory1,
      formData.subcategory2,
      formData.subcategory3,
    ].filter((subcat) => subcat && subcat !== '').map((subcat) => subcat.trim());

    const uniqueSubcategories = [...new Set(subcategories)];
    if (uniqueSubcategories.length === 0) {
      setError('Please enter at least one valid subcategory.');
      return;
    }

    const mrp = parseFloat(formData.mrp);
    const sellingPrice = parseFloat(formData.sellingPrice);
    const discountPercentage = mrp > sellingPrice ? ((mrp - sellingPrice) / mrp) * 100 : 0;

    const productData = {
      name: formData.name,
      description: formData.description,
      mrp: mrp,
      sellingPrice: sellingPrice,
      category: uniqueCategories,
      subcategory: uniqueSubcategories,
      stock: parseInt(formData.stock, 10),
      imageUrl: formData.imageUrl,
      vendorId: user.id,
      discountPercentage: parseFloat(discountPercentage.toFixed(2)),
    };

    console.log('Sending product data:', productData);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.success) {
        setMessage('Product added successfully!');
        setVendorProducts((prev) => [...prev, { ...productData, _id: data.productId }]);
        setFormData({
          name: '',
          description: '',
          mrp: '',
          sellingPrice: '',
          category1: backendCategories[0].value,
          category2: '',
          category3: '',
          subcategory1: '',
          subcategory2: '',
          subcategory3: '',
          stock: '',
          imageUrl: '',
        });
      } else {
        setError(data.message || 'Failed to add product.');
      }
    } catch (err) {
      console.error('Add Product Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setVendorProducts((prev) => prev.filter((product) => product._id !== productId));
        setMessage('Product deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete product.');
      }
    } catch (err) {
      console.error('Delete Product Error:', err);
      setError('An error occurred while deleting the product.');
    }
  };

  return (
    <div className="vendor-dashboard">
      {/* Buttons Section */}
      <div className="dashboard-buttons">
        <button
          className={`toggle-button ${activeSection === 'addProduct' ? 'active' : ''}`}
          onClick={() => setActiveSection(activeSection === 'addProduct' ? null : 'addProduct')}
        >
          Add Product
        </button>
        <button
          className={`toggle-button ${activeSection === 'listedProducts' ? 'active' : ''}`}
          onClick={() => setActiveSection(activeSection === 'listedProducts' ? null : 'listedProducts')}
        >
          Your Listed Products
        </button>
        <button
          className={`toggle-button ${activeSection === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveSection(activeSection === 'orders' ? null : 'orders')}
        >
          Orders for Your Products
        </button>
      </div>

      {/* Sections */}
      <div className="dashboard-content">
        {/* Add New Product Section */}
        {activeSection === 'addProduct' && (
          <div className="section">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mrp">MRP <span className="required">*</span></label>
                <input
                  type="number"
                  id="mrp"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  placeholder желания="Enter MRP"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sellingPrice">Selling Price <span className="required">*</span></label>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  placeholder="Enter selling price"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category1">Category 1 <span className="required">*</span></label>
                <select
                  id="category1"
                  name="category1"
                  value={formData.category1}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {backendCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category2">Category 2</label>
                <select
                  id="category2"
                  name="category2"
                  value={formData.category2}
                  onChange={handleChange}
                >
                  <option value="">Select a category (optional)</option>
                  {backendCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category3">Category 3</label>
                <select
                  id="category3"
                  name="category3"
                  value={formData.category3}
                  onChange={handleChange}
                >
                  <option value="">Select a category (optional)</option>
                  {backendCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subcategory1">Subcategory 1 <span className="required">*</span></label>
                <input
                  type="text"
                  id="subcategory1"
                  name="subcategory1"
                  value={formData.subcategory1}
                  onChange={handleChange}
                  placeholder="Enter subcategory (e.g., Apples)"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subcategory2">Subcategory 2</label>
                <input
                  type="text"
                  id="subcategory2"
                  name="subcategory2"
                  value={formData.subcategory2}
                  onChange={handleChange}
                  placeholder="Enter subcategory (optional, e.g., Oranges)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subcategory3">Subcategory 3</label>
                <input
                  type="text"
                  id="subcategory3"
                  name="subcategory3"
                  value={formData.subcategory3}
                  onChange={handleChange}
                  placeholder="Enter subcategory (optional, e.g., Green Apples)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock <span className="required">*</span></label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL <span className="required">*</span></label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Your Listed Products Section */}
        {activeSection === 'listedProducts' && (
          <div className="section vendor-products">
            <h2>Your Listed Products</h2>
            {vendorProducts.length > 0 ? (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Categories</th>
                    <th>Subcategories</th>
                    <th>MRP</th>
                    <th>Selling Price</th>
                    <th>Discount (%)</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category.join(', ')}</td>
                      <td>{product.subcategory.join(', ')}</td>
                      <td>₹{product.mrp.toFixed(2)}</td>
                      <td>₹{product.sellingPrice.toFixed(2)}</td>
                      <td>{product.discountPercentage.toFixed(2)}%</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-products">No products listed yet.</p>
            )}
          </div>
        )}

        {/* Orders for Your Products Section */}
        {activeSection === 'orders' && (
          <div className="section vendor-orders">
            <h2>Orders for Your Products</h2>
            {ordersError && <p className="error-message">{ordersError}</p>}
            {vendorOrders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer ID</th>
                    <th>Products (Your Items)</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorOrders.map((order) => {
                    const vendorItems = order.items.filter(item =>
                      vendorProducts.some(product => product._id.toString() === item.productId._id.toString())
                    );
                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.userId}</td>
                        <td>
                          {vendorItems.map((item, index) => (
                            <div key={index}>
                              {item.productId.name} (Qty: {item.quantity})
                            </div>
                          ))}
                        </td>
                        <td>₹{order.totalAmount.toFixed(2)}</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              !ordersError && <p className="no-orders">No orders found for your products.</p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .vendor-dashboard {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
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
          background-color: #6B46C1;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          width: 250px; /* Fixed width for uniformity */
          text-align: center;
        }

        .toggle-button:hover {
          background-color: #553c9a;
        }

        .toggle-button.active {
          background-color: #4a327a;
          transform: scale(1.05);
        }

        .dashboard-content {
          width: 100%;
        }

        .section {
          width: 100%;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 40px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        label {
          font-weight: 500;
          color: #555;
        }

        .required {
          color: red;
        }

        input,
        textarea,
        select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
        }

        textarea {
          resize: vertical;
        }

        .submit-button {
          padding: 10px;
          background-color: #6B46C1;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #553c9a;
        }

        .success-message {
          color: green;
          text-align: center;
          margin: 10px 0;
        }

        .error-message {
          color: red;
          text-align: center;
          margin: 10px 0;
        }

        .vendor-products {
          margin-top: 20px;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .products-table th,
        .products-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
          font-size: 0.9rem;
        }

        .products-table th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }

        .products-table td {
          color: #555;
        }

        .product-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
        }

        .no-products {
          text-align: center;
          color: #777;
          font-style: italic;
        }

        .delete-button {
          padding: 6px 12px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .vendor-orders {
          margin-top: 20px;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .orders-table th,
        .orders-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
          font-size: 0.9rem;
        }

        .orders-table th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }

        .orders-table td {
          color: #555;
        }

        .no-orders {
          text-align: center;
          color: #777;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;