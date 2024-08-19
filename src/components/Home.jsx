import React from 'react';
import unitPhoto from '../assets/images/unit-photos/york-njrotc-fall-2023.jpg';

const Home = () => (
  <main style={styles.homeContainer}>
    <section style={styles.homeIntroSection}>
      <h1 style={styles.heading}>Welcome to York Comprehensive High School NJROTC</h1>
      <img src={unitPhoto} alt="Unit" style={styles.unitImage} />
      <p style={styles.paragraph}>
        Our mission is to instill in our cadets the values of citizenship, service to the United States, personal responsibility, and a sense of accomplishment.
      </p>
    </section>

    <section style={styles.highlightSection}>
      <h2 style={styles.subheading}>Leadership</h2>
      <p style={styles.paragraph}>
        NJROTC cadets develop leadership skills through various training programs, competitions, and exercises designed to build their confidence and leadership abilities.
      </p>
    </section>

    <section style={styles.highlightSection}>
      <h2 style={styles.subheading}>Community</h2>
      <p style={styles.paragraph}>
        Our cadets are active members of the community, participating in events and service projects that help them develop a sense of civic duty and pride.
      </p>
    </section>

    <section style={styles.highlightSection}>
      <h2 style={styles.subheading}>Academics</h2>
      <p style={styles.paragraph}>
        NJROTC emphasizes academic excellence, providing cadets with the skills and knowledge they need to succeed in both their military and civilian careers.
      </p>
    </section>
  </main>
);

export default Home;

const styles = {
  homeContainer: {
    maxWidth: '1200px',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    backgroundColor: '#16222a',
    color: '#ecf0f1',
    padding: '20px 20px 0 20px',
  },
  homeIntroSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ffd700', // Gold color for headings
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 600,
    animation: 'fadeIn 1.5s ease-in-out',
  },
  paragraph: {
    fontSize: '1.3rem',
    lineHeight: 1.6,
    marginBottom: '15px',
  },
  unitImage: {
    maxWidth: '100%',
    maxHeight: '500px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    animation: 'zoomIn 1s ease-in-out',
  },
  highlightSection: {
    marginBottom: '40px',
    maxWidth: '700px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#1a2a3a',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'slideIn 1s ease-in-out',
  },
  subheading: {
    fontSize: '2rem',
    color: '#ffd700', // Gold color for subheadings
    marginTop: '20px',
    marginBottom: '10px',
  },
};
