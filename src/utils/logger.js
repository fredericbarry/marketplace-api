const reset = "\x1b[0m";

/**
 * Log an error message
 *
 * @param {String} message The error message
 */
function logError(message) {
    const red = "\x1b[31m";
    console.error(`${red}ERROR: ${message}${reset}`);
}

/**
 * Log an info message
 *
 * @param {String} message The info message
 */
function logInfo(message) {
    const blue = "\x1b[34m";
    console.info(`${blue}${message}${reset}`);
}

/**
 * Log a message
 *
 * @param {String} message The log message
 */
function logMessage(message) {
    const white = "\x1b[37m";
    console.log(`${white}${message}${reset}`);
}

/**
 * Log a success message
 *
 * @param {String} message The success message
 */
function logSuccess(message) {
    const green = "\x1b[32m";
    console.log(`${green}${message}${reset}`);
}

/**
 * Log a warning message
 *
 * @param {String} message The warning message
 */
function logWarning(message) {
    const yellow = "\x1b[33m";
    console.warn(`${yellow}${message}${reset}`);
}

export { logError, logInfo, logMessage, logSuccess, logWarning };
