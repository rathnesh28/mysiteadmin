import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Toggle Sidebar Collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`${styles.mainContent} ${
          isSidebarCollapsed ? '' : styles.mainContentExpanded
        }`}
      >
        <Header isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
