import React from 'react';
import Link from 'next/link';

// About, FAQ, Add a Business, Newsletter, Contact

const Footer: React.SFC = (props) => {
  return (
    <footer className="row justify-content-md-center flex-wrap goblaq-main-footer">
        <div className="col-md-3 col-sm-1 goblaq-main-footer-logo">
            <Link href='/'>
                <a className="navbar-brand">
                    <img
                        src="/images/navbar_logo_transparent.png"
                        alt="goblaq logo"
                    />
                </a>
            </Link>
            <h6>Made with &#x2764; in Texas and California</h6>
            <div className="row goblaq-legal-content">
                <Link href='/contentGuidelines'>
                    <a>Content Guidelines</a>
                </Link>
                {' | '}
                <Link href='/termsOfService'>
                    <a>Terms of Service</a>
                </Link>
                {' | '}
                <Link href='/privacyPolicy'>
                    <a>Privacy Policy</a>
                </Link>
            </div>
        </div>
        <div className="col-md-3 d-flex flex-column">
            <h4>Quick Links</h4>
            <div className="row">
                <div className="col">
                    <ul className="nav flex-column goblaq-footer-links">
                        <li className="nav-item">
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/faq">
                                <a>FAQ</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <ul className="nav flex-column goblaq-footer-links">
                        <li className="nav-item">
                            <Link href="/business">
                                <a>Add a Business</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/newsletter">
                                <a>Newsletter</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact">
                                <a>Contact</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-end">
            <h4>Contact Us</h4>
            <ul className="nav flex-column goblaq-footer-contact-info">
                <li>Phone</li>
                <li>Email</li>
                <li>Houston, Texas</li>
                <li>2019 Goblaq</li>
            </ul>
        </div>
    </footer>
  );
};

export default Footer;
