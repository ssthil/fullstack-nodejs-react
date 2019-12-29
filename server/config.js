require('dotenv').config();
const config = {
  app: {
    port: process.env.PORT,
    dev: process.env.DEV_URL,
    server: process.env.SERVER_URL,
  },
  weather_api: {
    url: process.env.WEATHER_API_URL,
    access_key: process.env.WEATHER_ACCESS_KEY,
  },
  open_weather_api: {
    url: process.env.OPEN_WEATHER_API_URL,
    appid: process.env.WEATHER_APP_ID,
  },
  countries_api: {
    url: process.env.ALL_COUNTRIES,
  },
};

module.exports = config;
