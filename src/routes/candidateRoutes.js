const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ storage: multer.memoryStorage() });
const { processCandidates } = require("../controllers/candidateController");

const router = express.Router();
router.use(cors());

router.post("/analyze", upload.array("resumes", 3), processCandidates);

module.exports = router;
