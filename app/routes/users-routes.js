module.exports = function (app) {
  
  // Login
  app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
  });

  // Logout
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });
  
};