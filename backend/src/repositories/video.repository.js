const Video = require('../models/video.model');
const CrudRepository = require('./Crud.repository')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
class VideoRepository extends CrudRepository{
    constructor(){
        super(Video)
    }

    // async create(data) {
    //     try {
    //         const result = await Video.create(data);
    //         return result;
    //     } catch (error) {
    //         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    //     }
    // }

    async getAll(filters, sort) {
        try {
            const result = await Video.find(filters, null, sort);
            console.log("filterin repo", filters, sort)
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error")
        }
    }

}


module.exports = VideoRepository;