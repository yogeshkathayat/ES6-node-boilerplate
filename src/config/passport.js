const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {jwtSecret} = require('./vars');
const pgdb = require('./sequelize');
const User = pgdb.customerInfo;

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    var query = {}
    query.where = {}
    if (payload.sub) { query.where.id = payload.sub }
    const user = await User.find(query);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};




exports.jwt = new JwtStrategy(jwtOptions, jwt);

