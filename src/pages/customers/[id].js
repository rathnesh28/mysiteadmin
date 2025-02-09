import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { Form, Button, Card } from "react-bootstrap";
import styles from "@/styles/CustomerEdit.module.css"; // Custom CSS module

const CustomerEditPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && id !== "add") {
      setCustomer({
        id,
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
      });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? "Updating customer:" : "Adding new customer:", customer);
    router.push("/customers");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.heading}>{isEditing ? "Edit Customer" : "Add Customer"}</h2>
        <Card className={styles.card}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Customer Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                className={styles.formControl}
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter customer email"
                className={styles.formControl}
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Status *</Form.Label>
              <Form.Control
                as="select"
                className={styles.formControl}
                value={customer.status}
                onChange={(e) => setCustomer({ ...customer, status: e.target.value })}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Banned">Banned</option>
              </Form.Control>
            </Form.Group>

            <div className={styles.addWrapper}>
              <Button variant="secondary" className={styles.cancelButton} onClick={() => router.push("/customers")}>
                Cancel
              </Button>
              <Button type="submit" className={styles.addButton}>
                {isEditing ? "Update Customer" : "Add Customer"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerEditPage;
