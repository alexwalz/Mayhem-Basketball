var mongoose    = require('mongoose');
var passport    = require('passport');
var settings    = require('../../config/settings');
var express     = require('express');
var jwt         = require('jsonwebtoken');
var router      = express.Router();
var User        = require("../models/Users");
var nodemailer  = require('nodemailer')

require('../../config/passport')(passport);


//// ROUTE FOR CREATING A NEW ACCOUNT //////
router.post('/signup', function(req, res) {

    let activeHash = Math.random().toString(36).slice(2)

    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'});
    } else {
      var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        role: "customer",
        password: req.body.password,
        active: false,
        activeHash: activeHash
      });
      // save the user
      newUser.save(function(err) {

        if (err) {
          console.log(err)
          return res.json({success: false, msg: 'Email already exists.'});
        }

        try {

            nodemailer.createTestAccount((err, account) => {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_USER || 'marinacovestorageutah@gmail.com',
                        pass: process.env.EMAIL_PASS || 'marinacovepassword123'
                    }
                });

                let resetLink =`https://mayhem-basketball.herokuapp.com/confirm/${newUser.activeHash}`
                let mailOptions = {
                    from: `"New User Account Created!" <marinacovestorageutah@gmail.com>`, // sender address
                    to: `${newUser.email}`, // list of receivers
                    subject: 'New Account Created!', // Subject line
                    html: `<div>
                    <div style="height: 200px; background-color: #3261D6; position: relative;">
                    <div style="margin: auto; text-align: center;">
                    <h1 style="color: white; font-size: 2.5rem; padding-top: 70px;">Mayhem Basketball Club</h1>
                    </div>
                    </div>
                    <div style="padding: 20px;">
                    <p>&nbsp;</p>
                    <p>${newUser.firstName},</p>
                    <p>Thank you for creating your new account with us! Before you start taking advantage of the different features, you need to confirm your email address by clicking on <a href='${resetLink}'>This Link.</a></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    </div>
                    <div style="margin-top: 60px;">
                    <div style="height: 100px; background-color: #1e1e1e; color: white; padding: 20px;">
                    <p>Mayhem Basketball</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    </div>
                    </div>
                    </div>` 
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {console.log(error)}
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                });

            });

        }

        catch (e) {console.log(e)}

          res.json({success: true, msg: 'Successful created new user.'});

      });
    }
  });

////////   ROUTE FOR LOGGING IN A NEW USER ///////
  router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {

        if(user.active){
        // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), settings.secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
            } else {
              res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }else{
          res.status(403).json({success: false, msg: 'Authentication failed. Please verify your email address.'});
        }

      }
    });
  });


  module.exports = router;