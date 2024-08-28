import React from 'react';
import './About.component.css';

const About = () => (
  <>
    <div className="about-hero">
      <h1 className="about-hero-title">About Our NJROTC Program</h1>
      <p className="about-hero-text">
        Dedicated to developing the next generation of leaders through discipline, education, and service.
      </p>
    </div>

    <div className="about-container">
      <div className="about-section">
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-section-text">
          Our mission is to instill in our cadets the values of citizenship, service to the United States,
          personal responsibility, and a sense of accomplishment.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Our History</h2>
        <p className="about-section-text">
          Since its inception, our NJROTC program has been committed to shaping the minds and
          characters of young men and women, preparing them for future leadership roles in both
          military and civilian life.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Our Staff</h2>
        <p className="about-section-text">
          Our dedicated staff of experienced naval science instructors and support personnel
          are passionate about mentoring and guiding cadets through their NJROTC journey.
        </p>
      </div>
    </div>
  </>
);

export default About;
