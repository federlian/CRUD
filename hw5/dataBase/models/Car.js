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

    return Car;
};
