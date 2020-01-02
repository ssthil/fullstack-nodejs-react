const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const config = require('./config');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const origin =
  process.env.NODE_ENV !== 'production'
    ? config.app.dev
    : 'https://node-react-ssthil.netlify.com/';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin }));

/* var config = {
  headers: { api_key: '1260ebdbf1855b4b6103abebc3372628' },
}; */

const accessKey = {
  params: {
    access_key: config.weather_api.access_key,
  },
};

/* const appId = {
  params: {
    appid: 'ed973fdb30d0fffb8da125f32e7c1f25', // config.open_weather_api.appid,
  },
}; */

const appid = config.open_weather_api.appid;

// @ts-ignore
// axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

// axios.defaults.headers.common.Authorization =
//   'Authorization: Auth apiKey="1260ebdbf1855b4b6103abebc3372628"';

const openWeatherApiURL = 'http://api.openweathermap.org/data/2.5/weather';

app.get('/', async (req, res) => {
  // const count = req.query.count || 20;
  // req.query.units = 'metric';
  const cityName = req.query.q || 'brussels';
  // req.query.query = 'Belgium';
  // const response = await axios.get(
  //   `${config.weather_api.url}?query=${cityName}`,
  //   accessKey
  // );
  // res.setHeader('Authorization', 'Bearer ' + TOKEN);
  // res.header('Authorization', 'Bearer 3NahEqOKF8a7qpwOTo');
  // req.headers.authorization = TOKEN;
  // @ts-ignore
  const response = await axios.get(
    `${openWeatherApiURL}?q=${cityName}&appid=${appid}&units=metric`
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type'
  );

  res.json({ data: response.data });
});

/* app.get('/countries', async (req, res) => {
  // @ts-ignore
  const response = await axios.get(config.countries_api.url);
  res.json({ data: response.data });
}); */

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

/* app.get('/', async (req, res) => {
  const count = req.query.count || 20;
  const response = await axios.get(
    `https://randomuser.me/api/?results=${count}`
  );
  res.json({ data: response.data.results });
}); */

module.exports = app;
