"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TransferRecipient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TransferRecipient.init(
        {
            active: DataTypes.BOOLEAN,
            currency: DataTypes.STRING,
            email: DataTypes.STRING,
            recipientId: DataTypes.STRING,
            name: DataTypes.STRING,
            integration: DataTypes.STRING,
            recipientCode: DataTypes.STRING,
            type: DataTypes.STRING,
            details: DataTypes.JSON,
        },
        {
            sequelize,
            tableName: "transferRecipients",
            modelName: "transferRecipient",
        }
    );
    return TransferRecipient;
};
