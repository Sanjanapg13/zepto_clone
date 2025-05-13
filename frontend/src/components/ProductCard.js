import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-green-600 font-bold mt-2">₹{product.sellingPrice}</p>
      <p className="text-gray-500 text-sm">Categories: {product.category.join(', ')}</p>
    </div>
  );
};

export default ProductCard;