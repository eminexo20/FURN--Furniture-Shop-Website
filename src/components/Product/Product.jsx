import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://699b9c6d110b5b738cc05dba.mockapi.io/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
    AOS.init({ duration: 1000 });
  }, []);

  if (loading) return <div className="loading-screen">Yüklənir...</div>;

  return (
    <div className="product-page-wrapper">
      
      {/* 1. SƏHİFƏ BANNERİ */}
      <section className="product-banner">
        <div className="banner-overlay">
          <h1 data-aos="fade-down">OUR COLLECTION</h1>
          <p data-aos="fade-up">Find the best furniture for your comfort and style.</p>
        </div>
      </section>

      {/* 2. MƏHSULLAR SİYAHISI */}
      <main className="product-container">
        <div className="section-header" data-aos="fade-up">
          <h2>POPULAR PRODUCTS</h2>
          <div className="header-line"></div>
          <p>Suspendisse varius enim in eros elementum tristique.</p>
        </div>
        
        <div className="product-grid">
          {products.map((item, index) => (
            <div 
              key={item.id} 
              className="product-card" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <Link to={`/product/${item.id}`} className="product-link">
                <div className="product-card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="hover-overlay">
                    <span>VIEW DETAILS</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{item.title}</h3>
                  <p className="product-price">${item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Product;