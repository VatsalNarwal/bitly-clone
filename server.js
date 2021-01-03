const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const ShortUrl = require("./models/shortUrl");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.save();

  res.redirect(shortUrl.full);
});

const listeningPort = process.env.PORT || 5000;
app.listen(listeningPort);
console.log(`App is listening on port ${listeningPort}`);
