var Message = require('../models/messages-model');


module.exports.create = function (req, res) {
  var message = new Message(req.body);
  message.save(function (err, result) {
    res.json(result);
  });
};

module.exports.list = function (req, res) {
  var qSkip = req.query.skip,
      qTake = req.query.take,
      qSort = req.query.sort,
      qFilter = req.query.filter;
  
  return Message.find().sort(qSort).skip(qSkip).limit(qTake)
    .exec(function (err, results) {
      res.json(results);
    });
};

module.exports.show = function (req, res) {
  return Message.findById(req.params.id, function (err, result) {
    res.json(result);
  });
};

module.exports.update = function (req, res) {
  return Message.findById(req.params.id, function (err, message) {
    // TODO: add this method
  });
};

module.exports.delete = function (req, res) {
  return Message.findById(req.params.id, function (err, message) {
    return message.remove(function (err) {
      // TODO: add error handling
    });
  });
};