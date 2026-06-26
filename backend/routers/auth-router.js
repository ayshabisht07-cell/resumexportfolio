const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controllers");
const upload = require("../controllers/resume-uploads");

router.post("/login", authcontroller.login);

router.post("/uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});

module.exports = router;
