/*global Uber*/
(function ($) {

  var EditAddress = { template: _.template($('#form_edit').text()) };

  EditAddress.events = {
    'submit': 'edit'
  };

  EditAddress.edit = function (evt) {
    evt.preventDefault();

    var params = _.deparam($(this.el).serialize());

    this.model.save(params.address, {success: function () {
      window.location.hash = '';
    }});
  };

  EditAddress.render = function (evt) {
    $(this.el).html(this.template(this.model.toJSON())).show();
    $('form#create').hide();
  };

  // exports
  Uber.Views.EditAddress = Backbone.View.extend(EditAddress);
}(jQuery));
