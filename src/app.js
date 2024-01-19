require("dotenv").config();
const express = require("express");
const multer = require("multer");
const candidateRoutes = require("./routes/candidateRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/candidates", candidateRoutes);

// Manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
