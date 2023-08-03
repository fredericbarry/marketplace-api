import { logError, logWarning } from "./logger.js";

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

/**
 * Log errors
 *
 * @param {Object} err The error
 * @param {Object} _req The request (unused)
 * @param {Object} res The response (unused)
 * @param {Function} next
 */
function errorLogger(err, _req, _res, next) {
    logError(err.message);
    next(err);
}

/**
 * Send back an error response in JSON format
 *
 * @param {Object} err
 * @param {Object} _req The request (unused)
 * @param {Object} res The response
 * @param {Function} _next (unused)
 */
function errorResponder(err, _req, res, _next) {
    const status = err.status || 400;
    res.header("Content-Type", "application/json");
    res.status(status).send({ error: err.message });
}

/**
 * Catch requests to non-existent routes
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function unknownEndpoint(req, res) {
    logError(`Unknown endpoint "${req.originalUrl}"`);
    res.status(404).send({ error: "Unknown endpoint" });
}

export { auth, errorLogger, errorResponder, unknownEndpoint };
