import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { signUp, signIn } from '../api/authService';  // Assuming you have a signIn method in your authService
import { AxiosResponse } from 'axios';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signUp(data);
      message.success('Registration successful!');
      navigate('/signin');
    } catch (err) {
      if (err && err.status === 400) {
        setError('Bad Request: Please check your input!');
      } else if (err && err.status === 409) {
        setError('Email already exists!');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signIn(data);

      // Extract token and user from the response data
      const { token, user } = response.data;

      // Save token and user information in session storage
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      message.success('Login successful!');
      navigate('/home');
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        setError('Unauthorized: Invalid email or password!');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSignUp,
    handleLogin,
  };
};
