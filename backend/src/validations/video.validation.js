const Joi = require('joi');
const { objectId, videoLink, genres } = require('./custom.validation')
const { contentRating, sortBy } = require('../utils/enum')


const create = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        videoLink: Joi.string().custom(videoLink).required(),
        genre: Joi.string().required(),
        contentRating: Joi.string().required(),
        releaseDate: Joi.date().required(),
        previewImage: Joi.any().required(),
        votes: Joi.object(),
        viewCount: Joi.number()
    })
}

const getVideoByid = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId).required()
    })
}

const getVideoByfilter = {
    query: Joi.object().keys({
        genres: Joi.string().custom(genres),
        contentRating: Joi.string().valid(...contentRating),
        sortBy: Joi.string().valid(...sortBy)
    }).unknown()
}

const updateVideoByView = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId).required()
    })
}

const vote = ['upVote', 'downVote']
const change = ['increase', 'decrease']

const updateVideoByVote = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        vote: Joi.string().valid(...vote).required(),
        change: Joi.string().valid(...change).required()
    })
}

module.exports = {
    create,
    getVideoByid,
    getVideoByfilter,
    updateVideoByView,
    updateVideoByVote

}