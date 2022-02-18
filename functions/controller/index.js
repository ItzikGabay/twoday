const requests = require("../lib/requests.js");

exports.sendWeatherGroupMessage = () => {
  requests
    .getWeatherData()
    .then((weatherData) => {
      const response = `Good morning! \n\n${weatherData.result_date} - ${
        weatherData.condition.text
      }\nSunrise: ${weatherData.sunrise}\nSunset: ${
        weatherData.sunset
      }\nTemp:  ${weatherData.mintemp}C - ${
        weatherData.maxtemp
      }C \nRain: ${!!weatherData.rain_status} - ${
        weatherData.rain_chance
      }%\n\nPowered by IG ❤️`;

      if (weatherData.status === 200) {
        return requests.sendGroupMessagePhoto(
          response,
          "https:" + weatherData.condition.icon
        );
      } else {
        return requests.sendGroupMessage(
          "Sorry - we got error. let's try again tomorrow :("
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
