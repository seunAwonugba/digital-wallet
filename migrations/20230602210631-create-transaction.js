"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            transactionType: {
                type: Sequelize.ENUM("debit", "credit"),
                allowNull: false,
            },
            action: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amount: {
                type: Sequelize.DECIMAL(20, 4),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paystackCustomerCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            accountId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            reference: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            balanceBefore: {
                type: Sequelize.DECIMAL(20, 4),
                allowNull: false,
            },
            balanceAfter: {
                type: Sequelize.DECIMAL(20, 4),
                allowNull: false,
            },
            metadata: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable("transactions");
    },
};
