import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaRupeeSign ,
  FaBox,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import Layout from "@/components/Layout";
import styles from "../styles/Dashboard.module.css";

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Sales Data (Bar Chart)
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [500, 700, 800, 900, 1200, 1500, 1700, 1900, 2100, 2300, 2500, 2700],
        backgroundColor: "#c01a65",
        borderRadius: 5,
        barPercentage: 0.5,
      },
    ],
  };

  // Category Performance (Doughnut Chart)
  const categoryPerformance = {
    labels: ["Necklaces", "Earrings", "Bracelets", "Rings"],
    datasets: [
      {
        data: [1200, 800, 500, 600],
        backgroundColor: ["#c01a65", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  // Mock Data
  const recentOrders = [
    { id: 1, customer: "John Doe", date: "2024-01-25", amount: "₹120" },
    { id: 2, customer: "Jane Smith", date: "2024-01-24", amount: "₹80" },
    { id: 3, customer: "Alice Brown", date: "2024-01-23", amount: "₹200" },
  ];

  const topCustomers = [
    { id: 1, name: "John Doe", totalSpent: "₹1,500", orders: 10 },
    { id: 2, name: "Emily Brown", totalSpent: "₹1,200", orders: 8 },
    { id: 3, name: "Michael Davis", totalSpent: "₹1,000", orders: 6 },
  ];

  const topSellingProducts = [
    { id: 1, product: "Gold Necklace", sales: "₹1,200" },
    { id: 2, product: "Diamond Earrings", sales: "₹1,000" },
    { id: 3, product: "Silver Bracelet", sales: "₹800" },
  ];

  const inventoryAlerts = [
    { id: 1, product: "Pearl Ring", stock: 2 },
    { id: 2, product: "Silver Chain", stock: 5 },
  ];

  const userEngagement = [
    { metric: "Cart Abandonment", value: "35%" },
    { metric: "Checkout Drop-Off", value: "20%" },
    { metric: "Bounce Rate", value: "45%" },
  ];
  const mostViewedProducts = [
    { id: 1, product: "Silver Necklace", views: "5,200" },
    { id: 2, product: "Pearl Earrings", views: "4,800" },
    { id: 3, product: "Gold Bracelet", views: "4,500" },
];

  return (
    <Layout>
      <div className={styles.dashboard}>
        {/* Overview Stats */}
        <Row className="g-4">
          {[
            { icon: <FaUsers />, title: "Customers", value: "1,234", color: "#4CAF50" },
            { icon: <FaShoppingCart />, title: "Orders", value: "567", color: "#2196F3" },
            { icon: <FaRupeeSign  />, title: "Revenue", value: "₹12,345", color: "#FFC107" },
            { icon: <FaBox />, title: "Products", value: "456", color: "#FF5722" },
          ].map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className={styles.statCard}>
                <Card.Body className="d-flex align-items-center">
                  <div className={styles.iconWrapper} style={{ backgroundColor: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="ms-3">
                    <h5 className={styles.cardTitle}>{stat.title}</h5>
                    <p className={styles.cardValue}>{stat.value}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts Section */}
        <Row className="mt-4">
          <Col xs={12} lg={8}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Sales Report</h5>
                <Bar data={salesData} options={{ responsive: true }} />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Category Performance</h5>
                <Doughnut data={categoryPerformance} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tables Section */}
        <Row className="mt-4">
          <Col xs={12} lg={6}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Top Customers</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Orders</th>
                      <th>Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.orders}</td>
                        <td>{customer.totalSpent}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>User Engagement Data</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userEngagement.map((item, index) => (
                      <tr key={index}>
                        <td>{item.metric}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Top Selling Products */}      
        <Row className="mt-4">
          <Col xs={12} lg={6}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Top Selling Products</h5>
                <Table>
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

          <Col xs={12} lg={6}>
            <Card className={styles.chartCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Most Viewed Products</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mostViewedProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.product}</td>
                        <td>{product.views}</td>
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
