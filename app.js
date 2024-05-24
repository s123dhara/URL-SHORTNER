const express = require("express");
const app = express();

//import package
const path = require("path");
const urlRouter = require("./routes/url");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//db
const db = require("./config/mongoose-connect");
const url = require("./models/url");

//routes
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  try {
    // Fetch the original URL based on the shortId from the request parameter
    const urldata = await url.findOne({ shortId: req.params.shortId });
    console.log(urldata);
    // If URL data found, redirect the user to the original URL
    if (urldata) {
      res.redirect(urldata.redirectURL);
    } else {
      // If no URL data found, render an error page or handle it as per your requirement
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
git rm -r --cached .
git add -A
git commit -am 'fix'
app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
