import React, { useState } from "react";
import { Table, Button, InputGroup, FormControl, Badge, Dropdown } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import PaginationComponent from "@/components/PaginationComponent";
import styles from "@/styles/payment.module.css";

const AdminPaymentPage = () => {
  const [payments] = useState([
    { id: 1, transactionId: "TXN001", orderId: "ORD001", customer: "Naruto Uzumaki", amount: 1000, date: "2025-01-10", method: "Credit Card", status: "Pending", orderStatus: "Delivered" },
    { id: 2, transactionId: "TXN002", orderId: "ORD002", customer: "Sasuke Uchiha", amount: 500, date: "2025-01-09", method: "PayPal", status: "Completed", orderStatus: "Returned" },
    { id: 3, transactionId: "TXN003", orderId: "ORD003", customer: "Sakura Haruno", amount: 750, date: "2025-01-08", method: "UPI", status: "Failed", orderStatus: "Cancelled" },
  ]);

  const [filters, setFilters] = useState({ search: "", orderStatus: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleFilter = (status) => {
    setFilters({ ...filters, orderStatus: status });
  };

  const filteredPayments = payments.filter((payment) =>
    (filters.search
      ? payment.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(filters.search.toLowerCase())
      : true) &&
    (filters.orderStatus ? payment.orderStatus === filters.orderStatus : true)
  );

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="container mt-5">      
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Payment Management</h1>

        
        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <InputGroup>
              <FormControl
                placeholder="Search by customer name or transaction ID"
                value={filters.search}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center gap-3">
            <Dropdown onSelect={handleFilter}>
              <Dropdown.Toggle variant="light">
                {filters.orderStatus || "Filter by Order Status"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All</Dropdown.Item>
                <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
                <Dropdown.Item eventKey="Returned">Returned</Dropdown.Item>
                <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        
        {/* Payments Table */}
        <Table responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">No payments found</td>
              </tr>
            ) : (
              paginatedPayments.map((payment) => (
                <tr key={payment.transactionId}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.customer}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>{payment.method}</td>
                  <td>
                    <Badge bg={payment.status === "Completed" ? "success" : payment.status === "Failed" ? "danger" : "warning"}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={payment.orderStatus === "Returned" ? "secondary" : payment.orderStatus === "Cancelled" ? "dark" : "info"}>
                      {payment.orderStatus}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Link href={`/payments/${payment.id}`} passHref>
                      <Button className={`${styles.buttonPink} ms-2`} size="sm">
                        <FaEdit /> View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        <PaginationComponent
          totalItems={filteredPayments.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default AdminPaymentPage;
