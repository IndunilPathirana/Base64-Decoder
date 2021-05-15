const connectDB = require("./config/db");
const express = require("express");

const app = express();
const path = require("path");

connectDB();

// Initialize The Middleware
app.use(express.json({ extended: false, limit: "50mb" }));

//  crazy api

app.use("/api/decoder", require("./routes/api/decoder"));

//  port set
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
