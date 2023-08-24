import Merchant from "../models/v1.merchant.model.js";
import { nowUtc } from "../utils/date.js";
import { ERRORS, throwError } from "../utils/error.js";

/**
 * Builds a new Merchant model instance and calls save on it
 *
 * @param {Object} merchant The merchant to create
 * @returns {Promise|Merchant} The created merchant object
 */
async function createNew(merchant) {
    try {
        merchant.created_utc = nowUtc();
        merchant.updated_utc = nowUtc();

        return await Merchant.create(merchant);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throwError(
                `Merchant ${merchant.name} already exists`,
                ERRORS.CONFLICT,
                error
            );
        }

        throwError(
            "An unknown error occured while creating the merchant",
            ERRORS.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

/**
 * Search for multiple merchants instances
 *
 * @returns {Promise|Array<Merchant>} The merchants array that was found
 */
async function getAll() {
    try {
        return await Merchant.findAll();
    } catch (error) {
        throwError(
            "An unknown error occured while reading the merchants",
            ERRORS.INTERNAL_SERVER_ERROR,
            error
        );
    }
}

/**
 * Get a merchant by its primary key
 *
 * @param {Number} id The merchant ID
 * @returns {Promise|Merchant} The merchant object
 */
async function getOne(id) {
    const response = await Merchant.findByPk(id);

    if (!response) {
        throwError(`Merchant ID ${id} could not be found`, ERRORS.NOT_FOUND);
    }

    return response;
}

/**
 * Update a merchant
 *
 * @param {Number} id The merchant ID
 * @param {Object} merchant The merchant details
 * @returns {Promise|Number} The number of affected rows
 */
async function updateOne(id, merchant) {
    const { name, status } = merchant;

    const result = await Merchant.update(
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
            `Merchant ID ${id} could not be found for update`,
            ERRORS.GONE
        );
    }

    return result[0];
}

/**
 * Delete a merchant
 *
 * @param {Number} id The merchant ID
 * @returns {Promise|Number} The number of destroyed rows
 */
async function deleteOne(id) {
    const response = await Merchant.destroy({
        where: {
            id: id,
        },
    });

    if (response === 0) {
        throwError(
            `Merchant ID ${id} could not be found for deletion`,
            ERRORS.GONE
        );
    }

    return response;
}

export { createNew, getAll, getOne, updateOne, deleteOne };
