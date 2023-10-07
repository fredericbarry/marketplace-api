import STATUSES from "../configs/constants.config.js";

function defineProductModel(sequelize, DataTypes) {
  const Product = sequelize.define("products", {
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
      values: STATUSES.PRODUCT,
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

  return Product;
}

export default defineProductModel;
