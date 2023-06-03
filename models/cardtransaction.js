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
            CardTransaction.belongsTo(models.account);
        }
    }
    CardTransaction.init(
        {
            externalReference: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: "Transaction with this external reference already exist",
                },
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Transaction external reference is required",
                    },
                },
            },
            lastResponse: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Transaction amount is required",
                    },
                },
            },
            metadata: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Account ID reference is required",
                    },
                },
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
