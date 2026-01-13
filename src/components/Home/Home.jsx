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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) throw new Error("Database tapılmadı!");
        const data = await response.json();
        setDbProducts(data);
      } catch (error) {
        console.error("Xəta:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    AOS.init({
      duration: 1000,
      once: true,
      offset: 200
    });
  }, []);

  // Popular Products üçün filtr
  const filteredProducts = dbProducts.filter(
    (item) => item.category === activeCategory
  );

  // TOP PICK üçün bazadan ilk 3 məhsul (Statik 'backup' yerinə)
  const topPickItems = dbProducts.slice(0, 3);

  return (
    <main className="home-wrapper">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>70% SALE OFF</h1>
          <h2>FURNITURE AT COST</h2>
          <p>Suspendisse varius enim in eros elementum tristique.</p>
          <button className="hero-button">DISCOVER MORE</button>
        </div>
      </section>

      {/* 2. POPULAR PRODUCTS */}
      <section className="popular-section">
        <div className="popular-container">
          <div className="section-header">
            <h2>POPULAR PRODUCTS</h2>
          </div>
          <div className="category-menu">
            {["Sofa", "Table", "Chair"].map((cat) => (
              <button 
                key={cat} 
                className={`category-button ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div className="product-card" key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p className="price">${item.price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>{loading ? "Yüklənir..." : "Məlumat tapılmadı."}</p>
            )}
          </div>
        </div>
      </section>

      {/* 3. VISIT SECTION */}
      <section className="hero-container">
        <div className="hero-image">
          <img src="/images/visit_bg.png" alt="Furniture Background" />
        </div>
        <div className="hero-content">
          <div className="content-inner">
            <h3>BEST MEBEL İSTEHSALÇISI</h3>
            <p>Suspendisse varius enim in eros elementum tristique.</p>
            <Link to="/about" className="cta-button">ƏTRAFLI</Link>
          </div>
        </div>
      </section>

      {/* 4. TOP PICK SECTION (Yalnız bu 3 məhsulu göstərir) */}
      <section className="product-section" data-aos="fade-up">
        <div className="section-header">
          <h2>TOP PICK</h2>
          <p>Suspendisse varius enim in eros elementum tristique.</p>
        </div>

        <div className="product-grid">
          {topPickItems.map((product, index) => (
            <div key={product.id} data-aos="fade-up" data-aos-delay={index * 200}>
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-card">
                  <div className="product-card-image">
                    {/* API-dən gələn 'image' və 'title' */}
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <p className="product-name">{product.title}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="discover-btn">DISCOVER MORE</button>
        </div>
      </section>

      {/* 5. INSTAGRAM SECTION */}
      <section className="instagram-section" data-aos="fade-up">
        <div className="instagram-container">
          <div className="instagram-icon-wrapper">
            <FiInstagram className="instagram-react-icon" />
          </div>
          <div className="instagram-content">
            <h2>GET INSPIRED WITH INSTAGRAM</h2>
            <p>
              Suspendisse varius enim in eros elementum tristique. Duis cursus, mi 
              quis viverra ornare, eros dolor interdum nulla.
            </p>
            <button className="instagram-discover-btn">DISCOVER MORE</button>
          </div>
        </div>
      </section>


      <section className="top-pick-outer-section" data-aos="fade-up">
  <div className="section-header">
    <h2>TOP PICK</h2>
    <p>Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.</p>
  </div>

  <div className="product-grid">
    {/* dbProducts massivindən ilk 3 məhsulu çəkirik */}
    {dbProducts.slice(6, 9).map((item, index) => (
      <div 
        key={item.id} 
        className="product-card-wrapper" 
        data-aos="fade-up" 
        data-aos-delay={index * 150}
      >
        <Link to={`/product/${item.id}`} className="product-link">
          <div className="product-card">
            <div className="product-card-image">
              {/* DİQQƏT: Bazanda 'image' açarıdır */}
              <img src={item.image} alt={item.title} />
            </div>
            <div className="product-info">
              {/* DİQQƏT: Bazanda 'title' açarıdır */}
              <p className="product-name">{item.title}</p>
              <p className="product-price">${item.price}</p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>

  <div className="section-footer">
    <button className="discover-btn">DISCOVER MORE</button>
  </div>
</section>


    </main>
  );
}