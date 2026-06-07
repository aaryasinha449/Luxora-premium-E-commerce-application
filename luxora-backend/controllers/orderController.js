const Order = require("../models/order");
const Product = require("../models/product");

/** Validates that a string is a 24-character hexadecimal MongoDB ObjectId. */
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(String(id));


// Create New Order
const createOrder = async (req, res) => {
  try {
    const { customer, shippingAddress, shippingMethod, items, financials, paymentDetails } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item." });
    }

    // Step 1: Enforce Payment Signature Verification first
    if (!paymentDetails || !paymentDetails.razorpaySignature || !paymentDetails.razorpayOrderId || !paymentDetails.razorpayPaymentId) {
      return res.status(400).json({ message: "Payment details and signature are required." });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({
        message: "Razorpay signature verification cannot be performed. Missing required server-side configurations (RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET).",
      });
    }

    const crypto = require("crypto");
    const signatureBody = paymentDetails.razorpayOrderId + "|" + paymentDetails.razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signatureBody.toString())
      .digest("hex");

    if (expectedSignature !== paymentDetails.razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed. Invalid transaction signature." });
    }

    // Step 2: Validate all products and stock levels
    const productValidations = [];
    for (const item of items) {
      // Validate ObjectId format before hitting the database.
      if (!isValidObjectId(item.product)) {
        return res.status(400).json({
          message: `Invalid product ID "${item.product}". Your cart may contain outdated items. Please clear your cart and add products again.`,
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found.` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `Insufficient stock for product "${product.name}". Available: ${product.stock}, Requested: ${item.qty}`,
        });
      }
      productValidations.push({ productDoc: product, qty: item.qty });
    }

    // Step 3: Generate unique orderNumber
    let orderNumber;
    let isUnique = false;
    const currentYear = new Date().getFullYear();

    while (!isUnique) {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      orderNumber = `LX-${currentYear}-${randomDigits}`;

      const existingOrder = await Order.findOne({ orderNumber });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    // Step 4: Create the Order in MongoDB
    const newOrder = new Order({
      orderNumber,
      customer,
      shippingAddress,
      shippingMethod,
      items,
      financials,
      paymentStatus: "Paid",
      paymentDetails,
    });

    const savedOrder = await newOrder.save();

    // Step 5: Decrement product stock after successful validation and creation
    for (const validation of productValidations) {
      validation.productDoc.stock -= validation.qty;
      await validation.productDoc.save();
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (Optionally filtered by customer email)
const getOrders = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== "admin") {
      // Regular users can only retrieve orders matching their authenticated email
      filter = { "customer.email": req.user.email };
    } else if (req.query.email) {
      // Admins can filter by query parameter
      filter = { "customer.email": req.query.email };
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Order by MongoDB _id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Protect: ensure user is admin or the order belongs to them
    if (req.user.role !== "admin" && order.customer.email !== req.user.email) {
      return res.status(403).json({ message: "Not authorized to access this order." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status by MongoDB _id
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (req.body.status) {
      order.status = req.body.status;
    }

    if (req.body.tracking) {
      if (req.body.tracking.status) {
        order.tracking.status = req.body.tracking.status;
      }
      if (req.body.tracking.message) {
        order.tracking.message = req.body.tracking.message;
      }
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
