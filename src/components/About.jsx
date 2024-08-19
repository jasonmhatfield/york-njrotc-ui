import React from 'react';
import anchorLogo from '../assets/images/anchor-logo.png';

const About = () => {
  return (
    <div style = {{
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 auto',
      backgroundColor: '#16222a',
      color: '#ecf0f1',
      paddingTop: '20px',
      maxWidth: '1000px'
    }}>
      <section style = {{textAlign: 'center', marginBottom: '40px'}}>
        <img src = {anchorLogo} alt = "NJROTC Logo"
             style = {{maxWidth: '150px', marginBottom: '20px', animation: 'zoomIn 1s ease-in-out'}}/>
        <h1 style = {{
          fontSize: '2.5rem',
          color: '#ffd700',
          marginBottom: '20px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: '600',
          animation: 'fadeIn 1.5s ease-in-out',
          maxWidth: '700px'
        }}>
          About York Comprehensive High School NJROTC
        </h1>
      </section>

      <section className = "section">
        <h2>Program Overview</h2>
        <p>
          The NJROTC program at York Comprehensive High School offers a unique blend of
          classroom instruction and hands-on training. Cadets participate in a variety of activities,
          including drill competitions, physical fitness training, community service projects,
          and leadership development exercises. Our goal is to prepare cadets for success in both
          military and civilian careers.
        </p>
      </section>

      <section className = "section">
        <h2>Our Mission</h2>
        <p>
          The mission of the NJROTC program is to motivate young people to be better citizens.
          The program promotes patriotism, develops informed and responsible citizens, promotes
          habits of orderliness and precision, and develops respect for constituted authority.
        </p>
        <p>
          NJROTC cadets learn the value of teamwork, the importance of self-discipline,
          and the rewards of community service.
        </p>
      </section>

      <section className = "section">
        <h2>Leadership</h2>
        <p>
          Our program is led by experienced and dedicated instructors who are committed to the success of each cadet. The leadership team provides guidance and mentorship to help cadets achieve their goals and reach their full potential. We are proud of our cadet leadership structure, which allows students to take on leadership roles and responsibilities within the unit.
        </p>
      </section>

      <section className = "section">
        <h2>Get Involved</h2>
        <p>
          There are many ways to get involved with the NJROTC program at York Comprehensive High School. Whether you are a student interested in joining the program, a parent looking to support your child, or a community member who wants to contribute to our success, we welcome your participation. Please contact us for more information on how you can get involved.
        </p>
      </section>

      <section className = "section">
        <h2>Contact Us</h2>
        <p>
          For more information about the York Comprehensive High School NJROTC program, please reach out to us:
        </p>
        <ul style = {{listStyleType: 'none', padding: 0}}>
          <li>Email: <a href = "mailto:ychsnjrotc@gmail.com"
                        style = {{color: '#007bff', textDecoration: 'none'}}>ychsnjrotc@gmail.com</a></li>
          <li>Address: <br/> 275 E Alexander Love Hwy<br/> York, SC 29745</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
