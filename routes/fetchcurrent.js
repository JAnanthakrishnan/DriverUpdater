const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("<h1>We will fetch the current versions from here</h1>");
});
module.exports = router;
