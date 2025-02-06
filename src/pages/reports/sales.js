import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaDollarSign, FaChartLine, FaShoppingCart } from "react-icons/fa";
import Layout from "@/components/Layout"; // Layout Component
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import styles from "../../styles/Reports.module.css"; // Assuming you have a styles file for this page

const SalesReportPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalGST, setTotalGST] = useState(0);

  useEffect(() => {
    const sales = [
      { id: 1, product: "T-Shirt", price: 500, quantity: 2, profit: 200, gst: 50, date: "2025-01-12" },
      { id: 2, product: "Jacket", price: 1200, quantity: 1, profit: 500, gst: 120, date: "2025-01-11" },
      { id: 3, product: "Shoes", price: 1500, quantity: 3, profit: 450, gst: 180, date: "2025-01-10" },
      { id: 4, product: "Watch", price: 2000, quantity: 2, profit: 600, gst: 200, date: "2025-01-09" },
      { id: 5, product: "Bag", price: 800, quantity: 1, profit: 300, gst: 80, date: "2025-01-08" },
      { id: 6, product: "Hat", price: 300, quantity: 3, profit: 150, gst: 30, date: "2025-01-07" },
      // Add more items as needed
    ];

    setSalesData(sales);

    const totalSales = sales.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalProfit = sales.reduce((acc, item) => acc + item.profit, 0);
    const totalGST = sales.reduce((acc, item) => acc + item.gst, 0);

    setTotalSales(totalSales);
    setTotalProfit(totalProfit);
    setTotalGST(totalGST);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <Container className="mt-5">
        <h2 className={styles.pageTitle}>Sales Report</h2>

        <Row>
          {/* Sales Overview Cards */}
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaDollarSign size={40} />
                <Card.Title>Total Sales</Card.Title>
                <Card.Text>₹{totalSales.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaChartLine size={40} />
                <Card.Title>Total Profit</Card.Title>
                <Card.Text>₹{totalProfit.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaShoppingCart size={40} />
                <Card.Title>Total GST</Card.Title>
                <Card.Text>₹{totalGST.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Detailed Sales Data Table */}
        <h3 className={styles.tableTitle}>Sales Breakdown</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Profit</th>
              <th>GST</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>₹{sale.price}</td>
                <td>{sale.quantity}</td>
                <td>₹{sale.profit}</td>
                <td>₹{sale.gst}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalItems={salesData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </Layout>
  );
};

export default SalesReportPage;
