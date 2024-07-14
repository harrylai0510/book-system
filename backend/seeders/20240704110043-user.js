'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [{
            lemail: 'admin@admin.com',
            firstName: 'Admin',
            lastName: 'Admin',
            password: 'admin'
        }];
        return queryInterface.bulkInsert(users);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
