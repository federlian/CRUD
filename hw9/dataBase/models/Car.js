const {
    MODEL_CAR,
    TABLE_NAME_CARS,
    CAR_ID,
    CASCADE
} = require('../../constants/constants');

module.exports = (client, DataTypes) => {
    const Car = client.define(
        MODEL_CAR,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            model: {
                type: DataTypes.STRING,
                allowNull: false
            },

            customer: {
                type: DataTypes.STRING,
                allowNull: false
            },

            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            }
        },
        {
            tableName: TABLE_NAME_CARS,
            timestamps: false
        }
    );

    const Doc = require('./Document')(client, DataTypes);

    Car.hasMany(Doc, {
        foreignKey: CAR_ID,
        onDelete: CASCADE
    });

    return Car;
};
