import { DataTypes } from "sequelize";

import defineMerchantModel from "./v1.merchant.model.js";
import defineProductModel from "./v1.product.model.js";
import sequelize from "../utils/sequelize.util.js";

const db = {};

db.sequelize = sequelize;

db.Merchant = defineMerchantModel(sequelize, DataTypes);
db.Product = defineProductModel(sequelize, DataTypes);

db.Merchant.belongsToMany(db.Product, {
  as: "products",
  foreignKey: "merchant_id",
  through: "merchants_products",
});

db.Product.belongsToMany(db.Merchant, {
  as: "merchants",
  foreignKey: "product_id",
  through: "merchants_products",
});

export default db;
