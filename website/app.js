// Personal API Key for OpenWeatherMap API
const apiKey = "67c84716a2a2a255ddfa263b3e9e7add&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const urlMaker = (zip) => {
  return `${baseUrl}${zip}&appid=${apiKey}`;
};

// console.log(urlMaker(99501));
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const updateUI = (data) => {
  const { temp, date, feelings } = data;
  document.getElementById("date").innerHTML = `Date: ${date}`;
  document.getElementById("temp").innerHTML = `Temp: ${temp}`;
  document.getElementById("content").innerHTML = `Feelings: ${feelings}`;
  document.querySelector(".error-message").innerHTML = "";
};

const handleError = (type) => (_err) => {
  console.log("mylog", { _err, type });
  document.querySelector(
    ".error-message"
  ).innerHTML = `Unable to fetch ${type} data`;
};

const getWeatherData = async (zip) => {
  return await fetch(urlMaker(zip))
    .then((res) => res.json())
    .catch(handleError("request"));
};

const postRequest = async (path, data) => {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => null);
};

const handleSubmit = () => {
  const zip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  getWeatherData(zip).then((res) => {
    const { main, cod } = res || {};
    const { temp } = main || {};
    if (cod === "404" || cod === "400") {
      handleError("request")();
      return;
    }

    postRequest("/add", { temp, date: newDate, zip, feelings })
      .then(updateUI)
      .catch(handleError("request"));
  });
};

const retrieveData = async () => {
  await fetch("/all")
    .then((res) => {
      res.json().then(updateUI);
    })
    .catch(handleError("initial"));
};

const initilizeSite = () => {
  document.querySelector("#generate").addEventListener("click", handleSubmit);
  retrieveData();
};

window.onload = initilizeSite;
