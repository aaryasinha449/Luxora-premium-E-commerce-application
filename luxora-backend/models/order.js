const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingMethod: {
      type: String,
      required: true,
      enum: ["Standard", "Express", "White-glove"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    financials: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Failed"],
      default: "Paid",
    },
    paymentDetails: {
      method: { type: String, default: "Razorpay" },
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
    },
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Confirmed", "In Transit", "Delivered", "Cancelled"],
      default: "Processing",
    },
    tracking: {
      status: {
        type: String,
        required: true,
        enum: ["Confirmed", "Prepared", "Shipped", "Delivered"],
        default: "Confirmed",
      },
      message: {
        type: String,
        default: "Confirmed — Awaiting preparation at atelier",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
