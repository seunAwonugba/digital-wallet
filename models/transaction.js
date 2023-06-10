"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction.belongsTo(models.account);
        }
    }
    Transaction.init(
        {
            transactionType: {
                type: DataTypes.ENUM("debit", "credit"),
                allowNull: false,
            },
            action: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paystackCustomerCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reference: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false,
            },
            balanceBefore: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: false,
            },
            balanceAfter: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: false,
            },
            metadata: {
                type: DataTypes.JSON,
            },
        },
        {
            sequelize,
            tableName: "transactions",
            modelName: "transaction",
        }
    );
    return Transaction;
};
