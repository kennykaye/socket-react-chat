module.exports = function (app, passport) {

  // Facebook Authentication
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login' }));

  // Google Authentication
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/callback', 
    passport.authenticate('google', { successRedirect: '/',
                                      failureRedirect: '/login' }));

  // Github Authentication
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', 
    passport.authenticate('github', { successRedirect: '/',
                                      failureRedirect: '/login' }));

  // Twitter Authentication
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));
};