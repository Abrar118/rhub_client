import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/about.css";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/Social Icons (1).svg";
import twiiter from "../assets/Social Icons.svg";
import send from "../assets/send.png";
import logo_white from "../assets/logo-white.png";
import linkedin from "../assets/linkedin.svg";
import { motion } from "framer-motion";

function About() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleVerification = (e) => {
    e.preventDefault();
    navigate(`/verify/${email}/auth`);
    setEmail("");
  };

  return (
    <div className="section-footer" id="about">
      <div className="div-footer-top">
        <div className="footer-container">
          <div className="div-footer-brand">
            <img className="brand-logo" alt="Brand logo" src={logo_white} />
            <div className="brand-description">
              MIST Central Resource Hub gives you the unique opportunity to
              share your knowledge with your peers and be updated on everything
              happening on campus.
            </div>
            <div className="footer-brand-info">
              Address: Mirput Cantonment, Dhaka-1216
            </div>
            <div className="footer-brand-info">Phone: +88015-58075365</div>
            <div className="footer-brand-info">
              Email: mistdecoders@gmail.com
            </div>
          </div>
          <div className="footer-column">
            <div className="online-title">Online Platform</div>
            <Link className="online-title-item">About</Link>
            <Link to={"/allCommunities"} className="online-title-item">
              Communities
            </Link>
            <Link className="online-title-item">Developers</Link>
            <Link className="online-title-item">Events</Link>
            <Link className="online-title-item">Developer Profile</Link>
            <Link className="online-title-item">View Guide</Link>
          </div>
          <div className="footer-column">
            <div className="online-title">Links</div>
            <Link className="online-title-item">Contact Us</Link>
            <Link className="online-title-item">Gallery</Link>
            <Link className="online-title-item">News &amp; Articles</Link>
            <Link className="online-title-item">FAQ&#39;s</Link>
            <Link className="online-title-item">Thesis Gallery</Link>
            <Link className="online-title-item">Coming Soon</Link>
          </div>
          <div className="contact-us">
            <div className="online-title">Verification</div>
            <div className="brand-description">
              Enter your email address to verify your account if you haven't
              already
            </div>
            <form className="sub-form" onSubmit={handleVerification}>
              <input
                required
                type="email"
                placeholder="your email address"
                onChange={(e) => setEmail(e.target.value)}
                className="sub-input"
                value={email}
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.9 }}
                className="sub-button"
                type="submit"
              >
                <div className="suscribe">Verify</div>
                <img className="sub-arrow" alt="Arrow" src={send} />
              </motion.button>
            </form>
            <div className="social-links">
              <img src={facebook} alt="facebook" />
              <img src={instagram} alt="facebook" />
              <img src={linkedin} alt="facebook" />
              <img src={youtube} alt="facebook" />
              <img src={twiiter} alt="facebook" />
            </div>
          </div>
        </div>
      </div>
      <div className="div-footer-bottom">
        <div className="p-copyright">
          <div className="copyright-2">
            Copyright 2023 All Rights Reserved by
          </div>
          <Link to="/" className="link-codewithsadee">
            RHUB@MIST
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
