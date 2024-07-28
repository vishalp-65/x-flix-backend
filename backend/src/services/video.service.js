const { VideoRepository } = require("../repositories");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const videoRepository = new VideoRepository();

/**
 * @params
 * @return {data of newly created video}
 */

async function createNewVideo(data) {
  const video = await videoRepository.create(data);
  return video;
}

/**
 *
 * @returns {List of videos data}
 */

async function getAllVideos(query) {
  let filters = {};
  let sortFilter = {
    sort: {},
  };
  // Sorting Condtion
  if (query.sortBy) {
    const key = query.sortBy;
    sortFilter.sort = { [key]: -1 };
  }

  // Title Query condition
  if (query.title) {
    const regex = new RegExp(`\\b${query.title}\\b`, "gi");
    filters = { ...filters, title: { $regex: regex } };
  }

  // Genres Query condition
  if (query.genres && query.genres != "All") {
    const genresArray = query.genres.split(",");
    filters = { ...filters, genre: { $in: genresArray } };
  }

  let videos = await videoRepository.getAll(filters, sortFilter);
  // Content Rating Query Condition
  if (query.contentRating) {
    if (query.contentRating === '18+' || query.contentRating === '16+' || query.contentRating === '12+') {
        videos = videos.filter((video) => {
            return parseInt(video.contentRating) == parseInt(query.contentRating);
        })
    }
    else{
        videos = videos.filter((video) => {
            return parseInt(video.contentRating) <= parseInt(query.contentRating) || video.contentRating === 'Anyone';
        })
    }
      // const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];
      // let ratingArrayDesired = contentRatingArray.slice(
      //   0,
      //     contentRatingArray.indexOf(contentRating)
      //   );
      //   console.log("ratingArray", ratingArrayDesired )
      //   filters = { ...filters, contentRating: { $in: query.contentRating } };
  }

  return videos;
}

/**
 * @params {videoId} req.params
 * @returns {List of videos data}
 */

async function getVideoById(videoId) {
  const video = await videoRepository.get(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }
  return video;
}

/**
 *
 * @returns {List of videos data}
 */

async function updateViews(id) {
  const video = await videoRepository.get(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "Video Not Found");
  }
  // const data = { viewCount: video.viewCount + 1 };
  // const updatedVideo = await videoRepository.update(id, data);
  // return updatedVideo;
  video.viewCount = video.viewCount + 1;
  video.save();
  console.log(video);
}

/**
 *
 * @param {'videoId'} id
 * @param {'increase' or 'decrease'} data
 * @returns video
 */

async function updateVotes(id, data) {
  const video = await videoRepository.get(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "Video Not Found");
  }
  const vote = `${data.vote}s`;
  if (data.change == "increase") {
    const voteCount = video.votes[vote];
    data = { votes: { ...video.votes, [vote]: voteCount + 1 } };
  } else {
    let voteCount = video.votes[vote];
    if (voteCount < 1) {
      voteCount = 1;
    }
    data = { votes: { ...video.votes, [vote]: voteCount - 1 } };
  }
  await videoRepository.update(id, data);
}

module.exports = {
  getAllVideos,
  createNewVideo,
  getVideoById,
  updateViews,
  updateVotes,
};
