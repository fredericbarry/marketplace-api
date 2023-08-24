import { logWarning } from "../utils/logger.js";

/**
 * Validate the API key
 *
 * @param {Object} req The request
 * @param {Object} _res The response (unused)
 * @param {Function} next
 */
function auth(req, _res, next) {
    logWarning(
        `An API key should have been provided for the request on the endpoint "${req.originalUrl}"`
    );
    next();
}

export { auth };
