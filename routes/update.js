const express = require("express");
const router = express.Router();
const axios = require("axios");
const latestVersions = require("../config/latest.json");
router.get("/chrome", async (req, res) => {
  try {
    const result = await axios.get(latestVersions.chromeLink);
    res.send("Done");
    const keys = Object.keys(result);
    console.log(keys);
  } catch (err) {
    console.log(err);
  }

  const http = require("http"); // or 'https' for https:// URLs
  const fs = require("fs");

  const file = fs.createWriteStream("file.zip");
  const request = http.get(
    "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg",
    function (response) {
      response.pipe(file);
    }
  );
});

router.get("/gecko", async (req, res) => {
  try {
    res.send(latestVersions.geckodriver);
  } catch (err) {
    console.log(err);
  }
});

router.get("/edge", async (req, res) => {
  try {
    res.send(latestVersions.edgedriver);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
