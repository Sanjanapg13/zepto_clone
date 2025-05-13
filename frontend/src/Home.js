import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavMenu from '../src/components/NavMenu';
import ProductMenu from '../src/components/ProductMenu';
import DealsBanner from '../src/components/DealsBanner';
import Footer from '../src/components/footer/Footer';

// Map frontend categories to backend categories
const categoryMap = {
  'All': 'All',
  'Cafe': 'Cafe',
  'Home': 'HomeEssentials',
  'Toys': 'Toys',
  'Fresh': 'FruitsVegetables',
  'Electronics': 'Electronics',
  'Mobiles': 'Mobiles',
  'Beauty': 'Beauty',
  'Fashion': 'Fashion',
  'Deal Zone': 'DealZone',
  'Baby Store': 'BabyStore',
  'Fruits & Vegetable': 'FruitsVegetables',
  'Atta, Rice, Oil & Dals': 'AttaRiceOilDals',
  'Masala & Dry Fruits': 'MasalaDryFruits',
  'Zepto Cafe': 'ZeptoCafe',
  'Sweet Cravings': 'SweetCravings',
  'Toys & Sports': 'ToysSports',
  'Apparel & Lifestyle': 'ApparelLifestyle',
  'Jewellery & Accessories': 'JewelleryAccessories',
  'Frozen Food': 'FrozenFood',
  'Ice Creams & More': 'IceCreams',
  'Pack Food': 'PackFood',
  'Dairy, Bread & Eggs': 'DairyBreadEggs',
  'Cold Drinks & Juices': 'ColdDrinksJuices',
  'Munchies': 'Munchies',
  'Meat, Fish & Eggs': 'MeatFishEggs',
  'Breakfast & Sauces': 'BreakfastSauces',
  'Tea, Coffee & More': 'TeaCoffee',
  'Biscuits & Cookies': 'BiscuitsCookies',
  'Makeup': 'Makeup',
  'Skincare': 'Skincare',
  'Bath & Body': 'BathBody',
  'Hair Care': 'HairCare',
  'Cleaning Essentials': 'CleaningEssentials',
  'Home Needs': 'HomeNeeds',
  'Stationery & Books': 'StationeryBooks',
  'Kitchen & Dining': 'KitchenDining',
  'Electronics & Appliances': 'ElectronicsAppliances',
  'Fragrances & Grooming': 'FragrancesGrooming',
  'Feminine Hygiene': 'FeminineHygiene',
  'Pharmacy & Wellness': 'PharmacyWellness',
  'Sexual Wellness': 'SexualWellness',
  'Baby Care': 'BabyCare',
  'Pet Care': 'PetCare',
  'Paan Corner': 'PaanCorner',
};

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleCategorySelect = (frontendCategory) => {
    const backendCategory = categoryMap[frontendCategory] || 'All';
    setSelectedCategory(frontendCategory);
    // Only navigate when the user explicitly selects a category
    navigate(backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`, { replace: true });
  };

  return (
    <div>
      <NavMenu setSelectedCategory={setSelectedCategory} page="home" />
      <ProductMenu onCategorySelect={handleCategorySelect} />
      <div style={{ padding: '10px 20px', width: "1400px", margin: "auto" }}>
        <Link to="/products?category=PaanCorner">
          <img
            src="https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png"
            alt="Paan Corner Banner"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </Link>
      </div>
      <div><DealsBanner /></div>
      <div><Footer /></div>
    </div>
  );
}

export default Home;