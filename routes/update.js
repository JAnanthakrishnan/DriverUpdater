const express = require("express");
const router = express.Router();
const admZip = require("adm-zip");
const axios = require("axios");
const fs = require("fs");
const request = require("request");
const latestVersions = require("../config/latest.json");
const AdmZip = require("adm-zip");
let Client = require("ssh2-sftp-client");
const prevVersion = require("../config/prevVersion.json");
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

router.post("/chrome", async (req, res) => {
  const { grid, node, ip, username, password } = req.body;
  const message = await unzipDriver(
    latestVersions.chromeLink,
    "chromedriver.zip"
  );
  console.log(message);
  const upload = await connectServer(
    ip,
    username,
    password,
    22,
    `/Users/thisisadmin/Documents/${grid}/WebDrivers/chromedriver.exe`,
    "drivers/chromedriver.exe"
  );
  console.log("Done");
  prevVersion[node][grid].chromeVersion = latestVersions.chromeStabledriver;
  fs.writeFile(
    "./config/prevVersion.json",
    JSON.stringify(prevVersion),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );
  res.send("Done");
});

router.post("/gecko", async (req, res) => {
  const { grid, node, ip, username, password } = req.body;
  const message = await unzipDriver(
    latestVersions.geckoLink,
    "geckodriver.zip"
  );
  console.log(message);
  const upload = await connectServer(
    ip,
    username,
    password,
    22,
    `/Users/thisisadmin/Documents/${grid}/WebDrivers/geckodriver.exe`,
    "drivers/geckodriver.exe"
  );
  console.log("Done");
  prevVersion[node][grid].geckoDriver = latestVersions.geckodriver;
  fs.writeFile(
    "./config/prevVersion.json",
    JSON.stringify(prevVersion),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );
  res.send("Done");
});

router.post("/edge", async (req, res) => {
  const { grid, node, ip, username, password } = req.body;
  const message = await unzipDriver(latestVersions.edgeLink, "edgedriver.zip");
  console.log(message);
  const upload = await connectServer(
    ip,
    username,
    password,
    22,
    `/Users/thisisadmin/Documents/${grid}/WebDrivers/msedgedriver.exe`,
    "drivers/msedgedriver.exe"
  );
  console.log("Done");
  prevVersion[node][grid].edgeVersion = latestVersions.edgedriver;
  fs.writeFile(
    "./config/prevVersion.json",
    JSON.stringify(prevVersion),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );
  res.send("Done");
});
module.exports = router;
