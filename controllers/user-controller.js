const { User } = require('../models');

// functions go here as methods are defined
// these methods will be used as Callback functions for express routes and will take req, res

const userController = {
    // get all users 
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends', // fix this 
                select: '-__v' // ignores this field while in populate
            })
            .select ('-__v')
            .sort({ _id: -1 }) // newest on top
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                // console.error(err);
                res.status(400).json(err);
            });
    },

    // get one user using the params of _id
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id }) 
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No such user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // POST a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No such user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'User not found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
    }

};

module.exports = userController;