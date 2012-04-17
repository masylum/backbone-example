/*global Uber*/
(function ($) {

  var Address = { tagName: 'li'
                , className: 'address'
                , template: _.template($('#address_line').text())
                };

  Address.events = {
    'click .delete': 'onClickDelete'
  };

  Address.initialize = function (options) {
    _.bindAll(this, 'render');
  };

  Address.render = function () {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };

  Address.onClickDelete = function (evt) {
    var self = this;

    evt.preventDefault();

    // TODO: implement dialogs
    if (confirm('Are you sure')) {
      this.model.destroy({
        success: function () {
          $(self.el).remove();
        }
      , error: function () {
          // TODO: implement notifications
        }
      });
    }
  };

  // exports
  Uber.Views.Address = Backbone.View.extend(Address);
}(jQuery));
