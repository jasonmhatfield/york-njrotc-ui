import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginModal.component.css';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Removed token since it's not needed for the login request
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => {
        // Handle cases where response is not JSON
        setError('An error occurred. Please try again.');
        console.error('Response is not in JSON format');
      });

      if (response.ok && data) {
        if (data.token) {
          login(data.token);
          onClose();
          navigate('/admin'); // Use navigate instead of window.location
        } else {
          setError('Unexpected response from server');
          console.error('Unexpected server response:', data);
        }
      } else {
        setError(data?.message || `Error: ${response.status} ${response.statusText}`);
        console.error('Server error:', data);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <h2>Login</h2>
        {error && <p className="login-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
