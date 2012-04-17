require.paths.unshift(__dirname + '/vendor');

var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , express = require('express')
  , app = express.createServer()
  , db = new Db('uber', new Server('localhost', 27017, {auto_reconnect: true, native_parser: true }));

app.model = function (str) {
  return require('./models/' + str)(db, app);
};

db.open(function () {

  GLOBAL.ObjectID = db.bson_serializer.ObjectID;

  // Configuration
  require('./config/config')(app, express);

  // Controllers
  require('./controllers/api')(app);
  require('./controllers/public')(app);

  app.listen(3000);
  console.log('listening 3000');
});
