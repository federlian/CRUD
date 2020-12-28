module.exports = (client, DataTypes) => {
    const Car = client.define(
        'Car',
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
            tableName: 'cars',
            timestamps: false
        }
    );

    const Doc = require('./Document')(client, DataTypes);

    Car.hasMany(Doc, {
        foreignKey: 'car_id',
        onDelete: 'CASCADE'
    });

    return Car;
};
