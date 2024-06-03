"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/login/LoginForm';
import { useRouter } from 'next/router';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setLoggedIn(true);
    router.push('/home/Home');  
  };

  return (
    <div>
      <h1>Login</h1>
      {loggedIn ? (
        <p>Successful login, redirecting to home...</p>
      ) : (
        <LoginForm onLogin={(username, password) => {
            login(username, password);
            handleLogin();
        }} />
      )}
    </div>
  );
};

export default Login;
