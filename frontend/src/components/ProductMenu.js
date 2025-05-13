

import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryMap, productMenuCategories } from './Categories';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        position: "absolute",
        right: "-15px",
        top: "40%",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <i className="bi bi-chevron-right" style={{ color: "white", fontSize: "14px" }}></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        position: "absolute",
        left: "-15px",
        top: "40%",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <i className="bi bi-chevron-left" style={{ color: "white", fontSize: "14px" }}></i>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

const ProductMenu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (frontendCategory) => {
    const backendCategory = categoryMap[frontendCategory] || 'All';
    navigate(backendCategory === 'All' ? '/products' : `/products?category=${backendCategory}`, { replace: true });
  };

  return (
    <div style={{ width: "1600px", padding: "10px 10px", backgroundColor: "#fff", position: "relative", margin: "0 auto" }}>
      <Slider {...settings}>
        {productMenuCategories.map((item, index) => (
          <div key={index} style={{ padding: "5px" }}>
            <div
              onClick={() => handleCategoryClick(item.name)}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "10px 10px",
                textAlign: "center",
                height: "190px",
                width: "170px",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "220px",
                  marginBottom: "8px",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#333",
                  lineHeight: "1.2",
                  textAlign: "center",
                }}
              >
                {/* {item.name} */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductMenu;