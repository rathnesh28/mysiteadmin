import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import styles from "../styles/order.module.css";
import DownloadComponent from "@/components/DownloadComponent";
import PaginationComponent from "@/components/PaginationComponent";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Simulated API Data
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
    setCurrentPage(1);
  };

  // Handle status update
  const handleStatusUpdate = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  // Paginate filtered orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Order Management</h1>

        {/* Search and Download */}
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
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
            <DownloadComponent data={filteredOrders} />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table striped bordered hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Sl No.</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date of Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data exists
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>
                      <Dropdown onSelect={(newStatus) => handleStatusUpdate(order.id, newStatus)}>
                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                          {order.status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                          <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                          <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

export default OrderPage;
