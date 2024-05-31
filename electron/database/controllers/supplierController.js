const db = require('../db').getDB()
const Supplier = db.Supplier;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let brands = await Supplier.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    return  {
        items : brands,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
    let brand = await Supplier.create({
        supplier_code: data.supplier_code,
        company_name: data.company_name,
        supplier_type: data.supplier_type,
        supplier_category: data.supplier_category,
        contact_person: data.contact_person,
        phone_number: data.phone_number,
        email_address: data.email_address,
        website: data.website,
        address: data.address,
        tax_vat_number: data.tax_vat_number,
        notes: data.notes,
        bank_name: data.bank_name,
        bank_branch: data.bank_branch,
        is_active: data.is_active,
        bank_account_number: data.bank_account_number,
        bank_code: data.bank_code,
        opening_balance: data.opening_balance
    });
    return {
      item: brand,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Supplier.update(
      {
        name: data.name,
        is_active: data.is_active,
      },
      {
        where: {
          id: data.item_id,
        },
      }
    );
    let brand = await Supplier.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: brand,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let brand = await Supplier.findOne({
      where: {
        id: data.item_id,
      },
    });
    // let expense = await db.Expense.findOne({
    //   where: {
    //     expense_brand: data.item_id,
    //   },
    // });
    // if (expense) {
    //   return {
    //     success: false,
    //     message: "PREVENT_DELETE",
    //   };
    // }
    await brand.destroy();
    return {
      success: true,
    };
  };