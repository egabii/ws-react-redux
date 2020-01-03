import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './header.module.css'

export const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" height="80" />
      <h1>{title}</h1>
    </header>
  )
}