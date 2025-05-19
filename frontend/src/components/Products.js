

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendCategories } from './Categories';
import NavMenu from './NavMenu';
import ProductMenu from './ProductMenu';

const Products = ({ user, setUser, refreshUser }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(''); // Added error state
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params on mount or when location changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'All';
    const query = params.get('query') || '';
    const subcategory = params.get('subcategory') || '';
    
    setSelectedCategory(category);
    setSearchQuery(query);
    setSelectedSubcategory(subcategory);
    setPage(1);
  }, [location.search]);

  // Fetch products based on category, subcategory, search query, and page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: selectedCategory === 'All' ? '' : selectedCategory,
            subcategory: selectedSubcategory,
            query: searchQuery,
            page,
            limit: 12,
          },
        });
        setProducts(response.data.products);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, searchQuery, page]);

  // Fetch subcategories for the selected category
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory === 'All') {
        setSubcategories([]);
        return;
      }
      try {
        const response = await axios.get('http://43.204.188.173:5000/api/products', {
          params: {
            category: selectedCategory,
            limit: 1000, // Fetch enough products to get all subcategories
          },
        });
        const products = response.data.products;
        const subcats = [...new Set(products.flatMap(product => product.subcategory))];
        setSubcategories(subcats.sort());
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  // Apply sorting and price filtering
  useEffect(() => {
    let updatedProducts = [...products];

    if (minPrice !== '' || maxPrice !== '') {
      const min = minPrice !== '' ? parseFloat(minPrice) : -Infinity;
      const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
      updatedProducts = updatedProducts.filter((product) => {
        const price = product.sellingPrice;
        return price >= min && price <= max;
      });
    }

    if (sortBy === 'priceHighToLow') {
      updatedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
    } else if (sortBy === 'priceLowToHigh') {
      updatedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    }

    setFilteredProducts(updatedProducts);
  }, [products, sortBy, minPrice, maxPrice]);

  const handleCategoryChange = (e) => {
    const backendCategory = e.target.value;
    if (backendCategory !== selectedCategory) {
      setSelectedCategory(backendCategory);
      setSelectedSubcategory('');
      setPage(1);
      const queryParams = new URLSearchParams();
      if (backendCategory !== 'All') {
        queryParams.set('category', backendCategory);
      }
      if (searchQuery) {
        queryParams.set('query', searchQuery);
      }
      navigate(`/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`, { replace: true });
    }
  };

  const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setSelectedSubcategory('');
    const queryParams = new URLSearchParams();
    if (categoryValue !== 'All') {
      queryParams.set('category', categoryValue);
    }
    if (searchQuery) {
      queryParams.set('query', searchQuery);
    }
    navigate(`/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`, { replace: true });
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setPage(1);
    const queryParams = new URLSearchParams();
    if (selectedCategory !== 'All') {
      queryParams.set('category', selectedCategory);
    }
    if (subcategory) {
      queryParams.set('subcategory', subcategory);
    }
    if (searchQuery) {
      queryParams.set('query', searchQuery);
    }
    navigate(`/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`, { replace: true });
  };

  const handleAddToCart = async (productId) => {
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    try {
      setError(''); // Clear any previous error
      const response = await axios.post('http://43.204.188.173:5000/api/cart/add', {
        productId,
        quantity: 1,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Product added to cart!');
      refreshUser();
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        setUser(null);
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage); // Set the error message to display on UI
        // Clear the error after 5 seconds
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-container">
      <NavMenu setSelectedCategory={setSelectedCategory} page="home" />
      <div className="product-menu-container">
        <ProductMenu onCategorySelect={handleCategorySelect} />
      </div>
      <div className="content-container">
        {selectedCategory !== 'All' && (
          <div className="subcategory-sidebar">
            <h3 className="subcategory-title">
              {backendCategories.find(cat => cat.value === selectedCategory)?.label || selectedCategory}
            </h3>
            <ul className="subcategory-list">
              <li
                className={`subcategory-item ${selectedSubcategory === '' ? 'active' : ''}`}
                onClick={() => handleSubcategorySelect('')}
              >
                All
              </li>
              {subcategories.map((subcategory) => (
                <li
                  key={subcategory}
                  className={`subcategory-item ${selectedSubcategory === subcategory ? 'active' : ''}`}
                  onClick={() => handleSubcategorySelect(subcategory)}
                >
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="main-content">
          {error && <div className="error-message">{error}</div>} {/* Added error message display */}
          <div className="sort-by-container">
            <div className="sort-by-menu">
              <label htmlFor="sort-by" className="sort-by-label">Sort By:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-by-select"
              >
                <option value="default">Default</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>
            <div className="price-filter">
              <label htmlFor="min-price" className="price-filter-label">Min Price:</label>
              <input
                id="min-price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="price-filter-input"
                min="0"
              />
              <label htmlFor="max-price" className="price-filter-label">Max Price:</label>
              <input
                id="max-price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="price-filter-input"
                min="0"
              />
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <p className="no-products-message">
              No products found
              {searchQuery ? ` for "${searchQuery}"` : ''}
              {selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}
              {selectedSubcategory ? ` - "${selectedSubcategory}"` : ''}.
              {searchQuery ? ' Try searching for a different term, like "apple" or "shirt".' : ''}
              {(minPrice !== '' || maxPrice !== '') && ' Try adjusting the price filters.'}
            </p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container" onClick={() => handleProductClick(product._id)}>
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    {product.discountPercentage > 0 && (
                      <span className="discount-badge">{product.discountPercentage}% OFF</span>
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category.join(', ')}</p>
                    <div className="price-section">
                      <div className="price-details">
                        {product.discountPercentage > 0 && (
                          <p className="original-price">₹{product.mrp}</p>
                        )}
                        <p className="selling-price">₹{product.sellingPrice}</p>
                      </div>
                      <button
                        className="add-button"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <span className="add-icon">+</span> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          .products-container {
            width: 95vw;
            max-width: 1600px;
            margin: 0 auto;
            padding: 1rem;
          }

          .product-menu-container {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }

          .content-container {
            display: flex;
            gap: 1.5rem;
          }

          .subcategory-sidebar {
            width: 300px;
            background: linear-gradient(145deg, #f8f9fa, #e9ecef);
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            border: 1px solid transparent;
            transition: all 0.3s ease;
          }

          .subcategory-sidebar:hover {
            border: 1px solid;
            border-image: linear-gradient(90deg, #6B46C1, #D53F8C) 1;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }

          .subcategory-title {
            font-size: 18px;
            font-weight: 700;
            color: #1A202C;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .subcategory-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .subcategory-item {
            padding: 8px 12px;
            font-size: 14px;
            font-weight: 500;
            color: #1A202C;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .subcategory-item:hover {
            background: linear-gradient(90deg, #f7e9f5, #f0e7f7);
            color: #6B46C1;
          }

          .subcategory-item.active {
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            color: #ffffff;
            font-weight: 600;
          }

          .main-content {
            flex: 1;
            width: 100%;
          }

          .error-message {
            color: #e91e63;
            font-size: 16px;
            text-align: center;
            margin-bottom: 1rem;
            padding: 10px;
            background: #fff;
            border: 1px solid #e91e63;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .sort-by-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            background: linear-gradient(145deg, #f8f9fa, #e9ecef);
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            margin-bottom: 1.5rem;
            margin-left: auto;
            width: fit-content;
            border: 1px solid transparent;
            transition: all 0.3s ease;
          }

          .sort-by-container:hover {
            border: 1px solid;
            border-image: linear-gradient(90deg, #6B46C1, #D53F8C) 1;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }

          .sort-by-menu {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .sort-by-label {
            font-size: 14px;
            font-weight: 600;
            color: #1A202C;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .sort-by-select {
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            border: 1px solid #D53F8C;
            background: #ffffff;
            color: #1A202C;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .sort-by-select:hover,
          .sort-by-select:focus {
            border-color: #6B46C1;
            background: linear-gradient(90deg, #f7e9f5, #f0e7f7);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
          }

          .price-filter {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .price-filter-label {
            font-size: 14px;
            font-weight: 600;
            color: #1A202C;
            background: linear-gradient(90deg, #6B46C1, #D53F8C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .price-filter-input {
            width: 90px;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            border: 1px solid #D53F8C;
            background: #ffffff;
            color: #1A202C;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .price-filter-input:hover,
          .price-filter-input:focus {
            border-color: #6B46C1;
            background: linear-gradient(90deg, #f7e9f5, #f0e7f7);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
          }

          .price-filter-input::placeholder {
            color: #A0AEC0;
            font-style: italic;
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
            width: 100%;
          }

          @media (min-width: 640px) {
            .product-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (min-width: 768px) {
            .product-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .product-grid {
              grid-template-columns: repeat(5, 1fr);
            }
          }

          @media (min-width: 1280px) {
            .product-grid {
              grid-template-columns: repeat(6, 1fr);
            }
          }

          .product-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .product-card:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            transform: translateY(-4px);
          }

          .product-image-container {
            position: relative;
            height: 140px;
            cursor: pointer;
          }

          .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }

          .discount-badge {
            position: absolute;
            top: 8px;
            left: 8px;
            background: linear-gradient(45deg, #6B46C1, #D53F8C);
            color: #ffffff;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 16px;
          }

          .product-details {
            padding: 12px;
          }

          .product-name {
            font-size: 14px;
            font-weight: 700;
            color: #1A202C;
            margin-bottom: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .product-category {
            font-size: 12px;
            color: #718096;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .price-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .price-details {
            flex: 1;
          }

          .original-price {
            font-size: 12px;
            color: #A0AEC0;
            text-decoration: line-through;
            margin-bottom: 2px;
          }

          .selling-price {
            font-size: 16px;
            font-weight: 600;
            color: #6B46C1;
          }

          .add-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(90deg, #FF2E63, #D53F8C);
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .add-button:hover {
            background: linear-gradient(90deg, #E53E3E, #C53030);
            transform: scale(1.05);
          }

          .add-icon {
            margin-right: 4px;
          }

          .no-products-message {
            text-align: center;
            font-size: 18px;
            color: #718096;
            font-weight: 500;
            margin-top: 2rem;
          }

          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
            gap: 1rem;
          }

          .pagination-info {
            padding: 8px 16px;
            font-size: 14px;
            color: #2D3748;
            font-weight: 500;
          }

          .pagination-button {
            padding: 8px 16px;
            background: linear-gradient(90deg, #FF2E63, #D53F8C);
            color: #ffffff;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .pagination-button:disabled {
            background: #E2E8F0;
            cursor: not-allowed;
            color: #A0AEC0;
          }

          .pagination-button:hover:not(:disabled) {
            background: linear-gradient(90deg, #E53E3E, #C53030);
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default Products;
