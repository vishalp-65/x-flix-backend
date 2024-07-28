const { videoService } = require('../services');
const httpStatus = require('http-status')
const asyncHandler = require('../utils/AsyncHandler')


/**
 * @param {votes, previewImage, viewCount, videoLink, title, genre, contentRating, releaseDate} req.body 
 * @param {*} res 
 * @returns {List of all videos}
 */

const createNewvideo = asyncHandler(async (req, res) => {
    const video = await videoService.createNewVideo(req.body);
    return res.status(httpStatus.CREATED).send(video);
})


/**
 * 
 * @param {*} req.query
 * @returns {List of all videos}
 */

const getAllVidoes = asyncHandler(async (req, res) => {
    const videos = await videoService.getAllVideos(req.query);
    return res.status(httpStatus.OK).send({videos: videos});
})


/**
 * @param {videoId} req.params
 * @return {updated video data}
 */


const getVideoById = asyncHandler(async (req, res) => {
    const video = await videoService.getVideoById(req.params.videoId);
    return res.status(httpStatus.OK).send(video);
})

/**
 * @param {videoId} req.params
 * @return updated video data
 */

const updateViews = asyncHandler(async (req, res) => {
    await videoService.updateViews(req.params.videoId);

    return res.status(httpStatus.NO_CONTENT).send()
});

/**
 * @param {videoId} req.params
 * @param {vote, change} req.body
 * @return updated video data
 */

const updateVote = asyncHandler(async (req, res) => {
    const video = await videoService.updateVotes(req.params.videoId, req.body);
    return res.status(httpStatus.NO_CONTENT).send();
})


module.exports = {
    createNewvideo,
    getAllVidoes,
    getVideoById,
    updateViews,
    updateVote
}