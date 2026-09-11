import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";

import RegistrationButton from "../RegistrationButton";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Season 2", href: "#season2" },
  { label: "Journey", href: "#journey" },
  { label: "Achivement", href: "#achivement" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function RiseRebuildNavbar() {
  return (
    <Navbar
      expand="lg"
      className="rr-navbar"
      variant="dark"
      sticky="top"
      collapseOnSelect
    >
      <Container fluid className="rr-container">

        {/* Logo */}
        <Navbar.Brand as={Link} to='/' className="rr-brand">
          <span className="rr-brand-primary">RISE</span>
          <span className="rr-brand-amp">&</span>
          <span className="rr-brand-secondary">REBUILD</span>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle
          aria-controls="rr-navbar-nav"
          className="rr-toggler"
        />

        {/* Navigation */}
        <Navbar.Collapse id="rr-navbar-nav">
          <Nav className="rr-nav-links ms-auto align-items-lg-center">

            {NAV_ITEMS.map((item) => (
              <Nav.Link
                key={item.href}
                href={item.href}
                className="rr-nav-link"
              >
                {item.label}
              </Nav.Link>
            ))}

            {/* Register Button */}
            <RegistrationButton
              text="REGISTER NOW"
              className="rr-cta-btn"
            />
            <button><Link to="/login">Login</Link></button>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}