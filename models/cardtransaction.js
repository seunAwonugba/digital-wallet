"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CardTransaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CardTransaction.init(
        {
            externalReference: {
                type: DataTypes.STRING,
                unique: true,
            },
            lastResponse: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: true,
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "cardTransactions",
            modelName: "cardTransaction",
        }
    );
    return CardTransaction;
};
