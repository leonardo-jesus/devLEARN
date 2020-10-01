require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;

((/* parameters */) => {
  // code here
})(/* parameters */);


// URI = mongodb+srv://leonardo-jesus02:a1b2c3d4e5@devlearn-cluster.vlbqd.gcp.mongodb.net/devLEARN-db?retryWrites=true&w=majority