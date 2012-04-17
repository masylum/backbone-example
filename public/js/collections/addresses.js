/*global Uber*/
(function  () {

  var Addresses = {
    model: Uber.Models.Address
  };

  Addresses.url = function () {
    return '/api/addresses';
  };

  Addresses.parse = function (resp, xhr) {
    return _.map(resp, function (res) {
      res.id = res._id;
      delete res._id;
      return res;
    });
  };

  // exports
  Uber.Collections.Addresses = Backbone.Collection.extend(Addresses);
}());
