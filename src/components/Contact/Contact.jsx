import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

const Contact = () => {
  const [form, setForm] = useState({
    message: "",
    name: "",
    email: "",
    subject: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ message: "", name: "", email: "", subject: "" });
  };

  return (
    <div className="contact-page">
      {/* HERO BANNER */}
      <div className="contact-hero">
        <div className="contact-hero__overlay"></div>
        <div className="contact-hero__text">
          <h1>CONTACT US</h1>
          <p>
            <Link to="/">Home</Link> &rsaquo; <span>Contact</span>
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="contact-content">
        {/* SOL - FORM */}
        <div className="contact-form-wrap">
          <h2>Get in Touch</h2>

          {sent && (
            <div className="contact-success">
              Mesajınız göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <textarea
              name="message"
              placeholder="Enter Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
            />

            <div className="contact-form__row">
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <button type="submit" className="contact-form__btn">
              SEND
            </button>
          </form>
        </div>

        {/* SAĞ - ƏLAQƏ MELUMATİ */}
        <div className="contact-info">
          <div className="contact-info__item">
            <div className="contact-info__icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <div>
              <p className="contact-info__title">Buttonwood, California.</p>
              <p className="contact-info__sub">Rosemead, CA 91770</p>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">
              <i className="bi bi-telephone"></i>
            </div>
            <div>
              <p className="contact-info__title">+1 253 565 2365</p>
              <p className="contact-info__sub">Mon to Fri, 8am to 8pm</p>
            </div>
          </div>

          <div className="contact-info__item">
            <div className="contact-info__icon">
              <i className="bi bi-envelope"></i>
            </div>
            <div>
              <p className="contact-info__title">support@colorlib.com</p>
              <p className="contact-info__sub">Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;