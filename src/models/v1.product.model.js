import { DataTypes } from "sequelize";

import { PRODUCT_STATUSES } from "../configs/constants.config.js";
import { db } from "../utils/db.js";

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

export default Product;
