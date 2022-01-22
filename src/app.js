const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * TelegramBot connection init
 */
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

/**
 * Collecting data from the API endpoint of the weather service.
 * After sending axios get request from the service,
 * We are manipulating the hour, and validating
 * On the current day if we have any value
 * That contains "rain" at the forcast.
 *
 * @return {Array} dayRainInformation Mapped results from the API request.
 */
const collectWeatherApi = async () => {
  const dayRainInformation = [];

  return await axios.get(process.env.API_URL).then((apiResponse) => {
    apiResponse.data.forecast.forecastday[0].hour.map((dayResponse) => {
      const dayHourTime = dayResponse.time;
      const dayShortHourTime = dayHourTime.substr(dayHourTime.length - 5);
      const dayCondition = dayResponse.condition.text;
      if (dayCondition.includes("rain")) {
        dayRainInformation.push({ rainyHour: dayShortHourTime });
      }
    });
    return dayRainInformation;
  });
};

const init = async () => {
  /**
   * Telegram client connection listener.
   */
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInputMessage = msg.text;

    if (
      userInputMessage.toLowerCase() === "tell" ||
      userInputMessage.toLowerCase() === "גשם"
    ) {
      let messageVariable = "";
      const apiRequest = await collectWeatherApi();
      const apiRequestOrdered = apiRequest.map((apiRequestItem) => {
        const { rainyHour } = apiRequestItem;
        const hour = Number(rainyHour.substr(0, 2));

        if (hour > 7) {
          messageVariable += `גשם מתחיל בשעה ${apiRequestItem.rainyHour},\n`;
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
