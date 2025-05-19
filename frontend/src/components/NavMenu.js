

import React, { useState, useEffect } from 'react';
import { 
  FaCoffee, FaHome, FaBaby, FaTags, FaAppleAlt, 
  FaHeadphones, FaMobileAlt, FaPaintBrush, FaTshirt, 
  FaGift, FaShoppingBag 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { categoryMap } from './Categories';

const categories = [
  { label: "All", icon: <FaShoppingBag /> },
  { label: "Cafe", icon: <FaCoffee /> },
  { label: "Home", icon: <FaHome /> },
  { label: "Toys", icon: <FaGift /> }, 
  { label: "Fresh", icon: <FaAppleAlt /> },
  { label: "Electronics", icon: <FaHeadphones /> },
  { label: "Mobiles", icon: <FaMobileAlt /> },
  { label: "Beauty", icon: <FaPaintBrush /> },
  { label: "Fashion", icon: <FaTshirt /> },
  { label: "Deal Zone", icon: <FaTags /> },
  { label: "Baby Store", icon: <FaBaby /> },
];

const NavMenu = ({ page }) => {
  const [selected, setSelected] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    if (page === 'home') {
      setSelected('All');
    }
  }, [page]);

  const handleSelect = (label) => {
    setSelected(label);
    const backendCategory = categoryMap[label] || 'All';
    navigate(backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`, { replace: true });
  };

  return (
    <div
      className="d-flex justify-content-center overflow-auto py-2 px-3"
      style={{
        background: '#fff',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #eee',
      }}
    >
      <div className="d-flex" style={{ gap: '40px' }}>
        {categories.map((item, idx) => {
          const isActive = selected === item.label;
          return (
            <div
              key={idx}
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                cursor: 'pointer',
                minWidth: '60px',
                color: isActive ? 'purple' : '#555',
                fontSize: '15px',
              }}
              onClick={() => handleSelect(item.label)}
            >
              <div
                style={{
                  fontSize: '22px',
                  marginBottom: '5px',
                  color: isActive ? 'purple' : '#777',
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavMenu;
