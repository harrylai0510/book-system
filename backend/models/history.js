'use strict';

const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // History.hasOne(models.User);
            // History.hasOne(models.Book);

            History.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId'
            });

            History.belongsTo(models.Book, {
                as: 'book',
                foreignKey: 'bookId'
            });
        }
    }

    History.init({
        bookId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Books',
                key: 'id'
            },
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
    }, {
        sequelize,
        modelName: 'History',
        tableName: 'Histories'
    });

    return History;
};
