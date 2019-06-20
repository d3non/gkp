//load bcrypt
const bCrypt = require('bcrypt-nodejs');
var flash=require("connect-flash");
//app.use(flash());

module.exports = (passport, user) => {
  console.log("Passportjs");
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    console.log("passport.deserializeUser");
    User.findById(id).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        console.log("Local signup");
        var generateHash = password => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({ where: { email: email } }).then(user => {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken'
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        console.log("Local signin");
        var User = user;

        var isValidPassword = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email: email } })
          .then(user => {
            if (!user) {
              console.log("no user");
              return done(null, false, req.flash('loginMessage', 'No email address found.'));
            }

            if (!isValidPassword(user.password, password)) {
              console.log("invalidpassword");
              return done(null, false, { message: 'Incorrect password.' });
            }

            var userinfo = user.get();

            return done(null, userinfo);
          })
          .catch(err => {
            console.log('Error:', err);

            return done(null, false, {
              message: 'Something went wrong with your Signin'
            });
          });
      }
    )
  );
};
