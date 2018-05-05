const router = require('express').Router();

const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

// auth with github
router.get('/github', passport.authenticate('github', {
  scope: ['profile'],
}));

// callback route for github to redirect to
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
  res.redirect('/profile');
});

module.exports = router;
