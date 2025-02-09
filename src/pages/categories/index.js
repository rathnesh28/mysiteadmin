import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent";
import styles from "@/styles/category.module.css";

const CategoryPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch categories when component mounts
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

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.id.toString().includes(query)
    );

    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  // Handle status filter
  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    const filtered = categories.filter((category) =>
      filter ? category.status === filter : true
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Navigate to category edit page
  const handleEditCategory = (categoryId) => {
    router.push(`/categories/${categoryId}`);
  };

  // Navigate to add new category page
  const handleAddCategory = () => {
    router.push(`/categories/add`);
  };

  // Handle Delete Category
  const handleDeleteCategory = (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories);
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

          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center gap-3">
              {/* Filter Dropdown */}
              <Dropdown onSelect={handleFilter} className={styles.filterDropdown}>
                <Dropdown.Toggle variant="light" className={styles.customDropdown}>
                  {selectedFilter || "Filter by Status"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                  <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Add Category Button */}
              <Button className={styles.customAddBtn} onClick={handleAddCategory}>
                + Add New Category
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
                        <Button
                          variant="outline-info"
                          size="sm"
                          className={styles.actionButton}
                          onClick={() => handleEditCategory(category.id)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className={styles.actionButton}
                          onClick={() => handleDeleteCategory(category.id)}
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
      </div>
    </Layout>
  );
};

export default CategoryPage;
