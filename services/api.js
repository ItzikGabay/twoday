const axios = require("axios");

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
      if (dayResponse.will_it_rain) {
        console.log(apiResponse.data.forecast.forecastday[0].hour);
        dayRainInformation.push({
          rainyHour: dayShortHourTime,
          temp: dayResponse.feelslike_c,
          wind: dayResponse.wind_kph,
          chance: dayResponse.chance_of_rain,
          condition: dayCondition,
        });
      }
    });
    return dayRainInformation;
  });
};

module.exports = {
  collectWeatherApi,
};
