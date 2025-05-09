import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaUndo, FaTags, FaFileInvoice } from "react-icons/fa";
import Layout from "@/components/Layout";
import PaginationComponent from "@/components/PaginationComponent";
import styles from "@/styles/shipping.module.css";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure AutoTable is imported

const ShipmentList = () => {
  const [shipments, setShipments] = useState([
    { id: "SHIP001", orderId: "ORD123", recipient: "John Doe", address: "123 Elm St, NY", status: "Pending", carrier: "DHL", tracking: "DHL12345", eta: "2025-03-10" },
    { id: "SHIP002", orderId: "ORD124", recipient: "Jane Smith", address: "456 Oak Ave, CA", status: "Shipped", carrier: "FedEx", tracking: "FDX67890", eta: "2025-03-12" },
    { id: "SHIP003", orderId: "ORD125", recipient: "Alice Johnson", address: "789 Pine Rd, TX", status: "Delivered", carrier: "UPS", tracking: "UPS54321", eta: "2025-03-08" },
  ]);

  const router = useRouter();

  const getStatusBadge = (status) => {
    const statusVariant = {
      Pending: "warning",
      Shipped: "info",
      Delivered: "success",
      Returned: "danger",
    };
    return <Badge bg={statusVariant[status] || "secondary"}>{status}</Badge>;
  };

  // 📌 Reusable function for generating PDF
  const generatePDF = (shipment, type) => {
    try {
      console.log("Generating PDF for:", shipment);

      const doc = new jsPDF();
      doc.setFont("helvetica");
      doc.setFontSize(16);
      doc.text(type === "label" ? "Shipping Label" : "Invoice", 80, 20);

      doc.setFontSize(12);
      doc.text(`Shipment ID: ${shipment.id}`, 10, 40);
      doc.text(`Order ID: ${shipment.orderId}`, 10, 50);
      doc.text(`Recipient: ${shipment.recipient}`, 10, 60);
      doc.text(`Address: ${shipment.address}`, 10, 70);
      doc.text(`Carrier: ${shipment.carrier}`, 10, 80);
      doc.text(`Tracking: ${shipment.tracking}`, 10, 90);
      doc.text(`ETA: ${shipment.eta}`, 10, 100);

      if (type === "invoice") {
        doc.text("Total Amount: $XX.XX", 10, 120);
      }

      // 📌 Debugging
      console.log("Saving PDF...");

      // More reliable method to trigger download
      const pdfBlob = doc.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${type}_${shipment.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className={styles.pageTitle}>Shipment Management</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Order ID</th>
              <th>Recipient</th>
              <th>Address</th>
              <th>Status</th>
              <th>Carrier</th>
              <th>Tracking</th>
              <th>ETA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.id}</td>
                <td>{shipment.orderId}</td>
                <td>{shipment.recipient}</td>
                <td>{shipment.address}</td>
                <td>{getStatusBadge(shipment.status)}</td>
                <td>{shipment.carrier}</td>
                <td>{shipment.tracking}</td>
                <td>{shipment.eta}</td>
                <td>
                  <Button variant="secondary" size="sm" className="me-1" onClick={() => router.push(`/shipment/${shipment.id}`)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" className="me-1">
                    <FaTrash />
                  </Button>
                  <Button variant="warning" size="sm" className="me-1">
                    <FaUndo />
                  </Button>
                  <Button variant="info" size="sm" className="me-1" onClick={() => generatePDF(shipment, "label")}>
                    <FaTags /> Label
                  </Button>
                  <Button variant="success" size="sm" onClick={() => generatePDF(shipment, "invoice")}>
                    <FaFileInvoice /> Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Component */}
        <PaginationComponent totalItems={shipments.length} itemsPerPage={5} currentPage={1} onPageChange={() => {}} />
      </div>
    </Layout>
  );
};

export default ShipmentList;
