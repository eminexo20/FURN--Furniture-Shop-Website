import { useCart } from "../CartContext/CartContext";
import "./Card.css";

export default function Card() {
  const { cart, addToCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart-message">
          <h2>Səbətiniz boşdur</h2>
          <p>Məhsullara baxmaq üçün ana səhifəyə qayıdın.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Səbətim</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Məhsul</th>
            <th>Qiymət</th>
            <th>Miqdar</th>
            <th>Cəmi</th>
          </tr>
        </thead>
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
                  <button 
                    onClick={() => addToCart(item, -1)} 
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item, 1)}>+</button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <h3>
          <span>Cəmi:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </h3>
        <button className="checkout-btn">Alış-verişi tamamla</button>
      </div>
    </div>
  );
}