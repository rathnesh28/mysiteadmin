import React from 'react';
import styles from '@/styles/Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="TrendyTie Logo" />
        </div>
        <h1 className={styles.title}>Welcome Back!</h1>
        <p className={styles.subtitle}>Sign in to continue managing TrendyTie.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>

        <div className={styles.footer}>
          <p>Forgot password? <a href="#">Reset it here</a></p>
        </div>
      </div>
    </div>
  );
}
