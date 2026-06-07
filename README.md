 🛍️ Luxora Premium E-Commerce Application

A full-stack luxury fashion e-commerce platform built using the MERN stack. Luxora provides a premium online shopping experience with secure authentication, product management, shopping cart functionality, wishlist support, order tracking, and Razorpay payment integration.

✨ Features

 👤 User Features
- User Registration & Login
- Secure JWT Authentication
- Browse Luxury Fashion Products
- Product Search & Filtering
- Product Detail Pages
- Add to Cart
- Wishlist Management
- Checkout & Order Placement
- Order History & Order Details
- Address Management
- Responsive Design

 💳 Payment Features
- Razorpay Payment Gateway Integration
- Test Mode Payment Support
- Secure Payment Verification
- Order Creation After Successful Payment

 🛠️ Admin Features
- Admin Dashboard
- Product Management
- Order Monitoring
- User Management
- Inventory Control

 🏗️ Tech Stack
 Frontend
- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Zustand
- Tailwind CSS
- ShadCN UI
- 
 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Razorpay API

 Database
- MongoDB Atlas

 📂 Project Structure

```text
Luxora-premium-E-commerce-application
│
├── luxora-backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── luxora-premium-boutique-main
    ├── src
    ├── components
    ├── routes
    ├── assets
    └── public
```

 🚀 Installation

 Clone Repository

```bash
git clone https://github.com/aaryasinha449/Luxora-premium-E-commerce-application.git
cd Luxora-premium-E-commerce-application
```

 Backend Setup

```bash
cd luxora-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
RAZORPAY_KEY_ID=YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET

Run Backend:

```bash
npm run dev
```
 Frontend Setup

```bash
cd luxora-premium-boutique-main
npm install
```

Create a `.env` file:

env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=YOUR_KEY
```

Run Frontend:

```bash
npm run dev

 🌐 Application URLs

Frontend:

http://localhost:8080

Backend:

http://localhost:5000

🔐 Security

- JWT Authentication
- Protected Routes
- Password Hashing
- Secure Payment Verification
- Environment Variables Protection
- MongoDB Atlas Secure Connection

