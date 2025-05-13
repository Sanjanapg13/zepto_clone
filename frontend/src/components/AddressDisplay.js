import React from 'react';

function AddressDisplay({ address, onEdit }) {
  return (
    <div className="address-display">
      {address ? (
        <div className="address-details">
          <p>{address.street}, {address.city}, {address.state} - {address.pinCode}</p>
          <button onClick={onEdit} className="edit-btn">Edit Address</button>
        </div>
      ) : (
        <p>No address set</p>
      )}
      <style>
        {`
          .address-display {
            font-family: 'Arial', sans-serif;
            margin: 10px 0;
          }
          .address-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #f5f6f8;
            border-radius: 5px;
          }
          .address-details p {
            margin: 0;
            font-size: 14px;
            color: #333;
          }
          .edit-btn {
            background-color: #6B46C1;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
          }
          .edit-btn:hover {
            background-color: #5a3aa6;
          }
        `}
      </style>
    </div>
  );
}

export default AddressDisplay;