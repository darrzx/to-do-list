"use client";
import React, { useState } from 'react';
import styles from '@/styles/Login.module.css';
import { Button, TextField } from '@material-ui/core';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const response = await fetch('/api/LoginApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      onLogin(username, password);
    } else {
      setError(true);
      console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.login_form}>
      <TextField 
        required 
        type='text' 
        id="username" 
        label="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)} />

      <TextField 
        required 
        type='password' 
        id="password" 
        label="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} />

      {error && <p className={styles.error}>Invalid credentials!</p>}

      <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#1679AB', marginTop: '5%' }}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
