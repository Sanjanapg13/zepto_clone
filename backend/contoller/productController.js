

// const Product = require('../models/Product');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// // List of valid categories (copied from Categories.js to enforce fixed categories)
// const validCategories = [
//   'All',
//   'Cafe',
//   'HomeEssentials',
//   'Toys',
//   'FruitsVegetables',
//   'Electronics',
//   'Mobiles',
//   'Beauty',
//   'Fashion',
//   'DealZone',
//   'BabyStore',
//   'AttaRiceOilDals',
//   'MasalaDryFruits',
//   'ZeptoCafe',
//   'SweetCravings',
//   'ToysSports',
//   'ApparelLifestyle',
//   'JewelleryAccessories',
//   'FrozenFood',
//   'IceCreams',
//   'PackFood',
//   'DairyBreadEggs',
//   'ColdDrinksJuices',
//   'Munchies',
//   'MeatFishEggs',
//   'BreakfastSauces',
//   'TeaCoffee',
//   'BiscuitsCookies',
//   'Makeup',
//   'Skincare',
//   'BathBody',
//   'HairCare',
//   'CleaningEssentials',
//   'HomeNeeds',
//   'StationeryBooks',
//   'KitchenDining',
//   'ElectronicsAppliances',
//   'FragrancesGrooming',
//   'FeminineHygiene',
//   'PharmacyWellness',
//   'SexualWellness',
//   'BabyCare',
//   'PetCare',
//   'PaanCorner',
// ];

// exports.getProducts = async (req, res) => {
//   try {
//     const { category, subcategory, page = 1, limit = 12, query, vendorId } = req.query;

//     let searchQuery = {};

//     if (category && category !== 'All') {
//       searchQuery.category = category;
//     }

//     if (subcategory) {
//       searchQuery.subcategory = { $in: [subcategory] };
//     }

//     if (vendorId) {
//       searchQuery.vendorId = vendorId;
//     }

//     let products;
//     let total;
//     if (query) {
//       const cleanedQuery = query.trim().replace(/\s+/g, ' ');
//       searchQuery.name = { $regex: cleanedQuery, $options: 'i' };
//       products = await Product.find(searchQuery)
//         .skip((page - 1) * limit)
//         .limit(parseInt(limit));
//       total = await Product.countDocuments(searchQuery);
//     } else {
//       products = await Product.find(searchQuery)
//         .skip((page - 1) * limit)
//         .limit(parseInt(limit));
//       total = await Product.countDocuments(searchQuery);
//     }

//     res.json({
//       success: true,
//       products,
//       pages: Math.ceil(total / limit) || 1,
//       currentPage: parseInt(page),
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }
//     res.status(200).json({ success: true, product });
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.addProduct = async (req, res) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ success: false, message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
//     if (decoded.role !== 'vendor') {
//       return res.status(403).json({ success: false, message: 'Only vendors can add products' });
//     }

//     const {
//       name,
//       category,
//       subcategory,
//       description,
//       mrp,
//       sellingPrice,
//       imageUrl,
//       discountPercentage,
//       stock,
//       vendorId,
//     } = req.body;

//     console.log('Received product data:', req.body);

//     if (!name || !category?.length || !subcategory?.length || mrp == null || sellingPrice == null || !imageUrl || stock == null || !vendorId) {
//       return res.status(400).json({ success: false, message: 'All required fields must be provided' });
//     }

//     // Compare vendorId as strings
//     if (decoded.id.toString() !== vendorId.toString()) {
//       return res.status(403).json({ success: false, message: 'Unauthorized: Vendor ID mismatch' });
//     }

//     // Validate category against fixed list
//     const categoryArray = Array.isArray(category) ? category : [category];
//     for (const cat of categoryArray) {
//       if (!validCategories.includes(cat)) {
//         return res.status(400).json({ success: false, message: `Invalid category: ${cat}` });
//       }
//     }

//     const product = new Product({
//       name,
//       category: categoryArray,
//       subcategory: Array.isArray(subcategory) ? subcategory : [subcategory],
//       description: description || '',
//       mrp: Number(mrp),
//       sellingPrice: Number(sellingPrice),
//       imageUrl,
//       discountPercentage: Number(discountPercentage) || 0,
//       stock: Number(stock),
//       vendorId,
//     });

//     console.log('Saving product to database:', product);
//     const savedProduct = await product.save({ writeConcern: { w: 'majority' } });
//     console.log('Product saved successfully:', savedProduct);

//     res.status(201).json({ success: true, message: 'Product added successfully', product: savedProduct });
//   } catch (error) {
//     console.error('Add Product Error:', error);
//     res.status(500).json({ success: false, message: 'Failed to save product to database', error: error.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ success: false, message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
//     if (decoded.role !== 'vendor') {
//       return res.status(403).json({ success: false, message: 'Only vendors can delete products' });
//     }

//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     // Ensure the vendor owns this product
//     if (product.vendorId.toString() !== decoded.id.toString()) {
//       return res.status(403).json({ success: false, message: 'Unauthorized: You can only delete your own products' });
//     }

//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
//   }
// };

const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// List of valid categories (copied from Categories.js to enforce fixed categories)
const validCategories = [
  'All',
  'Cafe',
  'HomeEssentials',
  'Toys',
  'FruitsVegetables',
  'Electronics',
  'Mobiles',
  'Beauty',
  'Fashion',
  'DealZone',
  'BabyStore',
  'AttaRiceOilDals',
  'MasalaDryFruits',
  'ZeptoCafe',
  'SweetCravings',
  'ToysSports',
  'ApparelLifestyle',
  'JewelleryAccessories',
  'FrozenFood',
  'IceCreams',
  'PackFood',
  'DairyBreadEggs',
  'ColdDrinksJuices',
  'Munchies',
  'MeatFishEggs',
  'BreakfastSauces',
  'TeaCoffee',
  'BiscuitsCookies',
  'Makeup',
  'Skincare',
  'BathBody',
  'HairCare',
  'CleaningEssentials',
  'HomeNeeds',
  'StationeryBooks',
  'KitchenDining',
  'ElectronicsAppliances',
  'FragrancesGrooming',
  'FeminineHygiene',
  'PharmacyWellness',
  'SexualWellness',
  'BabyCare',
  'PetCare',
  'PaanCorner',
];

// Utility function to escape special regex characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

exports.getProducts = async (req, res) => {
  try {
    const { category, subcategory, page = 1, limit = 12, query, vendorId } = req.query;

    let searchQuery = {};

    if (category && category !== 'All') {
      searchQuery.category = category;
    }

    if (subcategory) {
      searchQuery.subcategory = { $in: [subcategory] };
    }

    if (vendorId) {
      searchQuery.vendorId = vendorId;
    }

    let products;
    let total;
    if (query) {
      const cleanedQuery = query.trim().replace(/\s+/g, ' ');
      const escapedQuery = escapeRegExp(cleanedQuery);
      // Match the query at the start of any word using \b
      searchQuery.name = { $regex: `\\b${escapedQuery}`, $options: 'i' };
      products = await Product.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      total = await Product.countDocuments(searchQuery);
    } else {
      products = await Product.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      total = await Product.countDocuments(searchQuery);
    }

    res.json({
      success: true,
      products,
      pages: Math.ceil(total / limit) || 1,
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Rest of the file remains unchanged
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addProduct = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    if (decoded.role !== 'vendor') {
      return res.status(403).json({ success: false, message: 'Only vendors can add products' });
    }

    const {
      name,
      category,
      subcategory,
      description,
      mrp,
      sellingPrice,
      imageUrl,
      discountPercentage,
      stock,
      vendorId,
    } = req.body;

    console.log('Received product data:', req.body);

    if (!name || !category?.length || !subcategory?.length || mrp == null || sellingPrice == null || !imageUrl || stock == null || !vendorId) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    // Compare vendorId as strings
    if (decoded.id.toString() !== vendorId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized: Vendor ID mismatch' });
    }

    // Validate category against fixed list
    const categoryArray = Array.isArray(category) ? category : [category];
    for (const cat of categoryArray) {
      if (!validCategories.includes(cat)) {
        return res.status(400).json({ success: false, message: `Invalid category: ${cat}` });
      }
    }

    const product = new Product({
      name,
      category: categoryArray,
      subcategory: Array.isArray(subcategory) ? subcategory : [subcategory],
      description: description || '',
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      imageUrl,
      discountPercentage: Number(discountPercentage) || 0,
      stock: Number(stock),
      vendorId,
    });

    console.log('Saving product to database:', product);
    const savedProduct = await product.save({ writeConcern: { w: 'majority' } });
    console.log('Product saved successfully:', savedProduct);

    res.status(201).json({ success: true, message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Add Product Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save product to database', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    if (decoded.role !== 'vendor') {
      return res.status(403).json({ success: false, message: 'Only vendors can delete products' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Ensure the vendor owns this product
    if (product.vendorId.toString() !== decoded.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized: You can only delete your own products' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};