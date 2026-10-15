// Load biến môi trường
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import các routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const shippingRoutes = require("./routes/shippingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route mặc định để test server
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Chào mừng bạn đến với Máy chủ RESTful API E-Commerce - LHU TMĐT",
    version: "1.0.0",
    status: "ONLINE",
  });
});

// Gắn routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/shipping", shippingRoutes);

// Middleware xử lý 404 (luôn đặt cuối cùng)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Đường dẫn [${req.method}] ${req.originalUrl} không tồn tại!`,
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log("====================================================");
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`🛒 Test Đặt hàng: POST http://localhost:${PORT}/api/orders`);
  console.log(`📋 Test Danh sách đơn: GET http://localhost:${PORT}/api/orders`);
  console.log("====================================================");
});
