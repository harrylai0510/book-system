'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const books = [
            { bookName: '香港公屋設計變奏曲', createdAt: new Date(), updatedAt: new Date() },
            { bookName: '香港商場的黃金時代', createdAt: new Date(), updatedAt: new Date() },
            { bookName: '遊走香港屋邨誌',    createdAt: new Date(), updatedAt: new Date() },
        ];
        return queryInterface.bulkInsert('Books', books, {});
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Books', null, {});
    }
};
