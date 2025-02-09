import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import { useRouter } from "next/router"; // For navigation
import styles from "../../styles/inventory.module.css"; // Keep styling file

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const router = useRouter();

  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    const fetchedProducts = [
      { id: 1, name: "Smartphone", purchasePrice: "₹300", sellingPrice: "₹500", category: "Electronics", discount: 10, stock: 50, status: "Active", addedDate: "2024-12-01" },
      { id: 2, name: "Laptop", purchasePrice: "₹800", sellingPrice: "₹1200", category: "Electronics", discount: 5, stock: 30, status: "Active", addedDate: "2024-11-28" },
      { id: 3, name: "Tablet", purchasePrice: "₹200", sellingPrice: "₹350", category: "Electronics", discount: 0, stock: 20, status: "Inactive", addedDate: "2024-12-05" },
      { id: 4, name: "Headphones", purchasePrice: "₹50", sellingPrice: "₹100", category: "Accessories", discount: 15, stock: 100, status: "Active", addedDate: "2024-12-15" },
    ];
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterProducts(searchQuery, status);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterProducts(query, selectedStatus);
  };

  const filterProducts = (query, status) => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    if (status) {
      filtered = filtered.filter((product) => product.status === status);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateDiscountedPrice = (product) => {
    if (product.discount) {
      const discountedPrice = (parseFloat(product.sellingPrice.replace('₹', '')) * (1 - product.discount / 100)).toFixed(2);
      return `₹${discountedPrice}`;
    }
    return product.sellingPrice;
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} text-center mb-4`}>Inventory Management</h1>
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
            <Button  className={styles.customAddBtn} variant="primary" onClick={() => router.push("/products/add")}>
            + Add Product
            </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Discount</th>
              <th>Final Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{product.name}</td>
                <td>{product.purchasePrice}</td>
                <td>{product.sellingPrice}</td>
                <td>{product.discount}%</td>
                <td>{calculateDiscountedPrice(product)}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.status}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => router.push(`/inventory/${product.id}`)}>
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

export default InventoryPage;
