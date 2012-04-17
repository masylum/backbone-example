/*global Uber*/
(function () {

  var Address = {};

  Address.initialize = function (attributes, options) {
  };

  Address.url = function () {
    var base = '/api/addresses';

    return this.isNew() ? base : base + '/' + this.id;
  };

  Address.parse = function (resp, xhr) {
    resp.id = resp._id;
    delete resp._id;
    return resp;
  };

  // exports
  Uber.Models.Address = Backbone.Model.extend(Address);
}());
