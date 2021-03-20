const mongoose = require('mongoose');
const config = require('config');
//imprting the database cloud connection string
const db = config.get('mongoURI');

//connection function
const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDb Connected..');
  } catch (err) {
    console.error(err.message);
    //Exit process with fail
    process.exit(1);
  }
};

module.exports = connectDb;
