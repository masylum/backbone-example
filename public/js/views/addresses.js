/*global Uber*/
(function ($) {

  var Addresses = {el: $('#list')};

  Addresses.initialize = function (options) {
    _.bindAll(this, 'render');

    _.each(['add', 'reset', 'remove'], function (event) {
      this.collection.bind(event, this.render);
    }, this);
  };

  Addresses.render = function () {
    var self = this;

    $(self.el).html('');

    this.collection.each(function (el) {
      $(self.el).append((new Uber.Views.Address({model: el})).render().el);
    });

    return this;
  };

  // exports
  Uber.Views.Addresses = Backbone.View.extend(Addresses);
}(jQuery));
