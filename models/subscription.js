"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Subscription.belongsTo(models.user);
        }
    }
    Subscription.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            plan: {
                type: DataTypes.ENUM("daily", "weekly", "monthly"),
                allowNull: false,
            },
            planId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subscriptionReference: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            metadata: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "subscriptions",
            modelName: "subscription",
        }
    );
    return Subscription;
};
