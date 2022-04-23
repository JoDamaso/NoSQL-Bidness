const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username : {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },

        email: {
            type: String,
            required: true,
            unique: true

        },

        thoughts: [

        ],

        friends: [

        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

const User = model('User', UserSchema);

module.exports = User;