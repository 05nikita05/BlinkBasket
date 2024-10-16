const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {userModel} = require('../models/userModel')

require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try{
      let user = await userModel.findOne({email:profile.emails[0].value});
      if(!user){
        user = await new userModel({
          name:profile.displayName,
          email:profile.emails[0].value
        });
        await user.save();
      }
      cb(null, user);

    }catch(err){
      cb(err,false);
    }
  }
));

passport.serializeUser(function(user,cb){
  return cb(null,user._id);
})

passport.deserializeUser(async function(id,cb){
  try{
    let user = await userModel.findById(id);
    cb(null,user);
  }catch(err){
    cb(err,false);
  }
})

module.exports = passport;