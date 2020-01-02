// @ts-ignore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BASE_URL } from './index';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  CardImg,
  Card,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
// import Moment from 'react-moment';
import moment from 'moment';

// const BackgroundImg =
//   'https://www.elsetge.cat/myimg/f/85-852469_best-live-weather-wallpaper-minimal-live.png';

function App() {
  const [cityName, setCityName] = useState('brussels');
  const [url, setUrl] = useState(`${BASE_URL}`);
  const [weather, setWeather] = useState({ cityWeather: null });
  const [isLoading, setIsLoading] = useState(false);

  // const [countries, setCountries] = useState([]);

  const iconPath = icon => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  // const inputRef = React.createRef();

  /* const addCityName = () => {
    // e.preventDefault();
    // setCityName(e.target.value)
    console.log({ 'city click': cityName });
    const inputValue = inputRef.current.value;
    setCityName(inputValue);
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setIsLoading(true);
      setWeather({ cityWeather: result.data.data });
      setIsLoading(false);
    };
    // getCountries();
    fetchData();
  }, [url]);

  const inputChange = event => setCityName(event.target.value);
  const submitCityName = () => {
    setUrl(`${BASE_URL}/?q=${cityName}`);
    setCityName('');
  };
  console.log(url);
  /* const enterCityName = e => {
    if (e.keyCode === 13) {
      setUrl(`${BASE_URL}/?cityName=${cityName}`);
    }
  }; */

  /* useEffect(() => {
    console.log({ 'city useefffect': cityName });
  }, [url]); */

  /* async function getWeather() {
    const response = await fetch(url);
    const resData = await response.json();
    setWeather({
      cityWeather: resData.data,
    });
  } */

  /* async function getCountries() {
    const response = await fetch('http://localhost:4000/countries');
    const resData = await response.json();
    setCountries(resData.data);
  } */

  /* const handleChange = e => {
    setCityName(e.target.value);
  }; */

  // console.log(countries);

  const { cityWeather } = weather;

  console.log(cityWeather);

  const loading = css`
    display: block;
    margin: 0 auto;
    text-align: center;
  `;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container style={{ width: '410px' }}>
        <Row>
          <Col>
            <h3 style={{ textAlign: 'center', margin: '20px auto' }}>
              Weather app
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md="8" sm="8" xs="12">
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  id="exampleSearch"
                  placeholder="Enter city name"
                  value={cityName}
                  onChange={inputChange}
                  style={{ height: '50px' }}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col md="4" sm="4" xs="12">
            <Button
              block
              color="primary"
              style={{ width: '100%', height: '50px' }}
              onClick={() => submitCityName()}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          {/* <Col xs="6">
            <Card>
              <CardBody>
                {countries &&
                  countries.map((country, i) => <p key={i}>{country.name}</p>)}
              </CardBody>
            </Card>
          </Col> */}
          <Col xs="12">
            <h6 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Here,to get a current weather and forecasts in your city
            </h6>
            {isLoading && (
              <div className="sweet-loading">
                <BeatLoader
                  css={loading}
                  size={150}
                  //size={"150px"} this also works
                  color={'#345'}
                  loading={isLoading}
                />
              </div>
            )}
            {cityWeather && (
              <Card style={styles.card}>
                <CardBody style={{ padding: '2.5rem' }} className="text-center">
                  <CardText style={styles.temp}>
                    {Math.round(cityWeather.main.temp)}
                    <span style={{ fontSize: '3rem' }}>°c</span>
                  </CardText>
                  <CardText style={styles.des}>
                    {cityWeather.weather[0].description}
                  </CardText>
                  <CardText style={styles.date}>
                    {moment.unix(cityWeather.dt).format('llll')}
                  </CardText>
                  <CardText style={styles.city}>
                    {cityWeather.name} | {cityWeather.sys.country}
                  </CardText>

                  <CardImg
                    style={{ width: 80 }}
                    src={iconPath(cityWeather.weather[0].icon)}
                    alt={cityWeather.weather[0].description}
                  />
                  <CardText>Wind: {cityWeather.wind.speed} kmph</CardText>

                  <CardText>Humidity: {cityWeather.main.humidity} %</CardText>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  temp: {
    fontSize: '4rem',
    color: '#bbe0f1',
    background: '#104f7d',
    width: '180px',
    padding: '15px',
    borderRadius: '50%',
    height: '180px',
    border: '3px solid rgba(162, 187, 212, 0.21)',
    // textAlign: 'center',
    display: 'inline-block',
    margin: '15px auto',
    lineHeight: '140px',
  },
  card: {
    // background: 'rgba(7, 31, 43, 0.92)',
    color: '#4bc1d0',
    // textAlign: 'center',
    borderRadius: '8px',
    border: 'none',
    backgroundImage: 'url(./assets/bg1.jpg)',
    background: 'rgba(23, 33, 62, 0.78)',
  },
  des: {
    color: '#a2d0f9',
    fontSize: '23px',
  },
  date: {
    color: '#e8a777',
    fontSize: '15px',
  },
  city: {
    color: '#e45',
    fontSize: '22px',
  },
};

export default App;
