import { MERCHANT_STATUSES } from "../configs/constants.config.js";
import * as MerchantModelV1 from "../models/v1.merchant.model.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Create a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function createNew(req, res, next) {
    try {
        validateMerchant(req.body);
        const merchant = await MerchantModelV1.createNew(req.body);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Get all merchants
 *
 * @param {Object} _req The request (unused)
 * @param {Object} res The response
 * @param {Function} next
 */
async function getAll(_req, res, next) {
    try {
        const merchants = await MerchantModelV1.getAll();
        res.json(merchants);
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
async function getOne(req, res, next) {
    const id = req.params.id;

    try {
        const merchant = await MerchantModelV1.getOne(id);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Update a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Number} req.params.id The merchant ID
 * @param {Function} next
 */
async function updateOne(req, res, next) {
    const body = req.body;
    const id = req.params.id;

    try {
        validateMerchant(req.body);
        const merchant = await MerchantModelV1.updateOne(id, body);
        res.json(merchant);
    } catch (error) {
        next(error);
    }
}

/**
 * Delete a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The merchant ID
 * @param {Function} next
 */
const deleteOne = async (req, res, next) => {
    const id = req.params.id;

    try {
        await MerchantModelV1.deleteOne(id);
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

export { createNew, getAll, getOne, updateOne, deleteOne };
