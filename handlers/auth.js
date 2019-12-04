const mUsers = require("../models/users");
const vUsers = require("../validators/users");
var validator = require("node-input-validator");
var bcrypt =require('bcryptjs')
var jwt=require('jsonwebtoken')
const config=require('../config/index.js')

const register = (req, res) => {
  var v = new validator.Validator(req.body, vUsers.createUser); //treba toa sto ke vnese userot da bide isto so users.js vo validators
  v.check()
    .then(matched => {
      //ovde proveruva dali se metcnale
      if (matched) {
        bcrypt.genSalt(10,function(err,salt){
          if(err){
            throw new Error(err);
            return;
        }
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err){
                throw new Error(err);
                return;
            }
            return mUsers.createUser({...req.body, password: hash});
        });
    
        })
        // return mUsers.createUser(req.body);
      } else {
        throw new Error("Validation failed");
      }
    })
    .then(() => {
      return res.status(201).send("ok");
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(v.errors);
    });
};
const login = (req, res) => {
  mUsers.getUserPasswordByEmail(req.body.email)
  .then((data) => {
      bcrypt.compare(req.body.password, data.password, function(err, rez) {
          if(err){
              return res.status(500).send('Could not compare password');
          }
          if(rez){
              var tokenData = {
                  id: data._id,
                  full_name: `${data.first_name} ${data.last_name}`,
                  email: data.email
              };
              var token = jwt.sign(tokenData, config.getConfig('jwt').key);
              return res.status(200).send({jwt: token});
          }
          return res.status(404).send('not found');
      });
  })
  .catch(err => {
      console.log(err);
      return res.status(500).send('Could not get user');
  });
};
  // return res.status(200).send("OK");

const renew = (req, res) => {
  return res.status(200).send("OK");
};
const resetLink = (req, res) => {
  return res.status(200).send("OK");
};
const resetPassword = (req, res) => {
  return res.status(200).send("OK");
};
const changePassword = (req, res) => {
  return res.status(200).send("OK");
};
module.exports = {
  register,
  login,
  renew,
  resetLink,
  resetPassword,
  changePassword
};
