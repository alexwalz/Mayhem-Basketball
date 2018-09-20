var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        uppercase: true,
        require: true,
    },
    lastName: {
        type: String,
        uppercase: true,
        require: true,
    },
    phoneNumber: String,
    email: {
        type: String,
        required: true,
    },
    address: String,
    city: String,
    state: String,
    zip: String,
    captainsClub: {
        type: Boolean,
        default: false
      },
    role: {
        type: String,
        default: 'customer'
      },
    lastLogin: Date,
    dateCreated: {
        type: Date,
        default: Date.now
      },
    active: {
    type: Boolean,
    default: false
    },
    activeHash: String,
    resetPasswordHash: String
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);