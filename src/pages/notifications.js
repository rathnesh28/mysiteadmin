import React, { useState } from 'react';
import { FaCheckCircle, FaTrashAlt, FaBell, FaBox, FaTruck, FaExclamationCircle } from 'react-icons/fa';
import Layout from '../components/Layout'; // Ensure this path matches your project structure
import styles from '../styles/Notifications.module.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New Order Received!", time: "5 mins ago", type: "order", read: false },
    { id: 2, message: "Low Stock Alert: Sunglasses", time: "1 hour ago", type: "stock", read: true },
    { id: 3, message: "Order #12345 Shipped!", time: "2 hours ago", type: "shipping", read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Function to assign icons & colors based on notification type
  const getNotificationDetails = (type) => {
    switch (type) {
      case "order":
        return { icon: <FaBox className="text-primary" />, bg: "bg-light-primary" };
      case "stock":
        return { icon: <FaExclamationCircle className="text-warning" />, bg: "bg-light-warning" };
      case "shipping":
        return { icon: <FaTruck className="text-success" />, bg: "bg-light-success" };
      default:
        return { icon: <FaBell className="text-secondary" />, bg: "bg-light-secondary" };
    }
  };

  return (
    <Layout>
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2><FaBell className="me-2 text-primary" /> Notifications</h2>
          <button className="btn btn-outline-danger btn-sm" onClick={() => setNotifications([])}>Clear All</button>
        </div>

        <div className="row">
          {notifications.length === 0 ? (
            <p className="text-muted text-center">No notifications</p>
          ) : (
            notifications.map((notification) => {
              const { icon, bg } = getNotificationDetails(notification.type);
              return (
                <div key={notification.id} className={`col-md-6`}>
                  <div className={`card shadow-sm mb-3 p-3 d-flex align-items-start ${bg} ${styles.notificationCard}`}>
                    <div className="me-3">{icon}</div>
                    <div className="flex-grow-1">
                      <strong>{notification.message}</strong>
                      <p className="mb-1 text-muted small">{notification.time}</p>
                    </div>
                    <div>
                      {!notification.read && (
                        <button className="btn btn-sm btn-success me-2" onClick={() => markAsRead(notification.id)}>
                          <FaCheckCircle />
                        </button>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => deleteNotification(notification.id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
