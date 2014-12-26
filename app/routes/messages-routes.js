var messages = require('./../controllers/messages-controller');

module.exports = function (app) {

  app.route('/api/messages')
    .get(messages.list)
    .post(messages.create);

  app.route('/api/messages/:id')
    .get(messages.show)
    .put(messages.update)
    .delete(messages.delete);
};