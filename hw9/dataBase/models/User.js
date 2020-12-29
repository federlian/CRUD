const {
    CASCADE,
    MODEL_USER,
    TABLE_NAME_USERS,
    USER_ID
} = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const User = client.define(
        MODEL_USER,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            avatar: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: TABLE_NAME_USERS,
            timestamps: false
        }
    );
    const Car = require('./Car')(client, DataTypes);
    const O_Auth = require('./O_Auth')(client, DataTypes);

    User.hasMany(Car, {
        foreignKey: USER_ID,
        onDelete: CASCADE
    });

    User.hasMany(O_Auth, {
        foreignKey: USER_ID,
        onDelete: CASCADE,
    });

    return User;
};
