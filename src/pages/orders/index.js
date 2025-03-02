import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Table, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import styles from '../../styles/order.module.css';
import PaginationComponent from '@/components/PaginationComponent';
import { useRouter } from 'next/router'; // Import useRouter


const OrderPage = () => {
  const initialOrders = [
    { id: 1001, customer: "John Doe", date: "2024-12-28", amount: "$120.00", paymentStatus: "Paid", orderStatus: "Pending" },
    { id: 1002, customer: "Jane Smith", date: "2024-12-27", amount: "$80.00", paymentStatus: "Pending", orderStatus: "Shipped" },
    { id: 1003, customer: "Alice Brown", date: "2024-12-26", amount: "$45.00", paymentStatus: "Failed", orderStatus: "Cancelled" },
    { id: 1004, customer: "Bob White", date: "2024-12-25", amount: "$200.00", paymentStatus: "Paid", orderStatus: "Delivered" }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterOrders(query, selectedStatus, selectedPayment);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterOrders(searchQuery, status, selectedPayment);
  };

  // Handle payment status filter
  const handlePaymentFilter = (status) => {
    setSelectedPayment(status);
    filterOrders(searchQuery, selectedStatus, status);
  };

  // Filter orders
  const filterOrders = (query, orderStatus, paymentStatus) => {
    let filtered = initialOrders.filter((order) => {
      const matchesSearch = order.customer.toLowerCase().includes(query) || order.id.toString().includes(query);
      const matchesStatus = orderStatus ? order.orderStatus === orderStatus : true;
      const matchesPayment = paymentStatus ? order.paymentStatus === paymentStatus : true;
      return matchesSearch && matchesStatus && matchesPayment;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  // Handle order status change
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  // Pagination Logic
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Order Management</h1>

        {/* Filters & Actions */}
        <div className="row mb-4">
          <div className="col-md-4">
            <InputGroup>
              <FormControl
                placeholder="Search by customer name or order ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>

         {/* Status Filter */}
        <div className="col-md-6 d-flex justify-content-end align-items-center ">
        <Dropdown onSelect={(eventKey) => handleStatusFilter(eventKey)} className={styles.filterDropdown}>
            <Dropdown.Toggle variant="light" className={styles.customDropdown}>
            {selectedStatus || 'Filter by Order Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
            <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
            <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
            <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>

        {/* Payment Status Filter */}
        <div className="col-md-2 d-flex justify-content-end align-items-center">
        <Dropdown onSelect={(eventKey) => handlePaymentFilter(eventKey)} className={styles.filterDropdown}>
            <Dropdown.Toggle variant="light" className={styles.customDropdown}>
            {selectedPayment || 'Filter by Payment Status'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            <Dropdown.Item eventKey="Paid">Paid</Dropdown.Item>
            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
            <Dropdown.Item eventKey="Failed">Failed</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>

        </div>

        {/* Order Table */}
        <div className="table-responsive">
          <Table striped bordered hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No orders found</td>
                </tr>
              ) : (
                paginatedOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.paymentStatus.toLowerCase()]}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
  <Dropdown onSelect={(status) => handleStatusChange(order.id, status)}>
    <Dropdown.Toggle 
      size="sm" 
      className={`${styles.statusDropdown} ${styles[order.orderStatus.toLowerCase()]}`}
    >
      {order.orderStatus}
    </Dropdown.Toggle>
    <Dropdown.Menu className={styles.dropdownMenu}>
      <Dropdown.Item eventKey="Pending" className={styles.dropdownItem}>
        <span className={styles.pendingIcon}>🟡 Pending</span> 
      </Dropdown.Item>
      <Dropdown.Item eventKey="Shipped" className={styles.dropdownItem}>
        <span className={styles.shippedIcon}>🚚 Shipped</span> 
      </Dropdown.Item>
      <Dropdown.Item eventKey="Delivered" className={styles.dropdownItem}>
        <span className={styles.deliveredIcon}>✅ Delivered</span> 
      </Dropdown.Item>
      <Dropdown.Item eventKey="Cancelled" className={styles.dropdownItem}>
        <span className={styles.cancelledIcon}>❌ Cancelled</span> 
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</td>

                    <td>
                    <Button 
                        variant="outline-info" 
                        size="sm" 
                        onClick={() => router.push(`/orders/${order.id}`)} // Navigate to Order Details Page
                    >
                        View
                    </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <PaginationComponent
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default OrderPage;
