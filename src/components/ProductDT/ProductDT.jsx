import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";
import { useCart } from "../CartContext/CartContext"; // Yolun düzgün olduğundan əmin ol
import AOS from 'aos';
import 'aos/dist/aos.css';
import './ProductDT.css';

const ProductDT = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Context-dən funksiyanı çəkirik
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`https://699b9c6d110b5b738cc05dba.mockapi.io/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
        setLoading(false);
      });
    AOS.init({ duration: 1000 });
  }, [id]);

  if (loading) return <div className="status-screen">LOADING...</div>;
  if (!product) return <div className="status-screen">PRODUCT NOT FOUND!</div>;

  const thumbStyles = [
    { filter: 'none' },
    { filter: 'brightness(1.1) contrast(1.1)' },
    { filter: 'hue-rotate(30deg)' },
    { filter: 'saturate(1.5)' }
  ];

  // Səbətə əlavə etmə funksiyası
  const handleAddToCart = () => {
    addToCart(product, quantity);
    // İstifadəçiyə vizual bildiriş vermək üçün bura toast və ya alert əlavə edə bilərsən
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="product-dt-wrapper">
      <section className="dt-banner">
        <div className="banner-text" data-aos="fade-down">
          <h1>PRODUCT DETAILS</h1>
          <p><Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.title}</p>
        </div>
      </section>

      <div className="container main-content">
        <div className="product-dt-flex">
          
          <div className="dt-left" data-aos="fade-right">
            <div className="main-img-card">
              <img 
                src={product.image} 
                alt={product.title} 
                style={thumbStyles[activeImg]} 
              />
            </div>
            <div className="thumb-gallery">
              {thumbStyles.map((style, index) => (
                <div 
                  key={index} 
                  className={`thumb-item ${activeImg === index ? 'active' : ''}`}
                  onClick={() => setActiveImg(index)}
                >
                  <img src={product.image} alt="thumb" style={style} />
                </div>
              ))}
            </div>
          </div>

          <div className="dt-right" data-aos="fade-left">
            <span className="stock-tag">IN STOCK</span>
            <h1 className="dt-title">{product.title}</h1>
            <div className="dt-rating">⭐⭐⭐⭐⭐ <span>(4.8/5 Review)</span></div>
            <p className="dt-price">${product.price}</p>
            
            <div className="dt-divider"></div>
            
            <p className="dt-desc">
              {product.description || "This premium piece is crafted with the finest materials to bring elegance and comfort to your modern living space."}
            </p>

            <div className="dt-meta">
              <p><strong>Category:</strong> {product.category || "Furniture"}</p>
              <p><strong>SKU:</strong> FURN-{id}024</p>
            </div>

            <div className="dt-actions">
              <div className="qty-box">
                <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              
              {/* FUNKSİYA BURADA BAĞLANIB */}
              <button className="add-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              
              <button className="wish-btn"><FiHeart /></button>
            </div>

            <div className="dt-share">
              <span>SHARE:</span>
              <a href="#"><FiFacebook /></a>
              <a href="#"><FiTwitter /></a>
              <a href="#"><FiLinkedin /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDT;