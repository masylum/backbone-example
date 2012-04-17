/*global Uber*/
(function () {
  var Root = {routes: { '': 'index'
                      , '/edit/:id': 'edit'
                      }
             };

  Root.index = function () {
    var collection = new Uber.Collections.Addresses()
      , view = new Uber.Views.Addresses({collection: collection})
      , create_view = new Uber.Views.CreateAddress({collection: collection, el: $('form#create')});

    create_view.render();
    collection.fetch();
  };

  Root.edit = function (id) {
    var model = new Uber.Models.Address({id: id})
      , view = new Uber.Views.EditAddress({model: model, el: $('form#edit')});

    model.fetch({success: function () {
      view.render();
    }});
  };

  var Controller = Backbone.Router.extend(Root);
  new Controller();
  Backbone.history.start();
}());
