const express = require("express");
const config = require("config");
const axios = require("axios");
const fs = require("fs");
const router = express.Router();

router.get("/", async (req, res) => {
  const latest = {};
  //chome-- https://chromedriver.storage.googleapis.com/LATEST_RELEASE
  const chromeUrl =
    "https://chromedriver.storage.googleapis.com/LATEST_RELEASE";
  try {
    const chromeVersion = await axios.get(chromeUrl);
    const stableVersion = chromeVersion.data;
    latest.chromeStabledriver = stableVersion;
    let link = new String(config.get("chromelink"));
    var finalLink = link.concat(stableVersion, "/chromedriver_win32.zip");
    // console.log(finalLink);
    latest.chromeLink = finalLink;
    //console.log(latest);
  } catch (err) {
    console.log(err);
  }

  //firefox

  try {
    const url = config.get("geckodriver");
    let result = await axios.get(url);
    let searchString = new String(result.data);
    let version = searchString.search(config.get("geckoString"));
    let latestVersionString = searchString.substr(version, 50);
    // console.log(latestVersionString);
    let versionStart = latestVersionString.search("/v");
    let versionEnd = latestVersionString.search('"');
    let versionNumber = latestVersionString.substring(
      versionStart + "\v".length,
      versionEnd
    );
    latest.geckodriver = versionNumber;
    let link = new String(config.get("geckoLink"));
    // console.log(link);
    var intermed = link.concat(versionNumber);
    var finalLink = intermed.concat(
      "/geckodriver-",
      versionNumber,
      "-win32.zip"
    );
    // console.log(finalLink);
    latest.geckoLink = finalLink;
    //console.log(latest);
  } catch (err) {
    console.log(err);
  }

  //edge
  try {
    const url = config.get("edgedriver");
    let result = await axios.get(url);
    let searchString = new String(result.data);
    let version = searchString.search(config.get("edgeString"));
    //console.log(searchString);
    let latestVersionString = searchString.substr(version, 200);
    // console.log(latestVersionString);
    let remString = "Version: ";
    let versionStart = latestVersionString.search(remString);
    let versionEnd = latestVersionString.search(":  <a ");
    // console.log(versionStart);
    // console.log(versionEnd);
    let versionNumber = latestVersionString.substring(
      versionStart + remString.length,
      versionEnd
    );
    // console.log(versionNumber);
    latest.edgedriver = versionNumber;
    let link = new String(config.get("edgeLink"));
    var finalLink = link.concat(versionNumber, "/edgedriver_win32.zip");
    // console.log(finalLink);
    latest.edgeLink = finalLink;
    console.log(latest);
  } catch (err) {
    console.log(err);
  }
  let jsonString = JSON.stringify(latest);
  fs.writeFile("./config/latest.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.json(latest);
});


module.exports = router;
