module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_unit_price: {
            type: DataTypes.REAL,
            allowNull: false
        },
        product_selling_price: {
            type: DataTypes.REAL,
            allowNull: false
        },
        product_quantity: {
            type: DataTypes.REAL,
            allowNull: false
        },
        product_tax_amount: {
            type: DataTypes.REAL,
            allowNull: true
        },
        product_total: {
            type: DataTypes.REAL,
            allowNull: false
        },
        product_supplier_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {});
    return OrderDetail;
}