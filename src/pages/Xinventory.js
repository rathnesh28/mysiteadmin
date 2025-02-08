import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Dropdown, Form, Modal } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import styles from "../styles/inventory.module.css"; // You can create a similar styles file

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = [
        { id: 1, name: "Smartphone", purchasePrice: "$300", sellingPrice: "$500", category: "Electronics", discount: 10, stock: 50, status: "Active", addedDate: "2024-12-01" },
        { id: 2, name: "Laptop", purchasePrice: "$800", sellingPrice: "$1200", category: "Electronics", discount: 5, stock: 30, status: "Active", addedDate: "2024-11-28" },
        { id: 3, name: "Tablet", purchasePrice: "$200", sellingPrice: "$350", category: "Electronics", discount: 0, stock: 20, status: "Inactive", addedDate: "2024-12-05" },
        { id: 4, name: "Headphones", purchasePrice: "$50", sellingPrice: "$100", category: "Accessories", discount: 15, stock: 100, status: "Active", addedDate: "2024-12-15" },
      ];
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    fetchProducts();
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

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = (product = null) => {
    setNewProduct(product || {});
    setIsEditing(!!product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct({});
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      const updatedProducts = products.map((p) =>
        p.id === newProduct.id ? newProduct : p
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      const newProductWithId = { ...newProduct, id: newId, addedDate: new Date().toISOString().split("T")[0] };
      const updatedProducts = [...products, newProductWithId];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
    handleCloseModal();
  };

  const calculateDiscountedPrice = (product) => {
    if (product.discount) {
      const discountedPrice = (parseFloat(product.sellingPrice.replace('$', '')) * (1 - product.discount / 100)).toFixed(2);
      return `$${discountedPrice}`;
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
              Add Product
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
            {paginatedProducts.map((product, index) => (
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
                  <Button variant="info" size="sm" onClick={() => handleShowModal(product)}>
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

        <Modal show={showModal} onHide={handleCloseModal} className={styles.customModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Product" : "Add Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.name || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Price</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.purchasePrice || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, purchasePrice: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.sellingPrice || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sellingPrice: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.discount || 0}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, discount: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.stock || 0}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.category || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newProduct.status || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, status: e.target.value })
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
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default InventoryPage;
