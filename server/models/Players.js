var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var PlayerSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        uppercase: true,
        require: true,
    },
    position: {
        type: String,
        uppercase: true,
        require: true,
    },
    handed: {
        type: String,
        require: true,
    },
    height: {
        type: String,
        require: true,
    },
    favorite_player: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    },

});


module.exports = mongoose.model('Player', PlayerSchema);