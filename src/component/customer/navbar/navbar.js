import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../img/logo.png'
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path);
  };

  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="container">
        <img src={logo} alt="Logo NEXAPRO" className="navbar-logo" style={{height: 70}}/>

        {/* Desktop Navigation */}
        <div className={`navbar-links-desktop ${isMobileMenuOpen ? 'hidden' : ''}`}>
          <ul className="navbar-links">
            <li className={`navbar-item ${isLinkActive('/customerHome') ? 'active' : ''}`}>
              <Link to="/customerHome"><i className="bi bi-house-door"></i> Home</Link>
            </li>
            <li className={`navbar-item ${isLinkActive('/customerStreaming') ? 'active' : ''}`}>
              <Link to="/customerStreaming"><i className="bi bi-film"></i> Straming</Link>
            </li>
            <li className={`navbar-item ${isLinkActive('/') ? 'active' : ''}`}>
              <Link to="/"><i className="bi bi-camera-video"></i> Software Editing</Link>
            </li>
            <li className={`navbar-item ${isLinkActive('/') ? 'active' : ''}`}>
              <Link to="/"><i className="bi bi-person"></i> Profil</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile Menu (slides in) */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-links">
          <li className={`mobile-item ${isLinkActive('/customerHome') ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <Link to="/customerHome"><i className="bi bi-house-door"></i> Home</Link>
          </li>
          <li className={`mobile-item ${isLinkActive('/') ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <Link to="/"><i className="bi bi-film"></i> Streaming</Link>
          </li>
          <li className={`mobile-item ${isLinkActive('/') ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <Link to="/"><i className="bi bi-camera-video"></i> Software Editing</Link>
          </li>
          <li className={`mobile-item ${isLinkActive('/') ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <Link to="/"><i className="bi bi-person"></i> Profil</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;