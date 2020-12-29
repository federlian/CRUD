const { MODEL_DOCUMENT, TABLE_NAME_DOCUMENTS } = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Document = client.define(
        MODEL_DOCUMENT,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false
            },
            car_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },

        },
        {
            tableName: TABLE_NAME_DOCUMENTS,
            timestamps: false
        }
    );

    return Document;
};
