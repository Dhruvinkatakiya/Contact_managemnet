import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">📇</span>
              ContactHub
            </h3>
            <p className="footer-description">
              Your modern contact management solution. Simple, secure, and efficient.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li><a href="https://github.com/Dhruvinkatakiya" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#twitter">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} ContactHub. Built with ❤️ by Dhruvin Katakiya</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
