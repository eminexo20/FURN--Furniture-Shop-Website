import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Catagories.css";

const CATEGORIES = ["All", "Sofa", "Table", "Chair", "Bed", "Lighting", "Decor"];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Name A-Z"];

const Catagories = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [priceRange, setPriceRange] = useState(500);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.price <= priceRange);

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Name A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFiltered(result);
    setVisibleCount(9);
  }, [activeCategory, sortBy, priceRange, products]);

  const maxPrice = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 500;

  return (
    <div className="shop">
      {/* BAŞLIQ */}
      <div className="shop__header">
        <h1>SHOP WITH US</h1>
        <p>Browse from {products.length} latest items</p>
      </div>

      <div className="shop__body">
        {/* SOL - FİLTER PANELİ */}
        <aside className="shop__sidebar">
          <div className="sidebar__title">
            <i className="bi bi-funnel"></i> Filter Product
          </div>

          {/* KATEQORİYA */}
          <div className="sidebar__section">
            <label className="sidebar__label">Type</label>
            <div className="sidebar__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`sidebar__cat-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* QİYMƏT ARALIĞI */}
          <div className="sidebar__section">
            <label className="sidebar__label">Price Range</label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="sidebar__range"
            />
            <div className="sidebar__price-info">
              <span>Price:</span>
              <span>$0 to ${priceRange}</span>
            </div>
          </div>

          {/* RESET */}
          <button
            className="sidebar__reset"
            onClick={() => {
              setActiveCategory("All");
              setPriceRange(maxPrice);
              setSortBy("Default");
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* SAĞ - MƏHSULLAR */}
        <div className="shop__main">
          {/* TOP BAR */}
          <div className="shop__topbar">
            <span className="shop__count">{filtered.length} Product found</span>
            <div className="shop__sort">
              <label>Sort by</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* GRID */}
          {loading ? (
            <p className="shop__loading">Yüklənir...</p>
          ) : filtered.length === 0 ? (
            <p className="shop__empty">Heç bir məhsul tapılmadı.</p>
          ) : (
            <>
              <div className="shop__grid">
                {filtered.slice(0, visibleCount).map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="shop__card">
                    <div className="shop__card-img">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="shop__card-info">
                      <h3>{product.title}</h3>
                      <p className="shop__card-price">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="shop__more">
                  <button
                    className="shop__more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    BROWSE MORE
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catagories;