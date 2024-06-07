const db = require('../db').getDB()
const Customer = db.Customer;
const { Op } = require("sequelize");

/* fetch item */
exports.get_items = async (data) => {
    let customers = await Customer.findAll({order: [
        ['createdAt', 'DESC']
    ]
})
    return  {
        items : customers,
        success : true
    }
}
/* create item */
exports.create_item = async (data) => {
    let customer = await Customer.create({
        customer_code: data.customer_code,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        email_address: data.email_address,
        address: data.address,
        is_active: data.is_active,
    });
    return {
      item: customer,
      success: true,
    };
  };
  
  exports.edit_item= async (data) => {
    await Customer.update(
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
    let customer = await Customer.findOne({
      where: {
        id: data.item_id,
      },
    });
    return {
      item: customer,
      success: true,
    };
  };
  
  exports.delete_item = async (data) => {
    let customer = await Customer.findOne({
      where: {
        id: data.item_id,
      },
    });
    // let expense = await db.Expense.findOne({
    //   where: {
    //     expense_customer: data.item_id,
    //   },
    // });
    // if (expense) {
    //   return {
    //     success: false,
    //     message: "PREVENT_DELETE",
    //   };
    // }
    await customer.destroy();
    return {
      success: true,
    };
  };