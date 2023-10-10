import db from "../models/v1.db.model.js";
import { nowUtc } from "../utils/date.util.js";
import { ERRORS, throwError } from "../utils/error.util.js";

const { Merchant, Product } = db;

/**
 * Builds a new Product model instance and calls save on it
 *
 * @param {Object} product The product to create
 * @returns {Promise|Product} The created product object
 */
async function createOne(product) {
  const productName = product.name;
  const newProduct = {
    ...product,
    created_utc: nowUtc(),
    updated_utc: nowUtc(),
  };

  try {
    return await Product.create(newProduct);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throwError(
        `Product ${productName} already exists`,
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
async function readAll() {
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
async function readOne(id) {
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
  const updatedProduct = { ...product, updated_utc: nowUtc() };
  const whereClause = {
    where: {
      id,
    },
  };

  const result = await Product.update(updatedProduct, whereClause);

  if (result[0] === 0) {
    throwError(`Product ID ${id} could not be found for update`, ERRORS.GONE);
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
  const whereClause = {
    where: {
      id,
    },
  };

  const response = await Product.destroy(whereClause);

  if (response === 0) {
    throwError(`Product ID ${id} could not be found for deletion`, ERRORS.GONE);
  }

  return response;
}

/**
 * Add a merchant to a product
 *
 * @param {Number} merchantId The merchant ID
 * @param {Number} productId The product ID
 * @returns {Promise|Object} The created association object
 */
async function addMerchant(merchantId, productId) {
  const merchant = await Merchant.findByPk(merchantId);

  if (!merchant) {
    throwError(
      `Merchant ID ${merchantId} could not be found`,
      ERRORS.NOT_FOUND
    );
  }

  const product = await Product.findByPk(productId);

  if (!product) {
    throwError(`Product ID ${productId} could not be found`, ERRORS.NOT_FOUND);
  }

  const result = await product.addMerchant(merchant);

  if (!result) {
    throwError(
      `Association between merchant ID ${merchantId} and product ID ${productId} already exists`,
      ERRORS.CONFLICT
    );
  }

  return result;
}

export { createOne, readAll, readOne, updateOne, deleteOne, addMerchant };
