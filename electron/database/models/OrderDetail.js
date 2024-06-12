module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_prefix: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_code: {
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
        product_cost_price: {
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
        product_hsCode: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        product_brand: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        product_unit: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        product_expiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        product_tax_rate: {
            type: DataTypes.REAL,
            allowNull: false,
          },
    }, {});
    return OrderDetail;
}