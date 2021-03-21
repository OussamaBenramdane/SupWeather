const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  cityName: {
    type: String,
    required: true,
  },
});
module.exports = City = mongoose.model('city', CitySchema);
