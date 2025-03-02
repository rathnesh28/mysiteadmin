import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import Layout from "@/components/Layout";
import styles from "@/styles/payment.module.css";

const PaymentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [payment, setPayment] = useState(null);
  const [refundStatus, setRefundStatus] = useState("");

  useEffect(() => {
    const paymentsData = [
      { id: 1, transactionId: "TXN001", orderId: "ORD001", customer: "Naruto Uzumaki", amount: 1000, date: "2025-01-10", method: "Credit Card", status: "Pending", orderStatus: "Delivered" },
      { id: 2, transactionId: "TXN002", orderId: "ORD002", customer: "Sasuke Uchiha", amount: 500, date: "2025-01-09", method: "PayPal", status: "Completed", orderStatus: "Returned" },
      { id: 3, transactionId: "TXN003", orderId: "ORD003", customer: "Sakura Haruno", amount: 750, date: "2025-01-08", method: "UPI", status: "Failed", orderStatus: "Cancelled" },
    ];
    const selectedPayment = paymentsData.find((p) => p.id === Number(id));
    if (selectedPayment) {
      setPayment(selectedPayment);
      setRefundStatus(selectedPayment.orderStatus === "Returned" ? "Refund Pending" : "Not Eligible");
    }
  }, [id]);

  const handleRefund = () => {
    if (payment && payment.orderStatus === "Returned") {
      setRefundStatus("Refund Processed");
      alert("Refund processed successfully!");
    }
  };

  if (!payment) return <Layout><p className="text-center">Loading...</p></Layout>;

  return (
    <Layout>
      <div className="container mt-4">
        <Card className={styles.paymentCard}>
          <Card.Header className={styles.paymentHeader}>Payment Details</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                <p><strong>Order ID:</strong> {payment.orderId}</p>
                <p><strong>Customer:</strong> {payment.customer}</p>
                <p><strong>Amount:</strong> ₹{payment.amount}</p>
              </Col>
              <Col md={6}>
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Method:</strong> {payment.method}</p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  <Badge bg={payment.status === "Completed" ? "success" : payment.status === "Pending" ? "warning" : "danger"}>
                    {payment.status}
                  </Badge>
                </p>
                <p>
                  <strong>Order Status:</strong>{" "}
                  <Badge bg={payment.orderStatus === "Delivered" ? "primary" : payment.orderStatus === "Returned" ? "info" : "secondary"}>
                    {payment.orderStatus}
                  </Badge>
                </p>
              </Col>
            </Row>

            <p className={styles.refundText}>
              <strong>Refund Status:</strong>{" "}
              <Badge bg={refundStatus === "Refund Pending" ? "warning" : refundStatus === "Refund Processed" ? "success" : "secondary"}>
                {refundStatus}
              </Badge>
            </p>

            {payment.orderStatus === "Returned" && refundStatus === "Refund Pending" && (
              <Button className={`${styles.buttonRefund}`} onClick={handleRefund}>
                Process Refund
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentDetailsPage;
