import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import { useRouter } from "next/router"; // To handle navigation
import styles from "../../styles/product.module.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const router = useRouter();

  const categories = ["Necklaces", "Bracelets", "Earrings", "Rings", "Watches"];

  useEffect(() => {
    // Mock fetch for product list
    const fetchedProducts = [
      { id: 1, name: "Gold Necklace", price: "₹100", category: "Necklaces", status: "Active", addedDate: "2024-12-20" },
      // Add more products here
    ];
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const filterProducts = (query, category) => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Product Management</h1>
        <div className="row mb-4">
          <div className="col-md-6">
            <InputGroup>
              <FormControl
                placeholder="Search by product name or category"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center gap-3">
            <Dropdown onSelect={setSelectedCategory}  className={styles.filterDropdown}>
            <Dropdown.Toggle variant="light" className={styles.customDropdown}>
                {selectedCategory || "Filter by Category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All Categories</Dropdown.Item>
                {categories.map((category) => (
                  <Dropdown.Item key={category} eventKey={category}>
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button className={styles.customAddBtn} variant="primary" onClick={() => router.push("/products/add")}>
              + Add Product
            </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.status}</td>
                <td>{product.addedDate}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() =>
                      setProducts(products.filter((p) => p.id !== product.id))
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
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default ProductPage;
