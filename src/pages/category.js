import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown, Modal, Form } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent";
import styles from "../styles/category.module.css";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust items per page as needed
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", status: "Active" });

  useEffect(() => {
    const fetchCategories = () => {
      const fetchedCategories = [
        { id: 1, name: "Electronics", addedDate: "2024-12-27", status: "Active" },
        { id: 2, name: "Fashion", addedDate: "2024-12-26", status: "Inactive" },
        { id: 3, name: "Home & Kitchen", addedDate: "2024-12-25", status: "Active" },
        { id: 4, name: "Sports", addedDate: "2024-12-24", status: "Inactive" },
        { id: 5, name: "Books", addedDate: "2024-12-23", status: "Active" },
        { id: 6, name: "Beauty", addedDate: "2024-12-22", status: "Inactive" },
      ];
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) || category.id.toString().includes(query)
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    const filtered = categories.filter((category) =>
      filter ? category.status === filter : true
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNewCategoryChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
    const newCategoryData = {
      ...newCategory,
      id: newId,
      addedDate: new Date().toISOString().split("T")[0],
    };
    setCategories((prev) => [...prev, newCategoryData]);
    setFilteredCategories((prev) => [...prev, newCategoryData]);
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Category Management</h1>

        {/* Search, Filter, and Add Category */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 text-start">
            <InputGroup>
              <FormControl
                placeholder="Search by category name or ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
            <Dropdown onSelect={handleFilter} className="me-3">
              <Dropdown.Toggle variant="outline-secondary" id="status-dropdown">
                {selectedFilter || "Filter by Status"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All</Dropdown.Item>
                <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" onClick={handleShowModal}>
              Add New Category
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table striped bordered hover className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Sl No.</th>
                <th>Category Name</th>
                <th>Date Added</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                filteredCategories
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((category, index) => (
                    <tr key={category.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.addedDate}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${styles[category.status.toLowerCase()]}`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-info" size="sm" className={styles.actionButton}>
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className={`${styles.actionButton} ms-2`}
                        >
                          Delete
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
          totalItems={filteredCategories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Add Category Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title className="modalTitle">Add New Category</Modal.Title>
  </Modal.Header>
  <Modal.Body className="modalBody">
    <Form>
      {/* Category Name */}
      <Form.Group className="mb-3" controlId="formCategoryName">
        <Form.Label className="formLabel">Category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          name="name"
          value={newCategory.name}
          onChange={handleNewCategoryChange}
          className="formControl"
          required
        />
      </Form.Group>

      {/* Status */}
      <Form.Group className="mb-3" controlId="formCategoryStatus">
        <Form.Label className="formLabel">Status</Form.Label>
        <Form.Select
          name="status"
          value={newCategory.status}
          onChange={handleNewCategoryChange}
          className="formSelect"
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Select>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer className="modalFooter">
    <Button className="cancelButton" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button className="addButton" onClick={handleAddCategory}>
      Add Category
    </Button>
  </Modal.Footer>
</Modal>

      </div>
    </Layout>
  );
};

export default CategoryPage;
