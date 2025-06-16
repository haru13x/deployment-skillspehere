import React, { useEffect, useState } from "react";
import "./hero.css";
import videoSource from "../../assets/bghuhu.mp4";
import logo from "../../assets/skillspherelogo.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hero">
      {/* Navbar */}
      <nav className="nav">
        <img src={logo} alt="Skillsphere logo" className="logo" />
        <ul>
          <li>
            <a
              href="#About"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#About")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#Contacts"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#Contacts")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </li>
        </ul>

        {/* Sidebar Toggle Button */}
        <div
          className="menu-toggle"
          onClick={() => setShowMenu((prev) => !prev)}
        >

        </div>

        {/* Sidebar Menu */}
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={() => navigate("/admin")}>Admin</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <video className="hero-bg-video" autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-text">
        <h1>SkillSphere: Connecting Freelancers with Opportunities</h1>
        <button className="gsbtn" onClick={() => navigate("/register")}>
          GET STARTED
        </button>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Hero;
