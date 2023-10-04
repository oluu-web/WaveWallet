const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('./config');

modules.exports = passport => {
 const opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
 opts.secretOrkey = config.jwtSecret

 passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
   User.findById(jwt_payload.id, (err, user) => {
    if (err) {
     return done(err, false)
    }
    if (user) {
     return done(null, user)
    } else {
     return done(null, false)
    }
   })
  })
 )
}