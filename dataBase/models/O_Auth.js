const { MODEL_O_AUTH, NOW, TABLE_NAME_O_AUTH } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const O_Auth = client.define(
        MODEL_O_AUTH,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: client.fn(NOW)
            }
        },
        {
            tableName: TABLE_NAME_O_AUTH,
            timestamps: false
        }
    );

    return O_Auth;
};
