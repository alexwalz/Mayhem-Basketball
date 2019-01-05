const express               = require('express');
const router                = new express.Router();
const mongoose              = require('mongoose');
const config                = require('../../config');
const db_url                = process.env.MONGODB_URI || config.dbUri
const playersController       = require("../controllers/playersController")
var passport                = require('passport');

require('../../config/passport')(passport);

mongoose.connect(db_url);


getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };




router.get('/', function(req, res) {
    playersController.findAll(req, res);
})


router.get('/:id', function(req, res) {
    playersController.findById(req, res);
})

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);

    if (token) {
        if(req.user.role === 'admin'){
            playersController.create(req, res)
        }else{
            res.json({
                success: false,
                message: "unauthorized. You must be an admin to delete profile cards.",
                code: 401
            })
        }
    }else{
        res.json({
            success: false,
            message: "unauthorized.",
            code: 401
        })
    }
  })


router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        if(req.user.role === 'admin'){
            playersController.remove(req, res)
        }else{
            res.json({
                success: false,
                message: "unauthorized. You must be an admin to delete profile cards.",
                code: 401
            })
        }
    }else{
        res.json({
            success: false,
            message: "unauthorized",
            code: 401
        })
    }
})


router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        if(req.user.role === 'admin'){
            playersController.update(req, res)
        }else{
            res.json({
                success: false,
                message: "unauthorized. You must be an admin to update profile cards.",
                code: 401
            })
        }
    }else{
        res.json({
            success: false,
            message: "unauthorized",
            code: 401
        })
    }
  })


module.exports = router;