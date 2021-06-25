const express = require("express");
const config = require("config");
const path = require("path");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.send(`<h1>Hello World and ${config.get("chromedriver")}</h1>`);
// });

//define routes
app.use("/api/fetchcurrent", require("./routes/fetchcurrent"));
app.use("/api/fetchlatest", require("./routes/fetchlatest"));
app.use("/api/update", require("./routes/update"));

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`App started on PORT ${PORT}`));
