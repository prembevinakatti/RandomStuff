const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-images", upload.array("images", 10), async (req, res) => {
  try {
    const results = [];

    for (const file of req.files) {
      const data = new FormData();
      data.append("file", fs.createReadStream(file.path));

      const pinataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          maxContentLength: Infinity,
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            ...data.getHeaders(),
          },
        }
      );

      fs.unlinkSync(file.path); // clean up

      results.push(
        `https://gateway.pinata.cloud/ipfs/${pinataRes.data.IpfsHash}`
      );
    }

    res.json({ success: true, imageUrls: results });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, error: "Image upload failed" });
  }
});

module.exports = router;
