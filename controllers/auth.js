module.exports = (app, passport) => {
  var flash=require("connect-flash");
  var main = require('../models/main.js');

  app.use(flash());

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/signin', (req, res) => {
    res.render('signin', { message: req.flash('loginMessage') });
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/home',
      failureRedirect: '/signup'
    })
  );

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/home',
      failureRedirect: '/signin', failureFlash: 'Invalid username or password' 
    })
  );

  function isLoggedIn(req, res, next) {
    console.log("isLoggedIn");
    if (req.isAuthenticated()) return next();

    res.redirect('/signin');
  }

  app.post('/visits/:id_street', function (req, res) 
  {
    main.selectAll(req.params.id_street, function(data) 
    {
      var hbsObject = { visits: data };
      console.log(hbsObject);
      res.render('visits', hbsObject);
    });
  });

};
