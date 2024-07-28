const mongoose = require('mongoose')
const {contentRating, genre} = require('../utils/enum')

const videoSchema = new mongoose.Schema({
    videoLink:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: genre,
        required: true
    },
    contentRating: {
        type: String,
        enum: contentRating,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    previewImage: {
        type: String,
        required: true
    },
    votes: {
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        },
    },
    viewCount: {
        type: Number,
        default: 0
    }
})


const Video = mongoose.model('Video', videoSchema)

module.exports = Video;