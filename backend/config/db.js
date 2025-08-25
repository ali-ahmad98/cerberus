const config = require("./config");

const mongoose = require("mongoose");
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
// mongoose.connect(config.mongo_localdb.url, options)

// mongodb://fantasyf00tball1001:L20lT6fakbly80BOlp4Flw5DUp5eVrf9slF@127.0.0.1:27017/fantasyf00tba11?authSource=fantasyf00tba11

var productionString =
  "mongodb://" +
  config.production.username +
  ":" +
  config.production.password +
  "@" +
  config.production.host +
  ":" +
  config.production.port +
  "/" +
  config.production.dbName +
  "?authSource=" +
  config.production.authDb;
// console.log("Db is connected on: " + productionString);
mongoose
  .connect(productionString, options)
  .then(() => {
    // console.log("Db is connected on: " + config.mongo_localdb.url);
    console.log("Db is connected on: " + productionString);
    require("../controllers/cronService/cronService");
  })

  .catch((error) => {
    console.log("Db is not connected");
    console.log(error);
    // process.exit(1);
  });
//mongo on connection emit
// mongoose.connection.on('connected', function (err) {
//     console.log("MongoDB connection successful");
//      require('../controllers/cronService/cronService');
//   });
