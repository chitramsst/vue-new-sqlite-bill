module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        order_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        order_prefix: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sub_total: {
            type: DataTypes.REAL,
            allowNull: false
        },
        tax_total: {
            type: DataTypes.REAL,
            allowNull: false
        },
        tax_type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tax_percentage: {
            type: DataTypes.REAL,
            allowNull: true
        },
        net_total: {
            type: DataTypes.REAL,
            allowNull: false
        },
        status: {
            type: DataTypes.REAL,
            allowNull: false,
            default: 1
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        customer_name: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        customer_phone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        customer_email: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        financial_year_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {});
    return Order;
}