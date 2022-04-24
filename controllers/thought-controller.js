const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    allThought(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },

    // GET a single Thought
    oneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },


    // // POST add Thought to User 
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $addToSet: {thoughts: _id } },
                    { new: true, runValidators: true }
                )
                .catch()
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No such user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add a thought 
    // updating an exisiting user's 
    addReaction({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: {reactions: body} },
            { new: true , runValidators: true },
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove a thought
    removeThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'no user found with this id!'});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtsId } },
                    { new: true },
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No such user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;