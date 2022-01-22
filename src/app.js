const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * TelegramBot connection init
 */
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { collectWeatherApi } = require("../services/api.js");

const init = async () => {
  /**
   * Telegram client connection listener.
   */
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInputMessage = msg.text;

    if (
      userInputMessage.toLowerCase() === "rain" ||
      userInputMessage === "גשם"
    ) {
      let messageVariable = "";
      const apiRequest = await collectWeatherApi();
      apiRequest.map((apiRequestItem) => {
        const { rainyHour } = apiRequestItem;
        const hour = Number(rainyHour.substr(0, 2));

        if (hour > 7) {
          messageVariable += `* [${apiRequestItem.rainyHour}] ${apiRequestItem.condition} ${apiRequestItem.chance}% \n Temp: ${apiRequestItem.temp}C, Wind: ${apiRequestItem.wind} km/h\n\n`;
        }
        return;
      });
      if (messageVariable.length) {
        await bot.sendMessage(chatId, messageVariable);
      } else {
        await bot.sendMessage(chatId, "אין גשם היום");
      }
    }
  });
};

init();

/**
 * // setInterval(function () {
    //   var hour = new Date().getHours();
    //   // Will execute only if the current "hour" is between 'n1' to 'n2'
    //   if (hour >= 23 && hour < 24) {
    //     return bot.sendMessage(chatId, `Hello ${userInputMessage}`);
    //   } else {
    //     return;
    //   }
    // }, 10 * 60);
 **/
