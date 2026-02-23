import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="contact-v3">
      {/* HEADER SECTION */}
      <header className="v3-header">
        <span className="v3-subtitle">GET IN TOUCH</span>
        <h1>Contact Our Team</h1>
        <p>Have a question or feedback? We would love to hear from you.</p>
      </header>

      <div className="v3-container">
        <div className="v3-wrapper">
          
          {/* LEFT SIDE: INFO CARDS */}
          <div className="v3-info-column">
            <div className="v3-info-card orange-gradient">
              <FiPhone className="v3-icon" />
              <h4>Call Center</h4>
              <p>+1 253 565 2365</p>
              <span>Mon - Fri, 09:00 AM - 06:00 PM</span>
            </div>

            <div className="v3-info-card white-card">
              <FiMail className="v3-icon orange-text" />
              <h4>Email Support</h4>
              <p>support@furnmodern.com</p>
              <span>Online support 24/7</span>
            </div>

            <div className="v3-info-card white-card">
              <FiMapPin className="v3-icon orange-text" />
              <h4>Our Location</h4>
              <p>Buttonwood, CA 91770, USA</p>
              <span>Visit our showroom anytime</span>
            </div>
          </div>

          {/* RIGHT SIDE: MODERN FORM */}
          <div className="v3-form-area">
            <form className="v3-form">
              <div className="v3-input-row">
                <div className="v3-group">
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="E.g. John Doe" required />
                </div>
                <div className="v3-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="v3-group">
                <label>Subject</label>
                <input type="text" name="subject" placeholder="What is this about?" required />
              </div>
              <div className="v3-group">
                <label>Your Message</label>
                <textarea name="message" rows="5" placeholder="Tell us more about your request..." required></textarea>
              </div>
              <button type="submit" className="v3-submit-btn">
                SEND MESSAGE <FiSend />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* COLORED MAP */}
      <div className="v3-map">
        <iframe 
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.07071!3d34.0507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d3cf8d4337b5%3A0x86c78119777f985b!2sRosemead%2C%20CA%2091770!5e0!3m2!1sen!2sus!4v1700000000000" 
          width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

export default Contact;