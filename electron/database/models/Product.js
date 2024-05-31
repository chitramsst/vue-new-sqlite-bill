module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost_price: {
            type: DataTypes.REAL,
            allowNull: false
        },
        selling_price: {
            type: DataTypes.REAL,
            allowNull: false
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tax_rate: {
            type: DataTypes.REAL,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hsCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        warehouseLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reOrderLevel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {});
    return Product;
}