const functions = require("firebase-functions");
const controller = require("./controller/index.js");

exports.weatherScheduler = functions.pubsub
  .schedule("30 8 * * *")
  .timeZone("Asia/Jerusalem")
  .onRun((context) => controller.sendWeatherGroupMessage());
