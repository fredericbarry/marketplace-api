import { MERCHANT_STATUSES } from "../configs/constants.config.js";
import {
    createMerchant,
    deleteMerchant,
    readMerchant,
    readMerchants,
    updateMerchant,
} from "../models/merchant.model.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Add a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function addMerchant(req, res, next) {
    try {
        validateMerchant(req.body);
        const merchant = await createMerchant(req.body);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Edit a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Number} req.params.id The merchant ID
 * @param {Function} next
 */
async function editMerchant(req, res, next) {
    const body = req.body;
    const id = req.params.id;

    try {
        validateMerchant(req.body);
        const merchant = await updateMerchant(id, body);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Get a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The merchant ID
 * @param {Function} next
 */
async function getMerchant(req, res, next) {
    const id = req.params.id;

    try {
        const merchant = await readMerchant(id);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Get merchants
 *
 * @param {Object} _req The request (unused)
 * @param {Object} res The response
 * @param {Function} next
 */
async function getMerchants(_req, res, next) {
    try {
        const merchants = await readMerchants();
        res.json(merchants);
    } catch (error) {
        next(error);
    }
}

/**
 * Remove a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The merchant ID
 * @param {Function} next
 */
const removeMerchant = async (req, res, next) => {
    const id = req.params.id;

    try {
        await deleteMerchant(id);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
};

/**
 * Verify the validity of a merchant object
 *
 * @param {Object} body The JSON payload
 * @param {String} req.body.name The merchant name
 * @param {String} req.body.status The merchant status
 */
function validateMerchant(body) {
    const { name, status } = body;

    if (!name) {
        throwError("Merchant name is required", ERRORS.BAD_REQUEST);
    }

    if (!status) {
        throwError("Merchant status is required", ERRORS.BAD_REQUEST);
    }

    if (!MERCHANT_STATUSES.includes(status)) {
        throwError(
            `Invalid merchant status '${status}' provided`,
            ERRORS.BAD_REQUEST
        );
    }
}

export { addMerchant, editMerchant, getMerchants, getMerchant, removeMerchant };
