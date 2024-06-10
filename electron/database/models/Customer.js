module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customer_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        customer_prefix: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
            // manufacturer, distributor, service provider
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tax_vat_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    }, {});
    return Customer;
}