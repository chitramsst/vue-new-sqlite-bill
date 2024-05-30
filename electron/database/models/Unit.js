module.exports = (sequelize, DataTypes) => {
    const Unit = sequelize.define('Unit', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    }, {});
    return Unit;
}