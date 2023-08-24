import Product from "../models/v1.product.model.js";
import { nowUtc } from "../utils/date.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Builds a new Product model instance and calls save on it
 *
 * @param {Object} product The product to create
 * @returns {Promise|Product} The created product object
 */
async function createNew(product) {
    try {
        product.created_utc = nowUtc();
        product.updated_utc = nowUtc();

        return await Product.create(product);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throwError(
                `Product ${product.name} already exists`,
                ERRORS.CONFLICT,
                error
            );
        }

        throwError(
            "An unknown error occured while creating the product",
            ERRORS.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

/**
 * Search for multiple products instances
 *
 * @returns {Promise|Array<Product>} The products array that was found
 */
async function getAll() {
    try {
        return await Product.findAll();
    } catch (error) {
        throwError(
            "An unknown error occured while reading the products",
            ERRORS.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

/**
 * Get a product by its primary key
 *
 * @param {Number} id The product ID
 * @returns {Promise|Product} The product object
 */
async function getOne(id) {
    const response = await Product.findByPk(id);

    if (!response) {
        throwError(`Product ID ${id} could not be found`, ERRORS.NOT_FOUND);
    }

    return response;
}

/**
 * Update a product
 *
 * @param {Number} id The product ID
 * @param {Object} product The product details
 * @returns {Promise|Number} The number of affected rows
 */
async function updateOne(id, product) {
    const { name, status } = product;

    const result = await Product.update(
        {
            name: name,
            status: status,
            updated_utc: nowUtc(),
        },
        {
            where: {
                id: id,
            },
        }
    );

    if (result[0] === 0) {
        throwError(
            `Product ID ${id} could not be found for update`,
            ERRORS.GONE
        );
    }

    return result[0];
}

/**
 * Delete a product
 *
 * @param {Number} id The product ID
 * @returns {Promise|Number} The number of destroyed rows
 */
async function deleteOne(id) {
    const response = await Product.destroy({
        where: {
            id: id,
        },
    });

    if (response === 0) {
        throwError(
            `Product ID ${id} could not be found for deletion`,
            ERRORS.GONE
        );
    }

    return response;
}

export { createNew, getAll, getOne, updateOne, deleteOne };
