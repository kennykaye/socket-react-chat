var oauth            = require('./oauth.js');
var GithubStrategy   = require('passport-github').Strategy;
var GoogleStrategy   = require('passport-google').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {

  // serialize and deserialize user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: oauth.facebook.clientID,
    clientSecret: oauth.facebook.clientSecret,
    callbackURL: oauth.facebook.callbackURL,
    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'gender'], 
  }, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    process.nextTick(function () {
      return done(null, profile);
    });
  }));


};