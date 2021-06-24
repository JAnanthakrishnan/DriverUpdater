const express = require("express");
const router = express.Router();
const admZip = require('adm-zip');
const axios = require("axios");
const fs = require("fs");
const request = require('request');
const latestVersions = require("../config/latest.json");
router.get("/chrome", async (req, res) => {
  res.send("<h1>We will download</h1>");
  var fileUrl = latestVersions.chromeLink;
  var output = "chromedriver_win32.zip";
  request({url: fileUrl, encoding: null}, function(err, resp, body) {
    if(err) throw err;
    fs.writeFile(output, body, function(err) {
      console.log("file written!");
      var zip = new admZip(output);
      console.log('start unzip');
      zip.extractAllTo("/home/user/Desktop", true);
      console.log('finished unzip');
    });
  });
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
