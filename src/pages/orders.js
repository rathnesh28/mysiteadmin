import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Table, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import styles from '../styles/order.module.css';
import DownloadComponent from '@/components/DownloadComponent'; // Import the download component
import PaginationComponent from '@/components/PaginationComponent'; // Import the Pagination Component

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set to 1 initially or any number you want

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = [
        { id: 12345, customer: "John Doe", date: "2024-12-28", status: "Pending" },
        { id: 12346, customer: "Jane Smith", date: "2024-12-27", status: "Completed" },
        { id: 12347, customer: "Alice Brown", date: "2024-12-26", status: "Cancelled" },
        { id: 12348, customer: "Bob White", date: "2024-12-25", status: "Pending" }
      ];
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    };
    fetchOrders();
  }, []);

   // Paginate filtered orders
   const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(query) ||
        order.id.toString().includes(query)
    );
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to the first page when the search changes
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterOrders(searchQuery, status);
  };

  // Filter orders based on search query and selected status
  const filterOrders = (query, status) => {
    let filtered = orders.filter((order) => {
      const matchesSearch = order.customer.toLowerCase().includes(query.toLowerCase()) || order.id.toString().includes(query);
      const matchesStatus = status ? order.status === status : true;
      return matchesSearch && matchesStatus;
    });

    // Apply sorting to the filtered orders
    filtered = filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      } else {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      }
    });

    setFilteredOrders(filtered);
  };

  // Handle sorting functionality
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    filterOrders(searchQuery, selectedStatus);
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Order Management</h1>

        {/* Search, Filter, and Download */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 text-start">
            <InputGroup>
              <FormControl
                placeholder="Search by customer name or order ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>

          {/* Filter and Download buttons */}
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
            {/* Filter Dropdown */}
            <Dropdown onSelect={handleStatusFilter} className="me-3">
              <Dropdown.Toggle variant="outline-secondary" id="status-dropdown">
                {selectedStatus || 'Filter by Status'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All</Dropdown.Item>
                <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Download Component */}
            <DownloadComponent data={filteredOrders} />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table striped bordered hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Sl No.</th> {/* Add the Sl No column */}
                <th onClick={() => handleSort('id')}>
                  Order ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Customer Name</th>
                <th onClick={() => handleSort('date')}>
                  Date of Order {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data exists
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> {/* Display Serial Number */}
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-info" size="sm" className={`${styles.actionButton}`}>View Details</Button>
                      <Button variant="outline-success" size="sm" className={`${styles.actionButton} ms-2`}>Update Status</Button>
                      <Button variant="outline-danger" size="sm" className={`${styles.actionButton} ms-2`}>Cancel</Button>
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
