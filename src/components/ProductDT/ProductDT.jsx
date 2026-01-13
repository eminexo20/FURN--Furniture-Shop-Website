import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useCart } from "../../components/CartContext/CartContext"; // Context-i buraya çağırdım
import "./ProductDT.css";

export default function ProductDT() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { addToCart } = useCart(); // Səbətə əlavə etmə funksiyasını götürdüm

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // Əlavə etmə funksiyası
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, count);
      // İstifadəçiyə vizual reaksiya (İstəsən alert-i silib toast qoya bilərsən)
      console.log(`${count} ədəd ${product.title} səbətə əlavə edildi.`);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-dt-wrapper">
      <div className="container">
        <div className="product-dt-content">
          
          {/* SOL TƏRƏF - ŞƏKİL QALEREYASI */}
          <div className="dt-left">
            <div className="main-img-holder">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="thumb-list">
              <img src={product.image} className="active" alt="thumb" />
              <img src="/images/chair-img1.jpg" alt="thumb" />
              <img src="/images/chair-img2.jpg" alt="thumb" />
              <img src="/images/chair-img3.jpg" alt="thumb" />
            </div>
          </div>

          {/* SAĞ TƏRƏF - DETALLAR */}
          <div className="dt-right">
            <h1 className="product-name">{product.title}</h1>
            <p className="product-price">${product.price}.99</p>
            
            <div className="product-info-meta">
              <p><span>Category</span> : <span className="highlight">{product.category}</span></p>
              <p><span>Availibility</span> : <span className="highlight">In Stock</span></p>
            </div>

            <div className="divider"></div>

            <p className="product-description">
              Mill Oil is an innovative oil filled radiator with the most modern technology. 
              If you are looking for something that can make your interior look awesome, 
              and at the same time.
            </p>

            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => count > 1 && setCount(count - 1)}>−</button>
                <input type="text" value={count} readOnly />
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
              
              {/* Düyməyə funksiyanı bağladım */}
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              
              <button className="wishlist-icon">♡</button>
            </div>

            <div className="social-links">
              <a href="#" className="fb"><FaFacebookF /></a>
              <a href="#" className="tw"><FaTwitter /></a>
              <a href="#" className="li"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}