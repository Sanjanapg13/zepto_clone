

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProfileSidebar from '../src/components/login/ProfileSidebar';
import AddressDialog from '../src/components/AddressDialog';

function Navbar({ user, setPage, handleLogout }) {
  const [location, setLocation] = useState('Select Location');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isSuperSaverOn, setIsSuperSaverOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const isDashboardRoute = currentLocation.pathname === '/admin-dashboard' || currentLocation.pathname === '/vendor-dashboard';

  useEffect(() => {
    if (user && user.token) {
      const fetchCartCount = async () => {
        try {
          console.log('Fetching cart count with token:', user.token);
          const response = await axios.get('http://43.204.188.173:5000/api/cart', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setCartCount(response.data.items.reduce((sum, item) => sum + item.quantity, 0));
          console.log('Cart count fetched:', response.data);
        } catch (error) {
          console.error('Error fetching cart zawartość:', error);
          if (error.response?.status === 401) {
            console.log('Unauthorized error - invalid token, resetting user');
            handleLogout();
            navigate('/login');
          }
          setCartCount(0);
        }
      };
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user, handleLogout, navigate]);

  useEffect(() => {
    if (user && user.token) {
      const fetchAddress = async () => {
        try {
          const res = await axios.get('http://43.204.188.173:5000/api/address', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          if (res.data.success && res.data.address.street) {
            setHasAddress(true);
            setLocation(`${res.data.address.city}, ${res.data.address.state}`);
          } else {
            setHasAddress(false);
            setLocation('Select Location');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setHasAddress(false);
        }
      };
      fetchAddress();
    }
  }, [user]);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileClick = () => {
    if (user) {
      toggleProfileDropdown();
    } else {
      navigate('/login');
    }
  };

  const debounceSearch = useCallback((query) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      const cleanedQuery = query.trim().replace(/\s+/g, ' ');
      if (cleanedQuery) {
        navigate(`/products?query=${encodeURIComponent(cleanedQuery)}`);
      } else {
        navigate('/products');
      }
    }, 500);
    setDebounceTimeout(timeout);
  }, [debounceTimeout, navigate]);

  const fetchProducts = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://43.204.188.173:5000/api/products', {
        params: {
          query: query,
          limit: 5,
        },
      });
      setFilteredProducts(response.data.products);
      setShowProductDropdown(response.data.products.length > 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      setFilteredProducts([]);
      setShowProductDropdown(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const cleanedQuery = query.trim().replace(/\s+/g, ' ');
    if (cleanedQuery) {
      fetchProducts(cleanedQuery);
    } else {
      setFilteredProducts([]);
      setShowProductDropdown(false);
    }

    debounceSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cleanedQuery = searchQuery.trim().replace(/\s+/g, ' ');
      if (cleanedQuery) {
        navigate(`/products?query=${encodeURIComponent(cleanedQuery)}`);
      } else {
        navigate('/products');
      }
      setShowProductDropdown(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts([]);
    setShowProductDropdown(false);
    navigate('/products');
  };

  const highlightMatch = (name, query) => {
    // Escape special regex characters in the query if needed
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(\\b${escapedQuery})`, 'gi');
    let key = 0;
    return (
      <span>
        {name.split(regex).map((part, index) => {
          if (index % 2 === 1) {
            // Odd indices are the matched parts (captured by the regex group)
            return (
              <span key={key++} style={{ fontWeight: 'bold', color: '#6B46C1' }}>
                {part}
              </span>
            );
          }
          // Even indices are the non-matched parts
          return part;
        })}
      </span>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  const handleCartNavigation = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (hasAddress) {
      setPage('cart');
      navigate('/cart');
    } else {
      setShowAddressDialog(true);
    }
  };

  const handleAddressSaved = (address, userName) => {
    setHasAddress(true);
    setLocation(`${address.city}, ${address.state}`);
    alert(`Address saved for ${userName}: ${address.street}, ${address.city}, ${address.state}, ${address.pinCode}`);
    setPage('cart');
    navigate('/cart');
  };

  if (isDashboardRoute) {
    return (
      <nav className="navbar navbar-light" style={{ backgroundColor: '#e9e3f7', padding: '2px 30px' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center position-relative">
            <button onClick={() => window.location.href = '/'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img
                src="https://dealzy-assets.s3.ap-south-1.amazonaws.com/brands/227/logo-v2.png?v=1729751157"
                alt="Zepto Logo"
                style={{ height: '100px' }}
              />
            </button>
          </div>

          <div className="d-flex align-items-center position-relative">
            <button
              onClick={handleProfileClick}
              className="me-3"
              style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer' }}
            >
              <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
            </button>

            {user && showProfileDropdown && (
              <div
                className="profile-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '50px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                }}
              >
                <ProfileSidebar
                  user={user}
                  handleLogout={() => {
                    handleLogout();
                    setCartCount(0);
                  }}
                  onClose={toggleProfileDropdown}
                  showHeader={false}
                />
              </div>
            )}
          </div>
        </div>

        <AddressDialog
          open={showAddressDialog}
          onClose={() => setShowAddressDialog(false)}
          onAddressSaved={handleAddressSaved}
          token={user?.token}
        />
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e9e3f7', padding: '2px 30px' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center position-relative">
          <button onClick={() => window.location.href = '/'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img
              src="https://dealzy-assets.s3.ap-south-1.amazonaws.com/brands/227/logo-v2.png?v=1729751157"
              alt="Zepto Logo"
              style={{ height: '100px' }}
            />
          </button>

          <button
            className="d-flex align-items-center me-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
            onClick={() => {
              if (isSuperSaverOn) {
                setIsSuperSaverOn(false);
                navigate('/');
              } else {
                setIsSuperSaverOn(true);
                navigate('/deal-zone');
              }
            }}
          >
            <span
              style={{
                backgroundColor: isSuperSaverOn ? '#e91e63' : '#6f42c1',
                width: '70px',
                height: '25px',
                borderRadius: '35px',
                display: 'inline-block',
                position: 'relative',
                transition: 'background-color 0.3s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  height: '20px',
                  width: '20px',
                  left: isSuperSaverOn ? '30px' : '2px',
                  top: '2px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: 'left 0.3s',
                }}
              ></span>
            </span>
            <span style={{ color: '#6c757d', fontSize: '14px', marginLeft: '5px', verticalAlign: 'middle', fontWeight:'400' }}>
              <b>Super Saver</b>
            </span>
          </button>

          <div
            className="location-display mx-2"
            style={{
              backgroundColor: '#fff',
              borderColor: '#ccc',
              borderRadius: '12px',
              padding: '6px 20px',
              fontSize: '14px',
              width: '250px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              marginRight: '30px'
            }}
            onClick={() => user && setShowAddressDialog(true)}
          >
            {location}
          </div>

          <div className="input-group" style={{ flexGrow: 1, position: 'relative' }}>
            <span
              className="input-group-text"
              style={{
                backgroundColor: '#fff',
                borderColor: '#ccc',
                borderRadius: '10px 0 0 10px',
                borderRight: 'none',
                marginLeft: '30px'
              }}
            >
              <i className="bi bi-search" style={{ color: '#6c757d' }}></i>
            </span>
            <input
              className="form-control"
              type="search"
              placeholder="Search for 'amul butter'"
              value={searchQuery}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
              style={{
                borderColor: '#ccc',
                borderRadius: '0 10px 10px 0',
                borderLeft: 'none',
                padding: '6px 500px 6px 12px',
                fontSize: '14px',
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            )}

            {showProductDropdown && (
              <div
                ref={dropdownRef}
                className="product-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                  maxHeight: '400px',
                  overflowY: 'auto',
                  padding: '10px',
                }}
              >
                {isLoading ? (
                  <div style={{ padding: '10px', textAlign: 'center', color: '#6c757d' }}>
                    Loading...
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="product-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setShowProductDropdown(false);
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '5px',
                          marginRight: '10px',
                        }}
                      />
                      <div>
                        <h3 style={{ fontSize: '14px', margin: 0 }}>
                          {highlightMatch(product.name, searchQuery)}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                          {product.category.join(', ')}
                        </p>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#6B46C1', margin: 0 }}>
                          ₹{product.sellingPrice}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '10px', textAlign: 'center', color: '#6c757d' }}>
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center position-relative">
          <button
            onClick={handleProfileClick}
            className="me-3"
            style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer' }}
          >
            <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
          </button>

          {user && showProfileDropdown && (
            <div
              className="profile-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                right: '50px',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              }}
            >
              <ProfileSidebar
                user={user}
                handleLogout={() => {
                  handleLogout();
                  setCartCount(0);
                }}
                onClose={toggleProfileDropdown}
                showHeader={false}
              />
            </div>
          )}

          <button
            onClick={handleCartNavigation}
            style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer', position: 'relative' }}
          >
            <i className="bi bi-cart" style={{ fontSize: '24px' }}></i>
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#e91e63',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AddressDialog
        open={showAddressDialog}
        onClose={() => setShowAddressDialog(false)}
        onAddressSaved={handleAddressSaved}
        token={user?.token}
      />
    </nav>
  );
}

export default Navbar;
