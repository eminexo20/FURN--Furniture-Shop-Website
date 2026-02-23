import React from 'react';
import './About.css';
import hero from "../../assets/hero.png";
import { FiInstagram } from "react-icons/fi";

const About = () => {
  const journeyImg = process.env.PUBLIC_URL + '/images/sofa-img2.jpg';
  return (
    
    <>
    <div className="about-wrapper">
      {/* Sol yuxarıdakı narıncı kvadrat və daxilindəki RN loqosu */}
      <div className="top-brand-box">
        <div className="inner-border">
          <span>FURN</span>
        </div>
      </div>

      <header className="about-header">
        {/* Arxa plandakı şəkil */}
        <div 
          className="hero-bg-image" 
          style={{ backgroundImage: `url(${hero})` }}
        ></div>

        {/* Şəklin üzərindəki maili kəsilmiş ağ qat */}
        <div className="hero-white-overlay">
          <div className="hero-content">
            <h1>ABOUT</h1>
            <p className="breadcrumb">
              <a href="/">Home</a> <span>&gt;</span> About
            </p>
          </div>
        </div>
      </header>

      {/* Alt hissədəki bej rəngli boşluq/zolaq */}
      <div className="bottom-accent-bar"></div>
    </div>
    
    <section className="story-section">
      <div className="story-container">
        {/* Sol tərəf: Mətnlər */}
        <div className="story-text">
          <h2 className="section-title">OUR STORY</h2>
          
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br />
           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <br /> laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in <br /> 

           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        {/* Sağ tərəf: Dilimlənmiş Şəkil Effekti */}
        <div className="sliced-image-container">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="image-slice" 
              style={{ 
                backgroundImage: `url('/images/table-img1.jpg')`,
                backgroundPosition: `0 ${index * 20}%` 
              }}
            ></div>
          ))}
          {/* Arxa tərəfdəki qəhvəyi dayaqlar */}
          <div className="image-stand-left"></div>
          <div className="image-stand-right"></div>
        </div>
      </div>
    </section>

    <section className="journey-section">
      <div className="journey-content">
        <h2 className="journey-title">JOURNEY START FROM</h2>
        <p className="journey-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br /> sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim <br />ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Dilimlənmiş Şəkil Bloku */}
        <div className="journey-image-container">
          {[...Array(4)].map((_, index) => (
            <div 
            key={index} 
            className="journey-slice" 
            style={{ 
              // DÜZƏLİŞ: url() əlavə edildi
              backgroundImage: "url('/images/sofa-img3.jpg')", 
              backgroundPosition: `0 ${index * 33.3}%` 
            }}
          ></div>
          ))}
        </div>

        {/* İl və alt mətn */}
        <div className="journey-footer">
          <h2 className="journey-year">2020</h2>
          <p className="journey-desc">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>

    <section className="instagram-section" data-aos="fade-up">
        <div className="instagram-container">
          <div className="instagram-icon-wrapper">
            <FiInstagram className="instagram-react-icon" />
          </div>
          <div className="instagram-content">
            <h2>GET INSPIRED WITH INSTAGRAM</h2>
            <p>
              Suspendisse varius enim in eros elementum tristique. Duis cursus, mi 
              quis viverra ornare, eros dolor interdum nulla.
            </p>
            <button className="instagram-discover-btn">DISCOVER MORE</button>
          </div>
        </div>
      </section>
    </>
  );
  
};

export default About;