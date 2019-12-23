const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

const origin =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://node-react-ssthil.netlify.com/';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin }));

app.get('/', async (req, res) => {
  const count = req.query.count || 20;
  // @ts-ignore
  const response = await axios.get(
    `https://randomuser.me/api/?results=${count}`
  );
  res.json({ data: response.data.results });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
