const express = require("express");
const config = require("config");
const axios = require("axios");
const fs = require("fs");
const router = express.Router();

function updateFile(driver, stableVersion, betaVersion) {
  const latest = require("../config/latest.json");
  if (driver === "chrome") {
    latest.chromeStabledriver = stableVersion;
    let link = new String(config.get("chromelink"));
    console.log(link);
    var intermed = link.concat(stableVersion);
    var finalLink = intermed.concat("/chromedriver_win32.zip");
    console.log(finalLink);
    latest.chromeLink = finalLink;
    // latest.chromeBetadriver = betaVersion;
  }
  if (driver === "gecko") {
    latest.geckodriver = stableVersion;
    let link = new String(config.get("geckoLink"));
    console.log(link);
    var intermed = link.concat(stableVersion);
    var finalLink = intermed.concat(
      "/geckodriver-",
      stableVersion,
      "-win32.zip"
    );
    console.log(finalLink);
    latest.geckoLink = finalLink;
  }
  if (driver === "edge") {
    //91.0.864.54
    latest.edgedriver = stableVersion;
    let link = new String(config.get("edgeLink"));
    console.log(link);
    var finalLink = link.concat(stableVersion, "/edgedriver_win32.zip");
    console.log(finalLink);
    latest.edgeLink = finalLink;
  }
  let jsonString = JSON.stringify(latest);
  fs.writeFile("./config/latest.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}


router.get('/',async)
router.get("/chrome", async (req, res) => {
  try {
    const url = config.get("chromedriver");
    let result = await axios.get(url);
    let searchString = new String(result.data);
    // console.log(searchString);
    let stable = searchString.search(config.get("chromeStableString"));
    let beta = searchString.search(config.get("chromeBetaString"));
    let stableVersionHtml = searchString.substr(stable, beta - stable);
    let stableVersionStart = stableVersionHtml.search("ChromeDriver");
    let stableVersionEnd = stableVersionHtml.search("</a>");
    let chromeStr = "ChromeDriver";
    const sb = stableVersionHtml.substring(
      stableVersionStart + chromeStr.length + 1,
      stableVersionEnd
    );
    //91.0.4472.101/chromedriver_win32.zip
    updateFile("chrome", sb, null);
    res.send(sb);
  } catch (err) {
    console.log(err);
  }
});

router.get("/gecko", async (req, res) => {
  try {
    const url = config.get("geckodriver");
    let result = await axios.get(url);
    let searchString = new String(result.data);
    let version = searchString.search(config.get("geckoString"));
    let latestVersionString = searchString.substr(version, 50);
    console.log(latestVersionString);
    let versionStart = latestVersionString.search("/v");
    let versionEnd = latestVersionString.search('"');
    let versionNumber = latestVersionString.substring(
      versionStart + "\v".length,
      versionEnd
    );
    updateFile("gecko", versionNumber, null);
    res.send(versionNumber);
  } catch (err) {
    console.log(err);
  }
});

router.get("/edge", async (req, res) => {
  try {
    const url = config.get("edgedriver");
    let result = await axios.get(url);
    let searchString = new String(result.data);
    let version = searchString.search(config.get("edgeString"));
    //console.log(searchString);
    let latestVersionString = searchString.substr(version, 200);
    console.log(latestVersionString);
    let remString = "Version: ";
    let versionStart = latestVersionString.search(remString);
    let versionEnd = latestVersionString.search(":  <a ");
    console.log(versionStart);
    console.log(versionEnd);
    let versionNumber = latestVersionString.substring(
      versionStart + remString.length,
      versionEnd
    );
    console.log(versionNumber);
    updateFile("edge", versionNumber, null);
    res.send(versionNumber);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
