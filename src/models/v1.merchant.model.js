import { DataTypes } from "sequelize";

import STATUSES from "../constants/statuses.constant.js";
import { db } from "../utils/db.js";

const Merchant = db.define("merchants", {
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

export default Merchant;
