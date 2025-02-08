import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaChartLine,
  FaCog,
  FaShoppingBag,
  FaShippingFast,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { TbCategoryPlus } from 'react-icons/tb';
import { BiSolidCoupon } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdInventory2, MdPayment } from 'react-icons/md';
import { useRouter } from 'next/router';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const router = useRouter(); // Get the current route
  const [showReports, setShowReports] = useState(false); // State to toggle the reports dropdown

  const toggleReportsDropdown = () => setShowReports(!showReports);

  return (
    <div
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
    >
      {/* Navigation Links */}
      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/dashboard' ? styles.active : ''
          }`}
        >
          <a href="/dashboard" className={styles.navLink}>
            <FaTachometerAlt />
            {!isCollapsed && <span>Dashboard</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/orders' ? styles.active : ''
          }`}
        >
          <a href="/orders" className={styles.navLink}>
            <FaShoppingCart />
            {!isCollapsed && <span>Orders</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/categories' ? styles.active : ''
          }`}
        >
          <a href="/categories" className={styles.navLink}>
            <TbCategoryPlus />
            {!isCollapsed && <span>Category</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/products' ? styles.active : ''
          }`}
        >
          <a href="/products" className={styles.navLink}>
            <FaShoppingBag />
            {!isCollapsed && <span>Products</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/inventory' ? styles.active : ''
          }`}
        >
          <a href="/inventory" className={styles.navLink}>
            <MdInventory2 />
            {!isCollapsed && <span>Inventory</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/customers' ? styles.active : ''
          }`}
        >
          <a href="/customers" className={styles.navLink}>
            <BsFillPeopleFill />
            {!isCollapsed && <span>Customers</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/shipping' ? styles.active : ''
          }`}
        >
          <a href="/shipping" className={styles.navLink}>
            <FaShippingFast />
            {!isCollapsed && <span>Shipping</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/payment' ? styles.active : ''
          }`}
        >
          <a href="/payment" className={styles.navLink}>
            <MdPayment />
            {!isCollapsed && <span>Payment</span>}
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            router.pathname === '/coupons' ? styles.active : ''
          }`}
        >
          <a href="/coupons" className={styles.navLink}>
            <BiSolidCoupon />
            {!isCollapsed && <span>Coupons</span>}
          </a>
        </li>

        {/* Reports Dropdown */}
        <li
          className={`${styles.navItem} ${
            router.pathname.startsWith('/reports') ? styles.active : ''
          }`}
        >
          <a href="#" className={styles.navLink} onClick={toggleReportsDropdown}>
            <FaChartLine />
            {!isCollapsed && <span>Reports</span>}
            {!isCollapsed && (
              <span className={styles.arrow}>
                {showReports ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            )}
          </a>
          {showReports && (
            <ul className={styles.subNavList}>
              <li
                className={`${styles.navItem} ${
                  router.pathname === '/reports/sales' ? styles.activeSub : ''
                }`}
              >
                <a href="/reports/sales" className={styles.navLink}>
                  <FaShoppingCart />
                  {!isCollapsed && <span>Sales Report</span>}
                </a>
              </li>
              <li
                className={`${styles.navItem} ${
                  router.pathname === '/reports/profit' ? styles.activeSub : ''
                }`}
              >
                <a href="/reports/profit" className={styles.navLink}>
                  <FaChartLine />
                  {!isCollapsed && <span>Profit Report</span>}
                </a>
              </li>
              <li
                className={`${styles.navItem} ${
                  router.pathname === '/reports/gst' ? styles.activeSub : ''
                }`}
              >
                <a href="/reports/gst" className={styles.navLink}>
                  <FaChartLine />
                  {!isCollapsed && <span>GST Report</span>}
                </a>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`${styles.navItem} ${
            router.pathname === '/settings' ? styles.active : ''
          }`}
        >
          <a href="/settings" className={styles.navLink}>
            <FaCog />
            {!isCollapsed && <span>Settings</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
