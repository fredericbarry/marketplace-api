import { DataTypes } from "sequelize";

import { PRODUCT_STATUSES } from "../configs/constants.config.js";
import { nowUtc } from "../utils/date.js";
import { db } from "../utils/db.js";
import { ERRORS, throwError } from "../utils/error.js";

const Product = db.define("products", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM,
        values: PRODUCT_STATUSES,
    },
    created_utc: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updated_utc: {
        allowNull: false,
        type: DataTypes.DATE,
    },
});

await Product.sync({
    alter: true,
});

/**
 * Builds a new Product model instance and calls save on it
 *
 * @param {Object} product The product to create
 * @returns {Promise|Product} The created product object
 */
async function createProduct(product) {
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
 * Delete a product
 *
 * @param {Number} id The product ID
 * @returns {Promise|Number} The number of destroyed rows
 */
async function deleteProduct(id) {
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

/**
 * Search for a single product by its primary key
 *
 * @param {Number} id The product ID
 * @returns {Promise|Product} The product object
 */
async function readProduct(id) {
    const response = await Product.findByPk(id);

    if (!response) {
        throwError(`Product ID ${id} could not be found`, ERRORS.NOT_FOUND);
    }

    return response;
}

/**
 * Search for multiple products instances
 *
 * @returns {Promise|Array<Product>} The products array that was found
 */
async function readProducts() {
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
 * Update multiple product instances that match the where options
 *
 * @param {Number} id The product ID
 * @param {Object} product The product details
 * @returns {Promise|Number} The number of affected rows
 */
async function updateProduct(id, product) {
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
        throwError(`Product ID ${id} could not be found for update`, ERRORS.GONE);
    }

    return result[0];
}

export {
    createProduct,
    deleteProduct,
    readProduct,
    readProducts,
    updateProduct,
};