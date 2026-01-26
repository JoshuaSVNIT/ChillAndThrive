const Razorpay = require("razorpay");
const { createClient } = require("@sanity/client");
require("dotenv").config();

// 1. Initialize Sanity Client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_WRITE_TOKEN, // or read token
  useCdn: false, // Important: False ensures we get the freshest price data
  apiVersion: "2023-05-03",
});

// 2. Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { serviceName } = req.body;

  if (!serviceName) {
    return res.status(400).json({ message: "Service name is required" });
  }

  try {
    // 3. Fetch Price from Sanity dynamically
    // We look for a document of type 'service' where the title matches our serviceName
    const query = `*[_type == "service" && title == $title][0].price`;
    const params = { title: serviceName };

    const priceFromSanity = await client.fetch(query, params);

    // 4. Validate Price
    if (priceFromSanity === undefined || priceFromSanity === null) {
      console.error(`Service not found or price missing for: ${serviceName}`);
      return res.status(404).json({ message: "Service not found in database" });
    }

    // Optional: Check for minimum amount (Razorpay requires > ₹1)
    if (priceFromSanity < 1) {
      return res
        .status(400)
        .json({ message: "Invalid price for payment processing" });
    }

    // 5. Create Razorpay Order
    const options = {
      amount: priceFromSanity * 100, // Convert Rupee to Paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order); // Send Order ID back to frontend
  } catch (error) {
    console.error("Payment Controller Error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

module.exports = { createOrder };
