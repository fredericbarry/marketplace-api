import STATUSES from "../constants/statuses.constant.js";
import * as ProductModelV1 from "../services/v1.product.service.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Create a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function createNew(req, res, next) {
    const body = req.body;

    try {
        validateProduct(body);
        const createdProduct = await ProductModelV1.createNew(body);
        res.json(createdProduct);
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
async function getAll(_req, res, next) {
    try {
        const allProducts = await ProductModelV1.getAll();
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
async function getOne(req, res, next) {
    const id = req.params.id;

    try {
        const product = await ProductModelV1.getOne(id);
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
        validateProduct(body);
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
const deleteOne = async (req, res, next) => {
    const id = req.params.id;

    try {
        await ProductModelV1.deleteOne(id);
        res.status(200).end();
    } catch (error) {
        next(error);
    }
};

/**
 * Verify the validity of a product object
 *
 * @param {Object} body The JSON payload
 * @param {String} req.body.name The product name
 * @param {String} req.body.status The product status
 */
function validateProduct(body) {
    const { name, status } = body;

    if (!name) {
        throwError("Product name is required", ERRORS.BAD_REQUEST);
    }

    if (!status) {
        throwError("Product status is required", ERRORS.BAD_REQUEST);
    }

    if (!PRODUCT_STATUSES.includes(status)) {
        throwError(
            `Invalid product status '${status}' provided`,
            ERRORS.BAD_REQUEST
        );
    }
}

export { createNew, getAll, getOne, updateOne, deleteOne };
