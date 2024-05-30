module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    }, {});
    return Brand;
}