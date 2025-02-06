import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaPercentage, FaChartPie, FaFileInvoice } from "react-icons/fa";
import Layout from "@/components/Layout"; // Layout Component
import PaginationComponent from "@/components/PaginationComponent"; // Pagination Component
import styles from "../../styles/Reports.module.css"; // Assuming you have a styles file for this page

const GSTReportPage = () => {
  const [gstData, setGSTData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const [totalGST, setTotalGST] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [averageGSTPercentage, setAverageGSTPercentage] = useState(0);

  useEffect(() => {
    const data = [
      { id: 1, product: "T-Shirt", price: 500, gst: 50, gstRate: 10, date: "2025-01-12" },
      { id: 2, product: "Jacket", price: 1200, gst: 120, gstRate: 10, date: "2025-01-11" },
      { id: 3, product: "Shoes", price: 1500, gst: 180, gstRate: 12, date: "2025-01-10" },
      { id: 4, product: "Watch", price: 2000, gst: 240, gstRate: 12, date: "2025-01-09" },
      { id: 5, product: "Bag", price: 800, gst: 80, gstRate: 10, date: "2025-01-08" },
      { id: 6, product: "Hat", price: 300, gst: 30, gstRate: 10, date: "2025-01-07" },
      // Add more items as needed
    ];

    setGSTData(data);

    const totalGST = data.reduce((acc, item) => acc + item.gst, 0);
    const totalSales = data.reduce((acc, item) => acc + item.price, 0);
    const averageGSTPercentage =
      data.reduce((acc, item) => acc + item.gstRate, 0) / data.length;

    setTotalGST(totalGST);
    setTotalSales(totalSales);
    setAverageGSTPercentage(averageGSTPercentage);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gstData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <Container className="mt-5">
        <h2 className={styles.pageTitle}>GST Report</h2>

        <Row>
          {/* GST Overview Cards */}
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaFileInvoice size={40} />
                <Card.Title>Total GST Collected</Card.Title>
                <Card.Text>₹{totalGST.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaChartPie size={40} />
                <Card.Title>Total Sales</Card.Title>
                <Card.Text>₹{totalSales.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaPercentage size={40} />
                <Card.Title>Avg. GST Percentage</Card.Title>
                <Card.Text>{averageGSTPercentage.toFixed(2)}%</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Detailed GST Data Table */}
        <h3 className={styles.tableTitle}>GST Breakdown</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>GST (₹)</th>
              <th>GST Rate (%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product}</td>
                <td>₹{item.price}</td>
                <td>₹{item.gst}</td>
                <td>{item.gstRate}%</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalItems={gstData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </Layout>
  );
};

export default GSTReportPage;
