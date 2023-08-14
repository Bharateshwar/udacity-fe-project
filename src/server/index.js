var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
const axios = require("axios");
const FormData = require("form-data");
dotenv.config();
const apiKey = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

const getData = async (req, res) => {
  try {
    const formdata = new FormData();

    formdata.append("lang", "auto"); // 2-letter code, like en es fr ...

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.query.text}&lang=auto`;

    console.log("mylog", { url });

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log("mylog", { data });
    res.json(data); // Send the sentiment analysis data as a JSON response
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

app.get("/test", async function (req, res) {
  getData(req, res);
});
