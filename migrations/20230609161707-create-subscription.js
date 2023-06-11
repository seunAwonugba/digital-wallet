"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("subscriptions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            plan: {
                type: Sequelize.ENUM("daily", "weekly", "monthly"),
                allowNull: false,
            },
            planId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amount: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subscriptionCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nextPaymentDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("subscriptions");
    },
};
