const express = require('express')
const { videoController } = require('../../controllers')
const { validate } = require('../../middlewares')
const { videoValidation } = require('../../validations')

const router = express.Router();


router.post(
    '/',
    validate(videoValidation.create),
    videoController.createNewvideo
);

router.get(
    '/',
    validate(videoValidation.getVideoByfilter),
    videoController.getAllVidoes
);

router.get(
    '/:videoId',
    validate(videoValidation.getVideoByid),
    videoController.getVideoById
);

router.patch(
    '/:videoId/views',
    validate(videoValidation.updateVideoByView),
    videoController.updateViews
);

router.patch(
    '/:videoId/votes',
    validate(videoValidation.updateVideoByVote),
    videoController.updateVote
);



module.exports = router