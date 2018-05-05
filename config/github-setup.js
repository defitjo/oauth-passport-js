const passport = require('passport');

const GitHubStrategy = require('passport-github').Strategy;

const keys = require('./keys');

const User = require('../model/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GitHubStrategy({
  clientID: keys.github.clientID,
  clientSecret: keys.github.clientSecret,
  callbackURL: '/auth/github/redirect',
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({
    githubId: profile.id,
  }).then((currentUser) => {
    if (currentUser) {
      console.log(`User is, ${currentUser}`);
      done(null, currentUser);
    } else {
      new User({
        username: profile.username,
        githubId: profile.id,
        thumbnail: profile._json.avatar_url,
      }).save().then((newUser) => {
        console.log(`New user created: ${newUser}`);
        done(null, newUser);
      });
    }
  });
}));
