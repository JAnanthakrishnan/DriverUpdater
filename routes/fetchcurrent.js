const express = require("express");
const router = express.Router();
const admZip = require("adm-zip");
const axios = require("axios");
const fs = require("fs");
const request = require("request");
const latestVersions = require("../config/latest.json");
const AdmZip = require("adm-zip");
let Client = require("ssh2-sftp-client");
const vi = require("win-version-info");

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
      const response = await sftp.fastGet(serverFile, localFile);
      resolve(sftp);
    } catch (err) {
      console.log(err);
      reject(sftp);
    }
  });
}
function defaultversion() {
  let obj = {};
  let fp = vi("exe/firefox.exe");
  obj["firefox"] = fp.FileVersion;
  let cp = vi("exe/chrome.exe");
  obj["chrome"] = cp.FileVersion;
  let ep = vi("exe/msedge.exe");
  obj["edge"] = ep.FileVersion;
  console.log(obj);
  return obj;
}

router.get("/", async (req, res) => {
  console.log("Loading chrome");
  await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Program Files/Google/Chrome/Application/chrome.exe",
    "exe/chrome.exe"
  );
  console.log("Loading edge");
  await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "exe/msedge.exe"
  );
  console.log("Loading firefox");
  await connectServer(
    "40.76.14.74",
    "thisisadmin",
    "adminPassword123",
    22,
    "/Program Files (x86)/Mozilla Firefox/firefox.exe",
    "exe/firefox.exe"
  );
  defaultversion();
  console.log("Done");
  res.json(defaultversion());
});

module.exports = router;
