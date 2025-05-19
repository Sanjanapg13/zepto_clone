

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: '#f9f9f9',
      padding: '40px 20px',
      fontSize: '14px',
      color: '#222',
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    link: {
      color: '#333',
      textDecoration: 'none',
      marginRight: '6px',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    popularSearches: {
      marginBottom: '30px',
    },
    categoryColumns: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      marginBottom: '8px',
    },
    footerBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      borderTop: '1px solid #ddd',
      paddingTop: '20px',
      marginTop: '40px',
    },
    logoSection: {
      maxWidth: '250px',
    },
    brandLogo: {
      fontFamily: 'sans-serif',
      fontWeight: '700',
      fontSize: '24px',
      color: '#ff3366',
    },
    socialIcons: {
      display: 'flex',
      gap: '12px',
      fontSize: '18px',
      marginTop: '10px',
    },
    nav: {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 20px',
      padding: 0,
      margin: 0,
      maxWidth: '500px',
    },
    appButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    appImage: {
      width: '140px',
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.popularSearches}>
        <h5 style={styles.sectionTitle}>Popular Searches</h5>
        <div>
          <strong>Products</strong>: 
          <a href="#" style={styles.link}>Avocado</a>|
          <a href="#" style={styles.link}>Strawberry</a>|
          <a href="#" style={styles.link}>Pomegranate</a>|
          <a href="#" style={styles.link}>Beetroot</a>|
          <a href="#" style={styles.link}>Ash gourd</a>|
          <a href="#" style={styles.link}>Bottle gourd</a>|
          <a href="#" style={styles.link}>Lady finger</a>|
          <a href="#" style={styles.link}>Potato</a>|
          <a href="#" style={styles.link}>Lemon</a>|
          <a href="#" style={styles.link}>Dalchini</a>|
          <a href="#" style={styles.link}>Fennel seeds</a>|
          <a href="#" style={styles.link}>Blueberry</a>|
          <a href="#" style={styles.link}>Papaya</a>|
          <a href="#" style={styles.link}>Dragon fruit</a>
        </div>
        
        <div>
          <strong>Categories</strong>: 
          <a href="#" style={styles.link}>Grocery</a>|
          <a href="#" style={styles.link}>Curd</a>|
          <a href="#" style={styles.link}>Hukka flavour</a>|
          <a href="#" style={styles.link}>Paan shop near me</a>|
          <a href="#" style={styles.link}>Eggs price</a>|
          <a href="#" style={styles.link}>Cheese slice</a>|
          <a href="#" style={styles.link}>Fresh fruits</a>|
          <a href="#" style={styles.link}>Fresh vegetables</a>|
          <a href="#" style={styles.link}>Refined oil</a>|
          <a href="#" style={styles.link}>Butter price</a>|
          <a href="#" style={styles.link}>Paneer price</a>
        </div>
      </div>

      <div>
        <h5 style={styles.sectionTitle}>Categories</h5>
        <div style={styles.categoryColumns}>
          {[
            ['Fruits & Vegetables', 'Baby Food', 'Breakfast & Sauces', 'Cleaning Essentials', 'Homegrown Brands'],
            ['Atta, Rice, Oil & Dals', 'Dairy, Bread & Eggs', 'Tea, Coffee & More', 'Home Needs', 'Paan Corner'],
            ['Masala & Dry Fruits', 'Cold Drinks & Juices', 'Biscuits', 'Electronics & Appliances'],
            ['Sweet Cravings', 'Munchies', 'Makeup & Beauty', 'Hygiene & Grooming'],
            ['Frozen Food & Ice Creams', 'Meats, Fish & Eggs', 'Bath & Body', ' Baby Care']
          ].map((col, i) => (
            <ul key={i} style={styles.list}>
              {col.map((item, j) => {
                const categoryParam = item.replace(/ & /g, '').replace(/ /g, '');
                return (
                  <li key={j} style={styles.listItem}>
                    <Link
                      to={`/products?category=${categoryParam}`}
                      style={styles.link}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>

      <div style={styles.footerBottom}>
        <div style={styles.logoSection}>
          <div style={styles.brandLogo}>zepto</div>
          <div style={styles.socialIcons}>
            <a href="https://www.instagram.com/zeptonow/"><i className="bi bi-instagram"></i></a>
            <a href="https://x.com/ZeptoNow"><i className="bi bi-twitter-x"></i></a>
            <a href="https://www.facebook.com/Zeptonow/"><i className="bi bi-facebook"></i></a>
            <a href="https://www.linkedin.com/company/zeptonow/?originalSubdomain=in"><i className="bi bi-linkedin"></i></a>
          </div>
          <p>© KiranaKart Technologies Private Limited</p>
        </div>

        <ul style={styles.nav}>
          <li><a href="#" style={styles.link}>Home</a></li>
          <li><a href="https://www.zeptonow.com/del-areas" style={styles.link}>Delivery Areas</a></li>
          <li><a href="https://zepto.talentrecruit.com/career-page" style={styles.link}>Careers</a></li>
          <li><a href="https://www.zeptonow.com/customer-support" style={styles.link}>Customer Support</a></li>
          <li><a href="https://www.zeptonow.com/privacy-policy" style={styles.link}>Privacy Policy</a></li>
          <li><a href="https://www.zeptonow.com/terms-of-service" style={styles.link}>Terms of Use</a></li>
          <li><a href="https://www.zeptonow.com/responsible-disclosure-policy" style={styles.link}>Responsible Disclosure Policy</a></li>
          <li><a href="https://blog.zeptonow.com/" style={styles.link}>Mojo - a Zepto Blog</a></li>
        </ul>

        <div style={styles.appButtons}>
          <a href="https://play.google.com/store/search?q=zepto&c=apps&hl=en_US"><img style={styles.appImage} src="https://imgs.search.brave.com/KxgTdA692UH8L4kZu6aXiOb_jRFkjMYfKrea9E9nNAY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTAvR2V0/LUl0LU9uLUdvb2ds/ZS1QbGF5LVBORy1U/cmFuc3BhcmVudC1J/bWFnZS5wbmc" alt="Get it on play store" /></a>
          <a href="https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645"><img style={styles.appImage} src="https://imgs.search.brave.com/zkbUGVgXn1M8tiHBbiwr2UTWR9JF2yfXDK_8aSFwz40/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXIuYXBwbGUu/Y29tL2Fzc2V0cy9l/bGVtZW50cy9iYWRn/ZXMvZG93bmxvYWQt/b24tdGhlLWFwcC1z/dG9yZS5zdmc" alt="Get it on app store" /></a>
        </div>
      </div>
    </footer>
  );
}
