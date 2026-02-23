import React, { useEffect } from 'react';
import './About.css';
import { FiInstagram, FiCheckCircle } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Professional Furniture Images from Unsplash
  const heroImg = "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070";
  const storyImg = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070";
  const missionImg = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070";

  return (
    <div className="about-page">
      {/* --- HERO SECTION --- */}
      <div className="about-wrapper">
        <div className="top-brand-box" data-aos="fade-down">
          <div className="inner-border">
            <span>FURN</span>
          </div>
        </div>

        <header className="about-header">
          <div 
            className="hero-bg-image" 
            style={{ backgroundImage: `url(${heroImg})` }}
          ></div>
          <div className="hero-white-overlay" data-aos="fade-right">
            <div className="hero-content">
              <h1>ABOUT US</h1>
              <p className="breadcrumb">
                <a href="/">Home</a> <span>&gt;</span> About
              </p>
            </div>
          </div>
        </header>
        <div className="bottom-accent-bar"></div>
      </div>
      
      {/* --- OUR STORY SECTION --- */}
      <section className="story-section">
        <div className="container-custom">
          <div className="story-text" data-aos="fade-up">
            <h2 className="section-title">OUR STORY</h2>
            <div className="title-underline"></div>
            <p>
              Our journey begins at the intersection of quality and design. 
              Every piece of furniture is crafted with special care for your comfort. 
              We blend modern aesthetics with timeless elegance to transform your living spaces.
            </p>
          </div>

          <div className="sliced-image-container" data-aos="fade-left">
            <div className="image-stand-left"></div>
            <div className="image-stand-right"></div>
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="image-slice" 
                style={{ 
                  backgroundImage: `url(${storyImg})`,
                  backgroundPosition: `0 ${(index * 100) / 5}%` // Exact slice calculation
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTAGRAM SECTION --- */}
      <section className="instagram-section" data-aos="zoom-in">
        <div className="instagram-container">
          <div className="instagram-icon-wrapper">
            <FiInstagram className="instagram-react-icon" />
          </div>
          <div className="instagram-content">
            <h2>GET INSPIRED WITH INSTAGRAM</h2>
            <p>Join our community for the latest interior design trends</p>
            <button className="instagram-discover-btn">FOLLOW US</button>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="mission-section">
        <div className="container-custom reverse-layout">
          <div className="sliced-image-container left-side" data-aos="fade-right">
            <div className="image-stand-left"></div>
            <div className="image-stand-right"></div>
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="image-slice" 
                style={{ 
                  backgroundImage: `url(${missionImg})`,
                  backgroundPosition: `0 ${(index * 100) / 5}%`
                }}
              ></div>
            ))}
          </div>

          <div className="mission-text" data-aos="fade-left">
            <h2 className="section-title">OUR MISSION</h2>
            <div className="title-underline"></div>
            <p>
              Our mission is not just to sell furniture, but to create a peaceful atmosphere in your home. 
              We prioritize eco-friendly materials and ergonomic shapes.
            </p>
            <ul className="mission-list">
              <li><FiCheckCircle /> Sustainable Wood Materials</li>
              <li><FiCheckCircle /> Ergonomic Design Philosophy</li>
              <li><FiCheckCircle /> 10-Year Warranty Guarantee</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;