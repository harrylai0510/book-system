'use strict';

const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.hasMany(models.History)
        }
    }

    Book.init({
        bookName: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'Book',
        tableName: 'Books'
    });

    return Book;
};
