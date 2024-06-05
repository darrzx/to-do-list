"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/login/LoginForm';
import Router from 'next/router';
import styles from '@/styles/Login.module.css';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    setLoggedIn(true);
    Router.push('/home/Home');  
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_title_container}>
        <div className={styles.login_title}>
          <h1>Hello!</h1>
          <p>Welcome back, Please sign in to continue.</p>
        </div>
      </div>
      <div className={styles.login_form_container}>
        <LoginForm onLogin={(username, password) => {
            login(username, password);
            handleLogin();
        }} />
      </div>
    </div>
  );
};

export default Login;
