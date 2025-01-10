import React from "react";
import "./AboutUs.css"; // Import new CSS styles
import { useNavigate } from "react-router-dom";
import aboutUs from './images/aboutUs.jpg';


const AboutUs = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="about-us-page-container">
  <header className="about-header">
    <h1>About SkillXChange</h1>
  </header>

  <div className="about-image-container">
    <img src="./images/aboutUs.jpg" alt="About SkillXChange"
    onError={(e) => console.error('Image failed to load:', e)}
     />
  </div>

  <main className="about-content">
        <p>
          SkillXChange was born from a bold vision shared by four tech interns. 
          In the midst of their residency program, they envisioned a groundbreaking 
          app that empowers people to exchange skills and talents effortlessly.
        </p>
        <p>
          Imagine a world where a graphic designer trades their expertise for a 
          web developer's coding skills, or a musician collaborates with a photographer. 
          With SkillXChange, we make these connections possible, fostering a 
          community of creative and skilled individuals who support and uplift one another.
        </p>
        <p>
          Our platform thrives on the principle of collaboration, creating an 
          economy of skills where everyone has something valuable to offer. 
          Join us and be part of a revolutionary movement to redefine how talents 
          are shared in our modern world!
        </p>
        <button className="home-button" onClick={handleHomeRedirect}>
          Back to Home
        </button>
      </main>
    </div>
  );
};

export default AboutUs;
