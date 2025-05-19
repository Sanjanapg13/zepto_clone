

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://43.204.188.173:5000/api/products/${id}`);
        const data = await res.json();
        console.log('Fetch product response:', data);
        if (data.success) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    console.log('User object:', user);
    console.log('Adding to cart with payload:', {
      productId: id,
      quantity,
      token: user.token,
    });

    try {
      const res = await fetch('http://43.204.188.173:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      });
      const data = await res.json();
      console.log('Add to cart response:', data);
      if (data.items) {
        alert('Product added to cart!');
        navigate('/cart');
      } else {
        setError(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Error adding to cart: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="product-image">
          <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category.join(', ')}</p>
          <div className="price-section">
            <p className="selling-price">₹{product.sellingPrice}</p>
            {product.discountPercentage > 0 && (
              <>
                <p className="original-price">₹{product.mrp}</p>
                <p className="discount">{product.discountPercentage}% OFF</p>
              </>
            )}
          </div>
          <p className="stock">{product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}</p>
          <p className="description">{product.description || 'No description available.'}</p>
          <div className="quantity-selector">
            <label>Quantity: </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={product.stock === 0}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      <style>
        {`
          .product-detail {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            font-family: 'Arial', sans-serif;
          }
          .product-container {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
          }
          .product-image {
            flex: 1;
            min-width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .product-image img {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .product-info {
            flex: 2;
            min-width: 300px;
          }
          .product-info h1 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #333;
          }
          .category {
            font-size: 14px;
            color: #718096;
            margin-bottom: 15px;
          }
          .price-section {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
          }
          .selling-price {
            font-size: 24px;
            color: #6B46C1;
          }
          .original-price {
            font-size: 16px;
            color: #A0AEC0;
            text-decoration: line-through;
          }
          .discount {
            font-size: 14px;
            color: #D53F8C;
            font-weight: 600;
          }
          .stock {
            font-size: 16px;
            color: ${product.stock > 0 ? '#28a745' : '#e91e63'};
            margin-bottom: 20px;
          }
          .description {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          .quantity-selector {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .quantity-selector label {
            font-size: 16px;
            color: #333;
          }
          .quantity-selector select {
            padding: 5px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .add-to-cart-btn {
            background: linear-gradient(90deg, #FF2E63, #D53F8C);
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .add-to-cart-btn:hover:not(:disabled) {
            background: linear-gradient(90deg, #E53E3E, #C53030);
          }
          .add-to-cart-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
          .error {
            color: #e91e63;
            font-size: 16px;
            text-align: center;
            margin: 20px 0;
          }
        `}
      </style>
    </div>
  );
}

export default ProductDetail;
