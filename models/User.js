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
            trim: true,
            unique: true

        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, // ? 
        },
        id: false
    }
)

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;