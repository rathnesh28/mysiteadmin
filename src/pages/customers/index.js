import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import PaginationComponent from "@/components/PaginationComponent";
import styles from "../../styles/customer.module.css";

const CustomerList = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterCustomers(query, selectedStatus);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterCustomers(searchQuery, status);
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

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this customer?")) {
      const updatedCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    }
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center gap-3">
            <Dropdown onSelect={handleStatusFilter} className={styles.filterDropdown}>
              <Dropdown.Toggle variant="light" className={styles.customDropdown}>
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
            <Button variant="primary" className={styles.customAddBtn} onClick={() => router.push("/customers/add")}>
              + Add Customer
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
                  <Button variant="info" size="sm" onClick={() => router.push(`/customers/${customer.id}`)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleRemove(customer.id)}>
                    Remove
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
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

export default CustomerList;
