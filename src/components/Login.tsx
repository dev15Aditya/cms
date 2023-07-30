import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://precious-veil-tuna.cyclic.cloud/api/login',
        {
          username,
          password,
        }
      );
      const token = response.data.token;

      // Save token in local storage or cookies (optional)
      localStorage.setItem('token', token);

      setLoggedIn(true);
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 shadow-md rounded-lg"
      >
        <h2 className="text-2xl mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-gray-300 p-2 rounded-md bg-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 p-2 rounded-md bg-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
