import React, { useState } from 'react';
import { useCart } from "../../components/CartContext/CartContext";
import { FiMinus, FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import "./Card.css";

export default function Card() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // Ödəniş vəziyyəti

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Ödənişi bitirmə funksiyası
  const handleCheckout = () => {
    if (cart.length > 0) {
      setIsOrderPlaced(true); // Uğur mesajını göstər
      setTimeout(() => {
        clearCart(); // 3 saniyə sonra səbəti təmizlə
        setIsOrderPlaced(false);
      }, 3000);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="success-screen">
        <FiCheckCircle className="success-icon" />
        <h2>Thank You for Your Order!</h2>
        <p>Your payment was successful. Redirecting...</p>
      </div>
    );
  }

  // Səbət boşdursa (əvvəlki kodundakı kimi saxla)...
  if (cart.length === 0) return <div className="empty-cart-message"><h2>Cart is Empty</h2></div>;

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <table className="cart-table">
        {/* Thead hissəsi eyni qalır... */}
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="product-cell">
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </td>
              <td>${item.price}</td>
              <td>
                <div className="qty-controls">
                  <button onClick={() => addToCart(item, -1)} disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item, 1)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                {/* ZİBİL QUTUSU BURADA İŞLƏK EDİLDİ */}
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                  title="Remove Item"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        {/* ÖDƏNİŞ DÜYMƏSİ BURADA İŞLƏK EDİLDİ */}
        <button className="checkout-btn" onClick={handleCheckout}>
          COMPLETE PAYMENT
        </button>
      </div>
    </div>
  );
}