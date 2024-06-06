module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
        supplier_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        supplier_prefix: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        supplier_type: {
            type: DataTypes.STRING,
            allowNull: false
            // manufacturer, distributor, service provider
        },
        supplier_category: {
            type: DataTypes.STRING,
            allowNull: false
            // raw materials, services, finished goods
        },
        contact_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
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
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bank_branch: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bank_account_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bank_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        opening_balance: {
            type: DataTypes.REAL,
            allowNull: true,
            defaultValue: 0
        }
    }, {});
    return Supplier;
}