import React, { useState } from "react";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaFilter, FaSearch, FaEdit, FaRedo } from "react-icons/fa";
import Layout from "@/components/Layout"; // Layout Component
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination
import styles from "../styles/payment.module.css"; // CSS for styling

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([
    { id: 1, transactionId: "TXN001", orderId: "ORD001", customer: "Naruto Uzumaki", amount: 1000, date: "2025-01-10", method: "Credit Card", status: "Pending" },
    { id: 2, transactionId: "TXN002", orderId: "ORD002", customer: "Sasuke Uchiha", amount: 500, date: "2025-01-09", method: "PayPal", status: "Completed" },
    { id: 3, transactionId: "TXN003", orderId: "ORD003", customer: "Sakura Haruno", amount: 750, date: "2025-01-08", method: "UPI", status: "Failed" },
    // Add more dummy records
  ]);

  const [filters, setFilters] = useState({ status: "", method: "", search: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Fixed items per page

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const paginatedPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      (filters.status ? payment.status === filters.status : true) &&
      (filters.method ? payment.method === filters.method : true) &&
      (filters.search
        ? payment.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
          payment.orderId.toLowerCase().includes(filters.search.toLowerCase())
        : true)
    );
  });

  const handleRefund = (payment) => {
    alert(`Processing refund for Transaction ID: ${payment.transactionId}`);
  };

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className={styles.pageTitle}>Payment Management</h2>

        {/* Filters Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup className={styles.filterGroup}>
            <FormControl
              placeholder="Search by Trans ID or Customer"
              name="search"
              onChange={handleFilterChange}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
          <div>
            <Form.Select name="status" onChange={handleFilterChange} className={styles.filter}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
            </Form.Select>
            <Form.Select name="method" onChange={handleFilterChange} className={styles.filter}>
              <option value="">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </Form.Select>
          </div>
        </div>

        {/* Payments Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No payments found
                </td>
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
                  <td>{payment.status}</td>
                  <td>
                    <Button className={`${styles.button} ${styles.buttonInfo}`} size="sm" onClick={() => openModal(payment)}>
                      <FaEdit /> View
                    </Button>{" "}
                    <Button
                      className={`${styles.button} ${styles.buttonDanger}`}
                      size="sm"
                      onClick={() => handleRefund(payment)}
                      disabled={payment.status !== "Completed"}
                    >
                      <FaRedo /> Refund
                    </Button>
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
          onPageChange={handlePageChange}
        />

        {/* Payment Details Modal */}
        {selectedPayment && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Payment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
              <p><strong>Order ID:</strong> {selectedPayment.orderId}</p>
              <p><strong>Customer:</strong> {selectedPayment.customer}</p>
              <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
              <p><strong>Date:</strong> {selectedPayment.date}</p>
              <p><strong>Method:</strong> {selectedPayment.method}</p>
              <p><strong>Status:</strong> {selectedPayment.status}</p>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </Layout>
  );
};


export default AdminPaymentPage;
