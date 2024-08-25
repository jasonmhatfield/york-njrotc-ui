import React from 'react';
import unitPhoto from '../assets/images/unit-photos/york-njrotc-fall-2023.jpg';
import '../styles/Home.component.css'; // Import the CSS file

const Home = () => (
  <main className="home-container">
    <section className="home-intro-section">
      <h1 className="heading">Welcome to York Comprehensive High School NJROTC</h1>
      <img src={unitPhoto} alt="Unit" className="unit-image" />
      <p className="paragraph">
        Our mission is to instill in our cadets the values of citizenship, service to the United States, personal responsibility, and a sense of accomplishment.
      </p>
    </section>

    <section className="highlight-section">
      <h2 className="subheading">Leadership</h2>
      <p className="paragraph">
        NJROTC cadets develop leadership skills through various training programs, competitions, and exercises designed to build their confidence and leadership abilities.
      </p>
    </section>

    <section className="highlight-section">
      <h2 className="subheading">Community</h2>
      <p className="paragraph">
        Our cadets are active members of the community, participating in events and service projects that help them develop a sense of civic duty and pride.
      </p>
    </section>

    <section className="highlight-section">
      <h2 className="subheading">Academics</h2>
      <p className="paragraph">
        NJROTC emphasizes academic excellence, providing cadets with the skills and knowledge they need to succeed in both their military and civilian careers.
      </p>
    </section>
  </main>
);

export default Home;
