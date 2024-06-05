"use client";
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/login/LoginForm';
import Router from 'next/router';
import styles from '@/styles/Login.module.css';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = () => {
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
        <h1 className={styles.login_form_title}>Sign In!</h1>
        <LoginForm onLogin={(email, password) => {
            login(email, password);
            handleLogin();
        }} />
      </div>
    </div>
  );
};

export default Login;
