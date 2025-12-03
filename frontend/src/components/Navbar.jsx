import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ContactHub
        </Link>
        
        <div className="navbar-menu">
          <Link to="/login" className="navbar-btn btn-login">
            Login
          </Link>
          <Link to="/signup" className="navbar-btn btn-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
