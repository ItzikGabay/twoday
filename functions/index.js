const functions = require("firebase-functions");
const controller = require("./controller/index.js");

exports.weatherScheduler = functions.pubsub
  .schedule("5 6 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun((context) => controller.sendWeatherGroupMessage());
