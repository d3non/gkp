module.exports = (app, passport) => {
  var flash=require("connect-flash");
  app.use(flash());

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/signup', (req, res) => {
    console.log("signup");
    res.render('signup');
  });

  app.get('/signin', (req, res) => {
    console.log("get signin " + req.flash('loginMessage'));
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
};
