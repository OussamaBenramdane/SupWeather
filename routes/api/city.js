const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const request = require('request-promise');
const config = require('config');
const key = config.get('WeatherKey');

const City = require('../../models/City');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

//@route GET api/posts
//@desc   Refresh Posts
//@access Private

async function getWeather(cities) {
  let weather_data = [];

  for (let city_obj of cities) {
    let city = city_obj.cityName;
    let id = city_obj.id;
    //let us = city_obj.user;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&units=imperial&appid=${key}`;
    //Check

    let response_body = await request(url);
    let Weather_json = JSON.parse(response_body);
    //const ct = await City.findById(req.params.id);
    //if (ct.user.toString() == req.user.id) {
    let weather = {
      id: id,
      city: Weather_json.name,
      Mode: Weather_json.weather[0].main,
      temperature: Weather_json.main.temp,
      Min: Weather_json.main.temp_min,
      Max: Weather_json.main.temp_max,
      icon: Weather_json.weather[0].icon,
    };
    weather_data.push(weather);
    // }
  }
  return weather_data;
}

router.get('/', auth, async (req, res) => {
  try {
    const { user } = jwt.verify(
      req.headers['x-auth-token'],
      config.get('jwtSecret')
    );
    City.find(
      { user: user.id },
      //{city => city.user.toString() == req.user.id} ,
      (err, cities) => {
        if (err) {
          return res.status(404).json({
            err,
            message: 'Citys not found!',
          });
        }
        getWeather(cities)
          .then(function (results) {
            const weather_data = { weather_data: results };
            res.json(weather_data);
          })
          .catch((error) => {
            return res.status(404).json({
              error,
              message: '404',
            });
          });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/Citys
//@desc Create a post
//@access Private
router.post(
  '/',
  [auth, [check('cityName', 'cityname is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newCity = await new City({
        cityName: req.body.cityName,
        user: req.user.id,
      });
      let Sity = req.body.cityName;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${Sity}&units=metric&units=imperial&appid=${key}`;
      cod = await request(url);
      const city = await newCity.save();
      res.json(city);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/citys
//@desc   Create a p
//@access Private
/*router.get('/citys', auth, async (req, res) => {
  citts = { name: 'Angers' };
  try {
    const cities = await City.find().sort({ date: -1 });
    res.json(cities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});*/
//@route GET api/postes/:id
//@desc   Create a post by ID
//@access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.json(city);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'City not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route DELETE api/postes/:id
//@desc   Delete by ID
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    //Check user
    if (city.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }
    await city.remove();
    res.json({ msg: 'City removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
