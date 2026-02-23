import { useState, useEffect } from "react";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

export default function Home() {
  const [dbProducts, setDbProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Sofa");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://699b9c6d110b5b738cc05dba.mockapi.io/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setDbProducts(data);
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    AOS.init({ duration: 1200, once: false }); // Scroll zamanı təkrar işləməsi üçün once: false
  }, []);

  const filteredProducts = dbProducts.filter(item => item.category === activeCategory);

  return (
    <main className="home-wrapper">
      {/* 1. HERO SECTION */}
      <section className="hero-section" data-aos="fade-zoom-in">
        <div className="hero-content-box" data-aos="fade-right" data-aos-delay="300">
          <span className="sale-tag">70% SALE OFF</span>
          <h1>FURNITURE AT COST</h1>
          <p>Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.</p>
          <button className="primary-btn">DISCOVER MORE</button>
        </div>
      </section>

      {/* 2. POPULAR PRODUCTS (Kategoriya ilə) */}
      <section className="popular-section" data-aos="fade-up">
        <div className="section-header">
          <h2>POPULAR PRODUCTS</h2>
          <div className="category-tabs">
            {["Sofa", "Table", "Chair", "Bed"].map(cat => (
              <button 
                key={cat} 
                className={activeCategory === cat ? "active" : ""} 
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filteredProducts.slice(0, 3).map((item, idx) => (
            <ProductCard key={item.id} item={item} delay={idx * 150} />
          ))}
        </div>
      </section>

      {/* 3. VISIT / MANUFACTURER SECTION */}
      <section className="visit-section">
        <div className="visit-img" data-aos="fade-right">
            <img src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg" alt="Furniture" />
        </div>
        <div className="visit-text" data-aos="fade-left">
            <h3>BEST FURNITURE MANUFACTURER</h3>
            <p>Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.</p>
            <button className="outline-btn">DISCOVER MORE</button>
        </div>
      </section>

      {/* 4. PRODUCTS YOU MAY LIKE (Instagram-dan Yuxarıda) */}
      <section className="product-showcase" data-aos="fade-up">
        <div className="section-header">
          <h2>PRODUCTS YOU MAY LIKE</h2>
        </div>
        <div className="products-grid">
          {dbProducts.slice(4, 7).map((item, idx) => (
            <ProductCard key={item.id} item={item} delay={idx * 150} />
          ))}
        </div>
        <div className="btn-center">
            <button className="outline-btn-orange">DISCOVER MORE</button>
        </div>
      </section>

      {/* 5. INSTAGRAM SECTION */}
      <section className="instagram-section" data-aos="zoom-in">
        <div className="insta-box">
          <FiInstagram size={40} className="insta-icon" />
          <h2>GET INSPIRED WITH INSTAGRAM</h2>
          <p>Suspendisse varius enim in eros elementum tristique.</p>
          <button className="outline-btn-orange">DISCOVER MORE</button>
        </div>
      </section>

      {/* 6. TOP PICK SECTION (Instagram-dan Aşağıda) */}
      <section className="product-showcase bottom-pad" data-aos="fade-up">
        <div className="section-header">
          <h2>TOP PICK</h2>
        </div>
        <div className="products-grid">
          {dbProducts.slice(0, 3).map((item, idx) => (
            <ProductCard key={item.id} item={item} delay={idx * 150} />
          ))}
        </div>
        <div className="btn-center">
            <button className="outline-btn-orange">DISCOVER MORE</button>
        </div>
      </section>
    </main>
  );
}

// Alt Component (Kod təkrarını azaltmaq üçün)
function ProductCard({ item, delay }) {
  return (
    <div className="p-card" data-aos="fade-up" data-aos-delay={delay}>
      <Link to={`/product/${item.id}`}>
        <div className="p-img-wrapper">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="p-info">
          <h4>{item.title}</h4>
          <p className="price">${item.price}</p>
        </div>
      </Link>
    </div>
  );
}