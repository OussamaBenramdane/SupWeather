const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const request = require('request-promise');
const config = require('config');
const key = config.get('WeatherKey');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/posts
//@desc   Refresh Posts
//@access Private

async function getWeather(cities) {
  let weather_data = [];

  for (let city_obj of cities) {
    let city = city_obj.city.name;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    //Check
    let response_body = await request(url);
    let weather_json = JSON.parse(response_body);
    //const ct = await City.findById(req.params.id);
    //if (ct.user.toString() == req.user.id) {
    let weather = {
      city: city,
      Mode: weather_json.weather[0].main,
      temperature: weather_json.main.temp,
      Min: weather_json.main.temp_min,
      Max: weather_json.main.temp_max,
      icon: weather_json.weather[0].icon
    };
    weather_data.push(weather);
    // }
  }
  return weather_data;
}

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    User.find(
      {},
      { city: 1 },
      //user => user.city.user == req.user.id,
      (err, userCities) => {
        if (err) {
          return res.status(404).json({
            err,
            message: 'Citys not found!'
          });
        }
        getWeather(userCities)
          .then(function(results) {
            const weather_data = { weather_data: results };
            res.json(weather_data);
          })
          .catch(error => {
            return res.status(404).json({
              error,
              message: '404'
            });
          });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/posts
//@desc   Refresh Posts
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'cityname is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newCity = {
        name: req.body.name,
        user: user.id
      };
      user.city.push(newCity);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
