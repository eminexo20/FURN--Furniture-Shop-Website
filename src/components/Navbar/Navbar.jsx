import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../components/CartContext/CartContext"; // Yolun düzgünlüyünü yoxla
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart(); // Səbət sayını götürürük
  const [isOpen, setIsOpen] = useState(false); // Hamburger menyu üçün state

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">FURN</Link>
      </div>

      {/* Hamburger İkonu */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/product" onClick={() => setIsOpen(false)}>Product</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>

        <li className="dropdown">
          <span className="dropdown-toggle">Page</span>
          <ul className="dropdown-menu">
            <li><Link to="/account" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/card" onClick={() => setIsOpen(false)}>Cart</Link></li>
            <li><Link to="/catagories" onClick={() => setIsOpen(false)}>Categories</Link></li>
          </ul>
        </li>

        <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
      </ul>

      <div className="nav-right">
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-button"><i className="bi bi-search"></i></button>
        </div>
        <Link to="/account" className="account-link">My Account</Link>
        
        {/* Səbət İkonu və Dinamik Rəqəm */}
        <Link to="/card" className="cart-icon">
          <i className="bi bi-cart"></i>
          <span className="cart-count">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}