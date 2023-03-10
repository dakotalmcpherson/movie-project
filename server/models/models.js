const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://dakotalmcpherson:PSYYmeTd7ZyHfwTa@cluster0.ohrrunf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'movieProject2'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: {type: String, required: true},
    movieList: [],
    watched: [],
    groups: [],
  })

  const User = mongoose.model('user', userSchema);

  const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: '10m', default: Date.now }
  })

  const Session = mongoose.model('session', sessionSchema)

  module.exports = {
    User,
    Session
  }