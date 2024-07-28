const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status')

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error")
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error")
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error")
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Server Error")
        }
    }

}

module.exports = CrudRepository;