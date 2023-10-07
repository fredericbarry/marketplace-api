import STATUSES from "../configs/constants.config.js";
import * as MerchantModelV1 from "../services/v1.merchant.service.js";
import { ERRORS, throwError } from "../utils/error.util.js";

/**
 * Create a merchant
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function createOne(req, res, next) {
  const body = req.body;

  try {
    validate(body);
    const createdMerchant = await MerchantModelV1.create(body);
    res.status(201).json(createdMerchant);
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
async function readAll(_req, res, next) {
  try {
    const allMerchants = await MerchantModelV1.readAll();
    res.json(allMerchants);
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
async function readOne(req, res, next) {
  const id = req.params.id;

  try {
    const merchant = await MerchantModelV1.readOne(id);
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
    validate(body);
    const updatedMerchant = await MerchantModelV1.updateOne(id, body);
    res.json(updatedMerchant);
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
async function deleteOne(req, res, next) {
  const id = req.params.id;

  try {
    await MerchantModelV1.deleteOne(id);
    res.end();
  } catch (error) {
    next(error);
  }
}

/**
 * Verify the validity of a merchant object
 *
 * @param {Object} body The JSON payload
 * @param {String} req.body.name The merchant name
 * @param {String} req.body.status The merchant status
 */
function validate(body) {
  const { name, status } = body;

  if (!name) {
    throwError("Merchant name is required", ERRORS.BAD_REQUEST);
  }

  if (!status) {
    throwError("Merchant status is required", ERRORS.BAD_REQUEST);
  }

  if (!STATUSES.MERCHANT.includes(status)) {
    throwError(
      `Invalid merchant status '${status}' provided`,
      ERRORS.BAD_REQUEST
    );
  }
}

export { createOne, readAll, readOne, updateOne, deleteOne };
