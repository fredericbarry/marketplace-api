import { PRODUCT_STATUSES } from "../configs/constants.config.js";
import {
    createProduct,
    deleteProduct,
    readProduct,
    readProducts,
    updateProduct,
} from "../models/v1.product.model.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Add a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Function} next
 */
async function addProduct(req, res, next) {
    try {
        validateProduct(req.body);
        const product = await createProduct(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

/**
 * Edit a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Object} req.body The JSON payload
 * @param {Number} req.params.id The product ID
 * @param {Function} next
 */
async function editProduct(req, res, next) {
    const body = req.body;
    const id = req.params.id;

    try {
        validateProduct(req.body);
        const product = await updateProduct(id, body);
        res.json(product);
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
async function getProduct(req, res, next) {
    const id = req.params.id;

    try {
        const product = await readProduct(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
}

/**
 * Get products
 *
 * @param {Object} _req The request (unused)
 * @param {Object} res The response
 * @param {Function} next
 */
async function getProducts(_req, res, next) {
    try {
        const products = await readProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

/**
 * Remove a product
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Number} req.params.id The product ID
 * @param {Function} next
 */
const removeProduct = async (req, res, next) => {
    const id = req.params.id;

    try {
        await deleteProduct(id);
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

export { addProduct, editProduct, getProducts, getProduct, removeProduct };
