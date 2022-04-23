const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },

        username: {

        },

        createdAt: {
            date: Date,
            default: Date.now,
            get: (createdAtVal) => dateformat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280
        },

        createdAt: {
            date: Date,
            default: Date.now,
            get: (createdAtVal) => dateformat(createdAtVal)
        },

        // associating replies with comments 
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

const Thought = model('thoughts', ThoughtSchema);

module.exports = Thought;