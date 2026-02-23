import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Blog.css'

const blogPosts = [
  {
    id: 1,
    title: 'Google inks pact for new 35-storey office',
    desc: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
    image: 'https://picsum.photos/seed/blog1/800/400',
    day: '15', month: 'Jan',
    category: 'Travel, Lifestyle',
    comments: 3,
  },
  {
    id: 2,
    title: 'The Amazing Hubble Space Discovery',
    desc: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
    image: 'https://picsum.photos/seed/blog2/800/400',
    day: '18', month: 'Feb',
    category: 'Technology',
    comments: 7,
  },
  {
    id: 3,
    title: 'Modern Interior Design Trends 2024',
    desc: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
    image: 'https://picsum.photos/seed/blog3/800/400',
    day: '22', month: 'Mar',
    category: 'Design, Lifestyle',
    comments: 10,
  },
  {
    id: 4,
    title: 'Best Furniture Picks for Small Spaces',
    desc: "That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.",
    image: 'https://picsum.photos/seed/blog4/800/400',
    day: '05', month: 'Apr',
    category: 'Product',
    comments: 5,
  },
]

const categories = [
  { name: 'Restaurant food', count: 37 },
  { name: 'Travel news', count: 10 },
  { name: 'Modern technology', count: 3 },
  { name: 'Product', count: 11 },
  { name: 'Inspiration', count: 21 },
  { name: 'Health Care', count: 9 },
]

const recentPosts = [
  { id: 1, title: 'From life was you fish...', date: 'January 12, 2019', image: 'https://picsum.photos/seed/r1/80/80' },
  { id: 2, title: 'The Amazing Hubble', date: '02 Hours ago', image: 'https://picsum.photos/seed/r2/80/80' },
  { id: 3, title: 'Astronomy Or Astrology', date: '03 Hours ago', image: 'https://picsum.photos/seed/r3/80/80' },
  { id: 4, title: 'Asteroids telescope', date: '01 Hours ago', image: 'https://picsum.photos/seed/r4/80/80' },
]

const tags = ['project', 'love', 'technology', 'travel', 'restaurant', 'life style', 'design', 'illustration']

const POSTS_PER_PAGE = 2

const Blog = () => {
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const navigate = useNavigate()

  // Filterleme
  let displayedPosts = [...blogPosts]

  if (searchQuery) {
    displayedPosts = displayedPosts.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  if (activeCategory) {
    displayedPosts = displayedPosts.filter(p =>
      p.category.toLowerCase().includes(activeCategory.toLowerCase())
    )
  }

  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE)
  const paginated = displayedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  const handleSearch = () => {
    setSearchQuery(search)
    setCurrentPage(1)
    setActiveCategory(null)
  }

  const handleCategory = (name) => {
    setActiveCategory(prev => prev === name ? null : name)
    setCurrentPage(1)
    setSearchQuery('')
    setSearch('')
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="blog-page">

      {/* HERO */}
      <div className="blog-hero">
        <div className="blog-hero__overlay"></div>
        <div className="blog-hero__text">
          <h1>BLOG</h1>
          <p><Link to="/">Home</Link> › <span>Blog</span></p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="blog-content">

        {/* SOL - POSTLAR */}
        <div className="blog-main">

          {paginated.length === 0 ? (
            <div className="blog-empty">
              <p>Heç bir yazı tapılmadı.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory(null); setCurrentPage(1) }}>
                Sıfırla
              </button>
            </div>
          ) : (
            paginated.map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-card__img-wrap">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-card__date">
                    <span className="blog-card__day">{post.day}</span>
                    <span className="blog-card__month">{post.month}</span>
                  </div>
                </div>
                <div className="blog-card__body">
                  <h3>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.desc}</p>
                  <div className="blog-card__meta">
                    <span><i className="bi bi-person"></i> {post.category}</span>
                    <span>|</span>
                    <span><i className="bi bi-chat"></i> {post.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* PAGİNATION */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <i className="bi bi-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} className={currentPage === n ? 'active' : ''} onClick={() => setCurrentPage(n)}>
                  {n}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>

        {/* SİDEBAR */}
        <aside className="blog-sidebar">

          {/* SEARCH */}
          <div className="sidebar-widget">
            <div className="sidebar-search">
              <input
                type="text"
                placeholder="Search Keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch}><i className="bi bi-search"></i></button>
            </div>
            <button className="sidebar-search__btn" onClick={handleSearch}>SEARCH</button>
          </div>

          {/* CATEGORY */}
          <div className="sidebar-widget">
            <h4 className="sidebar-widget__title">Category</h4>
            <ul className="sidebar-categories">
              {categories.map((cat, i) => (
                <li key={i} className={activeCategory === cat.name ? 'active' : ''} onClick={() => handleCategory(cat.name)}>
                  <span>{cat.name}</span>
                  <span>({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RECENT POST */}
          <div className="sidebar-widget">
            <h4 className="sidebar-widget__title">Recent Post</h4>
            <ul className="sidebar-recent">
              {recentPosts.map((post) => (
                <li key={post.id} onClick={() => navigate(`/blog/${post.id}`)}>
                  <img src={post.image} alt={post.title} />
                  <div>
                    <p>{post.title}</p>
                    <span>{post.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* TAG CLOUDS */}
          <div className="sidebar-widget">
            <h4 className="sidebar-widget__title">Tag Clouds</h4>
            <div className="sidebar-tags">
              {tags.map((tag, i) => (
                <span key={i} className={`sidebar-tag ${activeCategory === tag ? 'active' : ''}`} onClick={() => handleCategory(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* INSTAGRAM */}
          <div className="sidebar-widget">
            <h4 className="sidebar-widget__title">Instagram Feeds</h4>
            <div className="sidebar-instagram">
              {[10, 20, 30, 40, 50, 60].map((n) => (
                <div key={n} className="sidebar-instagram__img">
                  <img src={`https://picsum.photos/seed/insta${n}/100/100`} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="sidebar-widget">
            <h4 className="sidebar-widget__title">Newsletter</h4>
            {subscribed ? (
              <p className="sidebar-subscribed">Abunə oldunuz! ✓</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="sidebar-newsletter__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="sidebar-newsletter__btn">SUBSCRIBE</button>
              </form>
            )}
          </div>

        </aside>
      </div>
    </div>
  )
}

export default Blog