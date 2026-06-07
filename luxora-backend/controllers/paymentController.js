const Razorpay = require("razorpay");

let razorpay;
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (keyId && keySecret) {
  try {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (error) {
    console.error("Failed to initialize Razorpay:", error);
  }
} else {
  console.warn("Razorpay API credentials (RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET) are missing. Payment gateway is not initialized.");
}

const createRazorpayOrder = async (req, res) => {
  try {
    const { amountInUSD } = req.body;

    if (!amountInUSD || amountInUSD <= 0) {
      return res.status(400).json({ message: "Invalid payment amount." });
    }

    if (!keyId || !keySecret || !razorpay) {
      return res.status(500).json({
        message: "Razorpay payment gateway is not properly configured. Missing required server-side credentials (RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET).",
      });
    }

    // Amount received is in INR (₹). Convert to paise (smallest INR unit).
    const amountInPaise = Math.round(amountInUSD * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const rzpOrder = await razorpay.orders.create(options);

    res.status(200).json({
      id: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    // Razorpay SDK errors use error.error.description — error.message is always undefined
    const description =
      error?.error?.description ||
      error?.message ||
      "Razorpay order creation failed";
    res.status(500).json({ message: description });
  }
};

module.exports = { createRazorpayOrder };
