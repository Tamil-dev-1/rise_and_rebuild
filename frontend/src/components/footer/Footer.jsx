import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container fluid className="px-lg-5">
        <Row className="align-items-center gy-4">
          
          {/* Logo Section */}
          <Col lg={3} md={6} className="text-start">
            <div className="brand-title">
              RISE <span className="ampersand">&</span> REBUILD
            </div>
            <p className="brand-tagline">
              From Inspiration<br />to Transformation.
            </p>
          </Col>

          {/* Quick Links Column */}
          <Col lg={4} md={6}>
            <div className="vertical-divider-left ps-lg-4">
              <h6 className="footer-heading mb-3">QUICK LINKS</h6>
              <Row className="quick-links">
                <Col xs={4}>
                  <a href="#home">Home</a>
                  <a href="#about">About</a>
                  <a href="#season2">Season 2</a>
                </Col>
                <Col xs={4}>
                  <a href="#journey">Journey</a>
                  <a href="#experience">Experience</a>
                  <a href="#testimonials">Testimonials</a>
                </Col>
                <Col xs={4}>
                  <a href="#faq">FAQ</a>
                  <a href="#contact">Contact</a>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Follow Us Section */}
          <Col lg={3} md={6} className="text-center text-md-start">
            <div className="section-divider">
              <h6 className="footer-heading mb-3">FOLLOW US</h6>
              <div className="social-icons d-flex justify-content-center justify-content-md-start gap-3">
                <a href="#instagram" className="social-circle"><FaInstagram /></a>
                <a href="#facebook" className="social-circle"><FaFacebookF /></a>
                <a href="#youtube" className="social-circle"><FaYoutube /></a>
                <a href="#linkedin" className="social-circle"><FaLinkedinIn /></a>
              </div>
            </div>
          </Col>

          {/* Copyright Section */}
          <Col lg={2} md={6} className="text-center text-lg-end">
            <div className="copyright-text">
              <p className="mb-0">© 2026 Rise & Rebuild.</p>
              <p className="mb-0">All rights reserved.</p>
            </div>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;