const axios = require("axios");

exports.sendGroupMessage = (text) => {
  return axios({
    method: "POST",
    url: `https://api.telegram.org/bot${`${process.env.TELEGRAM_TOKEN}`}/sendMessage`,
    data: {
      chat_id: process.env.CHAT_ID,
      text,
    },
  });
};

exports.sendGroupMessagePhoto = (caption, photo) => {
  return axios({
    method: "POST",
    url: `https://api.telegram.org/bot${`${process.env.TELEGRAM_TOKEN}`}/sendPhoto`,
    data: {
      chat_id: process.env.CHAT_ID,
      caption,
      text: caption,
      photo,
    },
  });
};

exports.getWeatherData = async () => {
  return await axios
    .get(process.env.API_URL)
    .then((apiResponse) => {
      // For future development ->
      // const hoursList = apiResponse.data.forecast.forecastday[0].hour;

      const response = {
        status: 200,
        result_date: apiResponse.data.forecast.forecastday[0].date,
        condition: apiResponse.data.forecast.forecastday[0].day.condition,
        sunrise: apiResponse.data.forecast.forecastday[0].astro.sunrise,
        sunset: apiResponse.data.forecast.forecastday[0].astro.sunset,
        maxtemp: apiResponse.data.forecast.forecastday[0].day.maxtemp_c,
        mintemp: apiResponse.data.forecast.forecastday[0].day.mintemp_c,
        rain_status:
          apiResponse.data.forecast.forecastday[0].day.daily_will_it_rain,
        rain_chance:
          apiResponse.data.forecast.forecastday[0].day.daily_chance_of_rain,
      };
      return response;
    })
    .catch((e) => {
      console.log(e);
      return { status: 500 };
    });
};
