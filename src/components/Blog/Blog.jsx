import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiMessageSquare, FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Modern Furniture Trends for 2026',
    desc: "Experience the fusion of minimalist design and maximum comfort. Explore how sustainable materials are shaping the future of interior aesthetics.",
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070',
    day: '15', month: 'Jan',
    category: 'Interior',
    comments: 3,
  },
  {
    id: 2,
    title: 'Maximizing Small Living Spaces',
    desc: "Discover smart furniture solutions that turn tiny apartments into spacious homes without sacrificing style or functionality.",
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070',
    day: '18', month: 'Feb',
    category: 'Design',
    comments: 7,
  },
  {
    id: 3,
    title: 'The Art of Choosing the Right Sofa',
    desc: "A sofa is the heart of your living room. Learn the key factors to consider: from fabric durability to ergonomic support.",
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070',
    day: '22', month: 'Mar',
    category: 'Lifestyle',
    comments: 10,
  }
];

const categories = [
  { name: 'Interior Design', count: 37 },
  { name: 'Minimalism', count: 10 },
  { name: 'Wood Crafts', count: 3 },
  { name: 'Decorations', count: 11 },
];

const tags = ['furniture', 'design', 'modern', 'home', 'comfort', 'eco'];

const POSTS_PER_PAGE = 2;

const Blog = () => {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Filter Logic
  let filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    setCurrentPage(1);
  };

  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>OUR JOURNAL</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <strong>Blog</strong>
          </div>
        </div>
      </section>

      <div className="blog-container">
        <div className="blog-grid">
          
          {/* MAIN POSTS */}
          <main className="blog-main-content">
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <article className="blog-card" key={post.id} data-aos="fade-up">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="post-date">
                      <span className="day">{post.day}</span>
                      <span className="month">{post.month}</span>
                    </div>
                  </div>
                  <div className="blog-card-details">
                    <Link to={`/blog/${post.id}`} className="post-title">
                      <h2>{post.title}</h2>
                    </Link>
                    <p>{post.desc}</p>
                    <div className="post-footer">
                      <span className="post-info"><FiUser /> {post.category}</span>
                      <span className="post-divider"></span>
                      <span className="post-info"><FiMessageSquare /> {post.comments} Comments</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-results">No posts found matching your criteria.</div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><FiChevronLeft /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><FiChevronRight /></button>
              </div>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="blog-sidebar">
            {/* Search Widget */}
            <div className="sidebar-widget" data-aos="fade-left">
              <form className="search-form" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit"><FiSearch /></button>
              </form>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget" data-aos="fade-left">
              <h3 className="widget-title">Categories</h3>
              <ul className="category-list">
                {categories.map((cat, i) => (
                  <li key={i} onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}>
                    <span className={activeCategory === cat.name ? 'active' : ''}>{cat.name}</span>
                    <span className="count">({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Widget */}
            <div className="sidebar-widget newsletter-widget" data-aos="fade-left">
              <h3 className="widget-title">Newsletter</h3>
              {subscribed ? (
                <div className="sub-success"><FiCheck /> Subscribed Successfully!</div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                  <input type="email" placeholder="Email Address" required />
                  <button type="submit">SUBSCRIBE</button>
                </form>
              )}
            </div>

            {/* Tags Widget */}
            <div className="sidebar-widget" data-aos="fade-left">
              <h3 className="widget-title">Popular Tags</h3>
              <div className="tag-cloud">
                {tags.map((tag, i) => (
                  <span key={i} className="tag-item">#{tag}</span>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default Blog;