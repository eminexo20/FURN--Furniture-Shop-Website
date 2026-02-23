import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Product.css'

const CATEGORIES = ['Sofa', 'Table', 'Chair', 'Bed', 'Lighting', 'Decor']

const Product = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <div className="product-page">

      {/* HERO */}
      <div className="product-hero">
        <div className="product-hero__overlay"></div>
        <div className="product-hero__text">
          <h1>PRODUCTS</h1>
          <p><Link to="/">Home</Link> › <span>Products</span></p>
        </div>
      </div>

      {/* KATEQORİYA NAVİQASİYASI */}
      <div className="product-nav">
        {CATEGORIES.map(cat => (
          <a key={cat} href={`#${cat}`} className="product-nav__link">{cat}</a>
        ))}
      </div>

      {/* TAM KATALOQ */}
      <div className="product-catalog">
        {loading ? (
          <p className="product-loading">Yüklənir...</p>
        ) : (
          CATEGORIES.map(cat => {
            const items = products.filter(p => p.category === cat)
            if (items.length === 0) return null
            return (
              <section key={cat} id={cat} className="catalog-section">
                <div className="catalog-section__header" data-aos="fade-up">
                  <h2>{cat}</h2>
                  <span className="catalog-section__line"></span>
                  <span className="catalog-section__count">{items.length} items</span>
                </div>
                <div className="catalog-grid">
                  {items.map(product => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="catalog-card"
                      data-aos="zoom-in"
                    >
                      <div className="catalog-card__img">
                        <img src={product.image} alt={product.title} />
                        <div className="catalog-card__overlay">
                          <span>View Detail</span>
                        </div>
                      </div>
                      <div className="catalog-card__info">
                        <h3>{product.title}</h3>
                        <p className="catalog-card__price">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })
        )}
      </div>

    </div>
  )
}

export default Product
