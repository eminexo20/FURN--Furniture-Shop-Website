import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiChevronDown, FiGrid, FiList, FiRefreshCw } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Catagories.css";

const CATEGORIES = ["All", "Sofa", "Table", "Chair", "Bed", "Lighting", "Decor"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Name A-Z"];

const Catagories = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [priceRange, setPriceRange] = useState(2000);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setLoading(true);
    fetch("https://699b9c6d110b5b738cc05dba.mockapi.io/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        const max = data.length > 0 ? Math.max(...data.map((p) => p.price)) : 2000;
        setPriceRange(max);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...products];
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
    result = result.filter((p) => p.price <= priceRange);

    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "Name A-Z") result.sort((a, b) => a.title.localeCompare(b.title));

    setFiltered(result);
  }, [activeCategory, sortBy, priceRange, products]);

  const maxPriceForSlider = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 2000;

  return (
    <div className="shop-page">
      {/* SHOP HERO */}
      <div className="shop-hero">
        <div className="shop-hero__content" data-aos="zoom-out">
          <h1>EXCLUSIVE COLLECTION</h1>
          <p>Home / <span>Products</span></p>
        </div>
      </div>

      <div className="shop-container">
        <div className="shop-layout">
          
          {/* SIDEBAR FILTERS */}
          <aside className="shop-sidebar" data-aos="fade-right">
            <div className="sidebar-box">
              <h3 className="sidebar-title"><FiFilter /> Filters</h3>
              
              <div className="filter-group">
                <h4>Category</h4>
                <div className="category-links">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={activeCategory === cat ? "active" : ""}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Max Price: <span>${priceRange}</span></h4>
                <input
                  type="range"
                  min={0}
                  max={maxPriceForSlider}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="modern-range"
                />
              </div>

              <button className="reset-btn" onClick={() => {
                setActiveCategory("All");
                setPriceRange(maxPriceForSlider);
                setSortBy("Default");
              }}>
                <FiRefreshCw /> Reset All
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="shop-main">
            <div className="shop-topbar" data-aos="fade-down">
              <div className="result-info">
                Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
              </div>
              <div className="sort-box">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {SORT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="shop-loader">Loading collection...</div>
            ) : (
              <div className="product-grid">
                {filtered.slice(0, visibleCount).map((product, idx) => (
                  <div className="product-card" key={product.id} data-aos="fade-up" data-aos-delay={idx * 50}>
                    <Link to={`/product/${product.id}`} className="card-link">
                      <div className="card-image">
                        <img src={product.image} alt={product.title} />
                        <div className="image-overlay">
                          <span className="view-details">VIEW DETAILS</span>
                        </div>
                      </div>
                      <div className="card-content">
                        <span className="card-cat">{product.category}</span>
                        <h3>{product.title}</h3>
                        <p className="card-price">${product.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {visibleCount < filtered.length && (
              <div className="load-more-wrap">
                <button className="load-more-btn" onClick={() => setVisibleCount(v => v + 6)}>
                  EXPLORE MORE
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catagories;