import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown, Form, Modal } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import styles from "../styles/customer.module.css"; // You can create a similar styles file

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const statuses = ["Active", "Inactive", "Banned"];

  useEffect(() => {
    const fetchCustomers = async () => {
      const fetchedCustomers = [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joinedDate: "2024-12-01" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive", joinedDate: "2024-11-28" },
        { id: 3, name: "Emily Brown", email: "emily@example.com", status: "Active", joinedDate: "2024-12-05" },
        { id: 4, name: "Michael Davis", email: "michael@example.com", status: "Banned", joinedDate: "2024-10-15" },
      ];
      setCustomers(fetchedCustomers);
      setFilteredCustomers(fetchedCustomers);
    };
    fetchCustomers();
  }, []);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterCustomers(searchQuery, status);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterCustomers(query, selectedStatus);
  };

  const filterCustomers = (query, status) => {
    let filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
    );
    if (status) {
      filtered = filtered.filter((customer) => customer.status === status);
    }
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = (customer = null) => {
    setNewCustomer(customer || {});
    setIsEditing(!!customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCustomer({});
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      const updatedCustomers = customers.map((c) =>
        c.id === newCustomer.id ? newCustomer : c
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } else {
      const newId = customers.length ? customers[customers.length - 1].id + 1 : 1;
      const customerWithId = { ...newCustomer, id: newId, joinedDate: new Date().toISOString().split("T")[0] };
      const updatedCustomers = [...customers, customerWithId];
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    }
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Customer Management</h1>
        <div className="row mb-4">
          <div className="col-md-6">
            <InputGroup>
              <FormControl
                placeholder="Search by customer name or email"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <Dropdown onSelect={handleStatusFilter} className="me-3">
              <Dropdown.Toggle variant="outline-secondary">
                {selectedStatus || "Filter by Status"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All Statuses</Dropdown.Item>
                {statuses.map((status) => (
                  <Dropdown.Item key={status} eventKey={status}>
                    {status}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={() => handleShowModal()}>
              Add Customer
            </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.status}</td>
                <td>{customer.joinedDate}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowModal(customer)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() =>
                      setCustomers(customers.filter((c) => c.id !== customer.id))
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <PaginationComponent
          totalItems={filteredCustomers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        <Modal show={showModal} onHide={handleCloseModal} className={styles.customModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Customer" : "Add Customer"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newCustomer.name || ""}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={newCustomer.email || ""}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newCustomer.status || ""}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, status: e.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              {isEditing ? "Update Customer" : "Add Customer"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default CustomerPage;
