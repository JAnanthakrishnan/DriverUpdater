const express = require("express");
const router = express.Router();
const admZip = require("adm-zip");
const axios = require("axios");
const fs = require("fs");
const request = require("request");
const latestVersions = require("../config/latest.json");
const AdmZip = require("adm-zip");
let Client = require("ssh2-sftp-client");

async function connectServer(
  host,
  username,
  password,
  port,
  serverFile,
  localFile
) {
  return new Promise(async (resolve, reject) => {
    const config = {
      host,
      port,
      username,
      password,
    };
    let sftp = new Client();
    try {
      await sftp.connect(config);
      const response = await sftp.fastPut(localFile, serverFile);
      resolve(sftp);
    } catch (err) {
      console.log(err);
      reject(sftp);
    }
  });
}

function unzipDriver(url, output) {
  try {
    console.log(url);
    console.log(output);
    return new Promise((resolve, reject) => {
      request({ url, encoding: null }, function (err, resp, body) {
        if (err) {
          reject("Failed to download file");
        }
        let str = "temp/" + output;
        fs.writeFile(str, body, function (err) {
          console.log("File written!");
          let zip = new AdmZip(str);
          console.log("Start unzip");
          zip.extractAllTo("drivers", true);
          console.log("finished unzip");
        });
        resolve("Downloaded successfully");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

router.get("/chrome", async (req, res) => {
  const message = await unzipDriver(
    latestVersions.chromeLink,
    "chromedriver.zip"
  );
  console.log(message);
  const upload = await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Users/thisisadmin/Documents/Grid1/WebDrivers/chromedriver.exe",
    "drivers/chromedriver.exe"
  );
  console.log("Done");
  res.send("<h1>ChromeDriver Downloaded and Uploaded</h1>");
});

router.get("/gecko", async (req, res) => {
  const message = await unzipDriver(
    latestVersions.geckoLink,
    "geckodriver.zip"
  );
  console.log(message);
  const upload = await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Users/thisisadmin/Documents/Grid1/WebDrivers/geckodriver.exe",
    "drivers/geckodriver.exe"
  );
  console.log("Done");
  res.send("<h1>Geckodriver Downloaded and Uploaded</h1>");
});
router.get("/edge", async (req, res) => {
  const message = await unzipDriver(latestVersions.edgeLink, "edgedriver.zip");
  console.log(message);
  const upload = await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Users/thisisadmin/Documents/Grid1/WebDrivers/msedgedriver.exe",
    "drivers/msedgedriver.exe"
  );
  console.log("Done");
  res.send("<h1>EdgeDriver Downloaded and Uploaded</h1>");
});
module.exports = router;
