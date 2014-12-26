var path = require('path');
var express  = require('express');

module.exports = function (app) {

  // Route static requests
  app.use('/', express.static(path.resolve(__dirname, '../../public/dist/')));

  // Default route
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });

};