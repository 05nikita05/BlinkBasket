var GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../config/userModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
      await userModel.findOne({email:profile.emails[0].value})
    }catch(err){
      
    }
  }
));