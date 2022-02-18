const functions = require("firebase-functions");
const controller = require("./controller/index.js");

exports.weatherScheduler = functions.pubsub
  .schedule("every day 06:05")
  .onRun((context) => controller.sendWeatherGroupMessage());
