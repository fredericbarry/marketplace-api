import { logError } from "../utils/logger.js";

/**
 * Catch requests to non-existent routes
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function notFoundMiddleware(req, res) {
    logError(`Unknown endpoint "${req.originalUrl}"`);
    res.status(404).send({ error: "Unknown endpoint" });
}

export default notFoundMiddleware;
