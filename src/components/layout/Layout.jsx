import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.appShell}>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};