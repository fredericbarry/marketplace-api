import STATUSES from "../configs/constants.config.js";

function defineMerchantModel(sequelize, DataTypes) {
  const Merchant = sequelize.define("merchants", {
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
      values: STATUSES.MERCHANT,
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

  return Merchant;
}

export default defineMerchantModel;
