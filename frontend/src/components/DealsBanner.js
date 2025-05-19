

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DealsBanner = ({ user, setUser, refreshUser }) => {
  const navigate = useNavigate();
  const [zeptoCafeProducts, setZeptoCafeProducts] = useState([]);
  const [homeNeedsProducts, setHomeNeedsProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [makeupProducts, setMakeupProducts] = useState([]);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [error, setError] = useState('');

  // Fetch products for ZeptoCafe category
  useEffect(() => {
    const fetchZeptoCafeProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: 'ZeptoCafe',
            limit: 10,
          },
        });
        setZeptoCafeProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching ZeptoCafe products:', error);
        setZeptoCafeProducts([]);
      }
    };
    fetchZeptoCafeProducts();
  }, []);

  // Fetch products for HomeNeeds category
  useEffect(() => {
    const fetchHomeNeedsProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: 'HomeNeeds',
            limit: 6,
          },
        });
        setHomeNeedsProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching HomeNeeds products:', error);
        setHomeNeedsProducts([]);
      }
    };
    fetchHomeNeedsProducts();
  }, []);

  // Fetch products for Electronics category (Super Sonic Deals)
  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: 'Electronics',
            limit: 7,
          },
        });
        setElectronicsProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching Electronics products:', error);
        setElectronicsProducts([]);
      }
    };
    fetchElectronicsProducts();
  }, []);

  // Fetch products for Makeup category (Beauty LIT Fest)
  useEffect(() => {
    const fetchMakeupProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: 'Makeup',
            limit: 7,
          },
        });
        setMakeupProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching Makeup products:', error);
        setMakeupProducts([]);
      }
    };
    fetchMakeupProducts();
  }, []);

  // Fetch products for Fashion category (Fashion Essentials)
  useEffect(() => {
    const fetchFashionProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: 'Fashion',
            limit: 6,
          },
        });
        setFashionProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching Fashion products:', error);
        setFashionProducts([]);
      }
    };
    fetchFashionProducts();
  }, []);

  const handleAddToCart = async (productId, category, setProducts) => {
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    try {
      setError('');
      const response = await axios.post('http://43.204.188.173:5000/api/cart/add', {
        productId,
        quantity: 1,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Product added to cart!');
      const refreshResponse = await axios.get('http://43.204.188.173:5000/api/products', {
        params: {
          category,
          limit: 6,
        },
      });
      setProducts(refreshResponse.data.products);
      refreshUser();
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        if (errorMessage.includes('Only 0 items available')) {
          setError('Not available');
        } else {
          setError(errorMessage);
        }
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleMoreItemsClick = () => {
    navigate('/products?category=ZeptoCafe');
  };

  const handleSeeAllHomeNeeds = () => {
    navigate('/products?category=HomeNeeds');
  };

  const handleSeeAllFashion = () => {
    navigate('/products?category=Fashion');
  };

  const banners = [
    {
      image: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/eaff67d6-aa53-40fe-a6ba-38793acdd518.png',
      textColor: '#ffffff',
    },
    {
      image: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/874d9674-2f4f-4f60-bc5b-9fb52084a738.png',
      textColor: '#000000',
    },
  ];

  const promoBanners = [
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1051,ar-1051-660,pr-true,f-auto,q-80/inventory/banner/bf5d1531-5a20-4466-b319-98cd22413431.png',
      alt: 'Life Cover Ad',
      link: 'https://www.axismaxlife.com/term-insurance-plans/premium-calculator?utmCode=143713627&utm_theme=2Crore',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/a0ef6b1b-a303-413b-9082-142ba98cb968.png',
      alt: 'EMI Card Ad',
      link: 'https://www.bajajfinserv.in/webform/v1/emicard/login',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/1bc8faa1-9dcc-44dd-b728-d2007571424d.png',
      alt: 'Zero Forex Ad',
      link: 'https://apply.scapia.cards/landing_page?campaign_image_asset=v1744873027%2Fspitha_prod_uploads%2F2025_04%2FScapiaforex2_1744873025455.webp',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/a6fed5d6-9714-4698-9a07-f3f53fbe81c9.png',
      alt: 'Bank Ad',
      link: 'https://www.idfcfirstbank.com/personal-banking/accounts/savings-account',
    },
  ];

  return (
    <div className="container my-4">
      <style>
        {`
          /* Banner-specific styling for Super Sonic Deals and Beauty LIT Fest */
          .zepto-banner {
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .zepto-banner-image {
            height: 150px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
            display: flex;
            align-items: center;
            padding: 16px;
          }
          .zepto-banner-title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            line-height: 1.2;
            color: #ffffff;
          }
          .zepto-banner-description {
            font-size: 16px;
            font-weight: 500;
            margin: 4px 0 0;
            color: #ffffff;
          }
          .zepto-category-row {
            display: flex;
            overflow-x: auto;
            gap: 15px;
            padding: 10px 0;
            background: rgb(255, 255, 255);
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            align-items: center;
          }
          .zepto-category-row::-webkit-scrollbar {
            display: none;
          }
          .zepto-category-tile {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 8px;
            min-width: 120px;
            text-align: center;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
            cursor: pointer;
            margin-right: 10px;
          }
          .zepto-category-tile:hover {
            transform: translateY(-2px);
          }
          .zepto-category-tile img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
          }
          .zepto-category-tile strong {
            font-size: 12px;
            font-weight: 600;
            color: #333;
            display: block;
          }
          .zepto-category-tile div {
            font-size: 11px;
            font-weight: 400;
            color: #666;
            line-height: 1.2;
          }

          /* General styling for all scrollable sections */
          .scroll-section {
            border-radius: 16px;
            padding: 20px;
            margin-top: 2rem;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 20px;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .scroll-section::-webkit-scrollbar {
            display: none;
          }
          .coffee-section {
            background: #fff2ee; /* Light peach for Coffee Lovers */
          }
          .household-section {
            background:rgb(209, 253, 209); /* Mint green for Household */
          }
          .fashion-section {
            background:rgb(255, 202, 211); /* Baby pink for Fashion */
          }
          .section-card {
            min-width: 250px;
            max-width: 250px;
            flex-shrink: 0;
          }
          .section-card h5 {
            font-weight: bold;
            font-size: 20px;
          }
          .section-card p {
            color: #9b5b2b;
            font-size: 24px;
            margin-bottom: 8px;
          }
          .product-card {
            background: white;
            border-radius: 12px;
            padding: 10px;
            min-width: 200px;
            max-width: 200px;
            flex-shrink: 0;
            text-align: center;
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .product-card img {
            width: 100%;
            border-radius: 10px;
            height: 150px;
            object-fit: cover;
          }
          .discount-badge {
            position: absolute;
            background: #7e22ce;
            color: white;
            padding: 2px 6px;
            font-size: 11px;
            border-radius: 4px;
            top: 5px;
            left: 5px;
            z-index: 1;
          }
          .product-card strong {
            font-size: 13px;
            font-weight: 500;
            color: #333;
            display: block;
          }
          .product-card .price {
            font-size: 12px;
            color: #333;
            margin-top: 5px;
          }
          .product-card .original-price {
            text-decoration: line-through;
            color: #999;
            font-size: 10px;
            margin-left: 5px;
          }
          .product-card .add-btn {
            background: #ff2e63;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 10px;
            cursor: pointer;
            margin-top: 5px;
          }
          .product-card .add-btn:disabled {
            background: #E2E8F0;
            cursor: not-allowed;
            color: #A0AEC0;
          }

          /* Promo Banners */
          .promo-banner {
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          .promo-banner:hover {
            transform: scale(1.02);
          }

          /* How it Works Section */
          .how-it-works-section .p-4 {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .how-it-works-section h5 {
            font-weight: bold;
          }
          .how-it-works-section p {
            font-size: 14px;
            color: #666;
          }
        `}
      </style>

      {/* Banners */}
      <div className="row">
        {banners.map((banner, index) => {
          const products = index === 0 ? electronicsProducts : makeupProducts;
          const categoryLink = index === 0 ? '/products?category=Electronics' : '/products?category=Makeup';

          return (
            <div className="col-md-6 mb-3" key={index}>
              <div className="zepto-banner">
                <div
                  className="zepto-banner-image"
                  style={{ backgroundImage: `url(${banner.image})`, color: banner.textColor }}
                >
                  <div>
                    <h4 className="zepto-banner-title">{banner.title}</h4>
                    <p className="zepto-banner-description">{banner.description}</p>
                  </div>
                </div>
                <div className="zepto-category-row">
                  {products.length === 0 ? (
                    <p style={{ fontSize: '12px', color: '#666', margin: 'auto' }}>
                      No products found in {index === 0 ? 'Electronics' : 'Makeup'} category.
                    </p>
                  ) : (
                    products.map((product, i) => (
                      <div
                        key={i}
                        className="zepto-category-tile"
                        onClick={() => navigate(categoryLink)}
                      >
                        <img src={product.imageUrl} alt={product.name} />
                        <strong>{product.discountPercentage}% OFF</strong>
                        <div>{product.name}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo Banners */}
      <div className="row mt-4">
        {promoBanners.map((banner, index) => (
          <div className="col-md-3 col-6 mb-3" key={index}>
            <a href={banner.link} className="d-block promo-banner">
              <img
                src={banner.img}
                alt={banner.alt}
                className="img-fluid w-100"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Coffee Lovers Style Scrollable Section */}
      <div className="scroll-section coffee-section">
        <div className="section-card">
          <p>COFFEE LOVERS</p>
          <h5>Dive into the world of fresh brew</h5>
          <button className="btn btn-dark mt-2" onClick={handleMoreItemsClick}>More Items</button>
        </div>
        {zeptoCafeProducts.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#666', margin: 'auto' }}>No products found in ZeptoCafe category.</p>
        ) : (
          zeptoCafeProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div style={{ position: 'relative' }}>
                <span className="discount-badge">{product.discountPercentage}% Off</span>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="mt-2">
                <strong>{product.name}</strong>
                <div className="price">
                  <strong>₹{product.sellingPrice}</strong>{' '}
                  <span className="original-price">₹{product.mrp}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Must have in your Household Section */}
      <div className="scroll-section household-section">
        <div className="section-card">
          <p>HOUSEHOLD ESSENTIALS</p>
          <h5>Must have in your Household</h5>
          <button className="btn btn-dark mt-2" onClick={handleSeeAllHomeNeeds}>See All</button>
        </div>
        {homeNeedsProducts.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#666', margin: 'auto' }}>No products found in HomeNeeds category.</p>
        ) : (
          homeNeedsProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div style={{ position: 'relative' }}>
                <span className="discount-badge">{product.discountPercentage}% Off</span>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="mt-2">
                <strong>{product.name}</strong>
                <div className="price">
                  <strong>₹{product.sellingPrice}</strong>{' '}
                  <span className="original-price">₹{product.mrp}</span>
                </div>
                {/* Uncomment if you want to add the "Add to Cart" button back */}
                {/* <button
                  className="add-btn"
                  onClick={() => handleAddToCart(product._id, 'HomeNeeds', setHomeNeedsProducts)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Not available' : 'Add'}
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fashion Essentials Section */}
      <div className="scroll-section fashion-section">
        <div className="section-card">
          <p>FASHION ESSENTIALS</p>
          <h5>Style Up with Top Trends</h5>
          <button className="btn btn-dark mt-2" onClick={handleSeeAllFashion}>See All</button>
        </div>
        {fashionProducts.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#666', margin: 'auto' }}>No products found in Fashion category.</p>
        ) : (
          fashionProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div style={{ position: 'relative' }}>
                <span className="discount-badge">{product.discountPercentage}% Off</span>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="mt-2">
                <strong>{product.name}</strong>
                <div className="price">
                  <strong>₹{product.sellingPrice}</strong>{' '}
                  <span className="original-price">₹{product.mrp}</span>
                </div>
                {/* Uncomment if you want to add the "Add to Cart" button back */}
                {/* <button
                  className="add-btn"
                  onClick={() => handleAddToCart(product._id, 'Fashion', setFashionProducts)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Not available' : 'Add'}
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* How it Works Section */}
      <div className="how-it-works-section text-center mt-5">
        <h3 className="fw-bold mb-4">How it Works</h3>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {/* Card 1 */}
          <div className="p-4 rounded shadow-sm bg-white">
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/place-order.svg" alt="Open the app" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Open the app</h5>
            <p className="text-muted mb-0">
              Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded shadow-sm bg-white">
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/do-not-blink.svg" alt="Place an order" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Place an order</h5>
            <p className="text-muted mb-0">
              Add your favourite items to the cart & avail the best offers
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded shadow-sm bg-white">
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/enjoy.svg" alt="Get free delivery" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Get free delivery</h5>
            <p className="text-muted mb-0">
              Experience lightning-fast speed & get all your items delivered in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsBanner;
