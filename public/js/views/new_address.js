/*global Uber*/
(function ($) {

  var CreateAddress = { template: _.template($('#form_create').text()) };

  CreateAddress.events = {
    'submit': 'create'
  };

  CreateAddress.create = function (evt) {
    evt.preventDefault();

    var params = _.deparam($(this.el).serialize());

    this.collection.create(params);
  };

  CreateAddress.render = function () {
    $(this.el).html(this.template({nick: '', address: ''})).show();
    $('form#edit').hide();
  };

  // exports
  Uber.Views.CreateAddress = Backbone.View.extend(CreateAddress);
}(jQuery));
