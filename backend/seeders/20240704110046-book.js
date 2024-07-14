'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const books = [{
            bookName: 'Book 00001'
        }];
        return queryInterface.bulkInsert(books);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Books', null, {});
    }
};
