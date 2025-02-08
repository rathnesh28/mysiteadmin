import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Form, Button, Container } from "react-bootstrap";
import styles from "../../styles/inventoryForm.module.css"; // Import module CSS

const InventoryForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = id !== "add";
  const [formData, setFormData] = useState({
    name: "",
    purchasePrice: "",
    sellingPrice: "",
    discount: 0,
    stock: 0,
    category: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEditing) {
      const existingProducts = [
        { id: "1", name: "Smartphone", purchasePrice: "300", sellingPrice: "500", category: "Electronics", discount: 10, stock: 50, status: "Active" },
        { id: "2", name: "Laptop", purchasePrice: "800", sellingPrice: "1200", category: "Electronics", discount: 5, stock: 30, status: "Active" },
        { id: "3", name: "Tablet", purchasePrice: "200", sellingPrice: "350", category: "Electronics", discount: 0, stock: 20, status: "Inactive" },
        { id: "4", name: "Headphones", purchasePrice: "50", sellingPrice: "100", category: "Accessories", discount: 15, stock: 100, status: "Active" },
      ];
      const product = existingProducts.find((p) => p.id === id);
      if (product) setFormData(product);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
    router.push("/inventory"); // Redirect after save
  };

  return (
    <Layout>
      <Container className={`mt-5 ${styles.container}`}>
        <h2 className={styles.heading}>{isEditing ? "Edit Product" : "Add New Product"}</h2>
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Purchase Price ($)</Form.Label>
            <Form.Control
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Selling Price ($)</Form.Label>
            <Form.Control
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className={styles.formControl}
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.formControl}
              required
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} className={styles.formControl}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          <div className={styles.addWrapper} >
           <Button variant="secondary" className={styles.cancelButton} onClick={() => router.push("/inventory")}>
              Cancel
            </Button>
          <Button type="submit" className={styles.addButton}>
            {isEditing ? "Update inventory" : "Add inventory"}
          </Button>
        </div>
         
        </Form>
      </Container>
    </Layout>
  );
};

export default InventoryForm;
