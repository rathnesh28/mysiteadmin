import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaUndo, FaFileInvoice, FaTags } from "react-icons/fa";
import Layout from "@/components/Layout"; // Layout Component
import PaginationComponent from "@/components/PaginationComponent"; // Custom Pagination Component
import styles from "../styles/shipping.module.css"; // Import custom styles

const ShippingPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, recipientName: "John Doe", address: "123 Elm St", status: "Ready to Ship", shipmentId: "SHIP001" },
    { id: 2, recipientName: "Jane Smith", address: "456 Oak Ave", status: "Shipped", shipmentId: "SHIP002" },
    { id: 3, recipientName: "Alice Johnson", address: "789 Pine Rd", status: "Ready to Ship", shipmentId: "SHIP003" },
    { id: 4, recipientName: "Bob Brown", address: "101 Maple St", status: "Shipped", shipmentId: "SHIP004" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [processing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mock API functions (since there's no backend right now)
  const mockApiCall = (actionType, shipmentId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (actionType === "create") {
          resolve({ status: "success", message: `Order ${shipmentId} created successfully.` });
        } else if (actionType === "update") {
          resolve({ status: "success", message: `Order ${shipmentId} updated successfully.` });
        } else if (actionType === "cancel") {
          resolve({ status: "success", message: `Order ${shipmentId} canceled successfully.` });
        } else if (actionType === "return") {
          resolve({ status: "success", message: `Order ${shipmentId} returned successfully.` });
        } else {
          reject({ status: "error", message: `Unknown action for ${shipmentId}.` });
        }
      }, 1000);
    });
  };

  const handleAction = async (actionType, shipmentId) => {
    setProcessing(true);
    try {
      const response = await mockApiCall(actionType, shipmentId); // Simulated API call
      alert(response.message);
      setProcessing(false);
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
      setProcessing(false);
    }
  };

  const generateLabelOrInvoice = async (type, shipmentId) => {
    try {
      const response = await mockApiCall(type === "Label" ? "create" : "generate", shipmentId); // Simulated label/invoice generation
      alert(`${type} generated for shipment ${shipmentId}`);
    } catch (error) {
      console.error(error.message);
      alert(`Failed to generate ${type} for shipment ${shipmentId}`);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={styles.pageTitle}>Shipping Management</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Recipient Name</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.recipientName}</td>
                  <td>{order.address}</td>
                  <td>{order.status}</td>
                  <td>
                    {/* Action Buttons with Icons */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setModalType("update");
                        setFormData({
                          shipmentId: order.shipmentId,
                          recipientName: order.recipientName,
                          address: order.address,
                        });
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleAction("cancel", order.shipmentId)}
                    >
                      <FaTrash />
                    </Button>{" "}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleAction("return", order.shipmentId)}
                    >
                      <FaUndo />
                    </Button>{" "}
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => generateLabelOrInvoice("Label", order.shipmentId)}
                    >
                      <FaTags />
                    </Button>{" "}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => generateLabelOrInvoice("Invoice", order.shipmentId)}
                    >
                      <FaFileInvoice />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Custom Pagination Component */}
        <PaginationComponent
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Modal with Custom Styles */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-dialog-centered"
          className={styles.customModal}
        >
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>
              {modalType === "update" && "Update Shipment Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Recipient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="recipientName"
                  value={formData.recipientName || ""}
                  onChange={handleFormChange}
                  className={styles.modalInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleFormChange}
                  className={styles.modalInput}
                />
              </Form.Group>
              <Button
                type="button"
                onClick={() => handleAction(modalType, formData.shipmentId)}
                disabled={processing}
                className={styles.modalButtonPrimary}
              >
                {processing ? "Processing..." : "Save Changes"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default ShippingPage;
