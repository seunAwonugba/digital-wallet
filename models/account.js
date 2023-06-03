"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Account.belongsTo(models.user);
            Account.hasMany(models.transaction, {
                foreignKey: "accountId",
            });
            Account.hasMany(models.cardTransactions, {
                foreignKey: "accountId",
            });
        }
    }
    Account.init(
        {
            userId: DataTypes.INTEGER,
            balance: {
                type: DataTypes.DECIMAL(20, 4),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: "accounts",
            modelName: "account",
        }
    );
    return Account;
};
