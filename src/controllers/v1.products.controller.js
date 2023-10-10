import STATUSES from "../configs/constants.config.js";
import * as ProductModelV1 from "../services/v1.product.service.js";
import { ERRORS, throwError } from "../utils/error.util.js";

/**
 * Create a product
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
    const createdProduct = await ProductModelV1.create(body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

/**
 * Get all products
 *
 * @param {Object} _req The request (unused)
 * @param {Object} res The response
 * @param {Function} next
 */
async function readAll(_req, res, next) {
  try {
    const allProducts = await ProductModelV1.readAll();
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
}

/**
 * Get a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The product ID
 * @param {Function} next
 */
async function readOne(req, res, next) {
  const id = req.params.id;

  try {
    const product = await ProductModelV1.readOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

/**
 * Update a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Number} req.params.id The product ID
 * @param {Function} next
 */
async function updateOne(req, res, next) {
  const body = req.body;
  const id = req.params.id;

  try {
    validate(body);
    const updatedProduct = await ProductModelV1.updateOne(id, body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The product ID
 * @param {Function} next
 */
async function deleteOne(req, res, next) {
  const id = req.params.id;

  try {
    await ProductModelV1.deleteOne(id);
    res.end();
  } catch (error) {
    next(error);
  }
}

/**
 * Add a merchant to a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function addMerchant(req, res, next) {
  const { merchant_id, product_id } = req.body;

  try {
    if (!merchant_id) {
      throwError("Merchant ID is required", ERRORS.BAD_REQUEST);
    }

    if (!product_id) {
      throwError("Product ID is required", ERRORS.BAD_REQUEST);
    }

    const result = await ProductModelV1.addMerchant(merchant_id, product_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * Verify the validity of a product object
 *
 * @param {Object} body The JSON payload
 * @param {String} req.body.name The product name
 * @param {String} req.body.status The product status
 */
function validate(body) {
  const { name, status } = body;

  if (!name) {
    throwError("Product name is required", ERRORS.BAD_REQUEST);
  }

  if (!status) {
    throwError("Product status is required", ERRORS.BAD_REQUEST);
  }

  if (!STATUSES.PRODUCT.includes(status)) {
    throwError(
      `Invalid product status '${status}' provided`,
      ERRORS.BAD_REQUEST
    );
  }
}

export { createOne, readAll, readOne, updateOne, deleteOne, addMerchant };
