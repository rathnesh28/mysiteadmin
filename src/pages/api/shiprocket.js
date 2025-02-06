const axios = require("axios");

const SHIPROCKET_BASE_URL = "https://apiv2.shiprocket.in/v1/external";
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL; // Your Shiprocket email from .env
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD; // Your Shiprocket password from .env
let TOKEN = null; // Token will be fetched and cached

/**
 * Get Shiprocket Token
 */
async function getToken() {
  try {
    if (!TOKEN) {
      const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      });
      TOKEN = response.data.token;
    }
    return TOKEN;
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Shiprocket API.");
  }
}

/**
 * Handle API requests
 */
export default async function handler(req, res) {
  try {
    const token = await getToken();
    const { action, payload } = req.body;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let response;
    switch (action) {
      case "createOrder":
        response = await axios.post(
          `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
          payload,
          config
        );
        break;

      case "updateOrder":
        response = await axios.post(
          `${SHIPROCKET_BASE_URL}/orders/update/adhoc`,
          payload,
          config
        );
        break;

      case "cancelOrder":
        response = await axios.post(
          `${SHIPROCKET_BASE_URL}/orders/cancel`,
          payload,
          config
        );
        break;

      case "generateLabel":
        response = await axios.post(
          `${SHIPROCKET_BASE_URL}/courier/generate/label`,
          payload,
          config
        );
        break;

      case "printInvoice":
        response = await axios.post(
          `${SHIPROCKET_BASE_URL}/orders/print/invoice`,
          payload,
          config
        );
        break;

      default:
        res.status(400).json({ error: "Invalid action specified." });
        return;
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
}
