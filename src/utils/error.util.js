const ERRORS = {
    BAD_REQUEST: {
        code: 400,
        status: "Bad Request",
    },
    NOT_FOUND: {
        code: 404,
        status: "Not Found",
    },
    CONFLICT: {
        code: 409,
        status: "Conflict",
    },
    GONE: {
        code: 410,
        status: "Gone",
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        status: "Internal Server Error",
    },
};

/**
 * Rethrow an error with a custom message and status code
 *
 * @param {String} message The error message
 * @param {Object} error The error status
 * @param {Number} originalError The original error (optional)
 */
function throwError(message, error, originalError = null) {
    const options = originalError ? { cause: originalError } : null;

    const err = new Error(message, options);
    err.statusCode = error.code;

    throw err;
}

export { ERRORS, throwError };
