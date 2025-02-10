import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, Table } from 'react-bootstrap';
import styles from '../../styles/order.module.css';

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get Order ID from URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      // Fake API Data - Replace this with API Call
      const fetchedOrders = [
        { id: 1001, customer: "John Doe", date: "2024-12-28", amount: "$120.00", paymentStatus: "Paid", orderStatus: "Pending", items: [{ name: "Gold Bracelet", qty: 1, price: "$120.00" }] },
        { id: 1002, customer: "Jane Smith", date: "2024-12-27", amount: "$80.00", paymentStatus: "Pending", orderStatus: "Shipped", items: [{ name: "Silver Ring", qty: 2, price: "$40.00" }] },
      ];

      const foundOrder = fetchedOrders.find(order => order.id.toString() === id);
      setOrder(foundOrder || null);
    }
  }, [id]);

  if (!order) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h2>Order Not Found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className={`${styles.pageTitle} mb-4`}>Order Details</h1>
        
        {/* Order Summary */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Order ID: #{order.id}</h5>
            <p><strong>Customer:</strong> {order.customer}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Amount:</strong> {order.amount}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Order Status:</strong> {order.orderStatus}</p>
          </Card.Body>
        </Card>

        {/* Order Items */}
        <h3>Order Items</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default OrderDetails;
