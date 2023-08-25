import * as log from "../utils/logger.js";

/**
 * Log errors
 *
 * @param {Object} err The error
 * @param {Object} _req The request (unused)
 * @param {Object} _res The response (unused)
 * @param {Function} next
 */
function logger(err, _req, _res, next) {
    log.error(err.message);
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
function responder(err, _req, res, _next) {
    const status = err.status || 400;
    res.header("Content-Type", "application/json");
    res.status(status).send({ error: err.message });
}

export { logger, responder };
