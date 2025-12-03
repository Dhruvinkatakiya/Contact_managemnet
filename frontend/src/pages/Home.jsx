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
        <div className="hero-background">
          <div className="hero-grid"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Built for professionals
            </div>
            <h1 className="hero-title">
              Your contacts.<br />
              Organized. Accessible.<br />
              <span className="highlight">Anywhere.</span>
            </h1>
            <p className="hero-description">
              Stop juggling spreadsheets and sticky notes. ContactHub brings all your 
              professional connections into one intelligent workspace.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary">
                Start organizing
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link to="/login" className="btn btn-ghost">
                I have an account
              </Link>
            </div>
           
          </div>
          
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-tabs">
                  <div className="tab active">All Contacts</div>
                  <div className="tab">Recent</div>
                  <div className="tab">Favorites</div>
                </div>
                <div className="preview-search">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Search contacts...</span>
                </div>
              </div>
              <div className="preview-list">
                <div className="preview-contact">
                  <div className="contact-avatar purple">SK</div>
                  <div className="contact-details">
                    <div className="contact-name">Sarah Kim</div>
                    <div className="contact-email">s.kim@company.com</div>
                  </div>
                  <div className="contact-status active"></div>
                </div>
                <div className="preview-contact">
                  <div className="contact-avatar blue">MJ</div>
                  <div className="contact-details">
                    <div className="contact-name">Michael Johnson</div>
                    <div className="contact-email">michael.j@tech.io</div>
                  </div>
                  <div className="contact-status active"></div>
                </div>
                <div className="preview-contact">
                  <div className="contact-avatar orange">AC</div>
                  <div className="contact-details">
                    <div className="contact-name">Amanda Chen</div>
                    <div className="contact-email">amanda@startup.co</div>
                  </div>
                  <div className="contact-status"></div>
                </div>
                <div className="preview-contact">
                  <div className="contact-avatar green">DL</div>
                  <div className="contact-details">
                    <div className="contact-name">David Lee</div>
                    <div className="contact-email">dlee@design.com</div>
                  </div>
                  <div className="contact-status active"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Everything you need.<br />Nothing you don't.</h2>
          </div>
          
          <div className="features-grid">
           
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Real-time Sync</h3>
              <p>Access your contacts from any device. Changes sync instantly across all platforms.</p>
            </div>
          
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M21 3L11.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Instant Search</h3>
              <p>Find anyone in milliseconds. No more scrolling through endless lists.</p>
            </div>
            
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 10H10M6 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Clean Interface</h3>
              <p>No clutter, no confusion. Just a straightforward tool that works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Stop losing track of important connections</h2>
            <p>Join professionals who've already simplified their contact management</p>
            <Link to="/signup" className="btn btn-cta">
              Create your free account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
