const db            = require('../models/Players')

module.exports = {

    findAll: function (req, res) {
        db
            .find({})
            .then(function (dbModel) {
                res.json(dbModel);
            })
            .catch(function (err) {
                res.json({
                    success: false, 
                    message: "unable to find players",
                    code: 404
                });
            });
    },

    findById: function (req, res) {
        db
            .findById(req.params.id)
            .then(function (dbModel) {

                res.json(dbModel)

            })
            .catch(function (err) {
                res.json({
                    success: false, 
                    message: "unable to find player",
                    code: 404
                });
            });
    },

    create: function (req, res) {
        db
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false, 
                    message: "unable to create player",
                    code: 422
                });

            });
    },

    update: function (req, res) {
        db
            .findOneAndUpdate({_id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json({
                success: false, 
                message: "unable to update player",
                code: 422
            }));
    },

    remove: function (req, res) {
        db
            .findById({_id: req.params.id})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.json({
                success: false, 
                message: "unable to delete player",
                code: 422
            }));
    }
};