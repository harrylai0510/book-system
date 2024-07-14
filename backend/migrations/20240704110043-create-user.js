'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            lastName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            userName: {
                allowNull: true,
                type: DataTypes.VIRTUAL,
            },
            lemail: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};
