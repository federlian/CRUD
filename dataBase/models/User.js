const {
    CASCADE,
    MODEL_USER,
    TABLE_NAME_USERS,
    USER_ID,
    NOW
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

            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            avatar: {
                type: DataTypes.STRING
            },

            confirm_token: {
                type: DataTypes.STRING
            },

            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: client.fn(NOW)
            }
        },
        {
            tableName: TABLE_NAME_USERS,
            timestamps: false
        },
        {
            paranoid: true
        }
    );
    const O_Auth = require('./O_Auth')(client, DataTypes);

    User.hasMany(O_Auth, {
        foreignKey: USER_ID,
        onDelete: CASCADE,
    });

    return User;
};
