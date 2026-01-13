import React from 'react';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaPinterestP 
} from 'react-icons/fa';
import { 
  MdLocalShipping, 
  MdSecurity, 
  MdAssignmentReturn, 
  MdHeadsetMic 
} from 'react-icons/md'; // Material Design ikonları
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* Üst Servis Bölməsi (İkonlarla) */}
      <div className="services-section">
        <div className="service-item">
          <MdLocalShipping className="service-icon" />
          <h4>Fast & Free Delivery</h4>
          <p>Free delivery on all orders</p>
        </div>
        <div className="service-item">
          <MdSecurity className="service-icon" />
          <h4>Secure Payment</h4>
          <p>Free delivery on all orders</p>
        </div>
        <div className="service-item">
          <MdAssignmentReturn className="service-icon" />
          <h4>Money Back Guarantee</h4>
          <p>Free delivery on all orders</p>
        </div>
        <div className="service-item">
          <MdHeadsetMic className="service-icon" />
          <h4>Online Support</h4>
          <p>Free delivery on all orders</p>
        </div>
      </div>

      {/* Əsas Footer Bölməsi */}
      <div className="main-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>F U</span>
              <span>R N</span>
            </div>
            <p>
              Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
            </p>
            <div className="social-links">
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaPinterestP /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <div className="link-column">
              <h4>Quick links</h4>
              <ul>
                <li><a href="#">Image Licensin</a></li>
                <li><a href="#">Style Guide</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Shop Category</h4>
              <ul>
                <li><a href="#">Image Licensin</a></li>
                <li><a href="#">Style Guide</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Partners</h4>
              <ul>
                <li><a href="#">Image Licensin</a></li>
                <li><a href="#">Style Guide</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;