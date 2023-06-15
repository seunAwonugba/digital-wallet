"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transferRecipients", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            active: {
                type: Sequelize.BOOLEAN,
            },
            currency: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            recipientId: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            integration: {
                type: Sequelize.STRING,
            },
            recipientCode: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            details: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable("transferRecipients");
    },
};
