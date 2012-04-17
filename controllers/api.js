function apiOk(res, body, code) {
  body = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(code || 200, {'Content-Type': 'application/json', 'Content-Length': body.length});
  res.end(body);
};

function apiError(res, tuple) {
  var body = typeof tuple[1] === 'string' ? tuple[1] : JSON.stringify(tuple[1]);
  res.writeHead(tuple[0], {'Content-Type': 'application/json', 'Content-Length': body.length});
  res.end(body);
};

module.exports = function (app) {

  // get single address
  app.get('/api/addresses', function (req, res) {
    app.model('address').mongo('findArray', {}, function (error, addresses) {
      if (error) {
        apiError(res, [500, error]);
      } else {
        apiOk(res, addresses);
      }
    });
  });

  // get collection address
  app.get('/api/addresses/:id', function (req, res) {
    var id = GLOBAL.ObjectID.createFromHexString(req.params.id);
    app.model('address').mongo('findOne', {_id: id}, function (error, address) {
      if (error) {
        apiError(res, [500, error]);
      } else {
        apiOk(res, address);
      }
    });
  });

  // create address
  app.post('/api/addresses', function (req, res) {
    app.model('address').validateAndInsert(req.param('address'), function (error, validator) {
      if (error) {
        apiError(res, [500, error]);
      } else if (validator.hasErrors()) {
        apiError(res, [500, error]);
      } else {
        apiOk(res, validator.updated_document, 201);
      }
    });
  });

  // edit address
  app.put('/api/addresses/:id', function (req, res) {
    var id = GLOBAL.ObjectID.createFromHexString(req.params.id);
    console.log(id, req.param('nick'));
    app.model('address').validateAndUpdate({_id: id}, {'$set': {nick: req.param('nick')}}, function (error, validator) {
      if (error) {
        apiError(res, [500, error]);
      } else if (validator.hasErrors()) {
        apiError(res, [500, error]);
      } else {
        apiOk(res, validator.updated_document);
      }
    });
  });

  // delete address
  app['delete']('/api/addresses/:id', function (req, res) {
    var id = GLOBAL.ObjectID.createFromHexString(req.params.id);
    app.model('address').mongo('remove', {_id: id}, function (error) {
      if (error) {
        apiError(res, [500, error]);
      } else {
        apiOk(res, {status: 'ok'});
      }
    });
  });
};
