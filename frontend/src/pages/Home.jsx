import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Manage Your Contacts
              <span className="gradient-text"> Effortlessly</span>
            </h1>
            <p className="hero-description">
              A modern, intuitive contact management system that helps you organize, 
              search, and manage all your contacts in one place. Simple, secure, and efficient.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="contact-item">
                  <div className="contact-avatar">JD</div>
                  <div className="contact-info">
                    <h4>John Doe</h4>
                    <p>john@example.com</p>
                  </div>
                  <span className="status-badge active">Active</span>
                </div>
                <div className="contact-item">
                  <div className="contact-avatar">JS</div>
                  <div className="contact-info">
                    <h4>Jane Smith</h4>
                    <p>jane@example.com</p>
                  </div>
                  <span className="status-badge active">Active</span>
                </div>
                <div className="contact-item">
                  <div className="contact-avatar">MB</div>
                  <div className="contact-info">
                    <h4>Mike Brown</h4>
                    <p>mike@example.com</p>
                  </div>
                  <span className="status-badge">Inactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to manage your contacts</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and secure with JWT authentication</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Quick Search</h3>
              <p>Find contacts instantly with real-time search functionality</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>Easy Management</h3>
              <p>Create, edit, and delete contacts with intuitive interface</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Works seamlessly on desktop, tablet, and mobile devices</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Modern UI</h3>
              <p>Clean and professional interface with smooth animations</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Built with modern tech stack for optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users managing their contacts efficiently</p>
          <Link to="/signup" className="btn btn-cta">
            Create Free Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
