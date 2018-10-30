'use strict';

const HttpCodes = {

    // Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,

    // Success

    OK: 200,
    CREATED: 201,

    // Redirection
    MOVED_PERMANENTLY: 301,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

const CustomErrors = {
    MISSING: 'is missing',
    NOT_FOUND: 'not found',
    INVALID: 'invalid',
};

/**
 * Response helper
 */
class Response {
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     */
    constructor(req, res) {
        this.res = res;

        // Default status code
        this.statusCode = HttpCodes.INTERNAL_SERVER_ERROR;

        // Response Struucture
        this.response = {
            'data': {},
            'errors': {},
            'meta': {
                'api_version': req.apiVersion,
            },
        };
    }

    /**
     * Set response data
     * @param {Object} data
     * @return {Response}
     */
    data(data) {
        this.response.data = data;
        return this;
    }

    /**
     * Set error message
     * @param {String} field
     * @param {String} message
     * @return {Response}
     */
    error(field, message) {
        if (typeof this.response.errors[field] === 'undefined') {
            this.response.errors[field] = [message];
        } else {
            this.response.errors[field].push(message);
        }

        return this;
    }

    /**
     * Set response meta
     * @param {Object} info
     * @param {Number} info.page
     * @param {Number} info.page_count
     * @param {Number} info.per_page
     * @param {Number} info.total
     * @return {Response}
     */
    meta(info) {
        this.response.meta = Object.assign(this.response.meta, info);
        return this;
    }

    /**
     * Set response status code
     * @param {Integer} code
     * @return {Response}
     */
    status(code) {
        this.statusCode = code;
        return this;
    }

    /**
     * Send response
     * @return {Response}
     */
    send() {
        this.res.status(this.statusCode).send(this.response);
        return this;
    }

    /**
     * Get reponse object
     * @return {Response}
     */
    get() {
        return this.response;
    }
}

exports.Response = Response;
exports.HttpCodes = HttpCodes;
exports.CustomErrors = CustomErrors;
