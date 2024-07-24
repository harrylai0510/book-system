'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                lemail: 'admin@admin.com',
                firstName: 'Admin',
                lastName: 'Admin',
                password: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        return queryInterface.bulkInsert('Users', users, {});
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
