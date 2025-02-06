import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { FaUsers, FaShoppingCart, FaDollarSign, FaBox } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; // Import Bar Chart
import Layout from '@/components/Layout';
import styles from '../styles/Dashboard.module.css';

// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sales Report Chart Data (Bar Chart)
  const salesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'], // X-axis labels
    datasets: [
      {
        label: 'Sales ($)',
        data: [500, 700, 800, 900, 1200, 1500, 1700 , 1,900,67,2000,2000.50],
        backgroundColor: '#c01a65', // Bar color
        borderRadius: 5, // Rounded corners for bars
        barPercentage: 0.5, // Adjust bar thickness
      },
    ],
  };

  // Chart Options for Styling
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No grid lines on X-axis
        },
        ticks: {
          color: '#555',
        },
      },
      y: {
        grid: {
          color: '#e0e0e0', // Subtle grid lines
        },
        ticks: {
          color: '#555',
          callback: (value) => `$${value}`, // Format Y-axis values as currency
        },
      },
    },
  };

  // Mock data for Recent Orders
  const recentOrders = [
    { id: 1, customer: 'John Doe', date: '2024-01-25', amount: '$120' },
    { id: 2, customer: 'Jane Smith', date: '2024-01-24', amount: '$80' },
    { id: 3, customer: 'Alice Brown', date: '2024-01-23', amount: '$200' },
    { id: 4, customer: 'Bob White', date: '2024-01-22', amount: '$150' },
  ];

  // Mock data for Top Selling Products
  const topSellingProducts = [
    { id: 1, product: 'Product A', sales: '$1,200' },
    { id: 2, product: 'Product B', sales: '$1,000' },
    { id: 3, product: 'Product C', sales: '$800' },
    { id: 4, product: 'Product D', sales: '$600' },
  ];

  // Mock data for Recent Customers
  const recentCustomers = [
    { id: 1, name: 'John Doe', joined: '2024-01-25' },
    { id: 2, name: 'Jane Smith', joined: '2024-01-24' },
    { id: 3, name: 'Alice Brown', joined: '2024-01-23' },
    { id: 4, name: 'Bob White', joined: '2024-01-22' },
  ];

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* Stats Section */}
        <Row className="g-4">
          {/* Statistic Cards */}
          <Col xs={12} sm={6} md={3}>
            <Card className={styles.statCard}>
              <Card.Body className="d-flex align-items-center">
                <div className={styles.iconWrapper} style={{ backgroundColor: '#4CAF50' }}>
                  <FaUsers className={styles.icon} />
                </div>
                <div className="ms-3">
                  <h5 className={styles.cardTitle}>Users</h5>
                  <p className={styles.cardValue}>1,234</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className={styles.statCard}>
              <Card.Body className="d-flex align-items-center">
                <div className={styles.iconWrapper} style={{ backgroundColor: '#2196F3' }}>
                  <FaShoppingCart className={styles.icon} />
                </div>
                <div className="ms-3">
                  <h5 className={styles.cardTitle}>Orders</h5>
                  <p className={styles.cardValue}>567</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className={styles.statCard}>
              <Card.Body className="d-flex align-items-center">
                <div className={styles.iconWrapper} style={{ backgroundColor: '#FFC107' }}>
                  <FaDollarSign className={styles.icon} />
                </div>
                <div className="ms-3">
                  <h5 className={styles.cardTitle}>Revenue</h5>
                  <p className={styles.cardValue}>$12,345</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Card className={styles.statCard}>
              <Card.Body className="d-flex align-items-center">
                <div className={styles.iconWrapper} style={{ backgroundColor: '#FF5722' }}>
                  <FaBox className={styles.icon} />
                </div>
                <div className="ms-3">
                  <h5 className={styles.cardTitle}>Products</h5>
                  <p className={styles.cardValue}>456</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content Section */}
        <Row className="mt-4">
          {/* Sales Report */}
          <Col xs={12} lg={8}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Sales Report</h5>
                <Bar data={salesChartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Orders */}
          <Col xs={12} lg={4}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Recent Orders</h5>
                <Table   >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Top Selling Products and Recent Customers */}
        <Row className="mt-4">
          {/* Top Selling Products */}
          <Col xs={12} lg={8}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Top Selling Products</h5>
                <Table >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSellingProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.product}</td>
                        <td>{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Customers */}
          <Col xs={12} lg={4}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Recent Customers</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Dashboard;
