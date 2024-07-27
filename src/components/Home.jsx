import React from 'react';
import '../styles/Home.css';

const Home = () => (
  <main className="home-container">
    <section className="home-intro-section">
      <h1>Welcome to York Comprehensive High School NJROTC</h1>
      <img src="/images/unit-photos/york-njrotc-fall-2023.jpg" alt="Unit" className="unit-image" />
      <p>
        Our mission is to instill in our cadets the values of citizenship, service to the United States, personal responsibility, and a sense of accomplishment.
      </p>
    </section>

    <section className="highlight-section">
      <h2>Leadership</h2>
      {/* <img src="path/to/leadership-image.jpg" alt="Leadership" className="highlight-image" /> */}
      <p>
        NJROTC cadets develop leadership skills through various training programs, competitions, and exercises designed to build their confidence and leadership abilities.
      </p>
    </section>

    <section className="highlight-section">
      <h2>Community</h2>
      {/* <img src="path/to/community-image.jpg" alt="Community" className="highlight-image" /> */}
      <p>
        Our cadets are active members of the community, participating in events and service projects that help them develop a sense of civic duty and pride.
      </p>
    </section>

    <section className="highlight-section">
      <h2>Academics</h2>
      {/* <img src="path/to/academics-image.jpg" alt="Academics" className="highlight-image" /> */}
      <p>
        NJROTC emphasizes academic excellence, providing cadets with the skills and knowledge they need to succeed in both their military and civilian careers.
      </p>
    </section>
  </main>
);

export default Home;
