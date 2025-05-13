// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function AddressDialog({ open, onClose, onAddressSaved, token }) {
// //   const [address, setAddress] = useState({
// //     street: '',
// //     city: '',
// //     state: '',
// //     pinCode: '',
// //   });
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     setAddress({ ...address, [e.target.name]: e.target.value });
// //     setError('');
// //   };

// //   const handleSubmit = async () => {
// //     // Validate street (must contain letters and numbers)
// //     const hasLetters = /[a-zA-Z]/.test(address.street);
// //     const hasNumbers = /\d/.test(address.street);
// //     if (!hasLetters || !hasNumbers) {
// //       setError('Street address must contain both letters and numbers');
// //       return;
// //     }

// //     // Validate pin code (must be 6 digits)
// //     if (!/^\d{6}$/.test(address.pinCode)) {
// //       setError('Pin code must be exactly 6 digits');
// //       return;
// //     }

// //     // Check if token exists
// //     if (!token) {
// //       setError('Authentication token missing. Please log in again.');
// //       return;
// //     }

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/address', address, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.data.success) {
// //         onAddressSaved(res.data.address, res.data.userName);
// //         onClose();
// //       } else {
// //         setError(res.data.message);
// //       }
// //     } catch (err) {
// //       console.error('Error saving address:', err.response?.data || err.message);
// //       setError('Error saving address: ' + (err.response?.data?.message || 'Server error'));
// //     }
// //   };

// //   if (!open) return null;

// //   return (
// //     <div className="address-dialog-overlay">
// //       <div className="address-dialog">
// //         <h2>Enter Your Address</h2>
// //         {error && <p className="error">{error}</p>}
// //         <input
// //           type="text"
// //           name="street"
// //           placeholder="Street Address (e.g., 123 Main St)"
// //           value={address.street}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="city"
// //           placeholder="City"
// //           value={address.city}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="state"
// //           placeholder="State"
// //           value={address.state}
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="pinCode"
// //           placeholder="Pin Code (6 digits)"
// //           value={address.pinCode}
// //           onChange={handleChange}
// //           required
// //         />
// //         <div className="dialog-buttons">
// //           <button onClick={onClose} className="cancel-btn">Cancel</button>
// //           <button onClick={handleSubmit} className="save-btn">Save Address</button>
// //         </div>
// //       </div>
// //       <style>
// //         {`
// //           .address-dialog-overlay {
// //             position: fixed;
// //             top: 0;
// //             left: 0;
// //             right: 0;
// //             bottom: 0;
// //             background-color: rgba(0, 0, 0, 0.5);
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             z-index: 1000;
// //           }
// //           .address-dialog {
// //             background-color: #fff;
// //             padding: 20px;
// //             border-radius: 10px;
// //             width: 400px;
// //             max-width: 90%;
// //             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// //             font-family: 'Arial', sans-serif;
// //           }
// //           .address-dialog h2 {
// //             font-size: 20px;
// //             margin-bottom: 15px;
// //             color: #333;
// //           }
// //           .address-dialog input {
// //             width: 100%;
// //             padding: 10px;
// //             margin-bottom: 10px;
// //             border: 1px solid #ccc;
// //             border-radius: 5px;
// //             font-size: 14px;
// //           }
// //           .error {
// //             color: #e91e63;
// //             font-size: 14px;
// //             margin-bottom: 10px;
// //           }
// //           .dialog-buttons {
// //             display: flex;
// //             justify-content: flex-end;
// //             gap: 10px;
// //           }
// //           .cancel-btn, .save-btn {
// //             padding: 8px 16px;
// //             border: none;
// //             border-radius: 5px;
// //             font-size: 14px;
// //             cursor: pointer;
// //           }
// //           .cancel-btn {
// //             background-color: #ccc;
// //             color: #333;
// //           }
// //           .save-btn {
// //             background-color: #6B46C1;
// //             color: #fff;
// //           }
// //           .save-btn:hover {
// //             background-color: #5a3aa6;
// //           }
// //         `}
// //       </style>
// //     </div>
// //   );
// // }

// // export default AddressDialog;

// import React, { useState } from 'react';
// import axios from 'axios';

// function AddressDialog({ open, onClose, onAddressSaved, token }) {
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     pinCode: '',
//   });
//   const [error, setError] = useState('');
//   const [loadingLocation, setLoadingLocation] = useState(false);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const fetchLiveLocation = () => {
//     setLoadingLocation(true);
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       setLoadingLocation(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//           );
//           const data = await res.json();
//           const addressDetails = data.address;

//           setAddress({
//             street: `${addressDetails.road || ''} ${addressDetails.house_number || ''}`.trim(),
//             city: addressDetails.city || addressDetails.town || addressDetails.village || '',
//             state: addressDetails.state || '',
//             pinCode: addressDetails.postcode || '',
//           });
//           setError('');
//         } catch (err) {
//           console.error(err);
//           setError('Failed to fetch location details.');
//         }
//         setLoadingLocation(false);
//       },
//       (error) => {
//         console.error(error);
//         setError('Location access denied or failed to retrieve location.');
//         setLoadingLocation(false);
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     const hasLetters = /[a-zA-Z]/.test(address.street);
//     const hasNumbers = /\d/.test(address.street);
//     if (!hasLetters || !hasNumbers) {
//       setError('Street address must contain both letters and numbers');
//       return;
//     }

//     if (!/^\d{6}$/.test(address.pinCode)) {
//       setError('Pin code must be exactly 6 digits');
//       return;
//     }

//     if (!token) {
//       setError('Authentication token missing. Please log in again.');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/address', address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) {
//         onAddressSaved(res.data.address, res.data.userName);
//         onClose();
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       console.error('Error saving address:', err.response?.data || err.message);
//       setError('Error saving address: ' + (err.response?.data?.message || 'Server error'));
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="address-dialog-overlay">
//       <div className="address-dialog">
//         <h2>Enter Your Address</h2>
//         {error && <p className="error">{error}</p>}
//         <input
//           type="text"
//           name="street"
//           placeholder="Street Address (e.g., 123 Main St)"
//           value={address.street}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={address.city}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={address.state}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="pinCode"
//           placeholder="Pin Code (6 digits)"
//           value={address.pinCode}
//           onChange={handleChange}
//           required
//         />

//         <button onClick={fetchLiveLocation} className="live-location-btn">
//           {loadingLocation ? 'Fetching location...' : '📍 Use Live Location'}
//         </button>

//         <div className="dialog-buttons">
//           <button onClick={onClose} className="cancel-btn">Cancel</button>
//           <button onClick={handleSubmit} className="save-btn">Save Address</button>
//         </div>
//       </div>
//       <style>
//         {`
//           .address-dialog-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background-color: rgba(0, 0, 0, 0.5);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             z-index: 1000;
//           }
//           .address-dialog {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 10px;
//             width: 400px;
//             max-width: 90%;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//             font-family: 'Arial', sans-serif;
//           }
//           .address-dialog h2 {
//             font-size: 20px;
//             margin-bottom: 15px;
//             color: #333;
//           }
//           .address-dialog input {
//             width: 100%;
//             padding: 10px;
//             margin-bottom: 10px;
//             border: 1px solid #ccc;
//             border-radius: 5px;
//             font-size: 14px;
//           }
//           .error {
//             color: #e91e63;
//             font-size: 14px;
//             margin-bottom: 10px;
//           }
//           .live-location-btn {
//             width: 100%;
//             background-color: #4caf50;
//             color: white;
//             padding: 10px;
//             font-size: 14px;
//             border: none;
//             border-radius: 5px;
//             margin-bottom: 10px;
//             cursor: pointer;
//           }
//           .live-location-btn:hover {
//             background-color: #45a049;
//           }
//           .dialog-buttons {
//             display: flex;
//             justify-content: flex-end;
//             gap: 10px;
//           }
//           .cancel-btn, .save-btn {
//             padding: 8px 16px;
//             border: none;
//             border-radius: 5px;
//             font-size: 14px;
//             cursor: pointer;
//           }
//           .cancel-btn {
//             background-color: #ccc;
//             color: #333;
//           }
//           .save-btn {
//             background-color: #6B46C1;
//             color: #fff;
//           }
//           .save-btn:hover {
//             background-color: #5a3aa6;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default AddressDialog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function AddressDialog({ open, onClose, onAddressSaved, token }) {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [error, setError] = useState('');
  const [mapCoords, setMapCoords] = useState({ lat: 20.5937, lng: 78.9629 }); // default to India
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    const hasLetters = /[a-zA-Z]/.test(address.street);
    const hasNumbers = /\d/.test(address.street);
    if (!hasLetters || !hasNumbers) {
      setError('Street address must contain both letters and numbers');
      return;
    }

    if (!/^\d{6}$/.test(address.pinCode)) {
      setError('Pin code must be exactly 6 digits');
      return;
    }

    if (!token) {
      setError('Authentication token missing. Please log in again.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/address', address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        onAddressSaved(res.data.address, res.data.userName);
        onClose();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Error saving address: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  const handleLiveLocation = () => {
    setShowMap(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          setError('Geolocation permission denied or unavailable');
        }
      );
    } else {
      setError('Geolocation not supported by your browser');
    }
  };

  const handleMapSelect = async (latlng) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latlng.lat,
          lon: latlng.lng,
          format: 'json',
        },
      });

      const addr = res.data.address;

      const road =
        addr.road ||
        addr.pedestrian ||
        addr.residential ||
        addr.footway ||
        '';

      setAddress({
        street: road,
        city: addr.city || addr.town || addr.village || '',
        state: addr.state || '',
        pinCode: addr.postcode || '',
      });
    } catch (err) {
      setError('Failed to fetch address from location');
    }
  };

  if (!open) return null;

  return (
    <div className="address-dialog-overlay">
      <div className="address-dialog">
        <h2>Enter Your Address</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code (6 digits)"
          value={address.pinCode}
          onChange={handleChange}
          required
        />

        <div className="dialog-buttons">
          <button onClick={handleLiveLocation} className="btn-purple">
            Use Live Location
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSubmit} className="save-btn">
            Save Address
          </button>
        </div>

        {showMap && (
          <div className="map-container">
            <MapContainer center={mapCoords} zoom={16} style={{ height: '300px', marginTop: '10px' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker onLocationSelect={handleMapSelect} />
            </MapContainer>
          </div>
        )}
      </div>

      <style>
        {`
          .address-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .address-dialog {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 400px;
            max-width: 90%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            font-family: 'Arial', sans-serif;
          }
          .address-dialog h2 {
            font-size: 20px;
            margin-bottom: 15px;
            color: #333;
          }
          .address-dialog input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
          }
          .error {
            color: #e91e63;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .dialog-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
          }
          .cancel-btn, .save-btn, .btn-purple {
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
          }
          .cancel-btn {
            background-color: #ccc;
            color: #333;
          }
          .save-btn {
            background-color: #6B46C1;
            color: #fff;
          }
          .btn-purple {
            background-color: #a854f7;
            color: #fff;
          }
          .save-btn:hover {
            background-color: #5a3aa6;
          }
          .map-container {
            margin-top: 15px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #ccc;
          }
        `}
      </style>
    </div>
  );
}

export default AddressDialog;