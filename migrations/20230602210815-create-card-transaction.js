"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cardTransactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            externalReference: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastResponse: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amount: {
                type: Sequelize.DECIMAL(20, 4),
                allowNull: false,
            },
            accountId: {
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
        await queryInterface.dropTable("cardTransactions");
    },
};
