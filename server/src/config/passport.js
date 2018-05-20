const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')
const settings = require('../config/config')

module.exports = (passport) => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    opts.secretOrKey = settings.secret
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.id}, (err, user) =>{
            if (err) {
                return done(err,false)
            }
            if(user){
                done(null, user)
            } else {
                done(null, false)
            }
        })
    }))
}