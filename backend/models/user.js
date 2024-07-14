'use strict';

const crypto = require('crypto');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.History);
        }
    }

    User.init({
        firstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.dataValues['firstName']} ${this.dataValues['lastName']}`;
            },
        },
        lemail: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            // set(value) {
            //     this.setDataValue('password', crypto.createHash('sha256').update(value).digest('hex'));
            // }
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    });

    return User;
};
