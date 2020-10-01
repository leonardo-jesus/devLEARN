require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.URI, {userNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', () => {
  console.log('Connection successfull');
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;