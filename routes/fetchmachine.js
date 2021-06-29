const express = require("express");
const router = express.Router();
const machineDetails = require("../config/machines.json");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(machineDetails);
});

router.post("/", (req, res) => {
  console.log(req.body);
  fs.writeFile("./config/machines.json", JSON.stringify(req.body), (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.send("done");
});
module.exports = router;
