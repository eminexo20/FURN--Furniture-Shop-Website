import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Product from "./components/Product/Product";
import Blog from "./components/Blog/Blog";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Contact from "./components/Contact/Contact";
import Page from "./components/Page/Page";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer"; // Buradadır!

import ProductDT from "./components/ProductDT/ProductDT";
import Card from "./components/Card/Card";
import Catagories from "./components/Catagories/Catagories";
import BlogDT from "./components/BlogDT/BlogDT";
import { CartProvider } from "./components/CartContext/CartContext";

function Layout() {
  const location = useLocation();
  // Login səhifəsində həm Navbar, həm də Footer gizlənəcək
  const isAccountPage = location.pathname === "/account"; 

  return (
    <>
      {/* Navbar yalnız account səhifəsində deyilsə görünür */}
      {!isAccountPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/page" element={<Page />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdt" element={<BlogDT />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Login />} />
        <Route path="/product/:id" element={<ProductDT />} />
        <Route path="/card" element={<Card />} />
        <Route path="/catagories" element={<Catagories />} />
        
      </Routes>

      {/* FOOTER-İ BURADA ÇAĞIRIRIQ */}
      {!isAccountPage && <Footer />}
      <ScrollTop />
    </>
  );
}

export default function App() {
  return (
    // Bütün tətbiqi CartProvider ilə əhatə edirik ki, səbət məlumatları hər yerdə işləsin
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}