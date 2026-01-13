import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada login yoxlaması ola bilər
    navigate("/"); // uğurlu girişdən sonra yönləndirmə
  };

  return (
    <div
      className="login-wrapper"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div className="login-box">
        <h2>Login</h2>
        <p className="login-subtitle">Enter login details to get access</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username or Email Address</label>
          <input type="text" placeholder="Username / Email address" required />

          <label>Password</label>
          <input type="password" placeholder="Enter Password" required />

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Keep Me Logged In
            </label>
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>

          <p className="signup-text">
            Don’t have an account? <a href="/signup">Sign Up here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
