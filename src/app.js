const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * TelegramBot connection init
 */
const axios = require("axios");
const { sendWeatherGroupMessage } = require("../functions/controller/index.js");

const init = async () => {
  sendWeatherGroupMessage();
};

init();
