// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: example@example.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <p><a href="#" target="_blank">Facebook</a></p>
          <p><a href="#" target="_blank">Twitter</a></p>
          <p><a href="#" target="_blank">Instagram</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Your Website Name
      </div>
    </footer>
  );
}

export default Footer;
