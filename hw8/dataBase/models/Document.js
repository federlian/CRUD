module.exports = (client, DataTypes) => {
    const Document = client.define(
        'Document',
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
            tableName: 'documents',
            timestamps: false
        }
    );

    return Document;
};
