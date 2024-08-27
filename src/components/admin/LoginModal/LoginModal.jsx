import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginModal.component.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
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
        setError('An error occurred. Please try again.');
        console.error('Response is not in JSON format');
      });

      if (response.ok && data) {
        if (data.token) {
          login(data.token);
          onClose();
          navigate('/admin');
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
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '40px' }}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
