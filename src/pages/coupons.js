import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Table, Button, InputGroup, FormControl, Form, Modal } from "react-bootstrap";
import PaginationComponent from "@/components/PaginationComponent"; // Your Pagination Component
import styles from "../styles/coupon.module.css"; // Add your CSS styles here

const CouponPromotionPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCoupons = async () => {
      const fetchedCoupons = [
        { id: 1, code: "DISCOUNT10", discount: "10%", status: "Active", expiryDate: "2025-01-15" },
        { id: 2, code: "FREESHIP", discount: "Free Shipping", status: "Inactive", expiryDate: "2024-12-31" },
        { id: 3, code: "SAVE20", discount: "20%", status: "Active", expiryDate: "2025-02-10" },
      ];
      setCoupons(fetchedCoupons);
      setFilteredCoupons(fetchedCoupons);
    };
    fetchCoupons();
  }, []);

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = coupons.filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(query.toLowerCase()) ||
        coupon.discount.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoupons(filtered);
    setCurrentPage(1);
  };

  // Paginate coupons
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle modal
  const handleShowModal = (coupon = null) => {
    setNewCoupon(coupon || {});
    setIsEditing(!!coupon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCoupon({});
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (isEditing) {
      // Update coupon
      const updatedCoupons = coupons.map((c) =>
        c.id === newCoupon.id ? newCoupon : c
      );
      setCoupons(updatedCoupons);
      setFilteredCoupons(updatedCoupons);
    } else {
      // Add coupon
      const newId = coupons.length ? coupons[coupons.length - 1].id + 1 : 1;
      const couponWithId = { ...newCoupon, id: newId };
      const updatedCoupons = [...coupons, couponWithId];
      setCoupons(updatedCoupons);
      setFilteredCoupons(updatedCoupons);
    }
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={styles.pageTitle}>Coupon and Promotion Management</h1>

        {/* Search and Actions */}
        <div className={`row mb-4 ${styles.searchActions}`}>
          <div className="col-12 col-md-6">
            <InputGroup>
              <FormControl
                placeholder="Search by code or discount"
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchInput}
              />
            </InputGroup>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end">
            <Button variant="primary" onClick={() => handleShowModal()} className={styles.addButton}>
              Add Coupon/Promotion
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCoupons.length ? (
                paginatedCoupons.map((coupon, index) => (
                  <tr key={coupon.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{coupon.code}</td>
                    <td>{coupon.discount}</td>
                    <td>{coupon.status}</td>
                    <td>{coupon.expiryDate}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowModal(coupon)}
                        className={styles.editButton}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className={`ms-2 ${styles.deleteButton}`}
                        onClick={() =>
                          setCoupons(coupons.filter((c) => c.id !== coupon.id))
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <PaginationComponent
          totalItems={filteredCoupons.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Coupon" : "Add Coupon"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formCouponCode">
                <Form.Label>Coupon Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter coupon code"
                  value={newCoupon.code || ""}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, code: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter discount (e.g., 10%, Free Shipping)"
                  value={newCoupon.discount || ""}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, discount: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newCoupon.status || ""}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formExpiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newCoupon.expiryDate || ""}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, expiryDate: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              {isEditing ? "Update Coupon" : "Add Coupon"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default CouponPromotionPage;
