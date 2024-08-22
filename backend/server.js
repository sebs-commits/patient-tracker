require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");

const PORT = process.env.PORT || 5050;
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/api", patientRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
