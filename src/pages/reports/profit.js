import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaChartLine, FaPercentage, FaDollarSign } from "react-icons/fa";
import Layout from "@/components/Layout"; // Layout Component
import PaginationComponent from "@/components/PaginationComponent"; // Pagination Component
import styles from "../../styles/Reports.module.css"; // Assuming you have a styles file for this page

const ProfitReportPage = () => {
  const [profitData, setProfitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const [totalProfit, setTotalProfit] = useState(0);
  const [averageProfitMargin, setAverageProfitMargin] = useState(0);
  const [highestProfit, setHighestProfit] = useState(0);

  useEffect(() => {
    const data = [
      { id: 1, product: "T-Shirt", price: 500, cost: 300, profit: 200, date: "2025-01-12" },
      { id: 2, product: "Jacket", price: 1200, cost: 700, profit: 500, date: "2025-01-11" },
      { id: 3, product: "Shoes", price: 1500, cost: 1050, profit: 450, date: "2025-01-10" },
      { id: 4, product: "Watch", price: 2000, cost: 1400, profit: 600, date: "2025-01-09" },
      { id: 5, product: "Bag", price: 800, cost: 500, profit: 300, date: "2025-01-08" },
      { id: 6, product: "Hat", price: 300, cost: 150, profit: 150, date: "2025-01-07" },
      // Add more items as needed
    ];

    setProfitData(data);

    const totalProfit = data.reduce((acc, item) => acc + item.profit, 0);
    const highestProfit = Math.max(...data.map((item) => item.profit));
    const averageProfitMargin =
      data.reduce((acc, item) => acc + (item.profit / item.price) * 100, 0) / data.length;

    setTotalProfit(totalProfit);
    setHighestProfit(highestProfit);
    setAverageProfitMargin(averageProfitMargin);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profitData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <Container className="mt-5">
        <h2 className={styles.pageTitle}>Profit Report</h2>

        <Row>
          {/* Profit Overview Cards */}
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaDollarSign size={40} />
                <Card.Title>Total Profit</Card.Title>
                <Card.Text>₹{totalProfit.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaPercentage size={40} />
                <Card.Title>Avg. Profit Margin</Card.Title>
                <Card.Text>{averageProfitMargin.toFixed(2)}%</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="text-center mb-4">
              <Card.Body>
                <FaChartLine size={40} />
                <Card.Title>Highest Profit</Card.Title>
                <Card.Text>₹{highestProfit.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Detailed Profit Data Table */}
        <h3 className={styles.tableTitle}>Profit Breakdown</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Selling Price</th>
              <th>Cost</th>
              <th>Profit</th>
              <th>Profit Margin (%)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.product}</td>
                <td>₹{item.price}</td>
                <td>₹{item.cost}</td>
                <td>₹{item.profit}</td>
                <td>{((item.profit / item.price) * 100).toFixed(2)}%</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalItems={profitData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </Layout>
  );
};

export default ProfitReportPage;
