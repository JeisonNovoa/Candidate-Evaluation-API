const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { processCandidates } = require("../controllers/candidateController");

const router = express.Router();

router.post("/analyze", upload.array("resumes", 3), processCandidates);

module.exports = router;
