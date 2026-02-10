import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer text-center text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h4 className="fw-bold">Website</h4>
            <h3>
              India's Leading Blood<br /> Bank Store.
            </h3>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/welcome" className="footer-link">Welcome</Link></li>
              <li><Link to="/home" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Follow Us</h6>
            <div className="social-icons d-flex justify-content-center gap-3 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-3" />
        <p className="small mb-0">
          © {new Date().getFullYear()} Website. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
