/*global escape*/
module.exports = function File(db, app) {
  var ADDRESS = require('mongolia').model(db, 'address');

  ADDRESS.validate = function (document, update, callback) {
    var validator = require('mongolia').validator(document, update);

    callback(null, validator);
  };

  ADDRESS.beforeInsert = function (elements, callback) {
    var request = require('request')
      , uri = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + escape(elements[0].address);

    request(uri, function (error, response, body) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return callback(e);
      }

      elements[0].location = body.results
        ? body.results[0].geometry.location
        : null;

      callback(null, elements);
    });
  };

  return ADDRESS;
};
