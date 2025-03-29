import React, { useState } from "react";
import styles from "@/styles/shipmentEdit.module.css";
import Layout from "@/components/Layout";

const ShipmentEdit = () => {
  const [shipmentData, setShipmentData] = useState({
    orderId: "ORD123456", // Read-only
    trackingId: "TRK987654", // Read-only
    courierCompany: "FedEx",
    shipmentStatus: "In Transit",
    weight: "2.5",
    dimensions: { length: "10", width: "5", height: "8" },
    packageType: "Box",
    pickupLocation: "New York Warehouse",
    deliveryAddress: "456 Fashion St, Los Angeles, CA",
    expectedDelivery: "2025-03-10",
    shippingCost: "15.00",
    paymentStatus: "Paid",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({ ...shipmentData, [name]: value });
  };

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({
      ...shipmentData,
      dimensions: { ...shipmentData.dimensions, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipment Updated:", shipmentData);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Edit Shipment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Order ID:</label>
                <input type="text" value={shipmentData.orderId} readOnly className={styles.readOnlyField} />
              </div>
              <div className={styles.formGroup}>
                <label>Tracking ID:</label>
                <input type="text" value={shipmentData.trackingId} readOnly className={styles.readOnlyField} />
              </div>
              <div className={styles.formGroup}>
                <label>Courier Company:</label>
                <select name="courierCompany" value={shipmentData.courierCompany} onChange={handleChange}>
                  <option value="FedEx">FedEx</option>
                  <option value="DHL">DHL</option>
                  <option value="UPS">UPS</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Shipment Status:</label>
                <select name="shipmentStatus" value={shipmentData.shipmentStatus} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Weight (kg):</label>
                <input type="number" name="weight" value={shipmentData.weight} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Dimensions (L x W x H in cm):</label>
                <div className={styles.dimensionsContainer}>
                  <input type="number" name="length" placeholder="Length" value={shipmentData.dimensions.length} onChange={handleDimensionsChange} />
                  <input type="number" name="width" placeholder="Width" value={shipmentData.dimensions.width} onChange={handleDimensionsChange} />
                  <input type="number" name="height" placeholder="Height" value={shipmentData.dimensions.height} onChange={handleDimensionsChange} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Package Type:</label>
                <select name="packageType" value={shipmentData.packageType} onChange={handleChange}>
                  <option value="Box">Box</option>
                  <option value="Envelope">Envelope</option>
                  <option value="Pallet">Pallet</option>
                </select>
              </div>
            </div>
            <div className={styles.buttonGroupCentered}>
              <button type="button" className={styles.cancelButton}>Cancel</button>
              <button type="submit" className={styles.saveButton}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentEdit;
